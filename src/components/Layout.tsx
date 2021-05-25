import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { lightTheme, darkTheme } from '../styles/theme';
import { useSelector } from 'react-redux';
import { selectTheme } from '../reducers/themeSlice';
import NavBar from './NavBar/NavBar';
import Menu from './Menu/Menu';

const Layout = ({ children }) => {
  const activeTheme = useSelector(selectTheme);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ThemeProvider theme={activeTheme === 'dark' ? darkTheme : lightTheme}>
        <Container>
          <NavBar menuState={isOpen} closeMenu={() => setIsOpen(!isOpen)} />
          <Menu isOpen={isOpen} closeMenu={() => setIsOpen(!isOpen)} />
          <Body>{children}</Body>

          <GlobalStyle />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  margin-top: 64px;
  max-height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;
