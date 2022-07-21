import styled from 'styled-components';

export const FormDiv = styled.div`
  background-color: white;
  padding: 42px;
  padding-top: 10px;
  margin: 2rem 0;
  width: 24rem;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  button {
    margin: 1rem 0;
    padding: 8px;
    background-color: blue;
    color: white;
    font-weight: 600;
    border: 0.2px solid #f1f1f1;
    border-radius: 5px;
    width: 100%;
    :disabled {
      background-color: lightblue;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
export const SignInDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(var(--b3f, 250, 250, 250), 1);
  flex-direction: column;
  align-items: center;
`;
export const Heading = styled.div`
  padding: 0 4.5em;
  img {
    height: 100%;
    width: 100%;
  }
`;
export const ForgetPass = styled.div`
  text-align: center;
  font-size: 0.8rem;
  button {
    background-color: inherit;
    border: none;
    color: blue;
    cursor: pointer;
  }
`;
export const SignUp = styled.div`
  text-align: center;
  width: 24rem;
  background-color: #ffff;
  padding: 1rem;
  font-size: 0.8em;
  margin-bottom: 6.2rem;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  a {
    text-decoration: none;
    color: blue;
    font-weight: 600;
  }
`;
