import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '../NavBar/UserAvatar';
import SearchField from '../SearchField';
import GenreMenu from './GenreMenu';
import { useRouter } from 'next/router';
import {
  selectActiveGenre,
  setAllGenreInactive,
  setGenreInactive,
} from '../../reducers/genreSlice';

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

        <User>
          <UserAvatar size='small' />
          <UserName>Patrick David</UserName>
          <UserEmail>patrick.david@gmail.com</UserEmail>
        </User>
        <Separator />
        <SearchBody>
          <SearchField
            label='Search by Title'
            handleSubmit={(e) => searchByName(e)}
          />
          <GenreMenu />
        </SearchBody>
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
