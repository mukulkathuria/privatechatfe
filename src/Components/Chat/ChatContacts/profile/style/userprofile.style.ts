import styled from 'styled-components';

export const ProfileHeaderDiv = styled.div`
  height: 20vh;
  width: 100%;
  background-color: #0c9;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const UserDetailsDiv = styled.div`
  position: relative;
  cursor: pointer;
`;

export const BackButtonDiv = styled.div`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const ProfileButton = styled.div`
  display: flex;
  margin: 6%;
  align-items: center;
  font-size: 1.2em;
`;

export const ProfilePic = styled.div`
  width: 80%;
  height: 40vh;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &:hover img {
    opacity: 0.3;
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
  &:hover .changepictext {
    opacity: 1;
  }
  &:hover .backdropimg {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const ProfilePicParent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const ProfileNamedParent = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin: 30px 0;
`;

export const ProfileNameWidth = styled.div`
  width: 80%;
`;

export const ProfileName = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1.1rem;

  input {
    border: none;
    border-bottom: 1px solid #dddddd;
    transition: all 0.3s linear;
    width: 100%;
    padding: 5px 0;
    font-size: 1.1em;
    outline: none;
    :focus {
      border-bottom: 1px solid rgba(81, 203, 238, 1);
    }
  }
  img {
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
`;

export const ChangePicHoverDiv = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
`;

export const ChangePicHoverText = styled.div`
  color: white;
  font-size: 1.2em;
  padding: 16px 32px;
`;

export const BackdropImage = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
