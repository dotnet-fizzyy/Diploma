import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import HistoryIcon from '@material-ui/icons/History';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { storyFields } from '../../constants/storyConstants';
import { ISelectedItem, IStory } from '../../types/storyTypes';
import StoryConfirmChanges from './story-description/StoryConfirmChanges';
import StoryDropdownMenu from './story-description/StoryDropdownMenu';
import StoryStatus from './story-description/StoryStatus';
import StoryTextField from './story-description/StoryTextField';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            minWidth: '450px',
            width: '100%',
            minHeight: '100%',
            position: 'relative',
        },
        closeSidebarIcon: {
            position: 'absolute',
            fontSize: '30px',
            top: '0.5%',
            right: '0.5%',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        body: {
            padding: '0 20px 20px 20px',
        },
        isModalVisible: {
            paddingBottom: '120px',
        },
        nameContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '30px',
        },
        sectionContainer: {
            marginTop: '30px',
        },
        rootSelectStyle: {
            width: '100%',
        },
        multiLineTextField: {
            width: '100%',
        },
        spinnerContainer: {
            position: 'absolute',
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5,
        },
        link: {
            textDecoration: 'none',
        },
        historyButton: {
            margin: '20px 0 0 20px',
            backgroundColor: '#75BAF7',
            color: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            fontFamily: 'Roboto, sans-serif',
            textTransform: 'capitalize',
            border: 'none',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                color: '#75BAF7',
                boxShadow: 'none',
            },
        },
        icon: {
            fontSize: '18px',
            marginRight: '3px',
        },
    })
);

export interface ISidebarProps {
    hasStoryChanged: boolean;
    isSpinnerVisible: boolean;
    story: IStory;
    team: ISelectedItem[];
    sprints: ISelectedItem[];
    storyPriorities: ISelectedItem[];
    storyEstimates: ISelectedItem[];
    onCloseTab: () => void;
    onSetStoryBlocked: () => void;
    onSetStoryReady: () => void;
    onClickCancelChanges: () => void;
    onClickConfirmChanges: () => void;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Sidebar = (props: ISidebarProps) => {
    const classes = useStyles();
    const {
        isSpinnerVisible,
        hasStoryChanged,
        story: {
            storyId,
            title,
            userId,
            estimate,
            description,
            notes,
            sprintId,
            isReady,
            isBlocked,
            blockReason,
            storyPriority,
        },
        team,
        storyEstimates,
        sprints,
        storyPriorities,
        onCloseTab,
        onSetStoryReady,
        onSetStoryBlocked,
        onClickConfirmChanges,
        onClickCancelChanges,
        onChangeTextField,
    } = props;

    return (
        <div className={classes.root}>
            {isSpinnerVisible && (
                <div className={classes.spinnerContainer}>
                    <CircularProgress color="primary" />
                </div>
            )}
            <CloseIcon className={classes.closeSidebarIcon} onClick={onCloseTab} />
            <Link className={classes.link} to={`/history/${storyId}`} target="_blank" rel="noopener noreferrer">
                <Button className={classes.historyButton} variant="outlined">
                    <HistoryIcon className={classes.icon} /> View History
                </Button>
            </Link>
            <div
                className={classnames(classes.body, {
                    [classes.isModalVisible]: hasStoryChanged,
                })}
            >
                <StoryTextField
                    name={storyFields.title}
                    value={title}
                    title={'Story name'}
                    onChangeValue={onChangeTextField}
                />

                <StoryStatus
                    isBlocked={isBlocked}
                    isReady={isReady}
                    blockReason={blockReason}
                    name={storyFields.blockReason}
                    onSetStoryReady={onSetStoryReady}
                    onSetStoryBlocked={onSetStoryBlocked}
                    onChangeValue={onChangeTextField}
                />

                <StoryDropdownMenu
                    id={userId}
                    name={storyFields.userId}
                    disabled={false}
                    title={'Owner'}
                    items={team}
                    onChangeItem={onChangeTextField}
                />

                <StoryDropdownMenu
                    id={storyPriority.toUpperCase()}
                    name={storyFields.storyPriority}
                    disabled={false}
                    title={'Priority'}
                    items={storyPriorities}
                    onChangeItem={onChangeTextField}
                />

                <StoryDropdownMenu
                    id={sprintId}
                    name={storyFields.sprintId}
                    disabled={true}
                    title={'Sprint'}
                    items={sprints}
                    onChangeItem={onChangeTextField}
                />

                <div className={classes.sectionContainer}>
                    <StoryDropdownMenu
                        id={estimate.toString()}
                        name={storyFields.estimate}
                        disabled={true}
                        title={'Estimate'}
                        items={storyEstimates}
                        onChangeItem={onChangeTextField}
                    />
                </div>

                <StoryTextField
                    value={description}
                    name={storyFields.description}
                    title={'Description'}
                    onChangeValue={onChangeTextField}
                    isTextArea={true}
                />

                <StoryTextField
                    name={storyFields.notes}
                    value={notes}
                    title={'Notes'}
                    onChangeValue={onChangeTextField}
                    isTextArea={true}
                />
            </div>
            {hasStoryChanged && (
                <StoryConfirmChanges
                    onClickCancelChanges={onClickCancelChanges}
                    onClickConfirmChanges={onClickConfirmChanges}
                />
            )}
        </div>
    );
};

export default React.memo(Sidebar);
