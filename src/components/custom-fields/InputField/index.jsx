import PropTypes from 'prop-types';
import React from 'react';

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  autoFocus: false,
}

function InputField(props) {
  const { field,form,
    label, placeholder, autoFocus, type
  } = props;
  const { name } = field;

  //validation 
  const {errors, touched} = form;
  const showError = errors[name] && touched[name];

  return (
    <div className="form-label-group">
      <input
        id={name}
        className={showError ? "form-control error-input" : "form-control"}
        {...field}
        placeholder={placeholder}
        autoFocus={autoFocus}
        type={type}
      />
      {label && <label htmlFor={name}>{label}</label>}
      {showError && <div className="show-error"><i className='bx bxs-error'></i><p>{errors[name]}</p></div>}
    </div>
  );
}

export default InputField;