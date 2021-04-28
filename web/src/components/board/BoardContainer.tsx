import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as sidebarActions from '../../redux/actions/sidebarActions';
import * as storyActions from '../../redux/actions/storiesActions';
import * as sidebarSelectors from '../../redux/selectors/sidebarSelectors';
import { IStoryDragAndDrop } from '../../types/storyTypes';
import { getColumnKeyValuePair } from '../../utils/columnHelper';
import { getQueryParameter } from '../../utils/routeHelper';
import Board, { IBoardProps } from './Board';

const BoardContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const isSidebarVisible = useSelector(sidebarSelectors.getSidebarVisibility);
    const columns = getColumnKeyValuePair();

    const onCloseSidebar = () => {
        dispatch(sidebarActions.sidebarHandleVisibility(false));
    };

    const onDragStart = () => {
        dispatch(storyActions.storyActionDragStart());
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

    useEffect(() => {
        const projectId: string = getQueryParameter(location.search, 'projectId');
        const teamId: string = getQueryParameter(location.search, 'teamId');

        dispatch(storyActions.getBoardInfoRequest(projectId, teamId));
    }, [dispatch, location.search]);

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
