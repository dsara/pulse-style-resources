import {AlertFields, AlertItem, AlertItemNumbers} from "../model";

import {Observable} from "@reactivex/rxjs";


export class AlertService {
    static getActiveAlertNumbers() : Observable<AlertItemNumbers> {
        return Observable.ajax.get("/_vti_bin/UU.SP.Services.Alerts.svc/ActiveAlerts/Count", { "Accept": "application/json; odata=verbose"})
            .map((res) => {
                if (res.response) {
                    return res.response;
                }
                return new AlertItemNumbers();
            });
    }

    static getActiveAlerts() : Observable<Array<AlertItem>> {
        return Observable.ajax.get("/_vti_bin/UU.SP.Services.Alerts.svc/ActiveAlerts", { "Accept": "application/json; odata=verbose"})
            .map((res) => {
                if (res.response) {
                    return res.response;
                }
                return [];
            });
    }
}

export class AlertLogger {
    static debugLog(message: string, data: Object): void {
        if (localStorage.getItem("camode") === "debug") {
            console.log(message, data);
        }
    }

    static logError(message: string, data: Object): void {
        console.error(message, data);
    }
}