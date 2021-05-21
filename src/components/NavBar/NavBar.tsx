import { useState } from 'react';
import styled from 'styled-components';
import Menu from '../Menu/Menu';
import UserAvatar from './UserAvatar';

const NavBar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <NavBarContainer>
        <HamburgerButton onClick={() => setOpen(!isOpen)}>X</HamburgerButton>

        <h1>Movio</h1>
        <AvatarContainer>
          <UserAvatar size='small' />
        </AvatarContainer>
        <Menu closeMenu={() => setOpen(false)} isOpen={isOpen} />
      </NavBarContainer>
    </>
  );
};

export default NavBar;

const NavBarContainer = styled.nav`
  z-index: 100;
  width: 100vw;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.secondary};
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadow.fourDp};
  h1 {
    font: 55px Oswald, sans-serif;
  }
`;

const HamburgerButton = styled.button`
  border: none;
  background: none;
  width: 80px;
  height: 100%;
  color: ${({ theme }) => theme.colors.secondary};
  font: 35px Oswald, sans-serif;
`;

const AvatarContainer = styled.div`
  margin-left: auto;
  margin-right: 15px;
`;
