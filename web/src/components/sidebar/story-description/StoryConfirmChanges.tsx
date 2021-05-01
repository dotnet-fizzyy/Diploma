import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button, { ButtonVariant } from '../../common/Button';

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
}

const StoryConfirmChanges = (props: IStoryConfirmChangesProps) => {
    const classes = useStyles();
    const { onClickCancelChanges } = props;

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <Button label="Save" buttonVariant={ButtonVariant.DEFAULT} type="submit" disabled={false} />
                <Button
                    buttonVariant={ButtonVariant.DEFAULT}
                    label="Cancel"
                    onClick={onClickCancelChanges}
                    disabled={false}
                />
            </div>
        </div>
    );
};

export default StoryConfirmChanges;
