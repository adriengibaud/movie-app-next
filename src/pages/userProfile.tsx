import styled from 'styled-components';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../components/NavBar/UserAvatar';
import {
  selectUserEmail,
  selectUserImage,
  selectUserName,
} from '../reducers/userSlice';

const userProfile = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userImage = useSelector(selectUserImage);

  return (
    <>
      <Head>
        <title>Movio your movie companion | Home</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Oswald&family=Roboto&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Container>
        <Header>
          <UserAvatar size='medium' image={userImage} />
          <UserInfos>
            <Name>{userName}</Name>
            <Email>{userEmail}</Email>
          </UserInfos>
        </Header>
      </Container>
    </>
  );
};

export default userProfile;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.highText};
  font: 1rem Roboto, sans-serif;
  width: 500px;
  height: 600px;
  margin: 30px auto 0 auto;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserInfos = styled.div`
  margin-left: 35px;
`;

const Name = styled.h2``;

const Email = styled.h3``;
