import React, { lazy, PureComponent, ReactNode } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';

const ChatBoxHome = SuspenseLoader(
  lazy(() => import('src/Components/Chat/Home/ChatHome'))
);

export default class ChatBoxPage extends PureComponent {
  async componentDidMount() {
    const { fetchUserData } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    const { appDispatch } = await import('src/Redux/store/store');
    appDispatch(fetchUserData());
  }

  render(): ReactNode {
    return (
      <div>
        <ChatBoxHome />
      </div>
    );
  }
}
