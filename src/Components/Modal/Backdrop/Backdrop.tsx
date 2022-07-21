import React, { PureComponent } from 'react';
import { BackdropDiv } from './style/backdrop.style';

type BackDropProps = {
  show: boolean;
  clicked: () => void;
}

class Backdrop extends PureComponent<BackDropProps> {
  render(): React.ReactNode {
    const { show, clicked } = this.props;
    return show ? <BackdropDiv onClick={clicked} /> : null;
  }
}
export default Backdrop;
