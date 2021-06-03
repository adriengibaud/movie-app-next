import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserList } from '../reducers/userSlice';
import { selectGenre } from '../reducers/genreSlice';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Label,
  Text,
} from 'recharts';

const GenreChart = () => {
  const [data, setData] = useState([]);

  const userList = useSelector(selectUserList);
  const genresList = useSelector(selectGenre);

  useEffect(() => {
    if (userList.length > 0 && genresList.length > 0) {
      let support = genresList.map((e) => {
        return {
          name: e.name,
          id: e.id,
          value: 0,
        };
      });
      userList.map((e) => {
        e.genres.map((p) => {
          support = support.map((t) =>
            t.id == p ? { ...t, value: t.value + 1 } : t
          );
        });
      });
      console.log(
        support
          .filter((e) => e.value > 0)
          .sort((a, b) => (b.value > a.value ? 1 : a.value > b.value ? -1 : 0))
          .slice(0, 8)
      );
      setData(
        support
          .filter((e) => e.value > 0)
          .sort((a, b) => (b.value > a.value ? 1 : a.value > b.value ? -1 : 0))
          .slice(0, 8)
      );
    }
  }, [userList, genresList]);

  const chartBody = () => {
    if (data.length > 0) {
      return (
        <RadarChart
          cx={175}
          cy={175}
          outerRadius={100}
          width={350}
          height={350}
          data={data}
          style={{ fill: '#8884d8' }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey='name'>
            <Text angle={40} />
          </PolarAngleAxis>
          <Radar
            name='Genre'
            dataKey='value'
            stroke='#8884d8'
            fill='#8884d8'
            fillOpacity={0.6}
          />
        </RadarChart>
      );
    }
  };

  return <>{data && <Container>{chartBody()}</Container>}</>;
};

export default GenreChart;

const Container = styled.div`
  color: white;
  margin: 0 auto;
  max-width: 600px;
  max-height: 600px;
  min-height: 360px;
  min-width: 360px;
`;
