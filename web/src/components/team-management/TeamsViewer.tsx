import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ITeam } from '../../types/teamTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        header: {
            marginTop: '20px',
            fontSize: '26px',
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        teamLink: {
            fontSize: '18px',
            color: 'lightBlue',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    })
);

export interface ITeamsViewerProps {
    teams: ITeam[];
    onTeamSelect: (value: string) => void;
}

const TeamsViewer = (props: ITeamsViewerProps) => {
    const classes = useStyles();
    const { teams, onTeamSelect } = props;

    return (
        <div className={classes.root}>
            <span className={classes.header}>Your teams</span>
            <div className={classes.body}>
                {teams && teams.length
                    ? teams.map((team) => (
                          <div key={team.teamId} className={classes.teamLink} onClick={() => onTeamSelect(team.teamId)}>
                              {team.teamName}
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};

export default TeamsViewer;
