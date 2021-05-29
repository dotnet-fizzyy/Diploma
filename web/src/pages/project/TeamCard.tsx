import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import InfoIcon from '@material-ui/icons/Info';
import classnames from 'classnames';
import React from 'react';
import { ITeamSimpleModel } from '../../types/teamTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            padding: '20px',
            boxSizing: 'border-box',
            border: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.2)',
            borderRadius: '5px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            fontWeight: 500,
            color: '#242126',
        },
        buttonsContainer: {
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'row',
        },
        buttonContainer: {
            width: '30px',
            height: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        primaryButton: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
        },
        removeButton: {
            backgroundColor: '#ffbdb9',
            color: 'red',
        },
    })
);

export interface ITeamCardProps {
    team: ITeamSimpleModel;
    onClickViewTeam: (teamId: string) => void;
    onClickRemoveTeam: (teamId: string) => void;
}

const TeamCard = (props: ITeamCardProps) => {
    const classes = useStyles();
    const { team, onClickViewTeam, onClickRemoveTeam } = props;

    return (
        <div className={classes.root}>
            <span className={classes.text}>{team.teamName}</span>
            <div className={classes.buttonsContainer}>
                <div
                    className={classnames(classes.buttonContainer, classes.primaryButton)}
                    onClick={() => onClickViewTeam(team.teamId)}
                >
                    <InfoIcon fontSize="small" />
                </div>
                <div
                    className={classnames(classes.buttonContainer, classes.removeButton)}
                    onClick={() => onClickRemoveTeam(team.teamId)}
                >
                    <DeleteOutlineIcon fontSize="small" />
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
