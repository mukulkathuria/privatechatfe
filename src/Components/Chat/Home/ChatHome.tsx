// eslint-disable-next-line object-curly-newline
import React, { lazy, memo, MemoExoticComponent } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { useAppSelector } from 'src/Redux/store/store';
import cookie from 'js-cookie';
import {
  ChatHomeDiv,
  ChatHomeLeftDiv,
  ChatHomeRightDiv
} from './style/chathome.style';

const ChatImage = require('src/assets/chatroombg.jpg').default;

const ChatContacts = SuspenseLoader(
  lazy(() => import('../ChatContacts/ChatContacts'))
);

const ChatBox = SuspenseLoader(lazy(() => import('../ChatBox/ChatBox')));

const ChatBoxHome: MemoExoticComponent<() => JSX.Element> = memo(
  () => {
    const selected = useAppSelector((state) => state.chatReducer.selectedChat);
    const currentStep = useAppSelector(
      (state) => state.chatReducer.currentStep
    );

    const isMobile = cookie.get('isMobile');

    const chatBoxMobileProps = {
      isMobile: true
    };

    return isMobile === 'true' ? (
      <ChatHomeDiv>
        {currentStep === 0 ? (
          <ChatHomeLeftDiv isMobile>
            <ChatContacts />
          </ChatHomeLeftDiv>
        ) : (
          <ChatHomeRightDiv isMobile>
            {selected ? (
              <ChatBox {...chatBoxMobileProps} />
            ) : (
              <div>
                <img src={ChatImage} alt="" />
              </div>
            )}
          </ChatHomeRightDiv>
        )}
      </ChatHomeDiv>
    ) : (
      <ChatHomeDiv>
        <ChatHomeLeftDiv>
          <ChatContacts />
        </ChatHomeLeftDiv>
        <ChatHomeRightDiv>
          {selected ? (
            <ChatBox />
          ) : (
            <div>
              <img src={ChatImage} alt="" />
            </div>
          )}
        </ChatHomeRightDiv>
      </ChatHomeDiv>
    );
  },
  () => true
);

export default ChatBoxHome;
