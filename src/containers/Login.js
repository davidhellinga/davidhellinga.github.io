import React, {Component} from "react";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./Login.css";
import {cookieWrite} from "../components/CookieUtil"
import {validate} from "../components/ValidateToken";
import LoaderButton from "../components/LoaderButton";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
        ;
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };


    handleSubmit = async event => {

        event.preventDefault();

        this.setState({isLoading: true});

        await fetch("https://chrono-omega.herokuapp.com/api/login?mail=" + this.state.email + "&pw=" + this.state.password, {
            method: 'GET'
        }).then(result => {
            return result.text();
        }).then(data => {
            if (data !== "false") {
                cookieWrite("token", data);
            }
        });

        await validate().then(value => {
            this.setState({isAuthenticated: value})
        }).then(() => {
            this.setState({isLoading: false});
            if (this.state.isAuthenticated === true) {
                this.props.history.push("/");
            } else {
                alert("Login failed.")
            }
        });


    };

    render() {

        return (

            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in…"
                    />
                </form>
            </div>
        );
    }
}