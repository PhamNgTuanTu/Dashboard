import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { FormFeedback } from "reactstrap";

InputFieldArrayNumber.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

InputFieldArrayNumber.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  autoFocus: false,
};

function InputFieldArrayNumber(props) {
  const { field, form, label, placeholder, autoFocus, type, showError } = props;
  const { name } = field;

  const handleChange = (e) => {
    form.setFieldValue(name, Number(e.target.value.replace(/[^0-9]/g, "")));
  };

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={showError ? "form-control is-invalid" : "form-control"}
        {...field}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        type={type}
      />
      <ErrorMessage name={name} component={FormFeedback} />
    </div>
  );
}

export default InputFieldArrayNumber;
