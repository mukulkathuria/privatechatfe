import { actionDto } from 'src/Redux/dtos/common.filter.dto';
import { NotificationAlerts } from 'src/Redux/dtos/notifications.dto';
import {
  REMOVE_NOTIFICATION,
  SHOW_NOTIFICATION
} from 'src/Redux/types/notification.reducer.type';
import { checkNotification } from 'src/Redux/utils/notification.utils';
import { initialValue } from './notificationReducer.initialValue';

const notificationReducer = (state = initialValue, action: actionDto) => {
  const { payload, type } = action;

  switch (type) {
    case SHOW_NOTIFICATION:
      return {
        ...checkNotification(payload, state)
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        alert: NotificationAlerts.success,
        message: '',
        show: false
      };

    default:
      return state;
  }
};

export default notificationReducer;
