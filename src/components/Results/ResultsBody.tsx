import styled from 'styled-components';
import { Results } from '../../Types/resultsTypes';
import Spinner from '../../components/Spinner';
import FilmCard from '../../components/Card/FilmCard';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

const ResultsBody = ({
  size,
  totalPages,
  moreResults,
  text,
  data,
  type,
  status,
}: Results) => {
  const router = useRouter();

  const buttonText = () => {
    return status === 'pending' ? <Spinner /> : 'Load more';
  };

  const clickHandler = (id) => {
    if (type === 'film') router.push(`/film?id=${id}`);
  };

  const body = () => {
    if (data.length > 0) {
      return (
        <>
          {data.map((element) => (
            <FilmCard
              text={text}
              key={element.id}
              clickHandler={() => clickHandler(element.id)}
              id={element.id}
              title={element.original_title}
              size={size}
              image={
                element.poster_path === null
                  ? null
                  : `https://image.tmdb.org/t/p/w200/${element.poster_path}`
              }
            />
          ))}
        </>
      );
    }
  };

  return (
    <>
      {data.length > 0 && <ResultContainer>{body()}</ResultContainer>}
      {totalPages > 1 && (
        <ButtonContainer>
          <Button text={buttonText()} clickHandler={() => moreResults()} />
        </ButtonContainer>
      )}

      {status === 'pending' && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </>
  );
};

export default ResultsBody;

const SpinnerContainer = styled.div`
  width: 100%;
  height: calc(100% - 64px);
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 200px;
`;
