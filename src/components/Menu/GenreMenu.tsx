import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../app/store';
import { Router, useRouter } from 'next/router';
import styled from 'styled-components';
import {
  fetchGenre,
  selectGenre,
  setGenreActive,
  setGenreInactive,
  selectActiveGenre,
} from '../../reducers/genreSlice';
import Chip from '../Chip';
import { statusFilms } from '../../reducers/filmsSlice';

const GenreMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeGenre = useSelector(selectActiveGenre);
  const genre = useSelector(selectGenre);

  const status = useSelector(statusFilms);

  useEffect(() => {
    if (genre.length === 0) {
      dispatch(fetchGenre());
    }
  }, [genre]);

  const submit = (e) => {
    dispatch(setGenreActive(e.target.value));
    const genre = store.getState();
    router.push(
      `/search/genre?id=${genre.genre
        .filter((e) => e.isActive === true)
        .map((e) => e.id)
        .join(' ')}`
    );
  };

  const setInactive = (id) => {
    dispatch(setGenreInactive(id));
    const genre = store.getState();
    router.push(
      `/search/genre?id=${genre.genre
        .filter((e) => e.isActive === true)
        .map((e) => e.id)
        .join(' ')}`
    );
  };

  return (
    <Container>
      <Title>Search by genre</Title>
      <ChipContainer>
        {genre
          .filter((e) => e.isActive === true)
          .map((e) => (
            <Chip
              key={e.id}
              cancelButton={true}
              text={e.name}
              clickHandler={() => setInactive(e.id)}
            />
          ))}
      </ChipContainer>
      <Select onChange={submit}>
        {genre.map((e) => {
          return (
            <Option key={e.id} value={e.id}>
              {e.name}
            </Option>
          );
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
