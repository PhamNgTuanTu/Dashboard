import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

tinyMCE.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    autoFocus: PropTypes.bool,
};
tinyMCE.defaultProps = {
    label: '',
    placeholder: '',
    disabled: false,
    autoFocus: false,
}

function tinyMCE(props) {
    const init = ({
        selector: 'textarea#basic-example',
        height: 500,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        images_upload_url: 'postAcceptor.php',
        automatic_uploads: false,
    });

    const { field, form,
        label, placeholder, autoFocus
    } = props;
    const { name, onBlur, value } = field;

    const handleEditorChange = (values) => {
        form.setFieldValue(name, values)
    }

    //validation 
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <div className={showError ? "form-group has-error-tinymce" : "form-group"}>
            {label && <label htmlFor={name}>{label}</label>}
            <Editor
                init={init}
                placeholder={placeholder}
                autoFocus={autoFocus}
                name={name}
                value={value}
                onEditorChange={handleEditorChange}
                onBlur={onBlur}
            />
            {showError && <div className="show-error">{errors[name]}</div>}
        </div>
    );
}

export default tinyMCE;