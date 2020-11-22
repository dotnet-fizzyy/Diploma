import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            height: '100px',
            backgroundColor: 'grey',
        },
    })
);

export interface IStoryConfirmChangesProps {
    onClickCancelChanges: () => void;
    onClickConfirmChanges: () => void;
}

const StoryConfirmChanges = (props: IStoryConfirmChangesProps) => {
    const classes = useStyles();
    const { onClickCancelChanges, onClickConfirmChanges } = props;

    return (
        <div className={classes.root}>
            <Button variant="outlined" onClick={onClickConfirmChanges}>
                Save
            </Button>
            <Button variant="outlined" onClick={onClickCancelChanges}>
                Cancel
            </Button>
        </div>
    );
};

export default StoryConfirmChanges;
