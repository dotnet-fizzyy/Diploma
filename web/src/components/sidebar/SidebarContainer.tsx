import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../constants';
import { sidebarHandleVisibility, sidebarSetLoadingStatus } from '../../redux/actions/sidebarActions';
import { storyUpdateChangesRequest } from '../../redux/actions/storiesActions';
import { getSidebarIsLoading } from '../../redux/selectors/sidebarSelectors';
import { getSprintsNames } from '../../redux/selectors/sprintsSelectors';
import { getSelectedStory } from '../../redux/selectors/storiesSelectors';
import { getTeamUsers } from '../../redux/selectors/teamSelectors';
import { IStoryFormTypes } from '../../types/formTypes';
import { ISelectedItem, IStory } from '../../types/storyTypes';
import { IUser } from '../../types/userTypes';
import { InputFormFieldValidator } from '../../utils/formHelper';
import { createStoryEstimationDropdownItems, createStoryPriorityDropdownItems } from '../../utils/storyHelper';
import { createUserPositionDropdownItems } from '../../utils/userHelper';
import Sidebar, { ISidebarProps } from './Sidebar';

const SidebarContainer = () => {
    const dispatch = useDispatch();
    const story: IStory = useSelector(getSelectedStory);
    const users: IUser[] = useSelector(getTeamUsers);
    const sprints: ISelectedItem[] = useSelector(getSprintsNames);
    const isLoading: boolean = useSelector(getSidebarIsLoading);
    const storyPriorities: ISelectedItem[] = createStoryPriorityDropdownItems();
    const storyEstimates: ISelectedItem[] = createStoryEstimationDropdownItems();
    const requiredPositions: ISelectedItem[] = createUserPositionDropdownItems();

    const [isBlocked, setIsBlocked] = useState<boolean>(story.isBlocked);
    const [isReady, setIsReady] = useState<boolean>(story.isReady);

    const onCloseTab = (): void => {
        dispatch(sidebarHandleVisibility(false));
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
        const updatedStory: IStory = {
            ...values,
            isReady,
            isBlocked,
            title: values.title.trim(),
            notes: values.notes.trim(),
            description: values.description.trim(),
        };

        dispatch(sidebarSetLoadingStatus(true));
        dispatch(storyUpdateChangesRequest(updatedStory));
    };

    const validateStoryTitle = (value: string) =>
        new InputFormFieldValidator(value, 3, 100, true, BaseRegexExpression).validate();

    const sidebarProps: ISidebarProps = {
        isBlocked,
        isReady,
        isLoading,
        users,
        sprints,
        storyPriorities,
        storyEstimates,
        requiredPositions,
        initialValues: { ...story, blockReason: story.blockReason || '' },
        onCloseTab,
        onSetStoryBlocked,
        onSetStoryReady,
        onClickCancelChanges,
        onSubmitChanges,
        onClickRemoveStory,
        onClickViewStoryHistory,
        validateStoryTitle,
    };

    return <Sidebar {...sidebarProps} />;
};

export default React.memo(SidebarContainer);
