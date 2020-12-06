import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { teamStateFields } from '../../../constants/teamConstants';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '500px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
        },
        header: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            color: '#242126',
            fontWeight: 'bold',
        },
        fieldContainer: {
            margin: '20px 0',
        },
        textField: {
            width: '100%',
            marginTop: '10px',
        },
        footerItem: {
            flexBasis: '230px',
            flexShrink: 0,
        },
        button: {
            width: '150px',
            height: '40px',
            marginTop: '30px',
            backgroundColor: '#75BAF7',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            border: 'none',
            textTransform: 'capitalize',
            color: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

export interface ITeamCreationProps {
    team: ITeam;
    projects: ISelectedItem[];
    onChangeTeamField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onClickCreateTeam: () => void;
}

const TeamCreation = (props: ITeamCreationProps) => {
    const classes = useStyles();
    const { team, projects, onClickCreateTeam, onChangeTeamField } = props;

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a new team</span>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Name: </span>
                <TextField
                    variant="outlined"
                    value={team.teamName}
                    className={classes.textField}
                    name={teamStateFields.teamName}
                    onChange={onChangeTeamField}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Location: </span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    value={team.location}
                    name={teamStateFields.location}
                    onChange={onChangeTeamField}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Project: </span>
                <Select
                    value={team.projectId ? team.projectId : ''}
                    name={teamStateFields.projectId}
                    className={classes.textField}
                    onChange={(e: any) => onChangeTeamField(e)}
                    variant="outlined"
                >
                    {projects.map((item) => (
                        <MenuItem key={item.key} value={item.key}>
                            {item.value}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <Button onClick={onClickCreateTeam} className={classes.button}>
                Create team
            </Button>
        </div>
    );
};

export default TeamCreation;
