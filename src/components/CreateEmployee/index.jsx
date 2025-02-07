import "./createEmployee.scss";
import states from "../../data/States.json";
import { Modale } from 'modale-opc-p14';
import useEmployeeStore from "../../store/employeeStore";
import MyDatePicker from "../DatePicker";

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
    const newEmployee = {
      firstName: event.target["first-name"].value,
      lastName: event.target["last-name"].value,
      dateOfBirth: selectedDateOfBirth,
      startDate: selectedStartDate,
      department: event.target["department"].value,
      street: event.target["street"].value,
      city: event.target["city"].value,
      state: event.target["state"].value,
      zipCode: event.target["zip-code"].value,
    };

    try {
      addEmployee(newEmployee);
      setError(false); // Réinitialiser l'erreur en cas de succès
    } catch {
      setError(true); // Afficher une erreur si la sauvegarde échoue
    }
  };

  return (
    <div className="form-container">
      <h1>Create Employee</h1>
      <form action="#" id="create-employee" onSubmit={handleSubmit}>
        <label htmlFor="first-name">
          First Name
          <input type="text" id="first-name" />
        </label>

        <label htmlFor="last-name">
          Last Name
          <input type="text" id="last-name" />
        </label>

        <label htmlFor="date-of-birth">
          Date of Birth
          <MyDatePicker dateType="selectedDateOfBirth" />
        </label>

        <label htmlFor="start-date">
          Start Date
          <MyDatePicker dateType="selectedStartDate" />
        </label>

        <label htmlFor="department">
          Department
          <select name="department" id="department">
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </label>

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">
            Street
            <input id="street" type="text" />
          </label>

          <label htmlFor="city">
            City
            <input id="city" type="text" />
          </label>

          <label htmlFor="state">
            State
            <select name="state" id="state">
              {states.map((state) => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="zip-code">
            Zip Code
            <input id="zip-code" type="number" />
          </label>
        </fieldset>

        <button className="button save__button" type="submit">
          Save
        </button>
      </form>

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
