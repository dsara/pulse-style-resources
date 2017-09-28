export class AlertItem {
    Title: string = "";
    AlertID: string = "";
    AlertType: string = "";
    AlertTypeTitle: string = "";
    AlertColor: string = "";
    AlertIcon: string = "";
    AlertRedirect: boolean = false;
    AlertRedirectUrl: string = "";
    AlertActive: boolean = true;
    AlertSiteName: string = "";
}

export class AlertItemNumbers {
    NumberOfAlerts: number = 0;
    UrgentAlerts: Array<AlertItem> = [];
}