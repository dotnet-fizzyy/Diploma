import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getColumnKeyValuePair } from '../../helpers/columnHelper';
import * as requestProcessorActions from '../../redux/actions/requestProcessorActions';
import * as sidebarActions from '../../redux/actions/sidebarActions';
import * as storyActions from '../../redux/actions/storiesActions';
import * as epicsSelectors from '../../redux/selectors/epicsSelectors';
import * as sidebarSelectors from '../../redux/selectors/sidebarSelectors';
import { IStoryDragAndDrop } from '../../types/storyTypes';
import Board, { IBoardProps } from './Board';

const BoardContainer = () => {
    const dispatch = useDispatch();
    const { projectId }: any = useParams();

    const isSidebarVisible = useSelector(sidebarSelectors.getSidebarVisibility);
    const currentEpic = useSelector(epicsSelectors.getCurrentEpic);
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
        dispatch(requestProcessorActions.hideSpinner());
        if (!currentEpic) {
            dispatch(storyActions.handleBoardRequestProcessing(projectId));
        }
    }, [currentEpic, projectId, dispatch]);

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
