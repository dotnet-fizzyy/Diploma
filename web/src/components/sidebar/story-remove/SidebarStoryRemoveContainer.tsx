import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarTypes } from '../../../constants';
import { sidebarChangeType } from '../../../redux/actions/sidebarActions';
import { removeStoryRequest } from '../../../redux/actions/storyActions';
import { getSelectedStory } from '../../../redux/selectors/storySelectors';
import { IStory } from '../../../types/storyTypes';
import SidebarStoryRemove, { ISidebarStoryRemoveProps } from './SidebarStoryRemove';

const SidebarStoryRemoveContainer = () => {
    const dispatch = useDispatch();

    const story: IStory = useSelector(getSelectedStory);

    const onClickRemoveStory = (): void => {
        dispatch(removeStoryRequest(story.storyId, story.recordVersion));
    };

    const onClickCancelRemove = (): void => {
        dispatch(sidebarChangeType(SidebarTypes.STORY_DESCRIPTION));
    };

    const sidebarStoryRemove: ISidebarStoryRemoveProps = {
        story,
        onClickRemoveStory,
        onClickCancelRemove,
    };

    return <SidebarStoryRemove {...sidebarStoryRemove} />;
};

export default SidebarStoryRemoveContainer;
