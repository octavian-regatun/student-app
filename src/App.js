import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import Grades from "./pages/Student/Grades";
import Student from "./pages/Student/Student";
import Teacher from "./pages/Teacher/Teacher";
import Login from "./pages/Login";
import AddStudent from "./pages/Teacher/AddStudent"

import ProtectedRoute from "./components/ProtectedRoute";

import { withGlobalState } from "react-globally";

import * as Auth from "./api/auth";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <ProtectedRoute
              exact
              path="/login"
              component={Login}
              condition={!Auth.isLoggedIn(this.props)}
              redirectPath="/"
            />
            <ProtectedRoute
              exact
              path="/home"
              component={Home}
              condition={Auth.isLoggedIn(this.props)}
              redirectPath="/login"
            />
            <ProtectedRoute
              exact
              path="/student"
              component={Student}
              condition={Auth.isLoggedIn(this.props)}
              redirectPath="/login"
            />
            <ProtectedRoute
              exact
              path="/student/grades"
              component={Grades}
              condition={Auth.isLoggedIn(this.props)}
              redirectPath="/login"
            />
            <ProtectedRoute
              exact
              path="/teacher"
              component={Teacher}
              condition={Auth.isLoggedIn(this.props)}
              redirectPath="/login"
            />
            <ProtectedRoute
            exact
            path="/teacher/addStudent"
            component={AddStudent}
            condition={Auth.isLoggedIn(this.props)}
            redirectPath="/login"
          />

            <Redirect exact from="/" to="/home" />
          </Switch>
        </Router>
      </>
    );
  }
}

export default withGlobalState(App);
