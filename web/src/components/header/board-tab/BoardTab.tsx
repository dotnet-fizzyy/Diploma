import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import Button from '../../common/Button';
import BoardTabDropdown from './BoardTabDropdown';
import EpicDisplay from './EpicDisplay';
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
    team: ITeam;
    selectedSprintId: string;
    sortFields: ISelectedItem[];
    sprints: ISelectedItem[];
    selectedEpicId: string;
    epics: ISelectedItem[];
    sortType: string;
    onChangeEpic: (e) => void;
    onChangeSortType: (e) => void;
    onChangeSprint: (e) => void;
    onClickAddStory: () => void;
    onClickCreateUser: () => void;
}

const BoardTab = (props: IBoardTabProps) => {
    const classes = useStyles();
    const {
        team,
        userId,
        selectedEpicId,
        selectedSprintId,
        epics,
        sprints,
        sortFields,
        sortType,
        onChangeSortType,
        onClickAddStory,
        onChangeEpic,
        onChangeSprint,
        onClickCreateUser,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.tabContainer}>
                <EpicDisplay selectedEpicId={selectedEpicId} epics={epics} onChangeEpic={onChangeEpic} />
                <TeamMembers team={team} userId={userId} onClickCreateUser={onClickCreateUser} />
                <div className={classes.selectContainer}>
                    <BoardTabDropdown
                        value={sortType}
                        items={sortFields}
                        onChangeEvent={onChangeSortType}
                        isOutlined={true}
                    />
                </div>
                <div className={classes.selectContainer}>
                    <BoardTabDropdown
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
