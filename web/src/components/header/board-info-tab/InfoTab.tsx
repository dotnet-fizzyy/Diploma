import { Button, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import { IUser } from '../../../types/userTypes';
import TeamMembers from './TeamMembers';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minWidth: '100vh',
            height: '50px',
            backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'row',
        },
        projectsSelector: {
            display: 'inherit',
            justifyContent: 'center',
            margin: '0 auto 0 10px',
        },
        buttonsContainer: {
            display: 'inherit',
            justifyContent: 'center',
            margin: '0 10px 0 auto',
        },
    })
);

export interface IInfoTabProps {
    user: IUser;
    team: ITeam;
    sortFields: ISelectedItem[];
    sortType: string;
    onChangeSortType: (value: string) => void;
    onClickAddStory: () => void;
}

const InfoTab = (props: IInfoTabProps) => {
    const classes = useStyles();
    const { team, user, sortFields, sortType, onChangeSortType, onClickAddStory } = props;

    return (
        <div className={classes.root}>
            <div className={classes.projectsSelector}>
                <p>Projects</p>
            </div>
            <div className={classes.buttonsContainer}>
                <TeamMembers team={team} user={user} />
                <div>
                    <span>Sort by: </span>
                    <Select
                        variant="outlined"
                        value={sortType}
                        onChange={(event: any) => onChangeSortType(event.target.value)}
                    >
                        {sortFields.map((x) => (
                            <MenuItem key={x.key} value={x.value}>
                                {x.value}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddStory}>
                    Add task
                </Button>
            </div>
        </div>
    );
};

export default InfoTab;
