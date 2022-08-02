/* eslint-disable jsx-a11y/no-autofocus */
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useCallback,
  useState
} from 'react';
import { useAppSelector } from 'src/Redux/store/store';
import {
  BackButtonDiv,
  BackdropImage,
  ChangePicHoverDiv,
  ChangePicHoverText,
  ProfileButton,
  ProfileHeaderDiv,
  ProfileName,
  ProfileNameWidth,
  ProfilePic,
  ProfilePicParent
} from './style/userprofile.style';

const BackButton = require('src/assets/backbutton.png').default;
const NoUser = require('src/assets/nouser.jpg').default;
const Pencil = require('src/assets/pencil.png').default;
const CorrectMark = require('src/assets/checkmark.png').default;

const UserProfile: FC = () => {
  const { data } = useAppSelector((state) => state.chatReducer.userData);
  const [editName, setEditName] = useState({
    value: '',
    editOpt: false
  });

  const handleBack = useCallback(async () => {
    const { changeChatRoute } = await import(
      'src/Redux/actions/chat.reducer.actions'
    );
    const { appDispatch } = await import('src/Redux/store/store');
    appDispatch(changeChatRoute(null));
  }, []);

  const handleEditName = (): void => {
    setEditName(() => ({ editOpt: true, value: data?.name }));
  };

  const handleEsc = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Escape' && editName.editOpt) {
      setEditName(() => ({ editOpt: false, value: '' }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value }
    } = e;
    setEditName(() => ({ ...editName, value }));
  };

  return (
    <div>
      <ProfileHeaderDiv>
        <ProfileButton>
          <BackButtonDiv
            onClick={handleBack}
            tabIndex={0}
            role="button"
            aria-hidden="true"
          >
            <img src={BackButton} alt="" />
          </BackButtonDiv>
          <div>Profile</div>
        </ProfileButton>
      </ProfileHeaderDiv>
      <ProfilePicParent>
        <ProfilePic>
          <BackdropImage className="backdropimg" />
          <img src={data?.profile || NoUser} alt="" />
          <ChangePicHoverDiv className="changepictext">
            <ChangePicHoverText>Change your profile picture</ChangePicHoverText>
          </ChangePicHoverDiv>
        </ProfilePic>
      </ProfilePicParent>
      <ProfilePicParent onKeyDown={handleEsc}>
        <ProfileNameWidth>
          <div>Your Name</div>
          <ProfileName>
            {!editName.editOpt ? (
              <>
                <div>{data?.name}</div>
                <div role="button" aria-hidden="true" onClick={handleEditName}>
                  <img src={Pencil} alt="" />
                </div>
              </>
            ) : (
              <>
                <input
                  value={editName.value}
                  autoFocus
                  onChange={handleChange}
                />
                <div>
                  <img src={CorrectMark} alt="" />
                </div>
              </>
            )}
          </ProfileName>
        </ProfileNameWidth>
      </ProfilePicParent>
    </div>
  );
};

export default memo(UserProfile, () => true);
