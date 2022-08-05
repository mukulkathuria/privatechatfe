// eslint-disable-next-line no-shadow
export enum NotificationAlerts {
  success = 'success',
  error = 'error',
  warning = 'warning'
}

export type notificationReducerDto = {
  message: string;
  alert: NotificationAlerts;
  timeOut: number;
  show: boolean;
};

export type notificationParams = {
  message: string;
  alert?: NotificationAlerts;
  timeOut?: number;
};
