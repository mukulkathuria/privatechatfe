import React, {
  memo,
  FC,
  useState,
  KeyboardEvent,
  useRef,
  ChangeEvent
} from 'react';
import {
  AttachmentBtn,
  Inputs,
  SendBoxDiv,
  SuccesBtn
} from './style/sendbox.style';

const AttachmentImg = require('src/assets/attachment.png').default;
const SendImg = require('src/assets/compass.png').default;

interface sendBoxProps {
  // eslint-disable-next-line no-unused-vars
  sendMessage: (message: string) => void;
  sendFile: (file: File) => void;
}

const SendBox: FC<sendBoxProps> = memo((props: sendBoxProps) => {
  const [message, setMessage] = useState<string>('');
  const imageUploader = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const { appDispatch } = await import('src/Redux/store/store');
    const { showNotifications } = await import(
      'src/Redux/actions/notifications.actions'
    );
    const { NotificationAlerts } = await import(
      'src/Redux/dtos/notifications.dto'
    );
    const { isValidPhoto } = await import('src/utils/validations');
    const { sendFile } = props;
    const files = e.target?.files;
    if (files) {
      const file = files[0];
      const { error } = isValidPhoto(file);
      if (error) {
        appDispatch(
          showNotifications({
            message: error,
            alert: NotificationAlerts.error
          })
        );
      } else if (file.size / 1024 / 1024 > 2) {
        appDispatch(
          showNotifications({
            message: 'File size cant be larger than 2mb',
            alert: NotificationAlerts.error
          })
        );
      } else {
        sendFile(file);
      }
    }
  };

  const handleSubmit = (): void => {
    const { sendMessage } = props;
    sendMessage(message);
    setMessage('');
  };

  const handleInputClick = () => {
    if (imageUploader.current) {
      imageUploader.current.value = '';
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim().length) {
      handleSubmit();
    }
  };

  return (
    <SendBoxDiv role="button" onKeyDown={handleEnter} tabIndex={0}>
      <AttachmentBtn>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          onClick={handleInputClick}
          style={{
            display: 'none'
          }}
        />
        <button
          type="button"
          onClick={() => imageUploader.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <img src={AttachmentImg} alt="" />
        </button>
      </AttachmentBtn>
      <Inputs
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder="Type a Message"
      />
      <SuccesBtn
        type="button"
        disabled={message.trim().length === 0}
        onClick={handleSubmit}
      >
        <img src={SendImg} alt="" />
      </SuccesBtn>
    </SendBoxDiv>
  );
});
export default SendBox;
