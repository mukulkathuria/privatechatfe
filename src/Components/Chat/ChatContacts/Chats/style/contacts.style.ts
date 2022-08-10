import styled from 'styled-components';

interface ContactsDivProps {
  selected?: boolean;
  lastItem?: boolean;
}

export const ContactsDiv = styled.div<ContactsDivProps>`
  display: flex;
  height: 10vh;
  align-items: center;
  background-color: ${(props) => (props.selected ? '#f1f1f1' : '')};
  border-bottom: ${(props) => (props.lastItem ? '' : '1px solid #f1f1f1')};
  cursor: pointer;
  padding: 2% 0;
`;

export const ContactsLeftDiv = styled.div`
  width: 15%;
  height: 100%;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    padding: 10%;
  }
`;

export const ContactsRightDiv = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
`;

export const LastMessageDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
