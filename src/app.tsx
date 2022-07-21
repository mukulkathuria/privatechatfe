import React, { PureComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary';
import Routes from './Routes/routes';

class App extends PureComponent {
  async componentDidMount() {
    const { isMobileDevice, addDays } = await import('./utils/common.utils');
    const {
      default: { set }
    } = await import('js-cookie');
    set('isMobile', String(isMobileDevice(navigator.userAgent)), {
      expires: addDays(1)
    });
  }

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}
export default App;
