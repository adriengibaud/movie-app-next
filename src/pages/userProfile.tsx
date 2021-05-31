import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../components/NavBar/UserAvatar';
import {
  selectUserEmail,
  selectUserImage,
  selectUserList,
  selectUserName,
} from '../reducers/userSlice';
import FilmCard from '../components/Card/FilmCard';

const userProfile = () => {
  const [filter, setFilter] = useState('all');

  const router = useRouter();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userImage = useSelector(selectUserImage);
  const userList = useSelector(selectUserList);

  const clickHandler = (id) => {
    router.push(`/film?id=${id}`);
  };

  const numberWatched = () => {
    if (userList.length > 0) {
      const watchedArray = userList.filter((e) => e.watched == true);
      return watchedArray.length;
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
        <Header>
          <AvatarContainer>
            <UserAvatar size='small' image={userImage} />
          </AvatarContainer>

          <UserInfos>
            <Name>{userName}</Name>
            <Email>{userEmail}</Email>
          </UserInfos>
        </Header>
        <StatContainer>
          <FilmNumber>
            Movies in your list : {userList && userList.length}
          </FilmNumber>
          <WatchedNumber>Movies watched : {numberWatched()}</WatchedNumber>
        </StatContainer>
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
                  clickHandler={() => clickHandler(e.filmId)}
                />
              );
            })}
          </ListResults>
        </ListContainer>
      </Container>
    </>
  );
};

export default userProfile;

const Container = styled.div`
  color: ${({ theme }) => theme.colors.highText};
  font: 1rem Roboto, sans-serif;
  width: 100vw;
  padding: 5vh 10vw;
  margin: 0 auto 0 auto;
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

const StatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
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
`;
