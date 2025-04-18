import DatePicker from "react-datepicker";
    import "./datepicker.scss";
    import useEmployeeStore from "../../store/employeeStore";
    import PropTypes from "prop-types";

    /**
     * Composant de sélection de date personnalisé.
     *
     * @param {Object} props - Les propriétés du composant.
     * @param {string} props.dateType - Le type de date (ex: dateOfBirth, startDate).
     * @param {string} props.dataTestId - L'identifiant de test pour le composant.
     * @param {boolean} [props.showMonthYearDropdown=false] - Indique si le menu déroulant mois/année doit être affiché.
     * @returns {JSX.Element} Le composant de sélection de date.
     */
    const MyDatePicker = ({ dateType, dataTestId, showMonthYearDropdown = false }) => {
      // Récupère la date sélectionnée depuis le store
      const selectedDate = useEmployeeStore((state) => state.formValues[dateType]);

      // Fonction pour mettre à jour la date dans le store
      const setFormValues = useEmployeeStore((state) => state.setFormValues);

      /**
       * Gère le changement de date.
       *
       * @param {Date} date - La nouvelle date sélectionnée.
       */
      const handleDateChange = (date) => {
        setFormValues({ [dateType]: date });
      };

      return (
        <div>
          <DatePicker
            selected={
              selectedDate && !isNaN(new Date(selectedDate))
                ? new Date(selectedDate)
                : null
            }
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            showMonthDropdown
            showMonthYearDropdown={showMonthYearDropdown}
            dropdownMode="select"
            customInput={<input data-testid={dataTestId} />}
            maxDate={new Date()}
          />
        </div>
      );
    };

    MyDatePicker.propTypes = {
      dateType: PropTypes.string.isRequired,
      dataTestId: PropTypes.string.isRequired,
      showMonthYearDropdown: PropTypes.bool,
    };

    export default MyDatePicker;