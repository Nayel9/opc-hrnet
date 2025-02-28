import "./createEmployee.scss";
  import states from "../../data/States.json";
  import { Modale } from "modale-opc-p14";
  import useEmployeeStore from "../../store/employeeStore";
  import { CustomSelect } from "customselect-opc-p14";
  import MyDatePicker from "../datePicker/index.jsx";
import { apiService } from "../../services/apiService";

  /**
   * Composant CreateEmployee pour créer un nouvel employé.
   * @component
   */
  const CreateEmployee = () => {
    const addEmployee = useEmployeeStore((state) => state.addEmployee);
    const isModalOpen = useEmployeeStore((state) => state.isModalOpen);
    const openModal = useEmployeeStore((state) => state.openModal);
    const closeModal = useEmployeeStore((state) => state.closeModal);
    const formValues = useEmployeeStore((state) => state.formValues);
    const setFormValues = useEmployeeStore((state) => state.setFormValues);
    const errors = useEmployeeStore((state) => state.errors);
    const setErrors = useEmployeeStore((state) => state.setErrors);
    const resetForm = useEmployeeStore((state) => state.resetForm);

    /**
     * Gère les changements dans les champs de formulaire.
     * @param {Object} event - L'événement de changement.
     */
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };

    /**
     * Gère la soumission du formulaire.
     * @param {Object} event - L'événement de soumission.
     */
    const handleSubmit = async (event) => {
      event.preventDefault();
      const dateOfBirth = new Date(formValues.dateOfBirth);
      const startDate = new Date(formValues.startDate);

      // Validation des champs du formulaire
      const newErrors = {};
      if (!formValues.firstName) newErrors.firstName = "First name is required";
      if (!formValues.lastName) newErrors.lastName = "Last name is required";
      if (!(dateOfBirth instanceof Date) || isNaN(dateOfBirth.getTime()))
        newErrors.dateOfBirth = "Date of birth is required";
      if (!(startDate instanceof Date) || isNaN(startDate.getTime()))
        newErrors.startDate = "Start date is required";
      if (!formValues.department) newErrors.department = "Department is required";
      if (!formValues.street) newErrors.street = "Street is required";
      if (!formValues.city) newErrors.city = "City is required";
      if (!formValues.state) newErrors.state = "State is required";
      if (!formValues.zipCode) newErrors.zipCode = "Zip code is required";

      // Si des erreurs sont présentes, les afficher et arrêter la soumission
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Création d'un nouvel employé
      const newEmployee = {
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        birthday: dateOfBirth.toISOString(),
        start_date: startDate.toISOString(),
        department: formValues.department,
        street: formValues.street,
        city: formValues.city,
        state_abb: formValues.state,
        Zip_code: formValues.zipCode,
      };

      try {
        const savedEmployee = await apiService.addNewEmployee(newEmployee);
        addEmployee(savedEmployee);
        setErrors({});
        event.target.reset();
        openModal();
      } catch {
        setErrors({ general: "Error while saving the employee" });
        openModal();
      }
    };


    /**
     * Gère la fermeture de la modale.
     */
    const handleCloseModal = () => {
      closeModal();
      resetForm();
    };

    // Options pour le champ "State"
    const stateOptions = states.map((state) => ({
      value: state.abbreviation,
      label: state.name,
    }));

    // Options pour le champ "Department"
    const departmentOptions = [
      { value: "Sales", label: "Sales" },
      { value: "Marketing", label: "Marketing" },
      { value: "Engineering", label: "Engineering" },
      { value: "Human Resources", label: "Human Resources" },
      { value: "Legal", label: "Legal" },
    ];

    return (
      <div className="form-container">
        <form
          action="#"
          id="create-employee"
          data-testid="create-employee"
          onSubmit={handleSubmit}
        >
          <label htmlFor="first-name">
            First Name *
            <div className="label-group">
              <input
                id="first-name"
                name="firstName"
                data-testid="firstName"
                onChange={handleChange}
              />
              {errors.firstName && (
                <span data-testid="input-error" className="input-error">
                  {errors.firstName}
                </span>
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
                data-testid="lastName"
                value={formValues.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span data-testid="input-error" className="input-error">
                  {errors.lastName}
                </span>
              )}
            </div>
          </label>
          <label htmlFor="dateOfBirth">
            Date of Birth *
            <div className="label-group">
              <MyDatePicker
                id="dateOfBirth"
                dateType="dateOfBirth"
                aria-labelledby="dateOfBirth"
                name="dateOfBirth"
                value={formValues.dateOfBirth}
                dataTestId="dateOfBirth"
                showMonthYearDropdown={false}
              />
              {errors.dateOfBirth && (
                <span data-testid="input-error" className="input-error">
                  {errors.dateOfBirth}
                </span>
              )}
            </div>
          </label>
          <label htmlFor="startDate">
            Start Date *
            <div className="label-group">
              <MyDatePicker
                id="startDate"
                dateType="startDate"
                aria-labelledby="startDate"
                name="startDate"
                value={formValues.startDate}
                dataTestId="startDate"
                showMonthYearDropdown={false}
              />
              {errors.startDate && (
                <span data-testid="input-error" className="input-error">
                  {errors.startDate}
                </span>
              )}
            </div>
          </label>
          <label id="department-label" htmlFor="department">
            Department *
            <div className="label-group">
              <CustomSelect
                name="department"
                id="department"
                dataTestId="department"
                options={departmentOptions}
                defaultOption="Select Department"
                aria-labelledby="department"
                onChange={handleChange}
                value={formValues.department}
              />
              {errors.department && (
                <span data-testid="input-error" className="input-error">
                  {errors.department}
                </span>
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
                  data-testid="street"
                  value={formValues.street}
                  onChange={handleChange}
                />
                {errors.street && (
                  <span data-testid="input-error" className="input-error">
                    {errors.street}
                  </span>
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
                  data-testid="city"
                  value={formValues.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <span data-testid="input-error" className="input-error">
                    {errors.city}
                  </span>
                )}
              </div>
            </label>

            <label htmlFor="state">
              State *
              <div className="label-group">
                <CustomSelect
                  name="state"
                  id="state"
                  dataTestId="state"
                  options={stateOptions}
                  defaultOption="Select State"
                  aria-labelledby="state"
                  onChange={handleChange}
                  value={formValues.state}
                />
                {errors.state && (
                  <span data-testid="input-error" className="input-error">
                    {errors.state}
                  </span>
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
                  data-testid="zipCode"
                  value={formValues.zipCode}
                  onChange={handleChange}
                />
                {errors.zipCode && (
                  <span data-testid="input-error" className="input-error">
                    {errors.zipCode}
                  </span>
                )}
              </div>
            </label>
          </fieldset>
          <div className="button__container">
            <button
              data-testid="submitButton"
              className="button save__button"
              type="submit"
            >
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