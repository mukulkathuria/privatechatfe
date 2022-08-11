import React, { lazy, PureComponent } from 'react';
import { connect } from 'react-redux';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { rootStateDto } from 'src/Redux/dtos/rootState.dto';
import { getProfile } from 'src/utils/getPicsUrl';
import {
  MainMessage,
  GroupDiv,
  // UserDiv,
  MessageDiv,
  MessageShow,
} from './style/singlemessage.style';

const FullScreenImage = SuspenseLoader(
  lazy(() => import('src/Components/FullScreenImage/FullScreenImage'))
);

// const PencilImg = require('src/assets/pencil.png').default;

interface Message {
  senderUsername: string;
  message: string;
  isFile: boolean;
  filePath: string;
}
interface Props {
  message: Message;
  currentusername: string | undefined;
}

interface State {
  imgsrc: string;
  showFullScreen: boolean;
}
class SingleMessage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      imgsrc: '',
      showFullScreen: false
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleModalClose() {
    this.setState({ showFullScreen: false, imgsrc: '' });
  }

  handleShow() {
    const { message } = this.props;
    this.setState({
      showFullScreen: true,
      imgsrc: getProfile(message.filePath)
    });
  }

  // showMessageOptions() {
  //   const accountdetails = document.getElementById('messageoption');
  //   if (accountdetails) {
  //     accountdetails.style.display = '';
  //   }
  // }

  render(): React.ReactNode {
    const {
      // eslint-disable-next-line object-curly-newline
      message: { senderUsername, message, isFile, filePath },
      currentusername
    } = this.props;

    const currentUser = senderUsername === currentusername;
    const { imgsrc, showFullScreen } = this.state;

    const fullImageProps = {
      imgsrc,
      handleClose: () => this.handleModalClose()
    };
    return (
      <>
        <MainMessage user={currentUser}>
          <GroupDiv user={currentUser}>
            {/* <UserDiv>{username}</UserDiv> */}
            <MessageDiv>
              {isFile ? (
                <MessageShow
                  role="button"
                  aria-hidden
                  onClick={this.handleShow}
                >
                  <img src={getProfile(filePath)} alt="" />
                </MessageShow>
              ) : null}
              <MessageShow className="msg">{message}</MessageShow>
            </MessageDiv>
          </GroupDiv>
        </MainMessage>
        {showFullScreen ? <FullScreenImage {...fullImageProps} /> : null}
      </>
    );
  }
}

const mapToState = (state: rootStateDto) => ({
  currentusername: state.chatReducer.userData.data?.username
});

export default connect(mapToState)(SingleMessage);
