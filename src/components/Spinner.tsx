import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selectTheme } from '../reducers/themeSlice';

const Spinner = () => {
  const theme = useSelector(selectTheme);

  return (
    <Loader
      type='Oval'
      color={theme === 'dark' ? '#66fcf1' : 'red'}
      height={80}
      width={80}
      timeout={0} //3 secs
    />
  );
};

export default Spinner;
