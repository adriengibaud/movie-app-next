import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFilmByName,
  selectFilms,
  statusFilms,
  fetchFilmById,
} from '../reducers/filmsSlice';

const film = () => {
  const [activeFilm, setActiveFilm] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(statusFilms);
  const films = useSelector(selectFilms);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
    if (id) dispatch(fetchFilmById(id));
  }, [id]);

  return (
    <div>
      {id}
      {activeFilm && <h3>{activeFilm.original_title}</h3>}
    </div>
  );
};

export default film;
