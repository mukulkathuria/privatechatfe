// eslint-disable-next-line object-curly-newline
import React, { FC, lazy, memo, MouseEvent, useCallback } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { AccDetails, Options } from './style/accountdetails.style';

const BackDropAcc = SuspenseLoader(
  lazy(() => import('./BackdropAcc/Backdropaccount'))
);

interface ImageOptionsProps {
  profile: string;
  handleOpen: () => void;
}

const ImageOptions: FC<ImageOptionsProps> = (props) => {
  const { profile } = props;
  const hideDetails = (): void => {
    const accountdetails = document.getElementById('imageOptions');
    if (accountdetails) {
      accountdetails.style.display = 'none';
    }
  };

  const handleUpload = (e: MouseEvent<HTMLDivElement>) => {
    const { handleOpen } = props;
    e.stopPropagation();
    hideDetails();
    handleOpen();
  };

  const hideAccountDetails = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    hideDetails();
  }, []);

  const backdropProps = {
    show: true,
    clicked: hideAccountDetails
  };

  const handleRemoveImage = async () => {
    const { appDispatch } = await import('src/Redux/store/store');
    const { showNotifications } = await import(
      'src/Redux/actions/notifications.actions'
    );
    const { NotificationAlerts } = await import(
      'src/Redux/dtos/notifications.dto'
    );
    try {
      const { updateUser } = await import('src/services/User/user.services');
      const { ADD_CHAT_IN_CHATBOX } = await import(
        'src/Redux/types/chat.reducer.type'
      );
      const query = {
        removeprofile: true
      };
      const payload = await updateUser(query);
      appDispatch({ type: ADD_CHAT_IN_CHATBOX, payload });
      appDispatch(
        showNotifications({ message: 'Successfully saved your name' })
      );
      hideDetails();
    } catch (error) {
      appDispatch(
        showNotifications({
          message: 'Some error occur',
          alert: NotificationAlerts.error
        })
      );
    }
  };

  return (
    <div id="imageOptions" style={{ display: 'none' }}>
      <BackDropAcc {...backdropProps} />
      <AccDetails>
        <Options onClick={handleUpload}>Update Image</Options>
        {profile ? (
          <Options onClick={handleRemoveImage}>Remove Image</Options>
        ) : null}
      </AccDetails>
    </div>
  );
};

const notRender = (
  prevProps: ImageOptionsProps,
  nextProps: ImageOptionsProps
) => {
  if (prevProps.profile !== nextProps.profile) {
    return false;
  }
  return true;
};

export default memo(ImageOptions, notRender);
