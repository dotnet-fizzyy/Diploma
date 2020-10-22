import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ISelectedItem, IStory } from "../../types/storyTypes";
import Story from "../story/Story";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minWidth: "250px",
      backgroundColor: "rgba(221, 217, 217, 0.6)",
      margin: "0 25px",
    },
    header: {
      height: "50px",
      borderBottom: "1px solid white",
      display: "flex",
      alignItems: "center",
      "& span": {
        fontSize: "18px",
        fontWeight: "bolder",
        marginLeft: "15px",
      },
    },
    body: {
      minHeight: "100vh",
    },
    storiesContainer: {
      marginTop: "15px",
    },
  })
);

export interface IColumnProps {
  column: ISelectedItem;
  stories: IStory[];
  onSelectStory: (storyId: string) => void;
  onMakeStoryBlocked: (storyId: string) => void;
  onMakeStoryReady: (storyId: string) => void;
}

const Column = (props: IColumnProps) => {
  const classes = useStyles();
  const {
    column,
    stories,
    onSelectStory,
    onMakeStoryBlocked,
    onMakeStoryReady,
  } = props;

  return (
    <Droppable droppableId={column.key}>
      {(provided) => (
        <div className={classes.root}>
          <div className={classes.header}>
            <span>{column.value}</span>
          </div>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.body}
          >
            {provided.placeholder}
            {stories.map((story, index) => (
              <div key={story.storyId} className={classes.storiesContainer}>
                <Story
                  story={story}
                  index={index}
                  onSelectStory={onSelectStory}
                  onMakeStoryReady={onMakeStoryReady}
                  onMakeStoryBlocked={onMakeStoryBlocked}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default React.memo(Column);
