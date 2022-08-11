import styled from 'styled-components';

export const Inputs = styled.textarea`
  padding: 10px;
  width: 90%;
  background-color: #f1f1f1;
  transition: all 0.3s linear;
  outline: none;
  border: 1px solid #dddddd;
  border-radius: 5px;
  :focus {
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
    border: 1px solid rgba(81, 203, 238, 1);
  }
`;
export const SuccesBtn = styled.button`
  background-color: blue;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 5%;
  outline: none;
  :disabled {
    background-color: lightblue;
    cursor: default;
  }
`;

export const AttachmentBtn = styled.div`
  width: 5%;
`;

export const SendBoxDiv = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 25px;
    width: 100%;
  }
`;
