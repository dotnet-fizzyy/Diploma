import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import classnames from 'classnames';
import React from 'react';
import { ITeam } from '../../../types/teamTypes';

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
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                cursor: 'pointer',
            },
            height: '50px',
            display: 'flex',
            alignItems: 'center',
        },
        teamName: {
            width: '200px',
        },
        button: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            width: '145px',
            height: '45px',
            fontSize: '16px',
            textTransform: 'capitalize',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                border: '1px solid lightgrey',
                backgroundColor: '#E8F4FF',
                color: '#75BAF7',
                boxShadow: 'none',
            },
        },
        manageButton: {
            height: 'auto',
            marginRight: '20px',
        },
    })
);

export interface ITeamsViewerProps {
    teams: ITeam[];
    onTeamSelect: (value: string) => void;
    onClickAddTeam: () => void;
}

const TeamsViewer = (props: ITeamsViewerProps) => {
    const classes = useStyles();
    const { teams, onTeamSelect, onClickAddTeam } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <div>
                    <Button
                        onClick={onClickAddTeam}
                        className={classes.button}
                        variant="outlined"
                        startIcon={<AddIcon />}
                    >
                        Add team
                    </Button>
                </div>
                <span className={classes.header}>Your teams</span>
                <div className={classes.body}>
                    {teams && teams.length
                        ? teams.map((team) => (
                              <div key={team.teamId} className={classes.teamLink}>
                                  <span className={classes.teamName}>{team.teamName}</span>
                                  <Button
                                      className={classnames(classes.button, classes.manageButton)}
                                      variant="outlined"
                                      onClick={() => onTeamSelect(team.teamId)}
                                  >
                                      Manage team
                                  </Button>
                                  <Button variant="outlined" disabled={true}>
                                      Disable team
                                  </Button>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};

export default TeamsViewer;
