import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import { FormFeedback } from 'reactstrap';

SelectField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
};
SelectField.defaultProps = {
    label: '',
    placeholder: '',
    options: null,
}

function SelectField(props) {
    const { field, form, label, placeholder , loading } = props;
    let { options } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];


    // covert sang dạng value, label react-select
    options = options && options.map(item => {
        return {
            value: item.id,
            label: item.name
        };
    });

    const selectedOption = options && options.find(option => option.value === value);

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue
            }
        };
        field.onChange(changeEvent);
    }
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <Select
                id={name}
                {...field}
                value={selectedOption}
                onChange={handleSelectedOptionChange}
                isLoading={loading}
                options={options}
                placeholder={placeholder}
                isRequired
                className={showError ? 'is-invalid has-error' : ''}
            />
           <ErrorMessage name={name} component={FormFeedback} />
        </div>
    );
}

export default SelectField;