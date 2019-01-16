import {Component} from "react";
import {cookieRead} from "./CookieUtil";
import ReactJson from 'react-json-view'

import React from "react";


export default class TimelineList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jsonObject: "",
            isLoading: false
        };
    }

    componentDidMount() {
        this.fetchTimelines()
    }


    fetchTimelines = async event => {

        await fetch("https://chrono-omega.herokuapp.com/api/timelines?token=" + cookieRead("token"), {
            method: 'GET'

        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Something went wrong")
            }
        }).then(data => {
            this.setState({jsonObject: data})
        });
    };

    static getTrue(){return true}


    render() {
        return (
            <div>
                <ReactJson src={this.state.jsonObject} name="Timelines" theme="grayscale:inverted" onEdit={TimelineList.getTrue()} onAdd={TimelineList.getTrue()} onDelete={TimelineList.getTrue()} sortKeys={true}/>
            </div>
        );
    }
}