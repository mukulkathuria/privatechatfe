import React, { PureComponent } from 'react';
import { MessagesMainDiv } from './style/messages.style';
import SingleMessage from './SingleMessage/SingleMessage';

interface Messag {
  senderUsername: string;
  message: string;
  createdAt: string;
}
interface Props {
  messages: Messag[];
}

class MessageBox extends PureComponent<Props> {
  myRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef<HTMLDivElement>();
  }

  componentDidUpdate() {
    this.myRef.current?.scrollTo(0, this.myRef.current.scrollHeight);
  }

  render(): React.ReactNode {
    const { messages } = this.props;
    return (
      <MessagesMainDiv ref={this.myRef}>
        {messages.map((list) => {
          return <SingleMessage key={list.createdAt} message={list} />;
        })}
      </MessagesMainDiv>
    );
  }
}
export default MessageBox;
