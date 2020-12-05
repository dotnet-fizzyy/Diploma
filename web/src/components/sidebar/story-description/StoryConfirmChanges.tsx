import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: 0,
            maxWidth: '450px',
            width: '100%',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            borderTop: '1px solid black',
        },
        body: {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-around',
        },
        button: {
            height: '45px',
            width: '150px',
            border: 'none',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '18px',
            textTransform: 'capitalize',
            boxShadow: 'none',
            transition: 'unset',
        },
        saveButton: {
            color: '#FFF',
            backgroundColor: '#75BAF7',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                color: '#75BAF7',
                boxShadow: 'none',
            },
        },
        cancelButton: {
            color: '#75BAF7',
            backgroundColor: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            border: '1px solid lightgrey',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
                border: 'none',
            },
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
            <div className={classes.body}>
                <Button
                    className={classnames(classes.button, classes.saveButton)}
                    variant="outlined"
                    onClick={onClickConfirmChanges}
                >
                    Save
                </Button>
                <Button
                    className={classnames(classes.button, classes.cancelButton)}
                    variant="outlined"
                    onClick={onClickCancelChanges}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default StoryConfirmChanges;
