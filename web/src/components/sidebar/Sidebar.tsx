import { TextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import classnames from "classnames";
import React from "react";
import { ISelectedItem, IStory } from "../../types/storyTypes";
import StoryConfirmChanges from "./story-description/StoryConfirmChanges";
import StoryDropdownMenu from "./story-description/StoryDropdownMenu";
import StoryStatus from "./story-description/StoryStatus";
import StoryTextField from "./story-description/StoryTextField";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minWidth: "450px",
      width: "100%",
      minHeight: "100%",
      position: "relative",
    },
    closeSidebarIcon: {
      position: "absolute",
      fontSize: "30px",
      top: "0.5%",
      right: "0.5%",
      "&:hover": {
        cursor: "pointer",
      },
    },
    body: {
      padding: "0 20px",
    },
    isModalVisible: {
      paddingBottom: "120px",
    },
    nameContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    sectionContainer: {
      marginTop: "20px",
    },
    rootSelectStyle: {
      width: "100%",
    },
    multiLineTextField: {
      width: "100%",
    },
  })
);

export interface ISidebarProps {
  hasStoryChanged: boolean;
  story: IStory;
  team: ISelectedItem[];
  sprints: ISelectedItem[];
  storyPriorities: ISelectedItem[];
  onCloseTab: () => void;
  onSetStoryBlocked: () => void;
  onSetStoryReady: () => void;
  onClickCancelChanges: () => void;
  onClickConfirmChanges: () => void;
  onChangeStorySprint: (value: string) => void;
  onChangeStoryTitle: (value: string) => void;
  onChangeStoryOwner: (value: string) => void;
  onChangeStoryDescription: (value: string) => void;
  onChangeStoryNotes: (value: string) => void;
  onChangeStoryBlockedReason: (value: string) => void;
  onChangeStoryPriority: (value: string) => void;
  onChangeStoryEstimation: (value: number) => void;
}

const Sidebar = (props: ISidebarProps) => {
  const classes = useStyles();
  const {
    hasStoryChanged,
    story: {
      title,
      userId,
      estimate,
      description,
      notes,
      sprintId,
      isBlocked,
      blockReason,
      priority,
    },
    team,
    sprints,
    storyPriorities,
    onCloseTab,
    onSetStoryReady,
    onSetStoryBlocked,
    onChangeStorySprint,
    onChangeStoryTitle,
    onChangeStoryOwner,
    onChangeStoryNotes,
    onChangeStoryDescription,
    onChangeStoryBlockedReason,
    onClickConfirmChanges,
    onClickCancelChanges,
    onChangeStoryEstimation,
    onChangeStoryPriority,
  } = props;

  return (
    <div className={classes.root}>
      <CloseIcon className={classes.closeSidebarIcon} onClick={onCloseTab} />
      <div
        className={classnames(classes.body, {
          [classes.isModalVisible]: hasStoryChanged,
        })}
      >
        <StoryTextField
          value={title}
          title={"Story name"}
          onChangeValue={onChangeStoryTitle}
        />

        <StoryStatus
          isBlocked={isBlocked}
          blockReason={blockReason}
          onSetStoryReady={onSetStoryReady}
          onSetStoryBlocked={onSetStoryBlocked}
          onChangeStoryBlockedReason={onChangeStoryBlockedReason}
        />

        <StoryDropdownMenu
          id={userId}
          disabled={false}
          title={"Owner"}
          items={team}
          onChangeItem={onChangeStoryOwner}
        />

        <StoryDropdownMenu
          id={priority}
          disabled={false}
          title={"Priority"}
          items={storyPriorities}
          onChangeItem={onChangeStoryPriority}
        />

        <StoryDropdownMenu
          id={sprintId}
          disabled={true}
          title={"Sprint"}
          items={sprints}
          onChangeItem={onChangeStorySprint}
        />

        <div className={classes.sectionContainer}>
          <p>Estimate</p>
          <label>
            Points:{" "}
            <TextField
              value={estimate}
              type="number"
              variant="outlined"
              onChange={(event: { target: { value: string } }) =>
                onChangeStoryEstimation(Number(event.target.value))
              }
            />
          </label>
        </div>

        <StoryTextField
          value={description}
          title={"Description"}
          onChangeValue={onChangeStoryDescription}
          isTextArea={true}
        />

        <StoryTextField
          value={notes}
          title={"Notes"}
          onChangeValue={onChangeStoryNotes}
          isTextArea={true}
        />
      </div>
      {hasStoryChanged && (
        <StoryConfirmChanges
          onClickCancelChanges={onClickCancelChanges}
          onClickConfirmChanges={onClickConfirmChanges}
        />
      )}
    </div>
  );
};

export default React.memo(Sidebar);
