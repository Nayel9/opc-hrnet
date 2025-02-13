import propTypes from "prop-types";

const CustomSelect = ({ name, id, required, options, defaultOption }) => {
  return (
    <select name={name} id={id} required={required}>
      <option value="">{defaultOption}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

CustomSelect.propTypes = {
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  required: propTypes.bool,
  options: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.oneOfType([propTypes.string, propTypes.number])
        .isRequired,
      label: propTypes.string.isRequired,
    }),
  ).isRequired,
  defaultOption: propTypes.string.isRequired,
};

export default CustomSelect;
