import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFilmByName,
  selectFilms,
  statusFilms,
  fetchFilmById,
  selectActiveFilm,
} from '../reducers/filmsSlice';
import {
  addToList,
  deleteFilmUserList,
  selectUserId,
  selectUserList,
  updateWatchStatus,
} from '../reducers/userSlice';
import Spinner from '../components/Spinner';
import FilmCard from '../components/Card/FilmCard';
import Button from '../components/Button';

const film = () => {
  const dispatch = useDispatch();
  const status = useSelector(statusFilms);
  const films = useSelector(selectFilms);
  const activeFilm = useSelector(selectActiveFilm);
  const userId = useSelector(selectUserId);
  const userList = useSelector(selectUserList);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(router.query);
    if (id) dispatch(fetchFilmById(id));
  }, [id]);

  const addToListHandler = (watched = false) => {
    dispatch(
      addToList({
        userId: userId,
        filmName: activeFilm.original_title,
        filmId: activeFilm.id.toString(),
        filmImage: activeFilm.poster_path,
        watched,
      })
    );
  };

  const updateWatch = (watched) => {
    dispatch(
      updateWatchStatus({
        userId: userId,
        filmName: activeFilm.original_title,
        filmId: activeFilm.id.toString(),
        filmImage: activeFilm.poster_path,
        watched,
      })
    );
  };

  const removeToListHandler = () => {
    dispatch(deleteFilmUserList({ userId, filmId: activeFilm.id }));
  };

  const WatchListBody = () => {
    const test = userList.find((e) => e.filmId == activeFilm.id);
    console.log('je test', test);
    if (test !== undefined) {
      if (test.watched == true) {
        return (
          <Button text='Watched' clickHandler={() => updateWatch(false)} />
        );
      } else {
        return (
          <Button
            text='+ Mark as watched'
            clickHandler={() => updateWatch(true)}
          />
        );
      }
    } else {
      return (
        <Button
          text='+ Mark as watched'
          clickHandler={() => addToListHandler(true)}
        />
      );
    }
  };

  const body = () => {
    if (status === 'fulfilled' && activeFilm.original_title) {
      return (
        <Container>
          <Header>
            <ImageContainer>
              <Image
                className='poster'
                src={`https://image.tmdb.org/t/p/w400/${activeFilm.poster_path}`}
                alt='film poster'
                layout='fill'
                objectFit='cover'
                quality={100}
              />
            </ImageContainer>
            <Infos>
              <Title>
                {activeFilm.original_title}
                <Rating>
                  <AiOutlineStar className='icon' />
                  <p>{activeFilm.vote_average}</p>
                </Rating>
              </Title>
              <Overview>{activeFilm.overview}</Overview>

              <ActorTitle>Actors</ActorTitle>
              <ActorsNames>
                {activeFilm.filmCast.cast.slice(0, 4).map((element, i) => (
                  <p key={i}>{element.name}</p>
                ))}
              </ActorsNames>

              <ButtonContainer>
                {userList.some((e) => e.filmId == activeFilm.id) ? (
                  <Button
                    text='- Remove from list'
                    clickHandler={() => removeToListHandler()}
                  />
                ) : (
                  <Button
                    text='+ Add to list'
                    clickHandler={() => addToListHandler()}
                  />
                )}
                {WatchListBody()}
              </ButtonContainer>
            </Infos>
          </Header>
          <RecommendationsTitle>Recommandations</RecommendationsTitle>
          <RecommendationsContainer>
            <Recommendations>
              {activeFilm.filmRecommendations.results.map((film) => {
                return (
                  <FilmCard
                    size='medium'
                    key={film.id}
                    text={false}
                    clickHandler={() => router.push(`/film?id=${film.id}`)}
                    image={
                      film.poster_path === null
                        ? null
                        : `https://image.tmdb.org/t/p/w200/${film.poster_path}`
                    }
                    id={film.id}
                  />
                );
              })}
            </Recommendations>
          </RecommendationsContainer>
        </Container>
      );
    }
  };

  return (
    <>
      <Head>
        <title>
          Movio your movie companion |{' '}
          {activeFilm.original_title && activeFilm.original_title}
        </title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Oswald&family=Roboto&display=swap'
          rel='stylesheet'
        />
      </Head>
      {status === 'pending' ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        body()
      )}
    </>
  );
};

export default film;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  padding: 3vh 2vw;
  margin: auto;
  max-width: 1200px;
  @media screen and (max-width: 750px) {
    padding: 3vh 5vw;
  }
`;

const SpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 450px;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    min-height: 700px;
    max-height: 1000px;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 300px;
  height: 450px;
  border-radius: 30px;
  box-shadow: ${({ theme }) => theme.shadow.sixDp};
  .poster {
    border-radius: 30px;
  }
`;

const Infos = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 300px - 5%);
  font: 1rem Roboto, sans-serif;
  color: ${({ theme }) => theme.colors.mediumText};
  letter-spacing: 0.3px;
  @media screen and (max-width: 750px) {
    width: 100%;
    max-width: 600px;
    height: 500px;
    margin-top: 20px;
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.highText};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Rating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  .icon {
    color: #e7e704;
  }
`;

const Overview = styled.p`
  line-height: 25px;
  max-height: 55%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ActorsContainer = styled.section``;

const ActorTitle = styled.h3`
  color: ${({ theme }) => theme.colors.highText};
`;

const ActorsNames = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  min-height: 50px;
  max-height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RecommendationsContainer = styled.div`
  margin: 20px 0 15px 0;
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const RecommendationsTitle = styled.h3`
  font-family: Roboto, sans-serif;
  color: ${({ theme }) => theme.colors.highText};
  text-align: center;
  margin-top: 20px;
  @media screen and (max-width: 1050px) {
    text-align: left;
  }
`;

const Recommendations = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-bottom: 60px;
  @media screen and (max-width: 1050px) {
    flex-wrap: nowrap;
  }
`;
