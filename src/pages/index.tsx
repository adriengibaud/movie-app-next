import { useDispatch, useSelector } from 'react-redux';
import { selectGenre } from '../reducers/genreSlice';
import Head from 'next/head';
import { changeTheme, selectTheme } from '../reducers/themeSlice';
import styled from 'styled-components';
import ToggleSwitch from '../components/ToggleSwitch';
import Auth from '../components/Auth';

export default function Home() {
  const dispatch = useDispatch();
  const genre = useSelector(selectGenre);
  const theme = useSelector(selectTheme);

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
        <ToggleSwitch
          clickHandler={() => dispatch(changeTheme())}
          actived={theme === 'light' ? true : false}
        />
      </Test>
      <Auth />
    </>
  );
}

const Test = styled.div`
  color: ${(props) => props.theme.primary};
`;
