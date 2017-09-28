import * as React from "react";

import {AlertItem, AlertItemNumbers} from "../model";

import {AlertLogger, AlertService} from "../services";

// import {Observable} from "@reactivex/rxjs";

// import * as moment from "moment";

export interface IAlertUrgentProps {
    urgentAlerts: Array<AlertItem>
}

export interface IAlertUrgentState {
    alerts?: Array<AlertItem>;
    alertsNumber?: number;
    alertsUrgent?: Array<AlertItem>;
}

export class AlertUrgent extends React.Component<IAlertUrgentProps, IAlertUrgentState> {
    constructor(props: IAlertUrgentProps) {
        super(props);
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
        return <div className="uu-sp-ca-urgent">
                { this.props.urgentAlerts.map((urgentItem, index) => {
                    return <div className="uu-sp-ca-urgent-item">
                             <span className="uu-sp-ca-urgent-item-title"> {urgentItem.Title} </span>
                           </div>
                })}
               </div>;

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