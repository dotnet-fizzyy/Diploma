import { Button, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { IEpic } from '../../../types/epicTypes';
import { IProject } from '../../../types/projectTypes';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import { IUser } from '../../../types/userTypes';
import TeamMembers from './TeamMembers';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minWidth: '100%',
            height: '70px',
        },
        tabContainer: {
            padding: '0 30px',
            height: 'inherit',
            display: 'flex',
            flexDirection: 'row',
        },
        projectsSelector: {
            display: 'inherit',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 0 0',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
        },
        arrowRight: {
            margin: '0 10px',
        },
        buttonsContainer: {
            display: 'inherit',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 0 0 auto',
        },
        selectContainer: {
            marginLeft: '30px',
        },
        selectStyle: {
            height: '45px',
            width: '140px',
        },
        selectTitle: {
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
        },
        tasksButton: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            width: '140px',
            height: '45px',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            marginLeft: '20px',
            textTransform: 'unset',
        },
        epicsContainer: {
            marginRight: '30px',
        },
    })
);

export interface IInfoTabProps {
    user: IUser;
    team: ITeam;
    project: IProject;
    sortFields: ISelectedItem[];
    epic: IEpic;
    epics: ISelectedItem[];
    sortType: string;
    onChangeEpic: (value: string) => void;
    onChangeSortType: (value: string) => void;
    onClickAddStory: () => void;
    onClickViewCharts: () => void;
}

const InfoTab = (props: IInfoTabProps) => {
    const classes = useStyles();
    const {
        project,
        team,
        user,
        epic,
        epics,
        sortFields,
        sortType,
        onChangeSortType,
        onClickAddStory,
        onChangeEpic,
        onClickViewCharts,
    } = props;

    const getDropdown = (
        title: string,
        value: string,
        items: ISelectedItem[],
        onChangeEvent: (value: string) => void
    ): React.ReactNode => {
        return (
            <>
                <span className={classes.selectTitle}>{title}: </span>
                <Select
                    className={classes.selectStyle}
                    variant="outlined"
                    value={value}
                    onChange={(event: any) => onChangeEvent(event.target.value)}
                >
                    {items &&
                        items.map((x) => (
                            <MenuItem key={x.key} value={x.key}>
                                {x.value}
                            </MenuItem>
                        ))}
                </Select>
            </>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.tabContainer}>
                <div className={classes.projectsSelector}>
                    <p>Projects</p>
                    <NavigateNextIcon className={classes.arrowRight} />
                    {project && <p>{project.projectName}</p>}
                </div>
                <div className={classes.buttonsContainer}>
                    {epic && (
                        <div className={classes.epicsContainer}>
                            {getDropdown('Epic', epic.epicId, epics, onChangeEpic)}
                        </div>
                    )}
                    <TeamMembers team={team} user={user} />
                    <div className={classes.selectContainer}>
                        {getDropdown('Sort by', sortType, sortFields, onChangeSortType)}
                    </div>
                    <Button
                        className={classes.tasksButton}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={onClickAddStory}
                    >
                        Add task
                    </Button>
                    <Button className={classes.tasksButton} variant="outlined" onClick={onClickViewCharts}>
                        View charts
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InfoTab;
