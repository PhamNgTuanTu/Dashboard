import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { FormFeedback } from "reactstrap";

SelectFieldArray.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
};
SelectFieldArray.defaultProps = {
  label: "",
  placeholder: "",
  options: null,
};

function SelectFieldArray(props) {
  const { field, label, placeholder, showError } = props;
  let { options } = props;
  const { name, value } = field;

  const { loadingPage } = useSelector((state) => state.select);

  // covert sang dạng value, label react-select
  options =
    options &&
    options.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });

  const selectedOption =
    options && options.find((option) => option.value === value);

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        id={name}
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        isLoading={loadingPage ? true : false}
        options={options}
        placeholder={placeholder}
        isRequired
        className={showError ? 'is-invalid has-error' : ''}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </div>
  );
}

export default SelectFieldArray;
