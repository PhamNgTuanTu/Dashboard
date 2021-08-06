import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./components/privateroute";
import Author from "./pages/author/Author";
import RouteBook from "./pages/books/RouteBook";
import Category from "./pages/category/Category";
import ErrorPage from "./pages/errorpage/ErrorPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./pages/navbar/Navbar";
import Products from "./pages/products/Products";
import Publishers from "./pages/publishers/Publishers";
import Suppliers from "./pages/suppliers/Suppliers";
import Users from "./pages/users/Users";


const DefaultContainer = () => (
  <>
    <Navbar />
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/user" component={Products} />
      <PrivateRoute path="/category" component={Category} />
      <PrivateRoute path="/publishers" component={Publishers} />
      <PrivateRoute path="/suppliers" component={Suppliers} />
      <PrivateRoute path="/users" component={Users} />
      <PrivateRoute path="/authors" component={Author} />
      <PrivateRoute path="/books" component={RouteBook} />
      <PrivateRoute path="*" component={ErrorPage} />
    </Switch>
  </>
)
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={DefaultContainer} />
      </Switch>
    </Router>
  );
}

export default App;
