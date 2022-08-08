// eslint-disable-next-line object-curly-newline
import React, { FC, lazy, memo, useCallback } from 'react';
import SuspenseLoader from '../common/SuspenseLoader/SuspenseLoader';

const Modal = SuspenseLoader(lazy(() => import('src/Components/Modal/Modal')));

interface FullScreenImageProps {
  handleClose: () => void;
  imgsrc: string;
}

const FullScreenImage: FC<FullScreenImageProps> = (props) => {
  const { imgsrc } = props;

  const modalClose = useCallback(async () => {
    const { handleClose } = props;
    handleClose();
  }, []);

  const modalProps = {
    show: true,
    modalClose
  };

  return (
    <Modal {...modalProps}>
      <div>
        <div>
          <button type="button" onClick={modalClose}>
            Close
          </button>
        </div>
        <div>
          <img src={imgsrc} alt="" />
        </div>
      </div>
    </Modal>
  );
};

export default memo(FullScreenImage);
