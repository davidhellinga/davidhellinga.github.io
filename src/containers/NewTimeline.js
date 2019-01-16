import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewNote.css";
import {cookieWrite} from "../components/CookieUtil";
import {validate} from "../components/ValidateToken";

export default class NewTimeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            name: ""
        };
    }

    validateForm() {
        return this.state.name.length > 0
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
            //
            this.state.userHasAuthenticated(value);
            console.log(this.state.isAuthenticated)
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