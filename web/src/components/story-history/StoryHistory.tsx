import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { IStoryHistory } from '../../types/storyTypes';
import { ITeam } from '../../types/teamTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            backgroundColor: '#FAFAFA',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        header: {
            marginTop: '20px',
            fontSize: '26px',
            fontFamily: 'Poppins, sans-serif',
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        item: {
            marginTop: '20px',
            fontSize: '20px',
            fontFamily: 'Poppins',
        },
    })
);

export interface IStoryHistoryProps {
    storyHistory: IStoryHistory[];
    team: ITeam;
}

const StoryHistory = (props: IStoryHistoryProps) => {
    const classes = useStyles();
    const { storyHistory, team } = props;

    const getUserName = (userId: string): string =>
        team.users.some((x) => x.userId === userId) ? team.users.find((x) => x.userId === userId).userName : '';

    const getSection = (storyHistory: IStoryHistory, isFirst: boolean): React.ReactNode => {
        return (
            <div className={classes.item}>
                {isFirst ? (
                    <span>
                        <b>{getUserName(storyHistory.userName)}</b> has created this story at{' '}
                        {moment(storyHistory.creationDate).format('yyyy-MM-DD')}
                    </span>
                ) : (
                    <span>
                        <b>{getUserName(storyHistory.userName)}</b> has updated <b>{storyHistory.fieldName}</b> from{' '}
                        <b>{storyHistory.previousValue}</b> to <b>{storyHistory.currentValue}</b> at{' '}
                        {moment(storyHistory.creationDate).format('yyyy-MM-DD')}
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <span className={classes.header}>History of story:</span>
                <div className={classes.body}>
                    {storyHistory && storyHistory.length
                        ? storyHistory.map((x, index) => (
                              <React.Fragment key={x.storyHistoryId}>{getSection(x, index === 0)}</React.Fragment>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};

export default StoryHistory;
