import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
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
        },
        sprintHeader: {
            marginTop: '20px',
            fontFamily: 'Poppins',
            fontSize: '18px',
            fontStyle: 'italic',
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
    const { epic, sprints } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <span className={classes.header}>Epic: {epic.epicName}</span>
                {sprints && sprints.length
                    ? sprints.map((sprint) => {
                          return (
                              <React.Fragment key={sprint.sprintId}>
                                  <span className={classes.sprintHeader}>Sprint: {sprint.sprintName}</span>
                                  {/*<BarChart width={600} height={500} data={data} style={{ height: '540px' }}>*/}
                                  {/*    <CartesianGrid strokeDasharray="3 3" />*/}
                                  {/*    <XAxis dataKey="name" />*/}
                                  {/*    <YAxis />*/}
                                  {/*    <Tooltip />*/}
                                  {/*    <Legend />*/}
                                  {/*    <Bar dataKey="accepted" fill="#a2ffa0" />*/}
                                  {/*    <Bar dataKey="blocked" fill="#FF3838" />*/}
                                  {/*    <Bar dataKey="released" fill="#82ca9d" />*/}
                                  {/*</BarChart>*/}
                              </React.Fragment>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default Charts;
