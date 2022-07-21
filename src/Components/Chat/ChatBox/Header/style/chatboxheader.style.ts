import styled from 'styled-components';

export const ChatHeaderDiv = styled.div`
  height: 50px;
  width: 100%;
  background-color: #0c9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserDetailsDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const BackButtonDiv = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserOnline = styled.div`
  margin-left: 8px;
  line-height: 1.3;
`;
