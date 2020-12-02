import { createStyles, makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classnames from 'classnames';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IStory } from '../../types/storyTypes';
import StoryFooter from './StoryFooter';
import StoryHeader from './StoryHeader';
import StoryPriorityCard from './StoryPriorityCard';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            margin: '0 10px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            border: '1px solid #AFC1C4',
            borderColor: 'rgba(175, 193, 196, 0.5)',
        },
        body: {
            minHeight: '120px',
            borderTop: '2px solid #EDEFF3',
            borderBottom: '2px solid #EDEFF3',
            margin: '0 15px',
            padding: '5px 0',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },
        bodyTitle: {
            fontSize: '18px',
            fontFamily: 'Poppins',
            fontWeight: 700,
            color: '#242624',
        },
        header: {
            height: '40px',
            display: 'flex',
            alignItems: 'center',
        },
        storyId: {
            marginLeft: '10px',
            fontSize: '16px',
        },
        iconVert: {
            fontSize: '24px',
            color: 'black',
            marginRight: '15px',
            marginTop: '5px',
        },
        isBlocked: {
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        isReady: {
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '3px',
            padding: '2px',
        },
        isDefect: {
            backgroundColor: 'darkorange',
        },
        card: {
            height: '25px',
            margin: '20px 0 10px 0',
        },
        dragging: {
            transition: `none`,
        },
    })
);

export interface IStoryProps {
    story: IStory;
    index: number;
    onSelectStory: (storyId: string) => void;
    onMakeStoryBlocked: (storyId: string) => void;
    onMakeStoryReady: (storyId: string) => void;
}

const Story = (props: IStoryProps) => {
    const classes = useStyles();
    const { story, index, onSelectStory, onMakeStoryReady, onMakeStoryBlocked } = props;

    return (
        <Draggable draggableId={story.storyId} index={index}>
            {(provided, snapshot) => (
                <div
                    className={classnames(classes.root, { [classes.dragging]: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <StoryHeader
                        storyId={story.storyId}
                        isDefect={story.isDefect}
                        isReady={story.isReady}
                        isBlocked={story.isBlocked}
                        onSelectStory={onSelectStory}
                        onMakeStoryReady={onMakeStoryReady}
                        onMakeStoryBlocked={onMakeStoryBlocked}
                    >
                        <div {...provided.dragHandleProps}>
                            <MoreVertIcon className={classes.iconVert} />
                        </div>
                    </StoryHeader>
                    <div className={classes.body}>
                        <span className={classes.bodyTitle}>{story.title}</span>
                        <div className={classes.card}>
                            <StoryPriorityCard priority={story.priority} />
                        </div>
                    </div>
                    <StoryFooter
                        avatarLink={''}
                        userId={story.userId}
                        isReady={story.isReady}
                        isBlocked={story.isBlocked}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default React.memo(Story);
