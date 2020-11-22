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
    onSetStoryReady: () => void;
    onSetStoryBlocked: () => void;
    onChangeStoryBlockedReason: (value: string) => void;
}

const StoryStatus = (props: IStoryStatusProps) => {
    const classes = useStyles();
    const { isBlocked, blockReason, onSetStoryReady, onSetStoryBlocked, onChangeStoryBlockedReason } = props;

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
            {isBlocked && (
                <TextField
                    value={blockReason}
                    onChange={(event: { target: { value: string } }) => onChangeStoryBlockedReason(event.target.value)}
                    variant="outlined"
                />
            )}
        </div>
    );
};

export default StoryStatus;
