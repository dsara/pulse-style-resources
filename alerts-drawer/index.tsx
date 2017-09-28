import * as React from "react";
import * as ReactDOM from "react-dom";

import {Alerts} from "./components";

import {AlertFields, AlertItem, AlertItemNumbers} from "./model";

require("./styles/alert-drawer.scss");

document.addEventListener("DOMContentLoaded", (event) => {
    var mountingPoints: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("uu-sp-custom-alerts") as HTMLCollectionOf<HTMLDivElement>;
    for (let i: number = 0; i < mountingPoints.length; i++) {
        ReactDOM.render(
            <Alerts/>,
            mountingPoints.item(i)
        );
    }
});