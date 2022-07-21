import React, { lazy, PureComponent } from 'react';
import { ModalDiv } from './style/modal.style';
import SuspenseLoader from '../common/SuspenseLoader/SuspenseLoader';

interface ModalProps {
  show: boolean;
  modalClose: () => void;
  children: JSX.Element;
}

const Backdrop = SuspenseLoader(lazy(() => import('./Backdrop/Backdrop')));

class Modal extends PureComponent<ModalProps> {
  render(): React.ReactNode {
    const { show, modalClose, children } = this.props;
    const backdropProps = {
      show,
      clicked: modalClose
    };
    return (
      <>
        <Backdrop {...backdropProps} />
        <ModalDiv show={show}>{children}</ModalDiv>
      </>
    );
  }
}
export default Modal;
