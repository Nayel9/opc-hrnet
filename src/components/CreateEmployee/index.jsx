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
  const formValues = useEmployeeStore((state) => state.formValues);
  const setFormValues = useEmployeeStore((state) => state.setFormValues);
  const errors = useEmployeeStore((state) => state.errors);
  const setErrors = useEmployeeStore((state) => state.setErrors);
  const resetForm = useEmployeeStore((state) => state.resetForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { selectedDateOfBirth, selectedStartDate } =
      useEmployeeStore.getState();

    const newErrors = {};
    if (!formValues.firstName) newErrors.firstName = "First name is required";
    if (!formValues.lastName) newErrors.lastName = "Last name is required";
    if (!selectedDateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!selectedStartDate) newErrors.startDate = "Start date is required";
    if (!formValues.department) newErrors.department = "Department is required";
    if (!formValues.street) newErrors.street = "Street is required";
    if (!formValues.city) newErrors.city = "City is required";
    if (!formValues.state) newErrors.state = "State is required";
    if (!formValues.zipCode) newErrors.zipCode = "Zip code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newEmployee = {
      id: uuidv4(),
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      birthday: new Date(selectedDateOfBirth).toISOString(),
      start_date: new Date(selectedStartDate).toISOString(),
      department: formValues.department,
      street: formValues.street,
      city: formValues.city,
      state_abb: formValues.state,
      Zip_code: formValues.zipCode,
    };

    try {
      addEmployee(newEmployee);
      setErrors({}); // Réinitialiser les erreurs en cas de succès
      event.target.reset(); // Réinitialiser les champs du formulaire
    } catch {
      setErrors({ general: "Error while saving the employee" }); // Afficher une erreur si la sauvegarde échoue
    }
  };

  const handleCloseModal = () => {
    closeModal();
    resetForm(); // Réinitialiser le formulaire à la fermeture de la modale
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
      <form action="#" id="create-employee" onSubmit={handleSubmit}>
        <label htmlFor="first-name">
          First Name *
          <div className="label-group">
            <input
              type="text"
              id="first-name"
              name="firstName"
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className="input-error">{errors.firstName}</span>
            )}
          </div>
        </label>

        <label htmlFor="last-name">
          Last Name *
          <div className="label-group">
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className="input-error">{errors.lastName}</span>
            )}
          </div>
        </label>

        <label htmlFor="date-of-birth">
          Date of Birth *
          <div className="label-group">
            <MyDatePicker
              id="date-of-birth"
              dateType="selectedDateOfBirth"
              aria-labelledby="date-of-birth"
              name="date-of-birth"
              value={formValues.dateOfBirth}
              dataTestId="date-of-birth"

            />
            {errors.dateOfBirth && (
              <span className="input-error">{errors.dateOfBirth}</span>
            )}
          </div>
        </label>
        <label htmlFor="start-date">
          Start Date *
          <div className="label-group">
            <MyDatePicker
              id="start-date"
              dateType="selectedStartDate"
              aria-labelledby="start-date"
              name="start-date"
              value={formValues.startDate}
              dataTestId="start-date"
            />
            {errors.startDate && (
              <span className="input-error">{errors.startDate}</span>
            )}
          </div>
        </label>
        <label id="department-label" htmlFor="department">
          Department *
          <div className="label-group">
            <CustomSelect
              name="department"
              id="department"
              options={departmentOptions}
              defaultOption="Select Department"
              aria-labelledby="department"
              onChange={handleChange}
              value={formValues.department}
            />
            {errors.department && (
              <span className="input-error">{errors.department}</span>
            )}
          </div>
        </label>
        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">
            Street *
            <div className="label-group">
              <input
                id="street"
                type="text"
                name="street"
                value={formValues.street}
                onChange={handleChange}
              />
              {errors.street && (
                <span className="input-error">{errors.street}</span>
              )}
            </div>
          </label>

          <label htmlFor="city">
            City *
            <div className="label-group">
              <input
                id="city"
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="input-error">{errors.city}</span>
              )}
            </div>
          </label>

          <label htmlFor="state">
            State *
            <div className="label-group">
              <CustomSelect
                name="state"
                id="state"
                options={stateOptions}
                defaultOption="Select State"
                aria-labelledby="state"
                onChange={handleChange}
                value={formValues.state}
              />
              {errors.state && (
                <span className="input-error">{errors.state}</span>
              )}
            </div>
          </label>

          <label htmlFor="zip-code">
            Zip Code *
            <div className="label-group">
              <input
                id="zip-code"
                type="number"
                name="zipCode"
                value={formValues.zipCode}
                onChange={handleChange}
              />
              {errors.zipCode && (
                <span className="input-error">{errors.zipCode}</span>
              )}
            </div>
          </label>
        </fieldset>
        <div className="button__container">
          <button className="button save__button" type="submit">
            Save
          </button>
        </div>
      </form>

      <span className="required-fields">* Required Fields</span>

      {isModalOpen && (
        <Modale
          title={errors.general ? "Error !" : "Confirmation"}
          content={
            errors.general
              ? "Error while saving the employee"
              : "Employee saved successfully!"
          }
          onClose={handleCloseModal}
          error={!!errors.general}
          ariaLabel="close"
        />
      )}
    </div>
  );
};

export default CreateEmployee;
