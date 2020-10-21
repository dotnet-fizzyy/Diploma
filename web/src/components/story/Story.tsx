import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import BugReportIcon from "@material-ui/icons/BugReport";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import classnames from "classnames";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IStory } from "../../types";
import "./story.css";

export interface IStoryProps {
  story: IStory;
  index: number;
  onSelectStory: (storyId: string) => void;
  onMakeStoryBlocked: (storyId: string) => void;
  onMakeStoryReady: (storyId: string) => void;
}

const Story = (props: IStoryProps) => {
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
          className="story-root"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="story-header">
            {story.isDefect ? (
              <BugReportIcon
                className={classnames(
                  "story-icon-main-logo",
                  "story-icon-defect"
                )}
              />
            ) : (
              <AssignmentIcon
                className={classnames(
                  "story-icon-main-logo",
                  "story-icon-task"
                )}
              />
            )}
            <span
              onClick={() => onSelectStory(story.storyId)}
              className="story-id"
            >
              {story.storyId}
            </span>
            <CheckCircleOutlinedIcon
              className={classnames("story-icon-accept", {
                "story-icon-accept-true": story.isReady,
              })}
              onClick={() => onMakeStoryReady(story.storyId)}
            />
            <BlockOutlinedIcon
              className={classnames("story-icon-block", {
                "story-icon-block-true": story.isBlocked,
              })}
              onClick={() => onMakeStoryBlocked(story.storyId)}
            />
            <div {...provided.dragHandleProps}>
              <MoreVertIcon className="story-icon-vert" />
            </div>
          </div>
          <div className="story-body">
            <span>{story.title}</span>
          </div>
          <div className="story-footer">
            <AccountCircleIcon className="story-icon-user" />
            <span>{story.userId ? story.userId : "No owner"}</span>
          </div>
          {(story.isReady || story.isBlocked) && (
            <div
              className={classnames({
                "story-current-status-ready": story.isReady,
                "story-current-status-blocked": story.isBlocked,
              })}
            >
              <span className="story-current-status-span">
                {story.isReady ? "Ready" : "Blocked"}
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Story;
