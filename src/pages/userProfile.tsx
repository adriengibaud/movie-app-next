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
  const router = useRouter();
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userImage = useSelector(selectUserImage);
  const userList = useSelector(selectUserList);

  const clickHandler = (id) => {
    router.push(`/film?id=${id}`);
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
          <UserAvatar size='medium' image={userImage} />
          <UserInfos>
            <Name>{userName}</Name>
            <Email>{userEmail}</Email>
          </UserInfos>
        </Header>
        <ListTitle>My list</ListTitle>
        <ListContainer>
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

const ListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.h3``;
