import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedEpicById } from '../../redux/actions/epic';
import { getBoardInfoRequest } from '../../redux/actions/project';
import { sidebarHandleVisibility } from '../../redux/actions/sidebarActions';
import { storyActionDragStart, storyDragAndDropHandle } from '../../redux/actions/storyActions';
import { getSidebarVisibility } from '../../redux/selectors/sidebarSelectors';
import { getUserSelectedProjectId, getUserSelectedTeamId } from '../../redux/selectors/userSelectors';
import { IStoryDragAndDrop } from '../../types/storyTypes';
import { getColumnKeyValuePair } from '../../utils/columnUtils';
import Board, { IBoardProps } from './Board';

const BoardContainer = () => {
    const dispatch = useDispatch();

    const isSidebarVisible: boolean = useSelector(getSidebarVisibility);
    const selectedProjectId: string = useSelector(getUserSelectedProjectId);
    const selectedTeamId: string = useSelector(getUserSelectedTeamId);

    const columns = getColumnKeyValuePair();

    const onCloseSidebar = () => {
        dispatch(sidebarHandleVisibility(null, false));
    };

    const onDragStart = () => {
        dispatch(storyActionDragStart());
    };

    const onDragEnd = (result: any) => {
        if (result.destination) {
            dispatch(
                storyDragAndDropHandle({
                    storyId: result.draggableId,
                    columnTypeOrigin: result.source.droppableId,
                    columnTypeDestination: result.destination.droppableId,
                } as IStoryDragAndDrop)
            );
        }
    };

    useEffect(() => {
        dispatch(setSelectedEpicById(''));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(getBoardInfoRequest(selectedProjectId, selectedTeamId));
    }, [dispatch, selectedTeamId, selectedProjectId]);

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
