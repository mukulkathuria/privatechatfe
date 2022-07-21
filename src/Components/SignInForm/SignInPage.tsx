import React, { lazy, PureComponent } from 'react';
import {
  FormDiv,
  SignInDiv,
  Heading,
  ForgetPass
} from './style/signInPage.style';
import SuspenseLoader from '../common/SuspenseLoader/SuspenseLoader';

const SignInForm = SuspenseLoader(lazy(() => import('./SignInForm')));
const ImageHeading = require('src/assets/instagram-heading.jpg');

class SignInPage extends PureComponent {
  render(): React.ReactNode {
    return (
      <SignInDiv>
        <FormDiv>
          <Heading>
            <img src={ImageHeading.default} alt="heading" />
          </Heading>
          <SignInForm />
          <ForgetPass>
            <div>or</div>
            <button type="button">Login with Facebook</button>
            <div>Forget password</div>
          </ForgetPass>
        </FormDiv>
      </SignInDiv>
    );
  }
}
export default SignInPage;
