import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { lightTheme, darkTheme } from '../styles/theme';
import { useSelector } from 'react-redux';
import { selectTheme } from '../reducers/themeSlice';
import NavBar from './NavBar/NavBar';

const Layout = ({ children }) => {
  const activeTheme = useSelector(selectTheme);

  return (
    <>
      <ThemeProvider theme={activeTheme === 'dark' ? darkTheme : lightTheme}>
        <NavBar />
        <Body>
          {children}
          {/*<Footer>Je suis un footer</Footer>*/}
        </Body>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
};

export default Layout;

const Body = styled.div`
  max-width: 100vw;
  overflow-y: hidden;
  min-height: calc(100vh - 64px);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;
