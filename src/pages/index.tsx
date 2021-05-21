import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Counter } from '../features/counter/Counter';
import styles from '../styles/Home.module.css';
import { fetchGenre, selectGenre } from '../reducers/genreSlice';
import Head from 'next/head';
import { changeTheme } from '../reducers/themeSlice';
import styled from 'styled-components';
import { fetchFilmByName } from '../reducers/filmsSlice';

export default function Home() {
  const dispatch = useDispatch();
  const genre = useSelector(selectGenre);

  useEffect(() => {
    if (genre.length === 0) {
      dispatch(fetchGenre());
      console.log(genre);
    }
    dispatch(fetchFilmByName({ name: 'sa', page: 1 }));
  });

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
      <Test>
        <button onClick={() => dispatch(changeTheme())}>CHANGE THEME</button>
      </Test>
    </>
  );
}

const Test = styled.div`
  color: ${(props) => props.theme.primary};
`;
