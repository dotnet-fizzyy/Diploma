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
        buttonContainer: {
            width: '120px',
        },
    })
);

export interface IStoryConfirmChangesProps {
    disabled: boolean;
    onClickCancelChanges: () => void;
}

const StoryConfirmChanges = (props: IStoryConfirmChangesProps) => {
    const classes = useStyles();
    const { disabled, onClickCancelChanges } = props;

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div className={classes.buttonContainer}>
                    <Button label="Save" buttonVariant={ButtonVariant.DEFAULT} type="submit" disabled={disabled} />
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        buttonVariant={ButtonVariant.SECONDARY}
                        label="Cancel"
                        onClick={onClickCancelChanges}
                        disabled={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default StoryConfirmChanges;
