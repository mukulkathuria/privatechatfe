import styled from 'styled-components';

export const InputGroup = styled.div``;

export const InputDiv = styled.div`
  font-size: 12px;
  color: red;
  margin: 0.4rem auto;
  input {
    padding: 10px;
    font-size: 1.2em;
    width: 100%;
    background-color: #f1f1f1;
    transition: all 0.3s linear;
    outline: none;
    border: 1px solid #dddddd;
    border-radius: 5px;
    :focus {
      box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      border: 1px solid rgba(81, 203, 238, 1);
    }
  }
  textarea {
    padding: 10px;
    font-size: 1.2em;
    width: 100%;
    min-height: 150px;
    background-color: #f1f1f1;
    transition: all 0.3s linear;
    outline: none;
    border: 1px solid #dddddd;
    border-radius: 5px;
    :focus {
      box-shadow: 0 0 5px rgba(81, 203, 238, 1);
      border: 1px solid rgba(81, 203, 238, 1);
    }
  }
`;
