import React, {Component} from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import {cookieRead} from "../components/CookieUtil";

export default class NewTimeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
        };
    }

    validateForm() {
        return (
            this.state.name.length > 0
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = async event => {

        event.preventDefault();

        this.setState({isLoading: true});

        await fetch("https://chrono-omega.herokuapp.com/api/newtimeline?token=" + cookieRead("token") + "&name=" + this.state.name, {
            method: 'POST'
        }).then(result => {
            return result.text();
        }).then(data => {
            if (data === "false") {
                alert("Account creation failed.")
            } else {
                this.props.history.push("/");
            }
        });
    }
    ;

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Signup"
                    loadingText="Signing up…"
                />
            </form>
        );
    }

    render() {
        return (
            <div className="Signup">
                {/*{this.state.newUser === false*/}
                {/*? this.renderForm()*/}
                {/*: this.renderConfirmationForm()}*/}
                {this.renderForm()}
            </div>
        );
    }
}