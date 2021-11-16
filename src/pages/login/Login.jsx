import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import userApi from "../../api/userApi";
import LoginForm from "../../components/Login/LoginForm";
import modalError from "../../components/modal/Error";
import { login } from "../../store/user";

function Login(props) {
  const nameTitleInitial = "Đăng Nhập Trang Quản Trị";
  document.title = nameTitleInitial;
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  // const initialValues = {
  //     email: 'administrator@gmail.com',
  //     password: 'password123',
  // }

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    setLoading(true);
    const isLogIn = async () => {
      try {
        const res = await userApi.logIn(values);
        dispatch(login(res.data));
        setLoading(false);

        history.push("/");
      } catch (error) {
        if (error.response.status === 401) {
          setLoading(false);
          modalError(error.response.data.message);
        }
        if (error.response.status === 422) {
          setLoading(false);
          modalError(error.response.data.message);
        }
      }
    };
    isLogIn();
  };

  return (
    <div className="login-page">
      {loading ? (
        <div id="preloder">
          <div className="loader"></div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <img
                    src={
                      window.location.origin + "/assets/images/logo/logo.png"
                    }
                    alt="Loading..."
                  />
                </div>
                <h5 className="card-title text-center">
                  Đăng Nhập Trang Quản Trị Staciabook
                </h5>
                <LoginForm
                  initialValues={initialValues}
                  isloading={loading}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
