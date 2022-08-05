import { NotificationAlerts } from 'src/Redux/dtos/notifications.dto';
import styled from 'styled-components';

interface notificationStyleProps {
  alert: NotificationAlerts;
}

const getAlertColors = (alert: NotificationAlerts) => {
  switch (alert) {
    case NotificationAlerts.success:
      return 'green';

    case NotificationAlerts.error:
      return 'red';

    case NotificationAlerts.warning:
      return 'orange';

    default:
      return 'green';
  }
};

export const NotificationDiv = styled.div<notificationStyleProps>`
  padding: 20px;
  background-color: ${(props) => getAlertColors(props.alert)};
  color: white;
  position: fixed;
  bottom: 2px;
  z-index: 9999;
  max-width: 100%;
  left: 2px;
  right: 2px;
`;

export const CloseButton = styled.div`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
`;
