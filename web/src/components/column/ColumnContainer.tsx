import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sidebarActions from "../../redux/actions/sidebarActions";
import * as storyActions from "../../redux/actions/storiesActions";
import * as storiesSelectors from "../../redux/selectors/storiesSelectors";
import { ISelectedItem, IStory } from "../../types/storyTypes";
import Column, { IColumnProps } from "./Column";

export interface IColumnContainerProps {
  column: ISelectedItem;
}

const ColumnContainer = (props: IColumnContainerProps) => {
  const dispatch = useDispatch();
  const { column } = props;

  const stories: IStory[] = useSelector(
    storiesSelectors.getStoriesForColumn(column.key)
  );

  const onSelectStory = (storyId: string) => {
    dispatch(storyActions.storyActionSelectStory(storyId));
    dispatch(sidebarActions.sidebarHandleVisibility(true));
  };

  const onMakeStoryBlocked = (storyId: string) => {
    dispatch(storyActions.storyActionMakeStoryBlocked(storyId));
  };

  const onMakeStoryReady = (storyId: string) => {
    dispatch(storyActions.storyActionMakeStoryReady(storyId));
  };

  const columnProps: IColumnProps = {
    column,
    stories,
    onMakeStoryBlocked,
    onMakeStoryReady,
    onSelectStory,
  };

  return <Column {...columnProps} />;
};

export default ColumnContainer;
