import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { storyFields } from '../../../constants/storyConstants';
import { ISelectedItem, IStory } from '../../../types/storyTypes';
import StoryCreationDropdown from './StoryCreationDropdown';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '500px',
            maxHeight: '700px',
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
            padding: '30px',
            overflowY: 'scroll',
        },
        header: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            color: '#242126',
            fontWeight: 'bold',
        },
        fieldContainer: {
            margin: '20px 0',
        },
        textField: {
            width: '100%',
            marginTop: '10px',
        },
        footer: {
            display: 'inherit',
            width: '100%',
            height: '200px',
            flexWrap: 'wrap',
            marginTop: '30px',
            justifyContent: 'space-between',
        },
        footerItem: {
            flexBasis: '230px',
            flexShrink: 0,
        },
        button: {
            width: '150px',
            height: '40px',
            marginTop: '30px',
            backgroundColor: '#75BAF7',
            border: 'none',
            color: '#FFF',
            boxShadow: 'none',
            transition: 'unset',
            '&:hover': {
                backgroundColor: '#E8F4FF',
                boxShadow: 'none',
            },
        },
        title: {
            fontFamily: 'Poppins, sans-serif',
            color: '#75BAF7',
            fontSize: '18px',
        },
    })
);

export interface IStoryCreationProps {
    story: IStory;
    priorities: ISelectedItem[];
    teamMembers: ISelectedItem[];
    storyEstimation: ISelectedItem[];
    sprints: ISelectedItem[];
    onChangeField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onClickCreateStory: () => void;
}

const StoryCreation = (props: IStoryCreationProps) => {
    const classes = useStyles();
    const { story, priorities, sprints, storyEstimation, teamMembers, onChangeField, onClickCreateStory } = props;

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a new task</span>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Title:</span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    name={storyFields.title}
                    onChange={onChangeField}
                    value={story.title}
                    placeholder="Add a title of your task"
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Description:</span>
                <TextField
                    variant="outlined"
                    placeholder="Add full and clear description of your task"
                    className={classes.textField}
                    multiline={true}
                    onChange={onChangeField}
                    name={storyFields.description}
                    value={story.description}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span className={classes.title}>Notes:</span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    multiline={true}
                    name={storyFields.notes}
                    placeholder="Add notes for description your task if it is neccessary"
                    onChange={onChangeField}
                />
            </div>
            <div className={classes.footer}>
                <div className={classes.footerItem}>
                    <StoryCreationDropdown
                        id={story.userId}
                        title="Assignee"
                        name={storyFields.userId}
                        items={teamMembers}
                        disabled={!teamMembers.length}
                        onChangeItem={onChangeField}
                    />
                </div>
                <div className={classes.footerItem}>
                    <StoryCreationDropdown
                        id={story.storyPriority.toUpperCase()}
                        title="Priority"
                        name={storyFields.storyPriority}
                        items={priorities}
                        onChangeItem={onChangeField}
                    />
                </div>
                <div className={classes.footerItem}>
                    <StoryCreationDropdown
                        id={story.estimate.toString()}
                        title="Estimate"
                        name={storyFields.estimate}
                        items={storyEstimation}
                        onChangeItem={onChangeField}
                    />
                </div>
                <div className={classes.footerItem}>
                    <StoryCreationDropdown
                        id={story.sprintId}
                        title="Sprint"
                        name={storyFields.sprintId}
                        items={sprints}
                        disabled={!sprints.length}
                        onChangeItem={onChangeField}
                    />
                </div>
            </div>
            <Button className={classes.button} variant="outlined" onClick={onClickCreateStory}>
                Create task
            </Button>
        </div>
    );
};

export default StoryCreation;
