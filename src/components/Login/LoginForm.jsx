import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import * as Yup from "yup";
import InputField from "../custom-fields/InputField";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
LoginForm.defaultProps = {
  onSubmit: null,
};

function LoginForm(props) {
  const { initialValues, isloading } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test(
        "",
        "Vui lòng nhập tài khoản",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập tài khoản")
      .email("Email không hợp lệ")
      .max(255, "Vui lòng nhập nhỏ hơn 255 kí tự"),
    password: Yup.string()
      .test(
        "",
        "Vui lòng nhập mật khẩu",
        (value) => value && value.trim() !== ""
      )
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Vui lòng nhập mật khẩu lớn hơn 6 kí tự")
      .max(20, "Vui lòng nhập mật khẩu nhỏ hơn 20 kí tự"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      {(formikProps) => {
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
            <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
              <em>
                <small>* Vui lòng nhập tài khoản được cung cấp</small>
              </em>
            </div>
            <button
              className="btn btn-lg btn-primary btn-block text-uppercase"
              type="submit"
              disabled={isloading}
            >
              {isloading ? `Đang xác thực...` : `Đăng Nhập`}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
