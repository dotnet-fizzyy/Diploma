import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import BackgroundImage from "../../static/abstraction.jpg";
import { ISelectedItem, IStory } from "../../types";
import Column from "../column/Column";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minWidth: "100vh",
      minHeight: "100vh",
      backgroundImage: `url(${BackgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
    body: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      minHeight: "100%",
    },
    headerRoot: {
      height: "60px",
      minWidth: "100%",
      backgroundColor: "black",
    },
  })
);

export interface IBoardProps {
  columns: ISelectedItem[];
  stories: IStory[];
  onSelectStory: (storyId: string) => void;
  onMakeStoryBlocked: (storyId: string) => void;
  onMakeStoryReady: (storyId: string) => void;
  onDragEnd: (result: any) => void;
}

const Board = (props: IBoardProps) => {
  const classes = useStyles();
  const {
    columns,
    stories,
    onSelectStory,
    onMakeStoryReady,
    onMakeStoryBlocked,
    onDragEnd,
  } = props;

  return (
    <div className={classes.root}>
      <div className={classes.headerRoot} />
      <div className={classes.body}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <React.Fragment key={column.key}>
              <Column
                column={column}
                onSelectStory={onSelectStory}
                onMakeStoryBlocked={onMakeStoryBlocked}
                onMakeStoryReady={onMakeStoryReady}
                stories={stories.filter(
                  (story) => story.columnType === column.key
                )}
              />
            </React.Fragment>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
