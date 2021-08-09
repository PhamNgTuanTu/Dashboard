import { getYear } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import { useEffect } from 'react';


InputYearField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
};

InputYearField.defaultProps = {
    label: '',
    placeholder: '',
}
function InputYearField(props) {
    const { field, form,
        label, placeholder } = props;
    const { name, onBlur, value } = field;

    //validation 
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const [startDate, setStartDate] = useState(null);

    useEffect(()=> {
        setStartDate(value ? new Date(`${value}`) : null)
    },[value])

    // const [startDate, setStartDate] = useState(null);

    const handleChange = (date) => {
        setStartDate(date)
        form.setFieldValue(name, getYear(date));
    }
    return (
        <div>
            <div className="form-group d-flex flex-column">
                {label && <label htmlFor="name">{label}</label>}
                <DatePicker
                    placeholderText={placeholder}
                    name={name}
                    selected={startDate}
                    onChange={(date) => handleChange(date)}
                    onBlur={onBlur}
                    showYearPicker
                    dateFormat="yyyy"
                    className={showError ? "form-control is-invalid" : "form-control"}
                    autoComplete="off"
                />
                {showError && <div className="show-error">{errors[name]}</div>}
            </div>
        </div>
    );
}

export default InputYearField;