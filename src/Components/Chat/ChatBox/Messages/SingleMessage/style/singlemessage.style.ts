import styled from 'styled-components';

interface Users {
  user: boolean;
}

export const MainMessage = styled.div<Users>`
  position: relative;
  display: flex;
  justify-content: ${(props) => (props.user ? 'flex-end' : 'flex-start')};
`;

export const GroupDiv = styled.div<Users>`
  background-color: ${(props) => (props.user ? 'blue' : 'green')};
  padding: 5px;
  padding-right: ${(props) => (props.user ? '20px' : '10px')};
  padding-left: ${(props) => (props.user ? '10px' : '30px')};
  border-radius: 5px;
  margin: 3px 0;
  color: white;
`;

export const UserDiv = styled.div`
  font-weight: 600;
`;

export const MessageDiv = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .msg {
    margin-right: 1rem;
  }
`;

export const Timestamp = styled.div`
  font-size: 10px;
`;

export const MessageShow = styled.div`
  max-height: 30vh;
  width: 50%;
  img {
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
`;

export const EditImageOptions = styled.div`
  position: relative;
  img {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
`;
