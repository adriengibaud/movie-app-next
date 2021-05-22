import styled from 'styled-components';
import Image from 'next/image';
import { Card } from '../../Types/cardTypes';

const FilmCard = ({ image, size, title, text, clickHandler }: Card) => {
  return (
    <CardContainer text={text} size={size} onClick={() => clickHandler()}>
      <ImageContainer size={size} text={text}>
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
      <Title text={text}>{title}</Title>
    </CardContainer>
  );
};

export default FilmCard;

const CardContainer = styled.div<{ size: string; text: boolean }>`
  height: ${({ size, text }) =>
    text === true
      ? (size === 'small' && '172px') ||
        (size === 'medium' && '230px') ||
        (size === 'big' && '310px')
      : (size === 'small' && '150px') ||
        (size === 'medium' && '200px') ||
        (size === 'big' && '250px')};
  min-width: ${({ size }) =>
    (size === 'small' && '100px') ||
    (size === 'medium' && '133px') ||
    (size === 'big' && '180px')};
  max-width: ${({ size }) =>
    (size === 'small' && '100px') ||
    (size === 'medium' && '133px') ||
    (size === 'big' && '180px')};
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ size, text }) =>
    (size === 'small' && '15px') ||
    (size === 'medium' && '20px') ||
    (size === 'big' && '20px 20px')};

  box-shadow: ${({ theme }) => theme.shadow.eightDp};
  margin: ${({ size }) =>
    (size === 'small' && '7px') ||
    (size === 'medium' && '10px') ||
    (size === 'big' && '15px')};
`;

const ImageContainer = styled.div<{ size: string; text: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: ${({ text }) => (text === true ? '85%' : '100%')};
  color: ${({ theme }) => theme.colors.secondary};
  .poster {
    border-radius: ${({ size, text }) =>
      text === true
        ? (size === 'small' && '15px 15px 0 0') ||
          (size === 'medium' && '20px 20px 0 0') ||
          (size === 'big' && '20px 20px 0 0')
        : (size === 'small' && '15px') ||
          (size === 'medium' && '20px') ||
          (size === 'big' && '25px')};
  }
`;

const Title = styled.h4<{ text: boolean }>`
  padding: 4px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 15%;
  width: 100%;
  display: ${({ text }) => (text === true ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font: 1rem Roboto, sans-serif;
  color: ${({ theme }) => theme.colors.highText};
`;
