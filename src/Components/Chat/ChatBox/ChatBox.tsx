/* eslint-disable no-console */
// eslint-disable-next-line object-curly-newline
import React, { lazy, memo, useCallback, useEffect, useState, FC } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { useAppSelector } from 'src/Redux/store/store';
import { ChatBoxDiv } from './style/chatbox.style';

const ChatBoxHeader = SuspenseLoader(
  lazy(() => import('./Header/ChatBoxHeader'))
);

const SendBox = SuspenseLoader(lazy(() => import('./SendBox/SendBox')));
const Messages = SuspenseLoader(lazy(() => import('./Messages/Messages')));

interface ChatBoxProps {
  isMobile?: boolean;
}

const ChatBox: FC<ChatBoxProps> = memo((props: ChatBoxProps) => {
  const [messagedata, setMessageData] = useState<any | null>(null);
  const selected = useAppSelector((state) => state.chatReducer.selectedChat);
  const { username } = useAppSelector(
    (state) => state.chatReducer.userData.data
  );

  useEffect(() => {
    const initializeSocket = async () => {
      const { socketinit } = await import('src/Data/socket.io');
      const { appDispatch } = await import('src/Redux/store/store');
      const {
        default: { get }
      } = await import('js-cookie');
      const { getUserDetails } = await import(
        'src/services/User/user.services'
      );
      const { ACCESS_TOKEN_LOC } = await import(
        'src/Constants/common.constants'
      );
      const { toggleFriendOnline } = await import(
        'src/Redux/actions/chat.reducer.actions'
      );

      const verifyFriendOnline = (data: any) => {
        const selectedUser = data.users?.find(
          (l: any) => l.username === selected?.user?.username
        );
        appDispatch(toggleFriendOnline(Boolean(selectedUser?.isOnline)));
      };

      const socket = socketinit.socket();
      socket.on('joinedUser', (data) => {
        verifyFriendOnline(data);
        setMessageData(() => data);
      });

      socket.on('message', (data) => {
        verifyFriendOnline(data);
        setMessageData(() => data);
      });

      socket.on('leaveroom', (data) => {
        verifyFriendOnline(data);
        setMessageData(() => data);
      });

      socket.on('tokenexpired', async () => {
        await getUserDetails();
        const token = get(ACCESS_TOKEN_LOC);
        socketinit.addtoken(token || '');
        socket.emit('joinchatroom', {
          roomid: selected?.chatroomid,
          username
        });
      });

      socket.on('invalidUser', () => {
        const token = get(ACCESS_TOKEN_LOC);
        socketinit.addtoken(token || '');
      });

      socket.emit('joinchatroom', {
        roomid: selected?.chatroomid,
        username
      });
    };
    if (selected) {
      initializeSocket();
    }
    return () => {
      const deinitializeSocket = async () => {
        const { socketinit } = await import('src/Data/socket.io');
        const socket = socketinit.socket();
        socket.emit('leavechatroom', {
          roomid: selected?.chatroomid,
          username
        });
      };
      if (selected) {
        deinitializeSocket();
      }
    };
  }, [selected]);

  const sendMessage = useCallback(
    async (message) => {
      if (messagedata) {
        const { socketinit } = await import('src/Data/socket.io');
        const socket = socketinit.socket();
        socket.emit('sendMessage', {
          roomid: selected.chatroomid,
          username,
          message
        });
      }
    },
    [messagedata]
  );

  const messageProps = {
    messages: messagedata?.messages || []
  };

  const sendBoxProps = {
    sendMessage
  };

  const chatBoxHeaderProps = {
    isMobile: props.isMobile
  };
  return (
    <ChatBoxDiv>
      <ChatBoxHeader {...chatBoxHeaderProps} />
      <Messages {...messageProps} />
      <SendBox {...sendBoxProps} />
    </ChatBoxDiv>
  );
});

ChatBox.defaultProps = {
  isMobile: false
};

export default ChatBox;
