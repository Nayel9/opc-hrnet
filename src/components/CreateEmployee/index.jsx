import "./createEmployee.scss";
import states from "../../data/States.json";
import { Modale } from "modale-opc-p14";
import useEmployeeStore from "../../store/employeeStore";
import MyDatePicker from "../DatePicker";
import { v4 as uuidv4 } from "uuid";
import { CustomSelect } from "customselect-opc-p14";

const CreateEmployee = () => {
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const isModalOpen = useEmployeeStore((state) => state.isModalOpen);
  const closeModal = useEmployeeStore((state) => state.closeModal);
  const setError = useEmployeeStore((state) => state.setError);
  const isError = useEmployeeStore((state) => state.isError);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { selectedDateOfBirth, selectedStartDate } =
      useEmployeeStore.getState();

    if (!selectedDateOfBirth || !selectedStartDate) {
      setError(true);
      return;
    }

    const newEmployee = {
      id: uuidv4(),
      first_name: event.target["first-name"].value,
      last_name: event.target["last-name"].value,
      birthday: new Date(selectedDateOfBirth).toISOString(),
      start_date: new Date(selectedStartDate).toISOString(),
      department: event.target["department"].value,
      street: event.target["street"].value,
      city: event.target["city"].value,
      state_abb: event.target["state"].value,
      Zip_code: event.target["zip-code"].value,
    };

    try {
      addEmployee(newEmployee);
      setError(false); // Réinitialiser l'erreur en cas de succès
      event.target.reset(); // Réinitialiser les champs du formulaire
    } catch {
      setError(true); // Afficher une erreur si la sauvegarde échoue
    }
  };

  const stateOptions = states.map((state) => ({
    value: state.abbreviation,
    label: state.name,
  }));

  const departmentOptions = [
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Legal", label: "Legal" },
  ];


  return (
    <div className="form-container">
      <h1>Create Employee</h1>
      <form action="#" id="create-employee" onSubmit={handleSubmit}>
        <label htmlFor="first-name">
          First Name *
          <input type="text" id="first-name" required />
        </label>

        <label htmlFor="last-name">
          Last Name *
          <input type="text" id="last-name" required />
        </label>

        <label htmlFor="date-of-birth">
          Date of Birth *
          <MyDatePicker dateType="selectedDateOfBirth" required />
        </label>

        <label htmlFor="start-date">
          Start Date *
          <MyDatePicker dateType="selectedStartDate" required />
        </label>

        <label htmlFor="department">
          Department *
          <CustomSelect
              name="department"
              id="department"
              required
              options={departmentOptions}
              defaultOption="Select Department"
          />
        </label>

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">
            Street *
            <input id="street" type="text" required />
          </label>

          <label htmlFor="city">
            City *
            <input id="city" type="text" required />
          </label>

          <label htmlFor="state">
            State *
            <CustomSelect
                name="state"
                id="state"
                required
                options={stateOptions}
                defaultOption="Select State"
            />
          </label>

          <label htmlFor="zip-code">
            Zip Code *
            <input id="zip-code" type="number" required />
          </label>
        </fieldset>
      </form>
      <button className="button save__button" type="submit">
        Save
      </button>

      <span className="required-fields">* Required Fields</span>

      {isModalOpen && (
        <Modale
          title={isError ? "Error !" : "Confirmation"}
          content={
            isError
              ? "Error while saving the employee"
              : "Employee saved successfully!"
          }
          onClose={closeModal}
          error={isError}
        />
      )}
    </div>
  );
};

export default CreateEmployee;
