import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FiSun, FiMoon } from 'react-icons/fi';
import UserAvatar from '../NavBar/UserAvatar';
import SearchField from '../SearchField';
import GenreMenu from './GenreMenu';
import { useRouter } from 'next/router';
import {
  selectActiveGenre,
  setAllGenreInactive,
  setGenreInactive,
} from '../../reducers/genreSlice';
import { changeTheme, selectTheme } from '../../reducers/themeSlice';
import ToggleSwitch from '../ToggleSwitch';
import {
  selectUserEmail,
  selectUserImage,
  selectUserName,
} from '../../reducers/userSlice';
import UserPart from './UserPart';

const Menu = ({
  isOpen,
  closeMenu,
}: {
  isOpen: Boolean;
  closeMenu: Function;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeGenre = useSelector(selectActiveGenre);
  const theme = useSelector(selectTheme);
  const userImage = useSelector(selectUserImage);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);

  const searchByName = (e) => {
    console.log('test');
    const title = e.replace(/ /g, '+');
    if (activeGenre.length > 0) dispatch(setAllGenreInactive());
    router.push(`/search/name?title=${title}`);

    closeMenu();
  };

  return (
    <>
      <Background onClick={() => closeMenu()} isOpen={isOpen}></Background>
      <MenuContainer isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <div className='topSpacing' />
        <UserPart closeMenu={() => closeMenu()} />
        <Separator />
        <SearchBody>
          <SearchField
            label='Search by Title'
            handleSubmit={(e) => searchByName(e)}
          />
          <GenreMenu />
        </SearchBody>
        <ThemeContainer>
          <ThemeTitle>Change theme</ThemeTitle>
          <ToggleContainer>
            <Icons>
              <FiSun />
            </Icons>
            <ToggleSwitch
              clickHandler={() => dispatch(changeTheme())}
              actived={theme === 'light' ? false : true}
            />
            <Icons>
              <FiMoon />
            </Icons>
          </ToggleContainer>
        </ThemeContainer>
      </MenuContainer>
    </>
  );
};

export default Menu;

const Background = styled.div<{ isOpen: Boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
  position: absolute;
  top: 64px;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: calc(100vh - 64px);
  background: rgba(0, 0, 0, 0.5);
`;

const MenuContainer = styled.div<{ isOpen: Boolean }>`
  color: ${({ theme }) => theme.colors.highText};
  position: absolute;
  transform: ${({ isOpen }) =>
    isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.4s;
  z-index: 55;
  top: 64px;
  left: 0;
  width: 300px;
  height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadow.twentyFourDp};
  .topSpacing {
    width: 100%;
    height: 10px;
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const User = styled.section`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h3`
  margin: 15px 0;
  font: 1.5rem Roboto, sans-serif;
`;

const UserEmail = styled.p`
  font: 1rem Roboto, sans-serif;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.highText};
`;

const SearchBody = styled.section`
  margin: 20px;
`;

const GenreBody = styled.div``;

const ThemeContainer = styled.div`
  margin-left: 20px;
  height: 150px;
  margin-right: 20px;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ThemeTitle = styled.div`
  color: ${({ theme }) => theme.colors.highText};
  display: flex;
  flex-direction: center;
  align-items: center;
  font: 1.3rem Roboto, sans-serif;
  margin-bottom: 10px;
`;

const ToggleContainer = styled.div`
  height: 30px;
  width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const Icons = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.highText};
  font-size: 20px;
  margin: 5px;
`;
