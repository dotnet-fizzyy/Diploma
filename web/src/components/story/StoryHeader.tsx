import { createStyles, makeStyles } from '@material-ui/core/styles';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import classnames from 'classnames';
import moment from 'moment';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        header: {
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        storyCreationDate: {
            marginLeft: '15px',
            fontSize: '12px',
            color: '#AFC1C4',
            fontWeight: 500,
            fontFamily: 'Poppins',
        },
        iconBlock: {
            fontSize: '22px',
            color: '#FF3838',
            margin: '0 2px 0 5px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        isBlocked: {
            backgroundColor: '#FF3838',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        iconReady: {
            fontSize: '22px',
            color: '#a2ffa0',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        isReady: {
            backgroundColor: '#a2ffa0',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        iconMain: {
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
            marginLeft: '10px',
        },
        isDefect: {
            backgroundColor: 'darkorange',
        },
        isStory: {
            backgroundColor: '#3272d9',
        },
        actionButtons: {
            display: 'inherit',
            flexDirection: 'inherit',
            alignItems: 'inherit',
        },
    })
);

export interface IStoryHeaderProps {
    children: React.ReactNode;
    recordVersion: number;
    creationDate: Date;
    storyId: string;
    isDefect: boolean;
    isReady: boolean;
    isBlocked: boolean;
    onMakeStoryReady: (storyId: string, recordVersion: number) => void;
    onMakeStoryBlocked: (storyId: string) => void;
}

const StoryHeader = (props: IStoryHeaderProps) => {
    const classes = useStyles();
    const {
        children,
        creationDate,
        storyId,
        recordVersion,
        isReady,
        isBlocked,
        onMakeStoryReady,
        onMakeStoryBlocked,
    } = props;

    const onClickMakeStoryReady = (): void => {
        onMakeStoryReady(storyId, recordVersion);
    };

    const onClickMakeStoryBlocked = (): void => {
        onMakeStoryBlocked(storyId);
    };

    return (
        <div className={classes.header}>
            <span className={classes.storyCreationDate}>{moment(creationDate).format('LL')}</span>
            <div className={classes.actionButtons}>
                <CheckCircleOutlinedIcon
                    className={classnames(classes.iconReady, {
                        [classes.isReady]: isReady,
                    })}
                    onClick={onClickMakeStoryReady}
                />
                <BlockOutlinedIcon
                    className={classnames(classes.iconBlock, {
                        [classes.isBlocked]: isBlocked,
                    })}
                    onClick={onClickMakeStoryBlocked}
                />
                {children}
            </div>
        </div>
    );
};

export default React.memo(StoryHeader);
