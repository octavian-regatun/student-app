import React, { Component } from "react";

import { createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Sidebar from "../../components/Sidebar";

const theme = createMuiTheme({});

const styles = theme => ({
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  table: {
    minWidth: 500
  }
});

function createData(subject, grades, thesis) {
  return { subject, grades, thesis };
}

function gradesToString(grades) {
  let gradesString;
  for (let i = 0; i < grades.length; i++) {
    if (i == 0) {
      gradesString = `${grades[i]}, `;
    } else if (i == grades.length - 1) {
      gradesString = `${gradesString}${grades[i]}`;
    } else {
      gradesString = `${gradesString}${grades[i]}, `;
    }
  }
  return gradesString;
}

function calculateAverageGrades(grades) {
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    sum += grades[i];
  }
  return String(sum / grades.length);
}

const rows = [createData("Math", [10, 9, 8, 10], 9)];

export class Grades extends Component {
  state = {
    rows: []
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Sidebar page="Grades">
          <Container>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Subject</b>
                    </TableCell>
                    <TableCell align="right">Grades</TableCell>
                    <TableCell align="right">Thesis</TableCell>
                    <TableCell align="right">Average</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.subject}>
                      <TableCell component="th" scope="row">
                        {row.subject}
                      </TableCell>
                      <TableCell align="right">
                        {gradesToString(row.grades)}
                      </TableCell>
                      <TableCell align="right">{row.thesis}</TableCell>
                      <TableCell align="right">
                        {calculateAverageGrades(row.grades)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Sidebar>
      </div>
    );
  }
}

export default withStyles(styles)(Grades);
