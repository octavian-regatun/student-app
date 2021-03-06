import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import axios from 'axios';
import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({});

const Grade = {
  subject: '',
  grades: [],
  thesis: null
};

const styles = theme => ({});

export class Teacher extends Component {
  state = {
    birthday: null,
    students: [],
    selectedSubject: null,
    selectedStudent: null,
    age: null,
    grades: []
  };

  subjects = ['Math', 'Romanian', 'Physics', 'Chemistry', 'Biology'];

  async getStudents() {
    await axios.get('http://127.0.0.1:8090/api/students').then(res => {
      this.setState({ students: res.data.students });
    });
  }

  async getStudent(firstName, lastName) {
    return await axios
      .get('http://127.0.0.1:8090/api/student', {
        params: { firstName: firstName, lastName: lastName }
      })
      .then(async res => {
        this.setState({ selectedStudent: res.data.student });
        return res.data.student;
      });
  }

  getStudentId(name) {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    for (const student of this.state.students) {
      if (student.firstName == firstName && student.lastName == lastName) {
        return student._id;
      }
    }
    return 'invalid name';
  }

  onClickTable = (event, field) => {
    if (this.state.selectedStudent && field == 'student') {
      this.state.selectedStudent.style.color = 'black';
    } else if (this.state.selectedSubject && field == 'subject') {
      this.state.selectedSubject.style.color = 'black';
    }

    if (field == 'student') {
      event.target.style.color = 'blue';
      this.setState({ selectedStudent: event.target });
    } else if (field == 'subject') {
      this.setState({ selectedSubject: event.target });
      event.target.style.color = 'red';
    }
  };

  clearOnClick = () => {
    if (this.state.selectedStudent) {
      let selectedStudentDOM = this.state.selectedStudent;
      selectedStudentDOM.style.color = 'black';
      this.setState({ selectedStudent: selectedStudentDOM });
    }
    if (this.state.selectedSubject) {
      let selectedSubjectDOM = this.state.selectedSubject;
      selectedSubjectDOM.style.color = 'black';
      this.setState({ selectedSubject: selectedSubjectDOM });
    }
  };

  async getGrades(studentId) {
    return await axios
      .get(`http://127.0.0.1:8090/api/grades/` + studentId)
      .then(
        response => {
          return response.data.grades;
        },
        error => {
          if (error) {
            console.error(error);
          }
        }
      );
  }

  async postGrades(studentId, grades) {
    return await axios
      .post(`http://127.0.0.1:8090/api/grades/` + studentId, grades)
      .then(
        response => {
          return response.data;
        },
        error => {
          if (error) {
            console.error(error);
          }
        }
      );
  }

  changeValueSelect(value, idDOM) {
    let selectDOM = document.getElementById(idDOM);
    selectDOM.value = value;
  }

  async componentDidMount() {
    await this.getStudents();

    let grades;

    // maybe unnecessary if
    if (this.state.students.length > 0) {
      grades = this.state.students.map(student => ({
        student: student.firstName + ' ' + student.lastName,
        subjects: []
      }));

      for (const grade of grades) {
        for (const subject of this.subjects) {
          grade.subjects.push({ subject: subject, grades: [], thesis: null });
        }
      }
    }

    this.setState({ grades: grades });

    for (const grades of this.state.grades) {
      const student = grades.student;
      const id = this.getStudentId(student);

      const response = await this.getGrades(id);
      const responseGrades = response.grades;

      if (
        responseGrades == undefined ||
        (Array.isArray(responseGrades) && responseGrades.length == 0)
      ) {
        console.log(grades.subjects);
        console.log(await this.postGrades(id, grades.subjects));
      }
    }

    for (const grades of this.state.grades) {
      const student = grades.student;
      const id = this.getStudentId(student);

      const response = await this.getGrades(id);
      const responseGrades = response.grades;

      grades.subjects = responseGrades;
    }

    this.setState({ grades: grades });
  }

  componentDidUpdate() {
    if (this.state.selectedStudent) {
      console.log(this.state.selectedStudent.innerHTML);

      this.changeValueSelect(
        this.state.selectedStudent.innerHTML,
        'selectStudent'
      );
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Sidebar page='Teacher'>
          <TableContainer component={Paper}>
            <Table aria-label='spanning table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center' colSpan={1}></TableCell>
                  {this.subjects.map(subject => {
                    return (
                      <TableCell
                        key={subject}
                        align='center'
                        colSpan={2}
                        onClick={event => this.onClickTable(event, 'subject')}
                      >
                        {subject}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell align='center'></TableCell>
                  {this.subjects.map((subject, index) => {
                    return (
                      <React.Fragment key={index}>
                        <TableCell align='center'>Absences</TableCell>
                        <TableCell align='center'>Grades</TableCell>
                      </React.Fragment>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.grades.map(grade => {
                  return (
                    <TableRow key={grade.student}>
                      <TableCell
                        onClick={event => this.onClickTable(event, 'student')}
                      >
                        {grade.student}
                      </TableCell>
                      {grade.subjects.map((subject, index) => {
                        return (
                          <React.Fragment key={index}>
                            <TableCell align='center'>empty</TableCell>
                            <TableCell align='center'>
                              {(() => {
                                let gradesString = subject.grades.toString();
                                return gradesString.replace(/,/g, ', ');
                              })()}
                            </TableCell>
                          </React.Fragment>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '32px'
              }}
            >
              <Button
                variant='contained'
                color='primary'
                onClick={this.clearOnClick}
              >
                Clear
              </Button>
            </Grid>
          </Grid>

          <Container maxWidth='md'>
            <Grid container>
              <Grid item xs={12}>
                <p align='center' style={{ fontSize: '40px' }}>
                  Add Grades / Absences
                </p>
              </Grid>
              <Grid item xs={6} style={{ paddingRight: '16px' }}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel
                    variant='outlined'
                    id='demo-simple-select-autowidth-label'
                  >
                    Student
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='selectStudent'
                    // value=
                    // onChange={}
                    autoWidth
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {this.state.grades.map((grade, index) => {
                      return (
                        <MenuItem value={grade.student} key={index}>
                          {grade.student}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl style={{ width: '100%' }}>
                  <InputLabel
                    variant='outlined'
                    id='demo-simple-select-autowidth-label'
                  >
                    Subject
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='selectSubject'
                    // value=
                    // onChange={}
                    autoWidth
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {this.subjects.map((subject, index) => {
                      return (
                        <MenuItem value={subject} key={index}>
                          {subject}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '32px'
                }}
              >
                <FormControl style={{ width: '150px' }}>
                  <InputLabel
                    variant='outlined'
                    id='demo-simple-select-autowidth-label'
                  >
                    Type
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='selectType'
                    // value=
                    // onChange={}
                    autoWidth
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Absences</MenuItem>
                    <MenuItem value={2}>Grades</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '32px'
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={this.submit}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Sidebar>
      </div>
    );
  }
}

export default withStyles(styles)(Teacher);
