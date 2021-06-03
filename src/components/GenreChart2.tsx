import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserList } from '../reducers/userSlice';
import { selectGenre } from '../reducers/genreSlice';
import Highcharts, { color } from 'highcharts';
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
        .slice(0, 12)
        .sort((a, b) => (b.name > a.name ? -1 : a.name > b.name ? 1 : 0));
      setData(completeData.map((e) => e.value));
      setCategories(completeData.map((e) => e.name));
    }
  }, [userList, genresList]);

  if (typeof Highcharts === 'object') {
    HighchartsMore(Highcharts);
  }

  let count = 0;

  const options = {
    chart: {
      polar: true,
    },
    title: {
      text: 'Your most liked genre',
      style: {
        color: theme === 'dark' ? 'rgba(255,255,255,0.87)' : 'rgba(0,0,0,0.87)',
      },
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
    },
    tooltip: {
      formatter: function () {
        return this.y;
      },
    },
    legend: {
      enabled: false,
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
        style: {
          color: theme === 'dark' ? '#66fcf1' : '#00838f',
        },
      },
    },
    yAxis: {
      labels: {
        enabled: false,
      },
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
    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 450,
          },
          chartOptions: {
            xAxis: {
              labels: {
                formatter: function () {
                  if (categories[count]) {
                    const value = categories[count];
                    count++;
                    return value;
                  }
                },
                align: 'center',
                x: 0,
                y: 7,
              },
            },
          },
        },
      ],
    },
  };

  return (
    <Container>
      {userList.length > 10 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <NoChartText>Add more film to see your chart</NoChartText>
      )}
    </Container>
  );
};

export default GenreChart2;

const Container = styled.div`
  .highcharts-background {
    fill: rgba(0, 0, 0, 0);
  }
`;

const NoChartText = styled.h4`
  width: 100%;
  font: 1.4rem Roboto, sans-serif;
  color: ${({ theme }) => theme.colors.highText};
  height: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
