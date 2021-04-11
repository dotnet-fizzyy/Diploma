import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ITeam } from '../../types/teamTypes';
import TeamDescriptionPage from './TeamPageDescription';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#FAFAFA',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
        body: {
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            minHeight: '100%',
        },
    })
);

export interface ITeamPageProps {
    team: ITeam;
}

const TeamPage = (props: ITeamPageProps) => {
    const classes = useStyles();
    const { team } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>{team && team.teamId && <TeamDescriptionPage team={team} />}</div>
        </div>
    );
};

export default TeamPage;
