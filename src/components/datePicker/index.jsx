// src/components/datePicker/index.jsx
import DatePicker from "react-datepicker";
import "./datepicker.scss";
import useEmployeeStore from "../../store/employeeStore";
import PropTypes from "prop-types";

const MyDatePicker = ({ dateType }) => {
  const selectedDate = useEmployeeStore((state) => state[dateType]);
  const setSelectedDate = useEmployeeStore(
    (state) =>
      state[`set${dateType.charAt(0).toUpperCase() + dateType.slice(1)}`],
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        showMonthDropdown
        dropdownMode="select"
      />
    </div>
  );
};

MyDatePicker.propTypes = {
  dateType: PropTypes.string.isRequired,
};

export default MyDatePicker;
