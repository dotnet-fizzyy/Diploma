import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColumnKeyValuePair } from "../../helpers/columnHelper";
import * as storyActions from "../../redux/actions/storiesActions";
import * as storySelectors from "../../redux/selectors/storiesSelectors";
import Board, { IBoardProps } from "./Board";

const BoardContainer = () => {
  const dispatch = useDispatch();

  const stories = useSelector(storySelectors.getStories);
  const columns = getColumnKeyValuePair();

  useEffect(() => {
    dispatch(storyActions.getGeneralInfoRequest("user_id"));
  }, [dispatch]);

  const onSelectStory = (storyId: string) => {
    dispatch(storyActions.storyActionSelectStory(storyId));
  };

  const onMakeStoryBlocked = (storyId: string) => {
    dispatch(storyActions.storyActionMakeStoryBlocked(storyId));
  };

  const onMakeStoryReady = (storyId: string) => {
    dispatch(storyActions.storyActionMakeStoryReady(storyId));
  };

  const onDragEnd = (result: any) => {
    console.warn(result);
  };

  const props: IBoardProps = {
    columns,
    stories,
    onSelectStory,
    onMakeStoryBlocked,
    onMakeStoryReady,
    onDragEnd,
  };

  return <Board {...props} />;
};

export default BoardContainer;
