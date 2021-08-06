import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import InputField from '../custom-fields/InputField';


LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};
LoginForm.defaultProps = {
    onSubmit: null,
}

function LoginForm(props) {
    const { initialValues,isloading } = props;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
        .required('Vui lòng nhập trường này')
        .email('Vui lòng nhập dạng emal'),
        password: Yup.string()
        .required('Vui lòng nhập trường này')
        .min(6 , "Vui lòng nhập 6 -> 12 kí tự")
        .max(12 , "Vui lòng nhập 6 -> 12 kí tự"),
        
    })
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={props.onSubmit}
        >
            {formikProps => {
                // const { isSubmitting } = formikProps;
                // console.log({ values, errors, touched });

                return (
                    <Form className="form-signin">
                        <FastField
                            // props của FastField 
                            name="email"
                            component={InputField}

                            // props truyền vào components InputField 
                            label="Email"
                            placeholder="Email address"
                            type="email"
                            autoFocus={true}
                        />
                        <FastField
                            name="password"
                            component={InputField}

                            label="password"
                            placeholder="Password"
                            type="password"
                            autoFocus={false}
                        />
                        <div className="custom-control custom-checkbox mb-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={isloading}>
                            {isloading ? `Đang xác thực...` : `Đăng Nhập`}
                        </button>
                        <hr className="my-4" />
                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="button"><i className="fab fa-google mr-2" /> Sign in with Google</button>
                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i className="fab fa-facebook-f mr-2" /> Sign in with Facebook</button>
                    </Form>
                )
            }}
        </Formik>
    );
}

export default LoginForm;