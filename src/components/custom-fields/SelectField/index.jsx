import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

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
    const { field, form, label, placeholder } = props;
    let { options } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const { loadingPage } = useSelector(state => state.select);

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
                isLoading={loadingPage ? true : false}
                options={options}
                placeholder={ placeholder}
                isRequired
                className={showError && "has-error"}
            />
            {showError && <div className="show-error">{errors[name]}</div>}
        </div>
    );
}

export default SelectField;