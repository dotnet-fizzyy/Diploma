import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { ColumnIds } from '../../constants/boardConstants';
import { IEpic } from '../../types/epicTypes';
import { ISprint } from '../../types/sprintTypes';
import { IStory } from '../../types/storyTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#FAFAFA',
        },
        header: {
            margin: '20px 0',
            fontSize: '26px',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            width: '100%',
        },
    })
);

export interface IChartsProps {
    sprints: ISprint[];
    epic: IEpic;
    stories: IStory[];
}

const Charts = (props: IChartsProps) => {
    const classes = useStyles();
    const { epic, sprints, stories } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <span className={classes.header}>Epic: {epic.epicName}</span>
                {sprints && sprints.length
                    ? sprints.map((sprint) => {
                          const storiesForSprint = stories.filter((x) => x.sprintId === sprint.sprintId);
                          const blockedStories = storiesForSprint.filter((x) => x.isBlocked);
                          const acceptedStories = storiesForSprint.filter((x) => x.columnType === ColumnIds.Confirmed);
                          const prodStories = storiesForSprint.filter((x) => x.columnType === ColumnIds.OnProd);

                          const data = [
                              {
                                  name: 'Confirmed',
                                  accepted: acceptedStories.length,
                              },
                              {
                                  name: 'Blocked',
                                  blocked: blockedStories.length,
                              },
                              {
                                  name: 'Released',
                                  released: prodStories.length,
                              },
                          ];

                          return (
                              <React.Fragment key={sprint.sprintId}>
                                  <BarChart width={600} height={500} data={data} style={{ height: '580px' }}>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="name" />
                                      <YAxis />
                                      <Tooltip />
                                      <Legend />
                                      <Bar dataKey="accepted" fill="#a2ffa0" />
                                      <Bar dataKey="blocked" fill="#FF3838" />
                                      <Bar dataKey="released" fill="#82ca9d" />
                                  </BarChart>
                              </React.Fragment>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Charts;
