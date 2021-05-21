import styled from 'styled-components';
import Image from 'next/image';
import { Card } from '../../Types/cardTypes';

const FilmCard = ({ image, size, title, clickHandler }: Card) => {
  return (
    <CardContainer size={size} onClick={() => clickHandler()}>
      <ImageContainer>
        {image === null ? (
          <h3>No Image</h3>
        ) : (
          <Image
            className='poster'
            src={image}
            alt='film poster'
            layout='fill'
            objectFit='cover'
            quality={75}
          />
        )}
      </ImageContainer>
      <Title>{title}</Title>
    </CardContainer>
  );
};

export default FilmCard;

const CardContainer = styled.div<{ size: string }>`
  height: ${({ size }) =>
    (size === 'small' && '172px') ||
    (size === 'medium' && '230px') ||
    (size === 'big' && '310px')};
  width: ${({ size }) =>
    (size === 'small' && '100px') ||
    (size === 'medium' && '133px') ||
    (size === 'big' && '180px')};
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.eightDp};
  margin: 15px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 85%;
  color: ${({ theme }) => theme.colors.secondary};
  .poster {
    border-radius: 5px 5px 0 0;
  }
`;

const Title = styled.h4`
  padding: 4px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 15%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font: 1rem Roboto, sans-serif;
  color: ${({ theme }) => theme.colors.highText};
`;
