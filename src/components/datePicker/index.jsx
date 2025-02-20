import DatePicker from "react-datepicker";
import "./datepicker.scss";
import useEmployeeStore from "../../store/employeeStore";
import PropTypes from "prop-types";

const MyDatePicker = ({ dateType, dataTestId }) => {
  const selectedDate = useEmployeeStore((state) => state[dateType]);
  const setSelectedDate = useEmployeeStore(
    (state) =>
      state[`set${dateType.charAt(0).toUpperCase() + dateType.slice(1)}`],
  );
  const setFormValues = useEmployeeStore((state) => state.setFormValues);
  const formValues = useEmployeeStore((state) => state.formValues);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Stocke directement l'objet Date
    setFormValues({ ...formValues, [dateType]: date });
    console.log("selectedDate:", date); // Affiche la date sélectionnée
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null} // Utilise directement l'objet Date
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        showMonthDropdown
        dropdownMode="select"
        dataTestId={dataTestId}
      />
    </div>
  );
};

MyDatePicker.propTypes = {
  dateType: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default MyDatePicker;