import propTypes from "prop-types";

const NewDatePicker = ({ onChange, id, name, dataTestId, ariaLabelledBy }) => {
  return (
    <input
      type="date"
      id={id}
      name={name}
      onChange={onChange}
      data-testid={dataTestId}
      aria-labelledby={ariaLabelledBy}
    />
  );
};

NewDatePicker.propTypes = {
  onChange: propTypes.func,
  id: propTypes.string,
  name: propTypes.string,
  dataTestId: propTypes.string,
  ariaLabelledBy: propTypes.string,
};

export default NewDatePicker;
