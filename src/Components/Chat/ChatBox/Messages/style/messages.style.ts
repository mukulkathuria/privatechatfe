import styled from 'styled-components';

export const MessagesMainDiv = styled.div`
  position: relative;
  height: 91vh;
  padding-top: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: red;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;
