import styled from 'styled-components';

const UserAvatar = ({ size, image }: { size: string; image: string }) => {
  return (
    <AvatarContainer size={size}>
      <img src={image} alt='' />
    </AvatarContainer>
  );
};

export default UserAvatar;

const AvatarContainer = styled.div<{ size: string }>`
  width: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '80px')};
  height: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '80px')};
  max-width: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '80px')};
  max-height: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '80px')};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondary};
  img {
    max-height: 100%;
    max-width: 100%;
    border-radius: 50%;
  }
`;
