import styled from 'styled-components';

interface ModalHeaderProps {
  isMobile: boolean;
}

export const ModelWrapper = styled.div<ModalHeaderProps>`
  max-width: ${(props) => (props.isMobile ? 'invalid' : '600px')};
  max-height: ${(props) => (props.isMobile ? 'invalid' : '600px')};
  height: ${(props) => (props.isMobile ? '100vh' : 'invalid')};
  width: ${(props) => (props.isMobile ? '100vw' : 'invalid')};
`;
