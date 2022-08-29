import { createStyles, makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import classnames from 'classnames';
import React from 'react';
import { ISelectedItem } from '../../../types/story';
import Dropdown from '../../common/Dropdown';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto 0 0',
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
        icon: {
            paddingTop: '2px',
        },
        dropdownContainer: {
            marginTop: '8px',
        },
    })
);

export interface IProjectDisplayProps {
    selectedEpicId: string;
    epics: ISelectedItem[];
    onChangeEpic: (e) => void;
}

export const EpicDisplay = (props: IProjectDisplayProps) => {
    const classes = useStyles();
    const { selectedEpicId, epics, onChangeEpic } = props;

    return (
        <div className={classes.root}>
            <span className={classnames(classes.projectLabel)}>Epics</span>
            <NavigateNextIcon className={classes.icon} />
            <div className={classes.dropdownContainer}>
                {epics && epics.length ? (
                    <Dropdown value={selectedEpicId} items={epics} onChangeEvent={onChangeEpic} isOutlined={false} />
                ) : null}
            </div>
        </div>
    );
};

export default EpicDisplay;
