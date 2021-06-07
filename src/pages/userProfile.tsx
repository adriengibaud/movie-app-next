import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from '../../firebase';
import UserAvatar from '../components/NavBar/UserAvatar';
import {
  selectUserEmail,
  selectUserImage,
  selectUserList,
  selectUserName,
} from '../reducers/userSlice';
import FilmCard from '../components/Card/FilmCard';
import { selectGenre } from '../reducers/genreSlice';
import GenreChart from '../components/GenreChart';
import GenreChart2 from '../components/GenreChart2';
import Button from '../components/Button';

const userProfile = () => {
  const [filter, setFilter] = useState('all');

  const router = useRouter();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userImage = useSelector(selectUserImage);
  const userList = useSelector(selectUserList);
  const genresList = useSelector(selectGenre);

  const handleSignIn = () => {
    auth.signInWithPopup(provider);
  };

  const clickHandler = (id) => {
    router.push(`/film?id=${id}`);
  };

  const numberWatched = () => {
    if (userList.length > 0) {
      const watchedArray = userList.filter((e) => e.watched == true);
      return watchedArray.length;
    } else return 0;
  };

  const bodyWithResult = () => {
    return (
      <>
        <Header>
          <AvatarContainer>
            <UserAvatar size='small' image={userImage} />
          </AvatarContainer>

          <UserInfos>
            <Name>{userName}</Name>
            <Email>{userEmail}</Email>
          </UserInfos>
        </Header>
        <Separator />
        <Chartcontainer>
          <GenreChart2 />
        </Chartcontainer>
        <Separator />
        <StatContainer>
          <FilmNumber>
            Movies in your list : {userList ? userList.length : 0}
          </FilmNumber>
          <WatchedNumber>Movies watched : {numberWatched()}</WatchedNumber>
        </StatContainer>
        <Separator />
        <ListContainer>
          <ListTitle>My list</ListTitle>
          <ListResults>
            {userList.map((e) => {
              return (
                <FilmCard
                  size='big'
                  image={
                    e.filmImage === null
                      ? null
                      : `https://image.tmdb.org/t/p/w200/${e.filmImage}`
                  }
                  text={true}
                  title={e.filmName}
                  id={e.filmId}
                  key={e.filmId}
                  clickHandler={() => clickHandler(e.filmId)}
                />
              );
            })}
          </ListResults>
        </ListContainer>
      </>
    );
  };

  const bodyWithoutResult = () => {
    if (!userEmail) {
      return (
        <NotLoggedBody>
          <NotLoggedTitle>Please log in to see your profile</NotLoggedTitle>
          <Button
            text='Log in with Google'
            clickHandler={() => handleSignIn()}
          />
        </NotLoggedBody>
      );
    } else {
      return (
        <>
          <Header>
            <AvatarContainer>
              <UserAvatar size='small' image={userImage} />
            </AvatarContainer>

            <UserInfos>
              <Name>{userName}</Name>
              <Email>{userEmail}</Email>
            </UserInfos>
          </Header>
          <NoContentContainer>
            <NoContentText>
              Start by adding some movie to your list and come back here !
            </NoContentText>
          </NoContentContainer>
        </>
      );
    }
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
      <Container>
        {userList.length > 0 ? bodyWithResult() : bodyWithoutResult()}
      </Container>
    </>
  );
};

export default userProfile;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.highText};
  font: 1rem Roboto, sans-serif;
  padding: 5vh 2vw;
  width: 100vw;
  margin: 0 auto 0 auto;
`;

const Separator = styled.div`
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.colors.mediumText};
  margin: 30px 0;
  opacity: 0.5;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.div``;

const UserInfos = styled.div`
  margin-left: 15px;
`;

const Chartcontainer = styled.section`
  margin: 0 0 25px 0;
`;

const StatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  font-size: 1.5rem;
`;

const FilmNumber = styled.p``;

const WatchedNumber = styled.p``;

const Name = styled.h2``;

const Email = styled.h3``;

const ListContainer = styled.section`
  margin-top: 25px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.h3``;

const ListResults = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 400px) {
    justify-content: center;
  }
`;

const NoContentContainer = styled.section`
  width: 80%;
  margin: auto;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NoContentText = styled.h1``;

const NotLoggedBody = styled.section`
  width: 60%;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  flex-direction: center;
  align-items: center;
`;

const NotLoggedTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;
