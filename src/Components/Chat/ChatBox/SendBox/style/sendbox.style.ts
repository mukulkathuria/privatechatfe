import styled from 'styled-components';

export const Inputs = styled.input`
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
  padding: 10px;
  background-color: blue;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 10%;
  outline: none;
  :disabled {
    background-color: lightblue;
    cursor: default;
  }
`;
