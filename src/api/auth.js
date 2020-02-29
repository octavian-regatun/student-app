const logInAs = (props, role) => {
  props.setGlobalState({ role: role });
};

const isLoggedIn = props => {
  if (props.globalState.role == null) {
    return false;
  } else if (props.globalState.role == "student" || "teacher") {
    return true;
  }
};

const isLoggedInAs = (props, role) => {
  if (props.globalState.role == role) {
    return true;
  } else {
    return false;
  }
};

export { logInAs, isLoggedIn, isLoggedInAs };
