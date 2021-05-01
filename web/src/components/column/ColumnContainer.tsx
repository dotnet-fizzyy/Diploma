import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sidebarActions from '../../redux/actions/sidebarActions';
import * as storyActions from '../../redux/actions/storiesActions';
import * as storiesSelectors from '../../redux/selectors/storiesSelectors';
import * as teamSelectors from '../../redux/selectors/teamSelectors';
import { ISelectedItem, IStory } from '../../types/storyTypes';
import { ITeam } from '../../types/teamTypes';
import Column, { IColumnProps } from './Column';

export interface IColumnContainerProps {
    column: ISelectedItem;
}

const ColumnContainer = (props: IColumnContainerProps) => {
    const dispatch = useDispatch();
    const { column } = props;

    const stories: IStory[] = useSelector(storiesSelectors.getStoriesForColumn(column.key));
    const team: ITeam = useSelector(teamSelectors.getSelectedTeam);
    const isDragging: boolean = useSelector(storiesSelectors.getIsDragging);

    const onSelectStory = (storyId: string) => {
        dispatch(storyActions.storyActionSelectStory(storyId));
        dispatch(sidebarActions.sidebarHandleVisibility(true));
    };

    const onMakeStoryBlocked = (storyId: string) => {
        dispatch(storyActions.makeStoryBlocked(storyId));
    };

    const onMakeStoryReady = (storyId: string, isReady: boolean, recordVersion: number) => {
        dispatch(storyActions.makeStoryReadyRequest(storyId, isReady, recordVersion));
    };

    const columnProps: IColumnProps = {
        column,
        team,
        stories,
        isDragging,
        onMakeStoryBlocked,
        onMakeStoryReady,
        onSelectStory,
    };

    return <Column {...columnProps} />;
};

export default ColumnContainer;
