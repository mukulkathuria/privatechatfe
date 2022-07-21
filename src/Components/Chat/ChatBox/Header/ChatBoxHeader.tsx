import React, { PureComponent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { rootStateDto } from 'src/Redux/dtos/rootState.dto';
import {
  ChatHeaderDiv,
  UserDetailsDiv,
  BackButtonDiv,
  UserOnline
} from './style/chatboxheader.style';

const BackButton = require('src/assets/backbutton.png').default;

interface UserDetails {
  name: string;
}

interface selectedDto {
  user: UserDetails;
}

interface chatHeaderprops {
  selected: selectedDto | null;
  isFriendOnline: boolean;
  isMobile: boolean;
}

class ChatBoxHeader extends PureComponent<chatHeaderprops> {
  async handleBack() {
    const { appDispatch } = await import('src/Redux/store/store');
    const { selectChatContact } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    appDispatch(selectChatContact(null));
  }

  render(): ReactNode {
    const { selected, isFriendOnline, isMobile } = this.props;
    return (
      <ChatHeaderDiv>
        <div>
          <UserDetailsDiv>
            {isMobile && (
              <BackButtonDiv onClick={this.handleBack}>
                <img src={BackButton} alt="backbutton" />
              </BackButtonDiv>
            )}
            <UserOnline>
              <div>{selected?.user?.name}</div>
              <div>{isFriendOnline ? 'Online' : 'Offline'}</div>
            </UserOnline>
          </UserDetailsDiv>
        </div>
      </ChatHeaderDiv>
    );
  }
}

const mapStatetoprops = (state: rootStateDto) => ({
  selected: state.chatReducer.selectedChat,
  isFriendOnline: state.chatReducer.isFriendOnline
});

export default connect(mapStatetoprops)(ChatBoxHeader);
