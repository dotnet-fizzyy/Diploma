import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { SortDirection } from '../../../constants/story';
import { UserPosition, UserRole } from '../../../constants/user';
import { ISelectedItem } from '../../../types/story';
import { ITeam } from '../../../types/team';
import Button from '../../common/Button';
import Dropdown from '../../common/Dropdown';
import EpicDisplay from './EpicDisplay';
import SortSwitch from './SortSwitch';
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
            alignItems: 'center',
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
        epicsContainer: {
            marginRight: '30px',
        },
        buttonContainer: {
            width: '140px',
            marginLeft: '20px',
        },
        text: {
            fontSize: '20px',
            fontFamily: 'Poppins',
            fontWeight: 500,
            color: '#242126',
        },
        projectLabel: {
            fontSize: '16px',
            color: '#AFC1C4',
        },
    })
);

export interface IBoardTabProps {
    userId: string;
    userRole: UserRole;
    userPosition: UserPosition;
    team: ITeam;
    selectedSprintId: string;
    sortFields: ISelectedItem[];
    sprints: ISelectedItem[];
    selectedEpicId: string;
    epics: ISelectedItem[];
    sortType: string;
    sortDirection: SortDirection;
    onChangeEpic: (e) => void;
    onChangeSortType: (e) => void;
    onChangeSprint: (e) => void;
    onClickAddStory: () => void;
    onClickCreateUser: () => void;
    onChangeSortDirection: (value: SortDirection) => void;
}

const BoardTab = (props: IBoardTabProps) => {
    const classes = useStyles();
    const {
        team,
        userRole,
        userPosition,
        userId,
        selectedEpicId,
        selectedSprintId,
        epics,
        sprints,
        sortFields,
        sortType,
        sortDirection,
        onChangeSortType,
        onClickAddStory,
        onChangeEpic,
        onChangeSprint,
        onClickCreateUser,
        onChangeSortDirection,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.tabContainer}>
                <EpicDisplay selectedEpicId={selectedEpicId} epics={epics} onChangeEpic={onChangeEpic} />
                <TeamMembers
                    team={team}
                    userId={userId}
                    userRole={userRole}
                    userPosition={userPosition}
                    onClickCreateUser={onClickCreateUser}
                />
                <div className={classes.selectContainer}>
                    <SortSwitch value={sortDirection} onChangeSortDirection={onChangeSortDirection} />
                </div>
                <div className={classes.selectContainer}>
                    <Dropdown value={sortType} items={sortFields} onChangeEvent={onChangeSortType} isOutlined={true} />
                </div>
                <div className={classes.selectContainer}>
                    <Dropdown
                        value={selectedSprintId}
                        items={sprints}
                        onChangeEvent={onChangeSprint}
                        isOutlined={true}
                    />
                </div>
                <div className={classes.buttonContainer}>
                    <Button startIcon={<AddIcon />} onClick={onClickAddStory} label="Add task" disabled={false} />
                </div>
            </div>
        </div>
    );
};

export default BoardTab;
