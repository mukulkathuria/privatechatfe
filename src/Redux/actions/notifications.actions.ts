/* eslint-disable operator-linebreak */
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
  NotificationAlerts,
  notificationParams
} from '../dtos/notifications.dto';

export const showNotifications = (params: notificationParams) => {
  const { message } = params;
  if (!message) {
    throw new Error('Message is required');
  }
  const alert =
    params?.alert && params?.alert in NotificationAlerts
      ? params.alert
      : NotificationAlerts.success;

  const timeOut =
    params.timeOut && typeof params.timeOut === 'number'
      ? params.timeOut
      : 2000;
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const { SHOW_NOTIFICATION, REMOVE_NOTIFICATION } = await import(
      '../types/notification.reducer.type'
    );
    const payload = { type: SHOW_NOTIFICATION, payload: { message, alert } };
    dispatch(payload);
    setTimeout(() => {
      dispatch({ type: REMOVE_NOTIFICATION });
    }, timeOut);
  };
};

export const removeNotifications = () => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    const { REMOVE_NOTIFICATION } = await import(
      '../types/notification.reducer.type'
    );
    dispatch({ type: REMOVE_NOTIFICATION });
  };
};
