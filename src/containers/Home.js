import {Component} from "react";
import LoaderButton from "./Signup";
import React from "react";

// function sortByElement(element) {
//     let sortOrder = 1;
//
//     // Sort decending if property is negative
//     if (element[0] === "-") {
//         sortOrder = -1;
//         element = element.substr(1);
//     }
//
//     return function (a, b) {
//         if (sortOrder === -1) {
//             return b[element].localeCompare(a[element]);
//         } else {
//             return a[element].localeCompare(b[element]);
//         }
//     }
// }

export default class extends Component {
    state = {}

    render() {
        return (<LoaderButton
        />)
    }
}