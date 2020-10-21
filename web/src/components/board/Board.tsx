import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ISelectedItem, IStory } from "../../types";
import Column from "../column/Column";
import "./board.css";

export interface IBoardProps {
  columns: ISelectedItem[];
  stories: IStory[];
  onSelectStory: (storyId: string) => void;
  onMakeStoryBlocked: (storyId: string) => void;
  onMakeStoryReady: (storyId: string) => void;
  onDragEnd: (result: any) => void;
}

const Board = (props: IBoardProps) => {
  const {
    columns,
    stories,
    onSelectStory,
    onMakeStoryReady,
    onMakeStoryBlocked,
    onDragEnd,
  } = props;

  return (
    <div className="board-root">
      <div className="header-root" />
      <div className="board-body">
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
