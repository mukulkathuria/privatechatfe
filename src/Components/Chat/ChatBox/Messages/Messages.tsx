/* eslint-disable operator-linebreak */
import React, { PureComponent, UIEvent } from 'react';
import { MessagesMainDiv } from './style/messages.style';
import SingleMessage from './SingleMessage/SingleMessage';

interface Messag {
  senderUsername: string;
  message: string;
  createdAt: string;
  isFile: boolean;
  filePath: string;
}
interface Props {
  messages: Messag[];
}

interface ComponentState {
  messagechat: Messag[];
  currentPage: number;
}

class MessageBox extends PureComponent<Props, ComponentState> {
  myRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    const { messages } = this.props;
    this.state = {
      messagechat: messages.slice(-30),
      currentPage: 1
    };
    this.myRef = React.createRef<HTMLDivElement>();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.myRef.current?.scrollTo(0, this.myRef.current.scrollHeight);
  }

  componentDidUpdate(prevProps: Props) {
    const { messages } = this.props;
    if (messages !== prevProps.messages) {
      this.setState({ messagechat: messages.slice(-30), currentPage: 1 });
      setTimeout(() => {
        this.myRef.current?.scrollTo(0, this.myRef.current.scrollHeight);
      }, 100);
    }
  }

  handleScroll(e: UIEvent<HTMLDivElement>) {
    const { currentPage, messagechat } = this.state;
    const { messages } = this.props;
    if (
      e.currentTarget.scrollTop < 100 &&
      messages.length > messagechat.length
    ) {
      const sliced = 0 - currentPage * 30;
      this.setState({
        messagechat: messages.slice(sliced),
        currentPage: currentPage + 1
      });
    }
  }

  render(): React.ReactNode {
    const { messagechat } = this.state;
    return (
      <MessagesMainDiv ref={this.myRef} onScroll={this.handleScroll}>
        {messagechat.map((list) => {
          return <SingleMessage key={list.createdAt} message={list} />;
        })}
      </MessagesMainDiv>
    );
  }
}
export default MessageBox;
