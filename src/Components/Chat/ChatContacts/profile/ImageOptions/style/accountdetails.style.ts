import styled from 'styled-components';

export const AccDetails = styled.div`
  position: absolute;
  font-size: 0.9rem;
  z-index: 15;
  right: 0;
  width: 200px;
  background-color: white;
  border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  border-radius: 5px;
  line-height: 3;
`;
export const User = styled.div`
  font-size: 1em;
  a {
    text-decoration: none;
    color: inherit;
  }
  ul {
    list-style: none;
  }
  li:hover {
    background-color: #f1f1f1;
  }
  svg {
    margin-right: 10px;
  }
`;
export const Options = styled.div`
  padding-left: 15px;
  border-top: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
  cursor: pointer;
`;

export const AccDetailsMainDiv = styled.div`
  display: none;
`;
