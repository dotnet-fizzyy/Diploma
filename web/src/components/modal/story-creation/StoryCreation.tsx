import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { storyFields } from '../../../constants/storyConstants';
import { IStory } from '../../../types/storyTypes';

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
            flexWrap: 'wrap',
            marginTop: '30px',
            height: '50px',
        },
        footerItem: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
    })
);

export interface IStoryCreationProps {
    story: IStory;
    onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClickCreateStory: () => void;
}

const StoryCreation = (props: IStoryCreationProps) => {
    const classes = useStyles();
    const { story, onChangeTextField, onClickCreateStory } = props;

    return (
        <div className={classes.root}>
            <span className={classes.header}>Create a new task</span>
            <div className={classes.fieldContainer}>
                <span>Title:</span>
                <TextField
                    variant="outlined"
                    className={classes.textField}
                    name={storyFields.title}
                    onChange={onChangeTextField}
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
                    onChange={onChangeTextField}
                    name={storyFields.description}
                    value={story.description}
                />
            </div>
            <div className={classes.fieldContainer}>
                <span>Notes:</span>
                <TextField variant="outlined" className={classes.textField} multiline={true} name={storyFields.notes} />
            </div>
            <div className={classes.footer}>
                <div className={classes.footerItem} />
                <div className={classes.footerItem} />
                <div className={classes.footerItem} />
                <div className={classes.footerItem} />
            </div>
            <Button variant="outlined" onClick={onClickCreateStory}>
                Create task
            </Button>
        </div>
    );
};

export default StoryCreation;
