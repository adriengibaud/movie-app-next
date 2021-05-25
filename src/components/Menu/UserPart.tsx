import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../NavBar/UserAvatar';
import { useRouter } from 'next/router';
import {
  selectUserEmail,
  selectUserImage,
  selectUserName,
  setUserLogoutState,
} from '../../reducers/userSlice';
import { auth, provider } from '../../../firebase';
import Button from '../Button';

const UserPart = ({ closeMenu }: { closeMenu: Function }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userImage = useSelector(selectUserImage);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const handleSignIn = () => {
    auth.signInWithPopup(provider);
  };

  const handleSignOut = () => {
    auth.signOut().then(() => dispatch(setUserLogoutState()));
  };

  const viewProfile = () => {
    router.push('/userProfile');
    closeMenu();
  };

  const signedInBody = () => {
    return (
      <>
        <User>
          <UserAvatar image={userImage} size='small' />
          <UserName>{userName}</UserName>
          <UserEmail>{userEmail}</UserEmail>
        </User>
        <ButtonContainer>
          <Button text='View Profile' clickHandler={() => viewProfile()} />
          <Button text='Logout' clickHandler={() => handleSignOut()} />
        </ButtonContainer>
      </>
    );
  };

  const notSignedInBody = () => {
    return (
      <NotSignedInContainer>
        <NotSignedInText>
          You must be logged in to see your profile
        </NotSignedInText>
        <ButtonContainer>
          <Button
            text='Log in with Google'
            clickHandler={() => handleSignIn()}
          />
        </ButtonContainer>
      </NotSignedInContainer>
    );
  };

  return (
    <Container>
      {userName !== null ? signedInBody() : notSignedInBody()}
    </Container>
  );
};

export default UserPart;

const Container = styled.div`
  height: 200px;
  margin: 20px;
  font: 1rem Roboto, sans-serif;
`;

const NotSignedInContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const User = styled.section`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  margin: 15px 0;
  font: 1.5rem Roboto, sans-serif;
`;

const UserEmail = styled.p`
  font: 1rem Roboto, sans-serif;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NotSignedInText = styled.h3``;
