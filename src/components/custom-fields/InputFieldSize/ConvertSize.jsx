import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

ConvertSize.propTypes = {
    onSizeChange: PropTypes.func,
    showError: PropTypes.bool,
    valuesSize: PropTypes.string,
};

ConvertSize.defaultProps = {
    onSizeChange: null,
    showError: false,
    valuesSize : ''
}

function ConvertSize(props) {
    const { onSizeChange, showError, valuesSize } = props;
    const [error, setError] = useState(false);
    const [error1, setError1] = useState(false);
    const [errorMes, setErrorMes] = useState('');
    const [errorMes1, setErrorMes1] = useState('');
    var errorString = 'Vui lòng nhập trường này';
    var errorNumber = 'Vui lòng nhập số';
    
    const [values, setValues] = useState({
        height: '',
        width: '',
    })

    // cắt chuỗi với khoảng cách
    const arString = valuesSize && valuesSize.split(' ');
    //lấy chiều dài sách
    const getHeight = arString.slice(0, 1)[0];
    //lấy chiều rộng sách
    const getWidth = arString.slice(-2)[0];

    useEffect(() => {
        if (values.height === '' || values.height === null) {
            setError(showError);
            setErrorMes(errorString);
        }
        if (values.width === '' || values.width === null) {
            setErrorMes1(errorString);
            setError1(showError);
        }
        if (valuesSize) {
            setValues(valuesSize && {
                height: getHeight,
                width: getWidth,
            })
        }
        // eslint-disable-next-line
    }, [showError,valuesSize])
    
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleBlur = (e) => {
        if (e.target.value === '' || e.target.value === null) {
            if (e.target.name === 'width') {
                setError1(true);
                setErrorMes1(errorString)
            }
            if (e.target.name === 'height') {
                setError(true);
                setErrorMes(errorString)
            }
        } else if (!isNaN(e.target.value) === false) {
            if (e.target.name === 'width') {
                setError1(true);
                setErrorMes1(errorNumber)
            }
            if (e.target.name === 'height') {
                setError(true);
                setErrorMes(errorNumber)
            }
        } else {
            values.height && setError(false);
            values.width && setError1(false);
            if (values.height !== '' && values.width !== '') {
                if (!isNaN(values.height) && !isNaN(values.width)) {
                    const size = `${values.height < 0 ? values.height * -1 : values.height} cm x ${values.width < 0 ? values.width * -1 : values.width} cm`;
                    onSizeChange && onSizeChange(size);
                }
            }
        }
    }
    return (
        <div className="row">
            <div className="col-6">
                <div className="form-group">
                    <label htmlFor="height">Chiều Dài Sách</label>
                    <input
                        id="height"
                        className={error ? "form-control is-invalid" : "form-control"}
                        name="height"
                        value={values.height}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nhập Chiều Dài Sách (cm)"
                        type="text"
                    />
                    {error && <div className="invalid-feedback">{errorMes}</div>}

                </div>
            </div>
            <div className="col-6">
                <div className="form-group">
                    <label htmlFor="width">Chiều Rộng Sách</label>
                    <input
                        id="width"
                        className={error1 ? "form-control is-invalid" : "form-control"}
                        name="width"
                        value={values.width}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nhập Chiều Rộng Sách (cm)"
                        type="text"
                    />
                    {error1 && <div className="invalid-feedback">{errorMes1}</div>}
                </div>
            </div>
        </div>
    );
}

export default ConvertSize;