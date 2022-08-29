import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import classnames from 'classnames';
import { Field } from 'formik';
import React from 'react';
import { storyFields } from '../../../constants/story';
import FormTextField from '../../common/FormTextField';

const useStyles = makeStyles(() =>
    createStyles({
        sectionContainer: {
            marginTop: '20px',
        },
        button: {
            flexGrow: 1,
            flexBasis: 0,
            height: '40px',
            fontSize: '18px',
            fontFamily: 'Roboto',
            fontWeight: 500,
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
            '& svg': {
                color: 'green',
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
            '& svg': {
                color: 'red',
            },
        },
        blockedButton: {
            backgroundColor: '#ffbdb9',
            color: 'red',
            borderColor: '#ffbdb9',
        },
        title: {
            fontFamily: 'Poppins',
            fontSize: '18px',
            marginBottom: '4px',
            color: 'rgb(117, 186, 247)',
            fontWeight: 600,
        },
    })
);

export interface IStoryStatusProps {
    isBlocked: boolean;
    isReady: boolean;
    onSetStoryReady: () => void;
    onSetStoryBlocked: () => void;
}

const StoryStatus = (props: IStoryStatusProps) => {
    const classes = useStyles();
    const { isBlocked, isReady, onSetStoryReady, onSetStoryBlocked } = props;

    return (
        <div className={classes.sectionContainer}>
            <span className={classes.title}>Status:</span>
            <div className={classes.buttonContainer}>
                <Button
                    className={classnames(classes.button, classes.readyButton, { [classes.acceptedButton]: isReady })}
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
                <div className={classes.sectionContainer}>
                    <Field name={storyFields.blockReason} label="Block Reason" component={FormTextField} />
                </div>
            )}
        </div>
    );
};

export default StoryStatus;
