import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { rootStateDto } from 'src/Redux/dtos/rootState.dto';
import {
  MainMessage,
  GroupDiv,
  // UserDiv,
  MessageDiv
} from './style/singlemessage.style';

interface Message {
  senderUsername: string;
  message: string;
}
interface Props {
  message: Message;
  currentusername: string | undefined;
}

class SingleMessage extends PureComponent<Props> {
  render(): React.ReactNode {
    const {
      message: { senderUsername, message },
      currentusername
    } = this.props;

    const currentUser = senderUsername === currentusername;
    return (
      <MainMessage user={currentUser}>
        <GroupDiv user={currentUser}>
          {/* <UserDiv>{username}</UserDiv> */}
          <MessageDiv>
            <div className="msg">{message}</div>
          </MessageDiv>
        </GroupDiv>
      </MainMessage>
    );
  }
}

const mapToState = (state: rootStateDto) => ({
  currentusername: state.chatReducer.userData.data?.username
});

export default connect(mapToState)(SingleMessage);
