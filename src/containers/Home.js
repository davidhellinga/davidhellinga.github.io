import {Component} from "react";

import React from "react";
import NewTimeline from "../components/NewTimeline";
import TimelineList from "../components/TimelineList";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            isLoading: false
        };
    }

    render() {

        return (<div className="Home">
            <NewTimeline props={this.props}/>
            <TimelineList props={this.props}/>
        </div>)
    }
}

