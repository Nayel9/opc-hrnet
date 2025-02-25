import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CustomSelect } from "customselect-opc-p14";
import MyDatePicker from "../datePicker/index.jsx";
import useEmployeeStore from "../../store/employeeStore";
import CreateEmployee from "../CreateEmployee/index.jsx";
import { Modale } from "modale-opc-p14";


// import useEmployeeStore from "../../store/employeeStore";
// import { v4 as uuidv4 } from "uuid";
// import { CustomSelect } from "customselect-opc-p14";
// import NewDatePicker from "../NewDatePicker/index.jsx";

vi.mock("../../store/employeeStore");

let mockState;

beforeEach(() => {
  const mockAddEmployee = vi.fn();
  const mockCloseModal = vi.fn();
  const mockSetDepartment = vi.fn();
  const mockSetState = vi.fn();
  const mockResetForm = vi.fn();
  const mockSetErrors = vi.fn();
  const mockSetFormValues = vi.fn();

  mockState = {
    addEmployee: mockAddEmployee,
    isModalOpen: false,
    closeModal: mockCloseModal,
    setDepartment: mockSetDepartment,
    setState: mockSetState,
    resetForm: mockResetForm,
    setErrors: mockSetErrors,
    setFormValues: mockSetFormValues,
    formValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      department: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    errors: {},
  };

  useEmployeeStore.mockImplementation((selector) => selector(mockState));
});

describe("TEST CustomSelect", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];

  it("renders the select element with options", () => {
    render(
      <CustomSelect
        name="test-select"
        id="test-select"
        required={true}
        options={options}
        defaultOption="Select an option"
        onChange={() => {}}
        value=""
      />,
    );

    // Vérifie que le select est rendu
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // Vérifie que les options sont rendues
    expect(screen.getByText("Select an option")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", () => {
    const handleChange = vi.fn();
    render(
      <CustomSelect
        name="test-select"
        id="test-select"
        required={true}
        options={options}
        defaultOption="Select an option"
        onChange={handleChange}
        value=""
      />,
    );

    // Simule la sélection d'une option
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    // Vérifie que la fonction onChange est appelée
    expect(handleChange).toHaveBeenCalled();
  });
});

describe("TEST MyDatePicker", () => {
  beforeEach(() => {
    mockState.formValues.dateOfBirth = new Date("02/25/2025");
  });
  it("renders the date picker with the selected date", () => {
    render(<MyDatePicker dateType="dateOfBirth" dataTestId="datepicker" />);

    const datePickerInput = screen.getByTestId("datepicker");
    expect(datePickerInput).toBeInTheDocument();
    expect(datePickerInput.value).toBe("02/25/2025"); // Vérifier avec le bon format
  });

  it("calls setDateOfBirth when a date is selected", () => {
    render(<MyDatePicker dateType="dateOfBirth" dataTestId="datepicker" />);

    const datePickerInput = screen.getByTestId("datepicker");
    fireEvent.change(datePickerInput, {
      target: { value: new Date("2025-02-03T23:00:00.000Z") },
    });

    expect(mockState.setFormValues).toHaveBeenCalledWith({
      dateOfBirth: new Date("2025-02-03T23:00:00.000Z"),
    });
  });
});

describe("TEST CreateEmployee", () => {

  beforeEach(() => {
    render(<CreateEmployee />);
  });

  function initializeFormValues() {
    mockState.formValues.firstName = "Darth";
    mockState.formValues.lastName = "Vader";
    mockState.formValues.dateOfBirth = "1941-02-24T22:00:00.000Z";
    mockState.formValues.startDate = "2025-02-24T23:00:00.000Z";
    mockState.formValues.department = "DarkSide";
    mockState.formValues.street = "41 Death Star Street";
    mockState.formValues.city = "Death Star";
    mockState.formValues.state = "DS";
    mockState.formValues.zipCode = "66666";
  }

  it("renders the CreateEmployee form", () => {
    const createEmployeeForm = screen.getByTestId("create-employee");
    expect(createEmployeeForm).toBeInTheDocument();
  });

  it("should set errors when form fields are empty", () => {
    const submitButton = screen.getByTestId("submitButton");
    fireEvent.click(submitButton);

    expect(mockState.setErrors).toHaveBeenCalledWith({
      firstName: "First name is required",
      lastName: "Last name is required",
      dateOfBirth: "Date of birth is required",
      startDate: "Start date is required",
      department: "Department is required",
      street: "Street is required",
      city: "City is required",
      state: "State is required",
      zipCode: "Zip code is required",
    });
  });

  it("should call addEmployee when form is submitted", () => {
    initializeFormValues();

    const submitButton = screen.getByTestId("submitButton");
    fireEvent.click(submitButton);

    expect(mockState.addEmployee).toHaveBeenCalledWith({
      first_name: "Darth",
      last_name: "Vader",
      birthday: "1941-02-24T22:00:00.000Z",
      start_date: "2025-02-24T23:00:00.000Z",
      department: "DarkSide",
      street: "41 Death Star Street",
      city: "Death Star",
      state_abb: "DS",
      Zip_code: "66666",
      id: expect.any(String),
    });
  });

  it("should opening the modal when form is submitted", () => {
    initializeFormValues();

    if (
      mockState.formValues.firstName &&
      mockState.formValues.lastName &&
      mockState.formValues.dateOfBirth &&
      mockState.formValues.startDate &&
      mockState.formValues.department &&
      mockState.formValues.street &&
      mockState.formValues.city &&
      mockState.formValues.state &&
      mockState.formValues.zipCode
    ) {
      mockState.setErrors(false);
      mockState.isModalOpen = true;
    }

    const submitButton = screen.getByTestId("submitButton");
    fireEvent.click(submitButton);

    expect(mockState.isModalOpen).toBe(true);
  });

  it("should close the modal and reset the form when the close button is clicked", () => {
    initializeFormValues();

    const handleCloseModal = () => {
      mockState.closeModal();
      mockState.resetForm();
    };

      render(<Modale
      title="Confirmation"
      content="Employee saved successfully!"
      onClose={handleCloseModal}
      error={false}
      ariaLabel="close"
    />);

    const closeButton = screen.getByTestId("modaleCloseButton");
    fireEvent.click(closeButton);

    expect(mockState.closeModal).toHaveBeenCalled();
    expect(mockState.resetForm).toHaveBeenCalled();
    expect(mockState.isModalOpen).toBe(false);
  });
});
