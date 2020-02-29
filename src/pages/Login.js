import React, { Component } from "react";

import Sidebar from "../components/Sidebar";

import Button from "@material-ui/core/Button";

import { withGlobalState } from "react-globally";

import { logInAs } from "../api/auth";

export class Login extends Component {
  render() {
    return (
      <>
        <Sidebar page="Login">
          <Button
            style={{ marginRight: "16px" }}
            variant="outlined"
            color="primary"
            onClick={() => {
              logInAs(this.props, "student");
            }}
          >
            Student
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              logInAs(this.props, "teacher");
            }}
          >
            Teacher
          </Button>
        </Sidebar>
      </>
    );
  }
}

export default withGlobalState(Login);
