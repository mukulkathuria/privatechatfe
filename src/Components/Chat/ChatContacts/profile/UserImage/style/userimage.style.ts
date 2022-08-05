import styled from 'styled-components';

interface ButtonGroupProps {
  uploaded: boolean;
}

interface WrapperImageDivProps {
  isMobile: boolean;
}

export const WrapperImageDiv = styled.div<WrapperImageDivProps>`
  width: 100%;
  height: ${(props) => (props.isMobile ? '94vh' : 'auto')};
  display: flex;
  flex-direction: column;
`;

export const DeleteButton = styled.button`
  color: #000;
  right: -10px;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  position: absolute;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  border-radius: 50%;
`;

export const UploaderBoxDiv = styled.div`
  width: 100%;
  height: 100%;
  min-height: 360px;
  border: 1px dashed #a9a9a9;
  border-radius: 8px;
  position: relative;
`;

export const DragSpan = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  position: absolute;
  font-size: 14px;
  text-align: center;
  font-weight: 700;
  line-height: 18px;
`;

export const ButtonGroup = styled.div<ButtonGroupProps>`
  display: grid;
  grid-template-columns: ${(props) => (props.uploaded ? 'auto auto' : 'auto')};
  padding: 10px;
  column-gap: 10px;
  button {
    padding: 10px;
    background-color: #0c9;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    outline: none;
  }
`;
