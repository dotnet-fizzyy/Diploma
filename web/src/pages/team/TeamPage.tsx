import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ITeam } from '../../types/teamTypes';
import TeamPageDescriptionContainer from './TeamPageDescriptionContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FAFAFA',
        },
    })
);

export interface ITeamPageProps {
    team: ITeam;
}

const TeamPage = (props: ITeamPageProps) => {
    const classes = useStyles();
    const { team } = props;

    return <div className={classes.root}>{team && team.teamId && <TeamPageDescriptionContainer team={team} />}</div>;
};

export default TeamPage;
