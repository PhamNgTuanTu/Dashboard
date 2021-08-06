import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

InputFile.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};
InputFile.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
}

function InputFile(props) {
    const { field, form,
        label, placeholder, type
    } = props;
    const { name } = field;

    //validation 
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];
    const [files, setFiles] = useState([]);
    const getFileMetadata = file => {
        return {
            lastModified: file.lastModified,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath
        }
    }

    const inputFile = useRef(null)
    const onButtonClick = () => {
        inputFile.current.click();
    };

    const handleChange = (event) => {
        //here we take the file extension and set an array of valid extensions
        let newstate = [];
        var res = window.$(`#${name}`).val();
        var arr = res.split("\\");
        var filename = arr.slice(-1)[0];
        var filextension = filename.split(".");
        var filext = "." + filextension.slice(-1)[0];
        var valid = [".jpg", ".png", ".jpeg", ".bmp"];
        //if file is not valid we show the error icon, the red alert, and hide the submit button
        if (valid.indexOf(filext.toLowerCase()) === -1) {
            window.$(`.imgupload${name}`).hide();
            window.$(`.imgupload${name}.ok`).hide();
            window.$(`.imgupload${name}.stop`).show();

            window.$(`#img${name}`).css({ "color": "red", "font-weight": 700 });
            window.$(`#img${name}`).html("File " + filename + " Sai Định Dạng!");

        } else {
            for (let i = 0; i < event.target.files.length; i++) {
                let file = event.target.files[i];
                let metadata = getFileMetadata(file);
                let url = URL.createObjectURL(file);
                newstate = [...newstate, { url, metadata }];
                form.setFieldValue(name, file);
            }
            //if file is valid we show the green alert and show the valid submit
            window.$(`.imgupload${name}`).hide();
            window.$(`.imgupload${name}.stop`).hide();
            window.$(`.imgupload${name}.ok`).show();


            window.$(`#img${name}`).css({ "color": "green", "font-weight": 700 });
            window.$(`#img${name}`).html(filename);

            setFiles(newstate);
        }
    }
    return (
        <div className="col-md-6 col-md-offset-3 center">
            <div className="form-group mb-0">
                {label && <label htmlFor={name}>{label}</label>}
                <input type={type}
                    name={name}
                    id={name}
                    ref={inputFile}
                    style={{ display: 'none' }}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <div className={showError ? "has-error-file control-input" : "control-input"} onClick={onButtonClick}>
                <div className={`imgupload${name}`}>
                    <i className='bx bxs-file-image'></i>
                </div>
                <div className={`imgupload${name} ok mt-3`} id="showImage">
                    {files.map((item, index) => {
                        return (
                            <div key={index}>
                                <img src={item.url} alt="" height="200" />
                            </div>
                        );
                    })}
                </div>
                <div className={`imgupload${name} stop`}>
                    <i className='bx bx-x'></i>
                </div>
                <p id={`img${name}`}>{placeholder}</p>
            </div>
            {showError && <div className="show-error">{errors[name]}</div>}
        </div>
    );
}

export default InputFile;