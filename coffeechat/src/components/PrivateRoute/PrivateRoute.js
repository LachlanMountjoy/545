import {
  Route,
  Navigate
} from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, element }) =>
  isLoggedIn
    ? element
    : <Navigate to="/landing" />

export default PrivateRoute;
