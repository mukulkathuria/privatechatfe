/* eslint-disable jsx-a11y/no-autofocus */
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  lazy,
  memo,
  useCallback,
  useState
} from 'react';
import SuspenseLoader from 'src/Components/common/SuspenseLoader/SuspenseLoader';
import { useAppSelector } from 'src/Redux/store/store';
import { getProfile } from 'src/utils/getPicsUrl';
import ImageOptions from './ImageOptions/ImageOptions';
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

const PhotoModel = SuspenseLoader(
  lazy(() => import('./PhotoModel/PhotoModel'))
);

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

  const [showModal, setModal] = useState<boolean>(false);

  const showImageOptions = () => {
    const accountdetails = document.getElementById('imageOptions');
    if (accountdetails) {
      accountdetails.style.display = '';
    }
  };

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

  const handleNameSave = async () => {
    if (editName.value && editName.value.trim().length) {
      if (editName.value === data?.name) {
        setEditName(() => ({ value: '', editOpt: false }));
      } else {
        const { appDispatch } = await import('src/Redux/store/store');
        const { showNotifications } = await import(
          'src/Redux/actions/notifications.actions'
        );
        const { NotificationAlerts } = await import(
          'src/Redux/dtos/notifications.dto'
        );
        try {
          const { updateUser } = await import(
            'src/services/User/user.services'
          );
          const { ADD_CHAT_IN_CHATBOX } = await import(
            'src/Redux/types/chat.reducer.type'
          );
          const query = {
            updatename: editName.value
          };
          const payload = await updateUser(query);
          appDispatch({ type: ADD_CHAT_IN_CHATBOX, payload });
          appDispatch(
            showNotifications({ message: 'Successfully saved your name' })
          );
          setEditName(() => ({ value: '', editOpt: false }));
        } catch (error) {
          appDispatch(
            showNotifications({
              message: 'Some error occur',
              alert: NotificationAlerts.error
            })
          );
        }
      }
    }
  };

  const photoModelProps = {
    handleCloseModel: () => setModal(() => false)
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
        <ProfilePic onClick={showImageOptions}>
          <BackdropImage className="backdropimg" />
          <img src={getProfile(data?.profile) || NoUser} alt="" />
          <ChangePicHoverDiv className="changepictext">
            <ChangePicHoverText>Change your profile picture</ChangePicHoverText>
          </ChangePicHoverDiv>
          <ImageOptions
            profile={data?.profile as string}
            handleOpen={() => setModal(() => true)}
          />
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
                <div role="button" aria-hidden="true" onClick={handleNameSave}>
                  <img src={CorrectMark} alt="" />
                </div>
              </>
            )}
          </ProfileName>
        </ProfileNameWidth>
      </ProfilePicParent>
      {showModal ? <PhotoModel {...photoModelProps} /> : null}
    </div>
  );
};

export default memo(UserProfile);
