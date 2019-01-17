import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import {cookieRead} from "./CookieUtil";
import React, {Component} from "react";


export default class NewTimeline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            isLoading: false
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    NewTimelineForm() {
        return (
            <form onSubmit={this.newTimeline}>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>New Timeline Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateNewTimeline()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Create new timeline"
                    loadingText="Booming bigly..."
                />
            </form>
        )
    }

    newTimeline = async event => {

        event.preventDefault();

        this.setState({isLoading: true});

        await fetch("https://chrono-omega.herokuapp.com/api/newtimeline?token=" + cookieRead("token") + "&name=" + this.state.name, {
            method: 'POST'
        }).then(result => {
            return result.text();
        }).then(data => {
            if (data !== "true") {
                alert("Timeline creation failed.")
            } else{
            }
        });

        this.setState({isLoading: false});
    };

    validateNewTimeline() {
        return (
            this.state.name.length > 0
        );
    }

    render() {
        return (
            <div>
                {this.NewTimelineForm()}
            </div>
        );
    }
}