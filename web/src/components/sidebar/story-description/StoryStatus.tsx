import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        sectionContainer: {
            marginTop: '20px',
        },
        blockTextField: {
            width: '100%',
        },
        button: {
            flexGrow: 1,
            flexBasis: 0,
            height: '45px',
            fontSize: '18px',
            fontFamily: 'Roboto',
        },
        readyButton: {
            borderBottomLeftRadius: '5px',
            borderTopLeftRadius: '5px',
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#a2ffa0',
                color: 'green',
                borderColor: '#a2ffa0',
            },
        },
        acceptedButton: {
            backgroundColor: '#a2ffa0',
            color: 'green',
            borderColor: '#a2ffa0',
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'row',
        },
        blockButton: {
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: '5px',
            borderTopRightRadius: '5px',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#ffbdb9',
                color: 'red',
                borderColor: '#ffbdb9',
            },
        },
        blockedButton: {
            backgroundColor: '#ffbdb9',
            color: 'red',
            borderColor: '#ffbdb9',
        },
        title: {
            fontFamily: 'Poppins',
            fontSize: '20px',
            marginBottom: '7px',
        },
    })
);

export interface IStoryStatusProps {
    isBlocked: boolean;
    isReady: boolean;
    blockReason: string;
    name: string;
    onSetStoryReady: () => void;
    onSetStoryBlocked: () => void;
    onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StoryStatus = (props: IStoryStatusProps) => {
    const classes = useStyles();
    const { isBlocked, isReady, blockReason, name, onSetStoryReady, onSetStoryBlocked, onChangeValue } = props;

    return (
        <div className={classes.sectionContainer}>
            <p className={classes.title}>Status</p>
            <div className={classes.buttonContainer}>
                <Button
                    className={classnames(classes.button, { [classes.acceptedButton]: isReady })}
                    startIcon={<CheckCircleOutlinedIcon />}
                    onClick={onSetStoryReady}
                    variant="outlined"
                >
                    Ready
                </Button>
                <Button
                    className={classnames(classes.button, classes.blockButton, { [classes.blockedButton]: isBlocked })}
                    startIcon={<BlockOutlinedIcon />}
                    onClick={onSetStoryBlocked}
                    variant="outlined"
                >
                    Block
                </Button>
            </div>
            {isBlocked && (
                <div>
                    <p className={classes.title}>Block Reason:</p>
                    <TextField
                        className={classes.blockTextField}
                        name={name}
                        value={blockReason}
                        onChange={onChangeValue}
                        variant="outlined"
                    />
                </div>
            )}
        </div>
    );
};

export default StoryStatus;
