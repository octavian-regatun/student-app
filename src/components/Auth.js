import React, { Component } from "react";

import { withGlobalState } from "react-globally";

export class Auth extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.globalState.role != nextProps.globalState.role) {
      return true;
    }
    return false;
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withGlobalState(Auth);
