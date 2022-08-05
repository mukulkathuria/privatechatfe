import {
  NotificationAlerts,
  notificationReducerDto
} from 'src/Redux/dtos/notifications.dto';

export const initialValue: notificationReducerDto = {
  message: '',
  alert: NotificationAlerts.success,
  timeOut: 2000,
  show: false
};
