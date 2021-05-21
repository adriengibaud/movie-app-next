import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  selectGenre,
  setGenreActive,
  setGenreInactive,
} from '../../reducers/genreSlice';
import Chip from '../Chip';

const GenreMenu = () => {
  const genre = useSelector(selectGenre);
  const dispatch = useDispatch();

  const submit = (e) => {
    console.log(e.target.value);
    dispatch(setGenreActive(e.target.value));
  };

  const setInactive = (id) => {
    dispatch(setGenreInactive(id));
  };

  return (
    <Container>
      <Title>Search by genre</Title>
      <ChipContainer>
        {genre
          .filter((e) => e.isActive === true)
          .map((e) => (
            <Chip
              cancelButton={true}
              text={e.name}
              clickHandler={() => setInactive(e.id)}
            />
          ))}
      </ChipContainer>
      <Select onChange={submit}>
        {genre.map((e) => {
          return <Option value={e.id}>{e.name}</Option>;
        })}
      </Select>
    </Container>
  );
};

export default GenreMenu;

const Container = styled.section`
  margin: 20px 0;
  font: 1rem Roboto, sans-serif;
`;

const Title = styled.span``;

const ChipContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3px;
  align-items: center;
  flex-wrap: wrap;
`;

const Select = styled.select`
  margin-top: 10px;
  height: 25px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.highText};
  color: ${({ theme }) => theme.colors.highText};
  :focus {
    outline: none;
  }
`;

const Option = styled.option`
  height: 100px;
`;
