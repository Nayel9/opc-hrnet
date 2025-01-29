import "./createEmployee.scss";
import states from "../../data/States.json";
import Modale from "../Modale";
import useEmployeeStore from "../../store/employeeStore";

const CreateEmployee = () => {
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const isModalOpen = useEmployeeStore((state) => state.isModalOpen);
  const closeModal = useEmployeeStore((state) => state.closeModal);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEmployee = {
      firstName: event.target["first-name"].value,
      lastName: event.target["last-name"].value,
      dateOfBirth: event.target["date-of-birth"].value,
      startDate: event.target["start-date"].value,
      department: event.target["department"].value,
      street: event.target["street"].value,
      city: event.target["city"].value,
      state: event.target["state"].value,
      zipCode: event.target["zip-code"].value,
    };
    addEmployee(newEmployee);
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
          <input id="date-of-birth" type="text" />
        </label>

        <label htmlFor="start-date">
          Start Date
          <input id="start-date" type="text" />
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

      {isModalOpen && <Modale onClose={closeModal} />}
    </div>
  );
};

export default CreateEmployee;
