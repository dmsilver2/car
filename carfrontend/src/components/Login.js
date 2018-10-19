import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CarList from './CarList';
import Snackbar from '@material-ui/core/Snackbar';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isAuthenticated: false,
            open: false
        };
    }

    logout = () => {
        sessionStorage.removeItem("jwt");
        this.setState({ isAuthenticated: false });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    login = () => {
        const user = { username: this.state.username, password: this.state.password };

        axios.post(SERVER_URL + 'login',
            {
                ...user
            })
            .then(res => {
                const jwtToken = res.headers.authorization;
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({ isAuthenticated: true });
                }
            })
            .catch(err => {
                this.setState({ open: true });
                console.log(err)
            });
    }

    handleClose = (event) => {
        this.setState({ open: false });
    }

    render() {
        if (this.state.isAuthenticated) {
            return <CarList />;
        } else {
            return (
                <div>
                    <TextField name="username" placeholder="Username"
                        onChange={this.handleChange} /><br />
                    <TextField type="password" name="password"
                        placeholder="Password"
                        onChange={this.handleChange} /><br /><br />
                    <Button variant="contained" color="primary"
                        onClick={this.login}>
                        Login
                    </Button>
                    <Snackbar
                        open={this.state.open} onClose={this.handleClose}
                        autoHideDuration={1500}
                        message='Check your username and password' />
                </div>
            );
        }
    }
}

export default Login;