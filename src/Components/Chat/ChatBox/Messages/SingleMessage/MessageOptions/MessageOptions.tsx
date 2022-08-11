// eslint-disable-next-line object-curly-newline
import React, { FC, lazy, MouseEvent, useCallback } from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import {
  AccDetails,
  Logout
} from 'src/Components/BackDropOption/style/accountdetails.style';

const BackDropAcc = SuspenseLoader(
  lazy(() => import('src/Components/BackDropOption/BackDropOptions'))
);

const MessageOptions: FC = () => {
  const hideAccountDetails = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const accountdetails = document.getElementById('messageoption');
    if (accountdetails) {
      accountdetails.style.display = 'none';
    }
  }, []);

  const backdropProps = {
    show: true,
    clicked: hideAccountDetails
  };

  return (
    <div id="messageoption" style={{ display: 'none' }}>
      <BackDropAcc {...backdropProps} />
      <AccDetails>
        <Logout>Unsend message</Logout>
      </AccDetails>
    </div>
  );
};
export default MessageOptions;
