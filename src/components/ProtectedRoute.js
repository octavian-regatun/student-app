import React from "react";

import { Route, Redirect } from "react-router-dom";

export default class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={props =>
          this.props.condition ? (
            <Component {...props} />
          ) : (
            <Redirect to={this.props.redirectPath} />
          )
        }
      />
    );
  }
}
