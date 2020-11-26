import { TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import classnames from 'classnames';
import React from 'react';
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
            padding: '0 20px',
        },
        isModalVisible: {
            paddingBottom: '120px',
        },
        nameContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        sectionContainer: {
            marginTop: '20px',
        },
        rootSelectStyle: {
            width: '100%',
        },
        multiLineTextField: {
            width: '100%',
        },
    })
);

export interface ISidebarProps {
    hasStoryChanged: boolean;
    story: IStory;
    team: ISelectedItem[];
    sprints: ISelectedItem[];
    storyPriorities: ISelectedItem[];
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
        hasStoryChanged,
        story: { title, userId, estimate, description, notes, sprintId, isBlocked, blockReason, priority },
        team,
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
            <CloseIcon className={classes.closeSidebarIcon} onClick={onCloseTab} />
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
                    id={priority.toUpperCase()}
                    name={storyFields.priority}
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
                    <p>Estimate</p>
                    <label>
                        Points:{' '}
                        <TextField
                            value={estimate}
                            name={storyFields.estimate}
                            type="number"
                            variant="outlined"
                            onChange={onChangeTextField}
                        />
                    </label>
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
