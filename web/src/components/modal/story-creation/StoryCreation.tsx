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
        },
        header: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '24px',
            color: '#242126',
            fontWeight: 'bold',
        },
        fieldContainer: {
            marginTop: '30px',
        },
        textField: {
            height: '40px',
            width: '100%',
        },
        footer: {
            display: 'inherit',
            width: '100%',
            flexWrap: 'wrap',
            marginTop: '30px',
        },
        footerItem: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        button: {
            width: '150px',
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
                <span>Title:</span>
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
                <span>Description:</span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    multiline={true}
                    onChange={onChangeField}
                    name={storyFields.description}
                    value={story.description}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span>Notes:</span>
                <TextField variant="outlined" className={classes.textField} multiline={true} name={storyFields.notes} />
            </div>
            <div className={classes.footer}>
                <div className={classes.footerItem}>
                    <StoryCreationDropdown
                        id={story.userId}
                        title="Assignee"
                        name={storyFields.userId}
                        items={teamMembers}
                        onChangeItem={onChangeField}
                    />
                </div>
                <div className={classes.footerItem}>
                    <StoryCreationDropdown
                        id={story.priority}
                        title="Priority"
                        name={storyFields.priority}
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
