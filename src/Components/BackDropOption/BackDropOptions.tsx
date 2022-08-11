import React, { MouseEvent, PureComponent } from 'react';
import styled from 'styled-components';

const BackdropDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: 0;
  cursor: default;
  background-color: rgba(0, 0, 0, 0);
`;

interface BackdropProps {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  clicked: (e: MouseEvent<HTMLDivElement>) => void;
}

class BackDropOption extends PureComponent<BackdropProps> {
  render(): React.ReactNode {
    const { show, clicked } = this.props;
    return show ? <BackdropDiv onClick={clicked} /> : null;
  }
}
export default BackDropOption;
