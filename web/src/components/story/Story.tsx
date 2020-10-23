import { createStyles, makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IStory } from "../../types/storyTypes";
import StoryFooter from "./StoryFooter";
import StoryHeader from "./StoryHeader";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: "0 10px",
      backgroundColor: "floralwhite",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    },
    body: {
      minHeight: "120px",
      borderTop: "2px solid #3272d9",
      borderBottom: "2px solid #3272d9",
      padding: "5px 5px",
      fontSize: "18px",
      fontWeight: "bold",
    },
    header: {
      height: "40px",
      display: "flex",
      alignItems: "center",
    },
    footer: {
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& span": {
        marginLeft: "7px",
      },
    },
    storyId: {
      marginLeft: "10px",
      fontSize: "16px",
    },
    iconUser: {
      fontSize: "16px",
      color: "black",
    },
    iconVert: {
      fontSize: "24px",
      color: "black",
      marginLeft: "5px",
      marginTop: "5px",
    },
    iconBlock: {
      fontSize: "22px",
      color: "red",
      marginLeft: "5px",
    },
    isBlocked: {
      backgroundColor: "red",
      color: "white",
      borderRadius: "3px",
      padding: "2px",
    },
    iconReady: {
      fontSize: "22px",
      color: "green",
      marginLeft: "15px",
    },
    isReady: {
      backgroundColor: "green",
      color: "white",
      borderRadius: "3px",
      padding: "2px",
    },
    iconMain: {
      color: "white",
      borderRadius: "3px",
      padding: "2px",
      marginLeft: "10px",
    },
    isDefect: {
      backgroundColor: "darkorange",
    },
    isStory: {
      backgroundColor: "#3272d9",
    },
    currentStoryStatus: {
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      "& span": {
        display: "block",
        fontSize: "18px",
        fontWeight: "bold",
        margin: "4px 0",
        textAlign: "center",
      },
    },
    currentBlocked: {
      backgroundColor: "red",
      color: "darkred",
    },
    currentReady: {
      backgroundColor: "green",
      color: "darkgreen",
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
  const {
    story,
    index,
    onSelectStory,
    onMakeStoryReady,
    onMakeStoryBlocked,
  } = props;

  return (
    <Draggable draggableId={story.storyId} index={index}>
      {(provided) => (
        <div
          className={classes.root}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/*<div className={classes.header}>*/}
          {/*  {story.isDefect ? (*/}
          {/*    <BugReportIcon*/}
          {/*      className={classnames(classes.iconMain, classes.isDefect)}*/}
          {/*    />*/}
          {/*  ) : (*/}
          {/*    <AssignmentIcon*/}
          {/*      className={classnames(classes.iconMain, classes.isStory)}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*  <span*/}
          {/*    onClick={() => onSelectStory(story.storyId)}*/}
          {/*    className={classes.storyId}*/}
          {/*  >*/}
          {/*    {story.storyId}*/}
          {/*  </span>*/}
          {/*  <CheckCircleOutlinedIcon*/}
          {/*    className={classnames(classes.iconReady, {*/}
          {/*      [classes.isReady]: story.isReady,*/}
          {/*    })}*/}
          {/*    onClick={() => onMakeStoryReady(story.storyId)}*/}
          {/*  />*/}
          {/*  <BlockOutlinedIcon*/}
          {/*    className={classnames(classes.iconBlock, {*/}
          {/*      [classes.isBlocked]: story.isBlocked,*/}
          {/*    })}*/}
          {/*    onClick={() => onMakeStoryBlocked(story.storyId)}*/}
          {/*  />*/}
          {/*  <div {...provided.dragHandleProps}>*/}
          {/*    <MoreVertIcon className={classes.iconVert} />*/}
          {/*  </div>*/}
          {/*</div>*/}
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
            <span>{story.title}</span>
          </div>
          {/*<div className={classes.footer}>*/}
          {/*  <AccountCircleIcon className={classes.iconUser} />*/}
          {/*  <span>{story.userId ? story.userId : "No owner"}</span>*/}
          {/*</div>*/}
          {/*{(story.isReady || story.isBlocked) && (*/}
          {/*  <div*/}
          {/*    className={classnames(classes.currentStoryStatus, {*/}
          {/*      [classes.currentReady]: story.isReady,*/}
          {/*      [classes.currentBlocked]: story.isBlocked,*/}
          {/*    })}*/}
          {/*  >*/}
          {/*    <span>{story.isReady ? "Ready" : "Blocked"}</span>*/}
          {/*  </div>*/}
          {/*)}*/}
          <StoryFooter
            avatarLink={""}
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
