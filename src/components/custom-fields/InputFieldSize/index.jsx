import PropTypes from 'prop-types';
import React from 'react';
import ConvertSize from './ConvertSize';

InputFieldSize.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
};

InputFieldSize.defaultProps = {}

function InputFieldSize(props) {
    const { field, form } = props;
    const { name, onBlur, value } = field;

    //validation 
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const handleSizeChange = (values) => {
        form.setFieldValue(name, values);
    }
    return (
        <>
            <ConvertSize
                name={name}
                valuesSize={value}
                onSizeChange={handleSizeChange}
                onBlur={onBlur}
                showError={showError}
            />
        </>
    );
}

export default InputFieldSize;