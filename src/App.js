import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/common/navbar";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
