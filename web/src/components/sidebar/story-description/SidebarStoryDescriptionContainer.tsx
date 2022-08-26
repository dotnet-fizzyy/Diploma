import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression, SidebarTypes } from '../../../constants';
import { sidebarChangeType } from '../../../redux/actions/sidebar';
import { storyUpdateChangesRequest } from '../../../redux/actions/story';
import { getSidebarIsLoading } from '../../../redux/selectors/sidebarSelectors';
import { getSprintsNames } from '../../../redux/selectors/sprintSelectors';
import { getSelectedStory } from '../../../redux/selectors/storySelectors';
import { getTeamUsers } from '../../../redux/selectors/teamSelectors';
import { getUser } from '../../../redux/selectors/userSelectors';
import { IStoryFormTypes } from '../../../types/formTypes';
import { ISelectedItem, IStory } from '../../../types/storyTypes';
import { IFullUser, IUser } from '../../../types/userTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import { createStoryEstimationDropdownItems, createStoryPriorityDropdownItems } from '../../../utils/storyUtils';
import { createUserPositionDropdownItems } from '../../../utils/userUtils';
import SidebarStoryDescription, { ISidebarStoryDescription } from './SidebarStoryDescription';

const SidebarStoryDescriptionContainer = () => {
    const dispatch = useDispatch();
    const story: IStory = useSelector(getSelectedStory);
    const user: IFullUser = useSelector(getUser);
    const users: IUser[] = useSelector(getTeamUsers);
    const sprints: ISelectedItem[] = useSelector(getSprintsNames);
    const isLoading: boolean = useSelector(getSidebarIsLoading);
    const storyPriorities: ISelectedItem[] = createStoryPriorityDropdownItems();
    const storyEstimates: ISelectedItem[] = createStoryEstimationDropdownItems();
    const requiredPositions: ISelectedItem[] = createUserPositionDropdownItems();

    const [isBlocked, setIsBlocked] = useState<boolean>(story.isBlocked);
    const [isReady, setIsReady] = useState<boolean>(story.isReady);

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

    const onClickRemoveStory = (): void => {
        dispatch(sidebarChangeType(SidebarTypes.STORY_REMOVE));
    };

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
            blockReason: values.blockReason ? values.blockReason.trim() : null,
            description: values.description.trim(),
        };
        dispatch(storyUpdateChangesRequest(updatedStory));
    };

    const validateStoryTitle = (value: string) =>
        new InputFormFieldValidator(value, 3, 100, true, BaseRegexExpression).validate();

    const sidebarProps: ISidebarStoryDescription = {
        user,
        isBlocked,
        isReady,
        isLoading,
        users,
        sprints,
        storyPriorities,
        storyEstimates,
        requiredPositions,
        initialValues: { ...story, blockReason: story.blockReason || '' },
        onSetStoryBlocked,
        onSetStoryReady,
        onClickCancelChanges,
        onSubmitChanges,
        onClickRemoveStory,
        onClickViewStoryHistory,
        validateStoryTitle,
    };

    return <SidebarStoryDescription {...sidebarProps} />;
};

export default SidebarStoryDescriptionContainer;
