import styled from 'styled-components';

interface ModalDivProps {
  show: boolean;
}

export const ModalDiv = styled.div<ModalDivProps>`
  position: fixed;
  z-index: 100;
  min-width: 25%;
  border-radius: 5px;
  left: 50%;
  top: ${(props) => (props.show ? '50%' : '-50%')};
  transform: ${(props) => (props.show ? 'translateY(0)' : 'translateY(-10px)')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  background-color: white;
  transform: translate(-50%, -50%);
  transition: all 1s linear;
`;
