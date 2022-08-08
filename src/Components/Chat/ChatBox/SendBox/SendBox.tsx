// eslint-disable-next-line object-curly-newline
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

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { sendFile } = props;
    const files = e.target?.files;
    if (files) {
      const file = files[0];
      sendFile(file);
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
    if (e.key === 'Enter' && message.trim().length) {
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
        type="text"
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
