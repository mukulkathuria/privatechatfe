import styled from 'styled-components';

interface isMobileProps {
  isMobile?: boolean;
}

export const ChatHomeDiv = styled.div`
  display: flex;
  overflow: hidden;
`;

export const ChatHomeLeftDiv = styled.div<isMobileProps>`
  width: ${(props) => (props.isMobile ? '100%' : '30%')};;
  height: 100vh;
  position: relative;
  border-right: 1.5px solid black;
`;

export const ChatHomeRightDiv = styled.div<isMobileProps>`
  width: ${(props) => (props.isMobile ? '100%' : '70%')};
  img {
    height: 100%;
    width: 100%;
  }
`;
