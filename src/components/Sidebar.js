import React, { Component } from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import GradeOutlinedIcon from "@material-ui/icons/GradeOutlined";

import { withRouter } from "react-router-dom";

import { withGlobalState } from "react-globally";
import * as Auth from "../api/auth";

const theme = createMuiTheme({});

const drawerWidth = () => {return document.documentElement.clientWidth/8};

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: "none",
    color: "inherit"
  }
});

export class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    const { pathname } = this.props.location;

    let student, studentList, teacher,teacherList, warning;

    if (Auth.isLoggedInAs(this.props, "student")) {
      studentList = (
        <>
          <Divider />
          <List>
            <Link to="/student/grades" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GradeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Grades"} />
              </ListItem>
            </Link>
          </List>
        </>
      );
    } else {
      studentList = null;
    }

    if (Auth.isLoggedInAs(this.props, "teacher")) {
      teacherList = (
        <>
          <Divider />
          <List>
            <Link to="/teacher/addStudent" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <GradeOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Add Student"} />
              </ListItem>
            </Link>
          </List>
        </>
      );
    } else {
      teacherList = null;
    }

    if (Auth.isLoggedInAs(this.props, "student")) {
      student = (
        <Link to="/student" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <SchoolOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Student"} />
          </ListItem>
        </Link>
      );
    } else {
      student = null;
    }

    if (Auth.isLoggedInAs(this.props, "teacher")) {
      teacher = (
        <Link to="/teacher" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <MenuBookOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Teacher"} />
          </ListItem>
        </Link>
      );
    } else {
      teacher = null;
    }

    if (!Auth.isLoggedIn(this.props)) {
      warning = (
        <p align="center" style={{ fontSize: "1.75vw" }}>
          Please log in!
        </p>
      );
    } else {
      warning = null;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Link to="/" className={classes.link}>
              <Typography variant="h6" noWrap>
                Online Grade Book / {this.props.page}
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {warning}
            {student}
            {teacher}
          </List>
          {studentList}
          {teacherList}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default withGlobalState(withRouter(withStyles(styles)(Sidebar)));
