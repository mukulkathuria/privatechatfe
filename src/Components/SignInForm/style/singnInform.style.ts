import styled from 'styled-components';

export const StyledButton = styled.button`
  margin: 1rem 0;
  padding: 8px;
  background-color: blue;
  color: white;
  font-weight: 600;
  border: 0.2px solid #f1f1f1;
  border-radius: 5px;
  :disabled {
    background-color: lightblue;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const LoginButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 0.8rem;
  }
`;

export const FormDiv = styled.div`
  width: 30rem;
  margin: 4rem auto;
  button {
    width: 100%;
    padding: 10px;
    border: 0.2px solid #f1f1f1;
    margin: 1rem auto;
    background-color: green;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    :disabled {
      background-color: lightgreen;
    }
  }
`;
export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const FormHeading = styled.div`
  text-align: center;
  svg {
    font-size: 5em;
  }
  h2 {
    font-size: 3em;
    font-weight: 400;
  }
`;
