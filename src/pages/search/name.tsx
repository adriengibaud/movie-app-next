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
import ResultsBody from '../../components/Results/ResultsBody';

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
  }, [title]);

  return (
    <ResultsBody
      text={true}
      size='big'
      status={status}
      totalPages={totalPages}
      type='film'
      moreResults={() => loadMoreResult()}
      data={films}
    />
  );
};

export default name;
