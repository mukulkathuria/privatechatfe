// eslint-disable-next-line object-curly-newline
import React, { memo, FC, useState, KeyboardEvent } from 'react';
import { Inputs, SuccesBtn } from './style/sendbox.style';

interface sendBoxProps {
  // eslint-disable-next-line no-unused-vars
  sendMessage: (message: string) => void;
}

const SendBox: FC<sendBoxProps> = memo((props: sendBoxProps) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (): void => {
    const { sendMessage } = props;
    sendMessage(message);
    setMessage('');
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter' && message.trim().length) {
      handleSubmit();
    }
  };

  return (
    <div role="button" onKeyDown={handleEnter} tabIndex={0}>
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
        ➜
      </SuccesBtn>
    </div>
  );
});
export default SendBox;
