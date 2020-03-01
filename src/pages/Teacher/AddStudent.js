import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

export class AddStudent extends Component {
  state = {
    birthday: null,
    students: []
  };

  data = {
    gender: null,
    birthday: null,
    gender: null,
    birthday: null
  };

  submit = () => {
    this.data.firstName = document.getElementById('firstName').value;
    this.data.lastName = document.getElementById('lastName').value;

    console.log(this.data);

    axios.post('http://127.0.0.1:8090/api/student', this.data).then(
      res => {
        if (res.data.success) {
          console.log('Student successfully submitted!');
          this.getStudents();
        } else {
          console.log('Student cannot be submitted!');
        }
      },
      err => {
        console.error(err);
      }
    );
  };

  genderChange = event => {
    if (event.target.value == 'male') {
      this.data.gender = 'M';
    } else {
      this.data.gender = 'F';
    }
  };

  dateChange = date => {
    this.data.birthday = new Date(date).getTime();
    this.setState({ birthday: date });
    console.log(date);
  };

  render() {
    return (
      <Sidebar>
        <Container maxWidth='md'>
          <Grid container>
            <Grid item xs={12}>
              <p align='center' style={{ fontSize: '40px' }}>
                Add Student
              </p>
            </Grid>
            <Grid item xs={6} style={{ paddingRight: '16px' }}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                name='username'
                // autoComplete=""
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='username'
                // autoComplete=""
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  id='date-picker-dialog'
                  label='Pick Birthday'
                  format='MM/dd/yyyy'
                  value={this.state.birthday}
                  onChange={this.dateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FormLabel component='legend'>Gender</FormLabel>
              <RadioGroup
                aria-label='gender'
                name='gender1'
                // value={value}
                onChange={this.genderChange}
              >
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Male'
                />
              </RadioGroup>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button variant='contained' color='primary' onClick={this.submit}>
                Add Student
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Sidebar>
    );
  }
}

export default AddStudent;
