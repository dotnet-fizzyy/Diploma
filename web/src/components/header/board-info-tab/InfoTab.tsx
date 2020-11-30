import { Button, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { IEpic } from '../../../types/epicTypes';
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
    epic: IEpic;
    epics: ISelectedItem[];
    sortType: string;
    onChangeEpic: (value: string) => void;
    onChangeSortType: (value: string) => void;
    onClickAddStory: () => void;
}

const InfoTab = (props: IInfoTabProps) => {
    const classes = useStyles();
    const { team, user, epic, epics, sortFields, sortType, onChangeSortType, onClickAddStory, onChangeEpic } = props;

    const getDropdown = (
        title: string,
        value: string,
        items: ISelectedItem[],
        onChangeEvent: (value: string) => void
    ): React.ReactNode => {
        return (
            <>
                <span>{title}: </span>
                <Select variant="outlined" value={value} onChange={(event: any) => onChangeEvent(event.target.value)}>
                    {items &&
                        items.map((x) => (
                            <MenuItem key={x.key} value={x.value}>
                                {x.value}
                            </MenuItem>
                        ))}
                </Select>
            </>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.projectsSelector}>
                <p>Projects</p>
            </div>
            <div className={classes.buttonsContainer}>
                {epic && <div>{getDropdown('Epic', epic.epicId, epics, onChangeEpic)}</div>}
                <TeamMembers team={team} user={user} />
                <div>{getDropdown('Sort by', sortType, sortFields, onChangeSortType)}</div>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddStory}>
                    Add task
                </Button>
            </div>
        </div>
    );
};

export default InfoTab;
