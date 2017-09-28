import * as React from "react";

import {AlertItem, AlertItemNumbers} from "../model";

import {AlertLogger, AlertService} from "../services";

// import {Observable} from "@reactivex/rxjs";

// import * as moment from "moment";

export interface IAlertDrawerProps {
    opened: boolean;
}

export interface IAlertDrawerState {
    alerts?: Array<AlertItem>;
}

export class AlertDrawer extends React.Component<IAlertDrawerProps, IAlertDrawerState> {
    constructor(props: any) {
        super(props);

        this.state = {
            alerts: []
        }
    }

    componentDidMount(): void {

    }

    componentWillReceiveProps (nextProps: IAlertDrawerProps) {
        if (nextProps.opened === true) {
            this.openDrawer.bind(this);
        }
    }

    render() {
        return <div className="uu-sp-ca-alerts-drawer">
                { this.state.alerts.map((alert, index) => {
                    return <div className="uu-sp-ca-alerts-item">
                             <span className="uu-sp-ca-alerts-item-title"> {alert.Title} </span>
                           </div>
                })}
               </div>;
    }

    openDrawer() {
        AlertService.getActiveAlerts()
            .subscribe((activeAlerts) => {
                this.setState({
                    alerts: activeAlerts
                })
            }, (error) => {
                AlertLogger.logError("Error getting active alerts", error);
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