import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  fetchFilmByGenre,
  selectFilms,
  selectPageFilms,
  selectTotalPageFilms,
  statusFilms,
} from '../../reducers/filmsSlice';
import ResultsBody from '../../components/Results/ResultsBody';
import { selectGenre, setGenre } from '../../reducers/genreSlice';

const genre = () => {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const status = useSelector(statusFilms);
  const films = useSelector(selectFilms);
  const totalPages = useSelector(selectTotalPageFilms);
  const genre = useSelector(selectGenre);
  const { id } = router.query;

  const search = (query) => {
    dispatch(fetchFilmByGenre(query));
  };

  useEffect(() => {
    if (id) {
      const genreArray = id.toString().split(' ');
      setSelectedGenre(
        genre
          .filter((element) => genreArray.includes(element.id.toString()))
          .map((e) => e.name)
          .join(' ')
      );
    }
  }, [id]);

  useEffect(() => {
    if (id) search({ id: id.toString().replace(/ /g, '%2c'), page });
  }, [id, page]);

  const loadMoreResults = () => {
    dispatch(
      fetchFilmByGenre({
        id: id.toString().replace(/ /g, '%2c'),
        page: page + 1,
      })
    );
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>Movio your movie companion | {selectedGenre} </title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Oswald&family=Roboto&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ResultsBody
        title={`Results for: ${selectedGenre}`}
        text={true}
        size='big'
        status={status}
        totalPages={totalPages}
        type='film'
        moreResults={() => loadMoreResults()}
        data={films}
      />
    </>
  );
};

export default genre;
