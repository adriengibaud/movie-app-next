import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../../firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { selectGenre } from '../reducers/genreSlice';
import Head from 'next/head';
import { changeTheme, selectTheme } from '../reducers/themeSlice';
import styled from 'styled-components';
import ToggleSwitch from '../components/ToggleSwitch';
import Auth from '../components/Auth';
import { selectUserName } from '../reducers/userSlice';
import Button from '../components/Button';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const genre = useSelector(selectGenre);
  const theme = useSelector(selectTheme);
  const userName = useSelector(selectUserName);

  const handleSignIn = () => {
    auth.signInWithPopup(provider);
  };

  const loggedInBody = () => {
    return (
      <Button
        text='View my profile'
        clickHandler={() => router.push('/userProfile')}
      />
    );
  };

  const notLoggedInBody = () => {
    return (
      <Button text='Log in with Google' clickHandler={() => handleSignIn()} />
    );
  };

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
      <Title>Welcome on Movio</Title>
      <HomeBody>
        <ImageContainer>
          <Image
            src='/popcorn.png'
            alt='popcorn image'
            layout='fill'
            objectFit='cover'
            quality={75}
          />
        </ImageContainer>
        <LoginContainer>
          {userName ? loggedInBody() : notLoggedInBody()}
        </LoginContainer>
      </HomeBody>
    </>
  );
}

const HomeBody = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font: 3rem Roboto, sans-serif;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
  margin: 40px 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

const LoginContainer = styled.div`
  margin-top: 60px;
`;
