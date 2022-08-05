import {
  NotificationAlerts,
  notificationReducerDto
} from '../dtos/notifications.dto';

export const checkNotification = (
  payload: any,
  state: notificationReducerDto
) => {
  if (!payload || !payload?.message) {
    return state;
  }
  let alert = payload.alert as string;
  if (!alert) {
    alert = NotificationAlerts.success;
  }
  if (alert in NotificationAlerts) {
    const key = alert as keyof typeof NotificationAlerts;
    return {
      ...state,
      alert: NotificationAlerts[key],
      message: payload.message as string,
      show: true
    };
  }
  return state;
};
