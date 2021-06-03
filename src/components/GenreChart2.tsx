import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserList } from '../reducers/userSlice';
import { selectGenre } from '../reducers/genreSlice';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { selectTheme } from '../reducers/themeSlice';

const GenreChart2 = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const userList = useSelector(selectUserList);
  const genresList = useSelector(selectGenre);
  const theme = useSelector(selectTheme);

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
      const completeData = support
        .filter((e) => e.value > 0)
        .sort((a, b) => (b.value > a.value ? 1 : a.value > b.value ? -1 : 0))
        .slice(0, 12);
      setData(completeData.map((e) => e.value));
      setCategories(completeData.map((e) => e.name));
    }
    console.log(data);
  }, [userList, genresList]);

  if (typeof Highcharts === 'object') {
    HighchartsMore(Highcharts);
  }

  let count = 0;
  let secondCount = 0;

  const options = {
    chart: {
      polar: true,
    },
    title: {
      text: 'Your most liked genre',
      style: {
        color: theme === 'dark' ? '#66fcf1' : '#00838f',
      },
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
    },

    xAxis: {
      labels: {
        formatter: function () {
          if (categories[count]) {
            const value = categories[count];
            count++;
            return value;
          }
        },
      },
      max: data[0],
    },
    tooltip: {
      formatter: function () {
        return this.y;
      },
    },
    yAxis: {
      labels: {
        enabled: false,
      },
      max: data[0],
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'area',
        name: 'Genres',
        data,
        fillColor: theme === 'dark' ? '#a0ffff' : '#4fb3bf',
        color: theme === 'dark' ? '#66fcf1' : '#00838f',
      },
    ],
  };

  return (
    <Container>
      {categories.length > 0 && (
        <h1>
          {categories[4]} {data[5]}
        </h1>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Container>
  );
};

export default GenreChart2;

const Container = styled.div`
  .highcharts-background {
    fill: rgba(0, 0, 0, 0);
  }
`;
