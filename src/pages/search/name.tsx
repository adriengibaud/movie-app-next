import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFilmByName,
  selectFilms,
  statusFilms,
  selectTotalPageFilms,
  selectPageFilms,
} from '../../reducers/filmsSlice';
import Spinner from '../../components/Spinner';
import FilmCard from '../../components/Card/FilmCard';
import Button from '../../components/Button';
import film from '../film';

const name = () => {
  const dispatch = useDispatch();
  const status = useSelector(statusFilms);
  const films = useSelector(selectFilms);
  const totalPages = useSelector(selectTotalPageFilms);
  const currentPage = useSelector(selectPageFilms);
  const router = useRouter();
  const { title } = router.query;

  const search = (query) => {
    dispatch(fetchFilmByName(query));
  };

  const buttonText = () => {
    return status === 'pending' ? <Spinner /> : 'Load more';
  };

  const loadMoreResult = () => {
    search({ name: title, page: currentPage + 1 });
  };

  useEffect(() => {
    if (title) search({ name: title, page: 1 });
    console.log(films);
  }, [title]);

  const body = () => {
    if (films.length > 0) {
      return (
        <>
          {films.map((film) => (
            <FilmCard
              clickHandler={() => router.push(`/film?id=${film.id}`)}
              id={film.id}
              title={film.original_title}
              size='big'
              image={
                film.poster_path === null
                  ? null
                  : `https://image.tmdb.org/t/p/w200/${film.poster_path}`
              }
            />
          ))}
        </>
      );
    }
  };

  return (
    <>
      <Container>
        {films.length > 0 && <ResultContainer>{body()}</ResultContainer>}
        {totalPages > 1 && (
          <ButtonContainer>
            <Button text={buttonText()} clickHandler={() => loadMoreResult()} />
          </ButtonContainer>
        )}
        {status === 'pending' && (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        )}
      </Container>
    </>
  );
};

export default name;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
`;

const SpinnerContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: auto;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 200px;
`;
