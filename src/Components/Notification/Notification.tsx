import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  NotificationAlerts,
  notificationReducerDto
} from 'src/Redux/dtos/notifications.dto';
import { rootStateDto } from 'src/Redux/dtos/rootState.dto';
import { CloseButton, NotificationDiv } from './style/notification.style';

interface NotificationProps {
  notification: notificationReducerDto;
}

class Notifications extends PureComponent<NotificationProps> {
  render(): React.ReactNode {
    const {
      notification: { show, message, alert }
    } = this.props;

    return show ? (
      <NotificationDiv alert={alert}>
        <CloseButton>&times;</CloseButton>
        {(() => {
          switch (alert) {
            case NotificationAlerts.error:
              return <strong>Error! </strong>;

            case NotificationAlerts.warning:
              return <strong>Warning! </strong>;

            case NotificationAlerts.success:
              return <strong>Sucess! </strong>;

            default:
              return null;
          }
        })()}
        {message}
      </NotificationDiv>
    ) : null;
  }
}

const mapToState = (state: rootStateDto) => ({
  notification: state.notificationReducer
});

export default connect(mapToState)(Notifications);
