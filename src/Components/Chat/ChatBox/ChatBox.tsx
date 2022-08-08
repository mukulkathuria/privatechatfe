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
        default: { get, set, remove }
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
      const sendData = {
        roomid: selected?.chatroomid,
        username
      };

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
        const lastEmit = JSON.parse(get('lastEmit') || '{}');
        if (lastEmit && Object.keys(lastEmit).length) {
          Object.keys(lastEmit).forEach((l: string) => {
            socket.emit(l, lastEmit[l]);
            remove('lastEmit');
          });
        }
      });

      socket.on('invalidUser', () => {
        const token = get(ACCESS_TOKEN_LOC);
        if (token) {
          socketinit.addtoken(token || '');
          const lastEmit = JSON.parse(get('lastEmit') || '{}');
          if (lastEmit && Object.keys(lastEmit).length) {
            Object.keys(lastEmit).forEach((l: string) => {
              socket.emit(l, lastEmit[l]);
              remove('lastEmit');
            });
          }
        }
      });

      socket.emit('joinchatroom', sendData);
      set(
        'lastEmit',
        JSON.stringify({
          joinchatroom: sendData
        }),
        { expires: 1 / 288 }
      );
    };
    if (selected) {
      initializeSocket();
    }
    return () => {
      const deinitializeSocket = async () => {
        const { socketinit } = await import('src/Data/socket.io');
        const {
          default: { set }
        } = await import('js-cookie');
        const socket = socketinit.socket();
        socket.emit('leavechatroom', {
          roomid: selected?.chatroomid,
          username
        });
        set(
          'lastEmit',
          JSON.stringify({
            leavechatroom: { roomid: selected?.chatroomid, username }
          }),
          { expires: 1 / 288 }
        );
      };
      if (selected) {
        deinitializeSocket();
      }
    };
  }, [selected]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (messagedata) {
        const { socketinit } = await import('src/Data/socket.io');
        const {
          default: { set }
        } = await import('js-cookie');
        const socket = socketinit.socket();
        socket.emit('sendMessage', {
          roomid: selected.chatroomid,
          username,
          message
        });
        set(
          'lastEmit',
          JSON.stringify({
            sendMessage: { roomid: selected.chatroomid, username, message }
          }),
          { expires: 1 / 288 }
        );
      }
    },
    [messagedata]
  );

  const sendFile = useCallback(async (file: File) => {
    const { socketinit } = await import('src/Data/socket.io');
    const socket = socketinit.socket();
    socket.emit('sendFile', {
      roomid: selected.chatroomid,
      username,
      file,
      mimeType: file.type
    });
    // eslint-disable-next-line no-console
    console.log(file);
  }, []);

  const messageProps = {
    messages: messagedata?.messages || []
  };

  const sendBoxProps = {
    sendMessage,
    sendFile
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
