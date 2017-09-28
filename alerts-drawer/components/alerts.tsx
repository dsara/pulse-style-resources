import * as React from "react";

import {AlertItem, AlertItemNumbers} from "../model";

import {AlertLogger, AlertService} from "../services";

import {AlertDrawer, AlertUrgent} from "../components";

// import {Observable} from "@reactivex/rxjs";

// import * as moment from "moment";

export interface IAlertsProps {
}

export interface IAlertsState {
    alertsNumber?: number;
    alertsUrgent?: Array<AlertItem>;
    drawerOpened?: boolean
}

export class Alerts extends React.Component<any, IAlertsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            alertsNumber: 0,
            alertsUrgent: [],
            drawerOpened: false
        };
    }

    componentDidMount(): void {
        AlertService.getActiveAlertNumbers()
            .subscribe((alertNumbers) => {
                this.setState({
                    alertsNumber: alertNumbers.NumberOfAlerts,
                    alertsUrgent: alertNumbers.UrgentAlerts
                })
            }, (error) => {
                AlertLogger.logError("Error getting alert numbers", error);
            });
    }

    render() {
        return <div className="uu-sp-alerts">
                    <span className="uu-sp-alerts-icon" onClick={this.openDrawer.bind(this)}> {this.state.alertsNumber} </span>
                    <AlertDrawer opened={this.state.drawerOpened} />
                    <AlertUrgent urgentAlerts={this.state.alertsUrgent} />
               </div>
    }

    openDrawer() {
        this.setState({
            drawerOpened: true
        });
    }

    // validWopiFrame(ext: string): string {
    //     if (Extensions.ValidExtensions.indexOf(ext) !== -1) {
    //         return "?Web=1";
    //     } else {
    //         return "";
    //     }
    // }

    // skipForward(): void {
    //     if (this.state.skip + this.props.numberOfResultsPerPage < this.state.dcItems.length) {
    //         this.setState({ skip: (this.state.skip + this.props.numberOfResultsPerPage) });
    //     }
    // }

    // goBack(): void {
    //     if (this.state.skip !== 0) {
    //         this.setState({ skip: (this.state.skip - this.props.numberOfResultsPerPage) });
    //     }
    // }
}