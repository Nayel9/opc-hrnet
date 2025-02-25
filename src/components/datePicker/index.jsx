import DatePicker from "react-datepicker";

import "./datepicker.scss";
import useEmployeeStore from "../../store/employeeStore";
import PropTypes from "prop-types";

const MyDatePicker = ({
  dateType,
  dataTestId,
  showMonthYearDropdown = false,
}) => {
  const selectedDate = useEmployeeStore((state) => state.formValues[dateType]);
  console.log("selectedDate dans MyDatePicker :", selectedDate);
  const setFormValues = useEmployeeStore((state) => state.setFormValues);

  const handleDateChange = (date) => {
    setFormValues({ [dateType]: date });
    console.log("selectedDate:", date); // Affiche la date sélectionnée
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
