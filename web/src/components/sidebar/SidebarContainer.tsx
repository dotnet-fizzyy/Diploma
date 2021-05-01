import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sidebarActions from '../../redux/actions/sidebarActions';
import * as sprintSelectors from '../../redux/selectors/sprintsSelectors';
import * as storySelectors from '../../redux/selectors/storiesSelectors';
import * as teamSelectors from '../../redux/selectors/teamSelectors';
import { IStoryFormTypes } from '../../types/formTypes';
import { createStoryEstimationDropdownItems, createStoryPriorityDropdownItems } from '../../utils/storyHelper';
import Sidebar, { ISidebarProps } from './Sidebar';

const SidebarContainer = () => {
    const dispatch = useDispatch();
    const story = useSelector(storySelectors.getSelectedStory);
    const team = useSelector(teamSelectors.getUserNames);
    const sprints = useSelector(sprintSelectors.getSprintsNames);
    const storyPriorities = createStoryPriorityDropdownItems();
    const storyEstimates = createStoryEstimationDropdownItems();

    const [isBlocked, setIsBlocked] = useState<boolean>(story.isBlocked);
    const [isReady, setIsReady] = useState<boolean>(story.isReady);

    const onCloseTab = (): void => {
        dispatch(sidebarActions.sidebarHandleVisibility(false));
    };

    const onClickCancelChanges = (): void => {
        setIsReady(story.isReady);
        setIsBlocked(story.isBlocked);
    };

    const onSetStoryBlocked = (): void => {
        setIsReady(false);
        setIsBlocked(!isBlocked);
    };

    const onSetStoryReady = (): void => {
        setIsBlocked(false);
        setIsReady(!isReady);
    };

    const onClickRemoveStory = (): void => {};

    const onClickViewStoryHistory = (): void => {
        window.open(`/history/${story.storyId}`).focus();
    };

    const onSubmitChanges = (values: IStoryFormTypes): void => {
        console.warn(values);
    };

    const sidebarProps: ISidebarProps = {
        isBlocked,
        isReady,
        team,
        sprints,
        storyPriorities,
        storyEstimates,
        initialValues: { ...story },
        onCloseTab,
        onSetStoryBlocked,
        onSetStoryReady,
        onClickCancelChanges,
        onSubmitChanges,
        onClickRemoveStory,
        onClickViewStoryHistory,
    };

    return <Sidebar {...sidebarProps} />;
};

export default React.memo(SidebarContainer);
