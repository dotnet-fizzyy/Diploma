import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  areStoriesEqual,
  createStoryPriorityDropdownItems,
} from "../../helpers/storyHelper";
import * as sidebarActions from "../../redux/actions/sidebarActions";
import * as sprintSelectors from "../../redux/selectors/sprintsSelectors";
import * as storySelectors from "../../redux/selectors/storiesSelectors";
import * as teamSelectors from "../../redux/selectors/teamSelectors";
import { IStory } from "../../types/storyTypes";
import Sidebar, { ISidebarProps } from "./Sidebar";

const SidebarContainer = () => {
  const dispatch = useDispatch();
  const story = useSelector(storySelectors.getSelectedStory);
  const team = useSelector(teamSelectors.getUserNames);
  const sprints = useSelector(sprintSelectors.getSprintsNames);
  const storyPriorities = createStoryPriorityDropdownItems();

  const [updatedStory, setUpdatedStory] = useState(story);
  const [hasStoryChanged, setHasStoryChanged] = useState(false);

  const onCloseTab = () => {
    dispatch(sidebarActions.sidebarHandleVisibility(false));
  };

  const onClickConfirmChanges = () => {};

  const onClickCancelChanges = () => {
    setUpdatedStory(story);
    setHasStoryChanged(false);
  };

  const onSetStoryBlocked = () => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          isBlocked: true,
          isReady: false,
        } as IStory)
    );
  };

  const onSetStoryReady = () => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          isBlocked: false,
          isReady: true,
        } as IStory)
    );
  };

  const onChangeStoryOwner = (value: string) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          userId: value,
        } as IStory)
    );
  };

  const onChangeStoryTitle = (value: string) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          title: value,
        } as IStory)
    );
  };

  const onChangeStoryDescription = (value: string) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          description: value,
        } as IStory)
    );
  };

  const onChangeStoryNotes = (notes: string) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          notes,
        } as IStory)
    );
  };

  const onChangeStorySprint = (value: string) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          sprintId: value,
        } as IStory)
    );
  };

  const onChangeStoryEstimation = (value: number) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          estimate: value,
        } as IStory)
    );
  };

  const onChangeStoryBlockedReason = (value: string) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          blockReason: value,
        } as IStory)
    );
  };

  const onChangeStoryPriority = (value: string) => {
    setUpdatedStory(
      (prevState) =>
        ({
          ...prevState,
          priority: value,
        } as IStory)
    );
  };

  useEffect(() => {
    if (!areStoriesEqual(story, updatedStory)) {
      setHasStoryChanged(true);
    } else {
      setHasStoryChanged(false);
    }
  }, [story, updatedStory]);

  const sidebarProps: ISidebarProps = {
    hasStoryChanged,
    story: updatedStory,
    team,
    sprints,
    storyPriorities,
    onCloseTab,
    onChangeStoryOwner,
    onChangeStoryTitle,
    onChangeStoryDescription,
    onChangeStoryNotes,
    onSetStoryBlocked,
    onSetStoryReady,
    onChangeStorySprint,
    onChangeStoryBlockedReason,
    onClickCancelChanges,
    onClickConfirmChanges,
    onChangeStoryEstimation,
    onChangeStoryPriority,
  };

  return <Sidebar {...sidebarProps} />;
};

export default React.memo(SidebarContainer);
