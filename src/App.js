import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./components/privateroute";
import Author from "./pages/author/Author";
import RouteBook from "./pages/books/RouteBook";
import Category from "./pages/category/Category";
import DisCount from './pages/discount/DisCount';
import ErrorPage from "./pages/errorpage/ErrorPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./pages/navbar/Navbar";
import Order from './pages/order/Order';
import Products from "./pages/products/Products";
import Publishers from "./pages/publishers/Publishers";
import Slider from './pages/slider/Slider';
import Suppliers from "./pages/suppliers/Suppliers";
import Users from "./pages/users/Users";
import WareHouse from "./pages/warehouse/Warehouse";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDj5CYdtdstTt6FuvyOrFFYPXYjhrkuClA",
  authDomain: "staciabook-cms.firebaseapp.com",
  projectId: "staciabook-cms",
  storageBucket: "staciabook-cms.appspot.com",
  messagingSenderId: "488246942647",
  appId: "1:488246942647:web:a42c310fac816c1231a632",
  measurementId: "G-857B8ZQDXQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
      <PrivateRoute path="/warehouse" component={WareHouse} />
      <PrivateRoute path="/discount" component={DisCount} />
      <PrivateRoute path="/order" component={Order} />
      <PrivateRoute path="/slider" component={Slider} />
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
