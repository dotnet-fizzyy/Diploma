import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColumnKeyValuePair } from "../../helpers/columnHelper";
import * as storyActions from "../../redux/actions/storiesActions";
import * as storySelectors from "../../redux/selectors/storiesSelectors";
import { IStoryDragAndDrop } from "../../types/storyTypes";
import Board, { IBoardProps } from "./Board";

const BoardContainer = () => {
  const dispatch = useDispatch();

  const stories = useSelector(storySelectors.getColumns);
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
    if (result.destination) {
      dispatch(
        storyActions.storyDragAndDropHandle({
          storyId: result.draggableId,
          columnTypeOrigin: result.source.droppableId,
          columnTypeDestination: result.destination.droppableId,
        } as IStoryDragAndDrop)
      );
    }
  };

  const props: IBoardProps = {
    columns,
    stories: stories
      .map((column) => column.value)
      .reduce((accumulator, story) => accumulator.concat(story), []),
    onSelectStory,
    onMakeStoryBlocked,
    onMakeStoryReady,
    onDragEnd,
  };

  return <Board {...props} />;
};

export default BoardContainer;
