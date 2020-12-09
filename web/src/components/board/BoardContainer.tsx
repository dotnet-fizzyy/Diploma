import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getColumnKeyValuePair } from '../../helpers/columnHelper';
import * as sidebarActions from '../../redux/actions/sidebarActions';
import * as storyActions from '../../redux/actions/storiesActions';
import * as epicSelectors from '../../redux/selectors/epicsSelectors';
import * as sidebarSelectors from '../../redux/selectors/sidebarSelectors';
import { IStoryDragAndDrop } from '../../types/storyTypes';
import Board, { IBoardProps } from './Board';

const BoardContainer = () => {
    const dispatch = useDispatch();

    const isSidebarVisible = useSelector(sidebarSelectors.getSidebarVisibility);
    const selectedEpic = useSelector(epicSelectors.getCurrentEpic);
    const columns = getColumnKeyValuePair();

    const onCloseSidebar = () => {
        dispatch(sidebarActions.sidebarHandleVisibility(false));
    };

    const onDragStart = () => {
        dispatch(storyActions.storyActionDragStart());
    };

    useEffect(() => {
        dispatch(storyActions.getGeneralInfoRequest('user_id'));
    }, [dispatch]);

    useEffect(() => {
        dispatch(storyActions.getStoriesFromEpicRequest(selectedEpic.epicId));
    }, [dispatch, selectedEpic.epicId]);

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
        isSidebarVisible,
        onDragStart,
        onDragEnd,
        onCloseSidebar,
    };

    return <Board {...props} />;
};

export default BoardContainer;
