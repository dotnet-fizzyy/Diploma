import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ISelectedItem } from '../../types/storyTypes';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import MainLabel, { LabelType } from '../common/MainLabel';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            marginTop: '20px',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        dropdownContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        buttonContainer: {
            display: 'flex',
            alignItems: 'flex-end',
        },
    })
);

export interface IStatsFilters {
    selectedEpicId: string;
    selectedSprintId: string;
    epics: ISelectedItem[];
    sprints: ISelectedItem[];
    onChangeEvent: (e) => void;
    onChangeSprint: (e) => void;
    onClickResetColumns: () => void;
}

const StatsFilters = (props: IStatsFilters) => {
    const classes = useStyles();
    const {
        selectedEpicId,
        selectedSprintId,
        epics,
        sprints,
        onChangeEvent,
        onChangeSprint,
        onClickResetColumns,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.dropdownContainer}>
                <MainLabel title="Epics" variant={LabelType.SECONDARY} />
                <Dropdown value={selectedEpicId} items={epics} onChangeEvent={onChangeEvent} isOutlined={true} />
            </div>
            <div className={classes.dropdownContainer}>
                <MainLabel title="Sprints" variant={LabelType.SECONDARY} />
                <Dropdown value={selectedSprintId} items={sprints} onChangeEvent={onChangeSprint} isOutlined={true} />
            </div>
            <div className={classes.buttonContainer}>
                <Button label="Reset columns" disabled={false} onClick={onClickResetColumns} />
            </div>
        </div>
    );
};

export default StatsFilters;
