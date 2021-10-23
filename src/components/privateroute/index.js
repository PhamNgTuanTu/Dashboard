import { Redirect, Route } from "react-router-dom";
import Login from "../../pages/login/Login";

export default function PrivateRoute({
  path,
  children,
  Component,
  ...restProps
}) {
  // const { user } = useSelector((state) => state.user);

  const checkValidToken = () => {
    const token = localStorage.getItem('user');
    if (token) {
     return true
    } else {
      return false
    }
  }


  return checkValidToken() ?
    (
      <Route path={path} component={Component} {...restProps} />
    )
    :
    (
      <>
        <Redirect to="/login" />
        <Login />
      </>
    );
}
