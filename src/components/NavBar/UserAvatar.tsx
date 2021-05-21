import styled from 'styled-components';

const UserAvatar = ({ size }: { size: string }) => {
  return <AvatarContainer size={size}></AvatarContainer>;
};

export default UserAvatar;

const AvatarContainer = styled.div<{ size: string }>`
  width: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '80px')};
  height: ${({ size }) =>
    (size === 'small' && '50px') || (size === 'medium' && '80px')};
  border-radius: 50%;
  background: white;
`;
