import { createStyles, makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classnames from 'classnames';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IStory } from '../../types/story';
import { ITeam } from '../../types/team';
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
            borderColor: 'rgba(175, 193, 196, 0.2)',
            minWidth: '240px',
        },
        body: {
            minHeight: '120px',
            borderBottom: '2px solid #EDEFF3',
            margin: '0 15px',
            paddingBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            '&:hover': {
                cursor: 'pointer',
            },
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
            marginTop: '3px',
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
    team: ITeam;
    onSelectStory: (storyId: string) => void;
    onMakeStoryBlocked: (storyId: string) => void;
    onMakeStoryReady: (storyId: string, isReady: boolean, recordVersion: number) => void;
}

const Story = (props: IStoryProps) => {
    const classes = useStyles();
    const { story, team, index, onSelectStory, onMakeStoryReady, onMakeStoryBlocked } = props;

    const userName =
        team && team.users && team.users.some((x) => x.userId === story.userId)
            ? team.users.find((x) => x.userId === story.userId).userName
            : 'No owner';

    const onClickSelectStory = (): void => {
        onSelectStory(story.storyId);
    };

    return (
        <Draggable draggableId={story.storyId} index={index}>
            {(provided, snapshot) => (
                <div
                    className={classnames(classes.root, { [classes.dragging]: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <StoryHeader
                        recordVersion={story.recordVersion}
                        storyId={story.storyId}
                        creationDate={story.creationDate}
                        isReady={story.isReady}
                        isBlocked={story.isBlocked}
                        onMakeStoryReady={onMakeStoryReady}
                        onMakeStoryBlocked={onMakeStoryBlocked}
                    >
                        <div {...provided.dragHandleProps}>
                            <MoreVertIcon className={classes.iconVert} />
                        </div>
                    </StoryHeader>
                    <div className={classes.body} onClick={onClickSelectStory}>
                        <span className={classes.bodyTitle}>{story.title}</span>
                        <div className={classes.card}>
                            <StoryPriorityCard priority={story.storyPriority} />
                        </div>
                    </div>
                    <StoryFooter
                        avatarLink={''}
                        userName={userName}
                        isReady={story.isReady}
                        isBlocked={story.isBlocked}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default React.memo(Story);
