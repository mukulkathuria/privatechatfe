// eslint-disable-next-line object-curly-newline
import React, { FC, lazy, memo, useCallback } from 'react';
import Cookies from 'js-cookie';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import Userimage from '../UserImage/UserImage';
import { ModelWrapper } from './style/photomodel.style';

const Modal = SuspenseLoader(lazy(() => import('src/Components/Modal/Modal')));

interface PhotoModelProps {
  handleCloseModel: () => void;
}

const PhotoModel: FC<PhotoModelProps> = (props) => {
  const isMobile = Cookies.get('isMobile');

  const handleClose = useCallback(async () => {
    const { handleCloseModel } = props;
    handleCloseModel();
  }, []);

  const handleSave = async (basestr: string) => {
    const { appDispatch } = await import('src/Redux/store/store');
    const { showNotifications } = await import(
      'src/Redux/actions/notifications.actions'
    );
    const { NotificationAlerts } = await import(
      'src/Redux/dtos/notifications.dto'
    );
    try {
      const { convertFile } = await import('src/utils/common.utils');
      const file = await convertFile(basestr, 'image.png');
      if (file.size / 1024 / 1024 > 2) {
        appDispatch(
          showNotifications({
            message: 'File size exceed',
            alert: NotificationAlerts.error
          })
        );
      } else {
        const { updateUser } = await import('src/services/User/user.services');
        const { ADD_CHAT_IN_CHATBOX } = await import(
          'src/Redux/types/chat.reducer.type'
        );
        const query = {
          updateprofile: true
        };
        const payload = await updateUser(query, file);
        await handleClose();
        appDispatch({ type: ADD_CHAT_IN_CHATBOX, payload });
        appDispatch(
          showNotifications({
            message: 'Successfully changed the profile',
            alert: NotificationAlerts.success,
            timeOut: 5000
          })
        );
      }
    } catch (error) {
      const { getErrorMsg } = await import('src/utils/errorhandle');
      appDispatch(
        showNotifications({
          message: getErrorMsg(error),
          alert: NotificationAlerts.error
        })
      );
    }
  };

  const modalProps = {
    show: true,
    modalClose: handleClose
  };

  return (
    <Modal {...modalProps}>
      <ModelWrapper isMobile={isMobile === 'true'}>
        <Userimage
          handleClose={handleClose}
          isMobile={isMobile === 'true'}
          handleSave={handleSave}
        />
      </ModelWrapper>
    </Modal>
  );
};

export default memo(PhotoModel, () => true);
