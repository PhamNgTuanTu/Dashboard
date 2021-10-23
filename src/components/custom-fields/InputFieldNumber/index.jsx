import PropTypes from "prop-types";
import React from "react";

InputFieldNumber.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

InputFieldNumber.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
  autoFocus: false,
};

function InputFieldNumber(props) {
  const { field, form, label, placeholder, autoFocus, type } = props;
  const { name } = field;

  //validation
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleChange = (e) => {
    form.setFieldValue(name, e.target.value.replace(/[^0-9]/g, ""));
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
      {showError && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
}

export default InputFieldNumber;
