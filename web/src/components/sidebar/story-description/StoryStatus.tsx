import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        sectionContainer: {
            marginTop: '20px',
        },
    })
);

export interface IStoryStatusProps {
    isBlocked: boolean;
    blockReason: string;
    name: string;
    onSetStoryReady: () => void;
    onSetStoryBlocked: () => void;
    onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StoryStatus = (props: IStoryStatusProps) => {
    const classes = useStyles();
    const { isBlocked, blockReason, name, onSetStoryReady, onSetStoryBlocked, onChangeValue } = props;

    return (
        <div className={classes.sectionContainer}>
            <p>Status</p>
            <div>
                <Button startIcon={<CheckCircleOutlinedIcon />} onClick={onSetStoryReady} variant="outlined">
                    Ready
                </Button>
                <Button startIcon={<BlockOutlinedIcon />} onClick={onSetStoryBlocked} variant="outlined">
                    Block
                </Button>
            </div>
            {isBlocked && <TextField name={name} value={blockReason} onChange={onChangeValue} variant="outlined" />}
        </div>
    );
};

export default StoryStatus;
