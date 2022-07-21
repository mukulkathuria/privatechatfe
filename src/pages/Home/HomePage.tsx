import React, { lazy, PureComponent } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import {
  HomePageDivContainer,
  HomePageMainDiv,
  LeftDiv,
  RightDiv
} from './style/homepage.style';

const SignInPage = SuspenseLoader(
  lazy(() => import('src/Components/SignInForm/SignInPage'))
);

const ImageBg = require('src/assets/chatroombg.jpg');

class HomePage extends PureComponent {
  render(): React.ReactNode {
    return (
      <HomePageMainDiv>
        <HomePageDivContainer>
          <LeftDiv>
            <img src={ImageBg.default} alt="" />
          </LeftDiv>
          <RightDiv>
            <SignInPage />
          </RightDiv>
        </HomePageDivContainer>
      </HomePageMainDiv>
    );
  }
}

export default HomePage;
