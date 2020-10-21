import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ISelectedItem, IStory } from "../../types";
import Story from "../story/Story";
import "./columns.css";

export interface IColumnProps {
  column: ISelectedItem;
  stories: IStory[];
  onSelectStory: (storyId: string) => void;
  onMakeStoryBlocked: (storyId: string) => void;
  onMakeStoryReady: (storyId: string) => void;
}

const Column = (props: IColumnProps) => {
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
        <div className="column-root">
          <div className="column-header">
            <span>{column.value}</span>
          </div>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column-body"
          >
            {provided.placeholder}
            {stories.map((story, index) => (
              <div key={story.storyId} className="column-stories-container">
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

export default Column;
