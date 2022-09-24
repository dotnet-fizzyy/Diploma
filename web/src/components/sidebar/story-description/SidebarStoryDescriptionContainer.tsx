import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression, SidebarTypes } from '../../../constants';
import { sidebarChangeType } from '../../../redux/actions/sidebar';
import { storyUpdateChangesRequest } from '../../../redux/actions/story';
import { getSidebarIsLoading } from '../../../redux/selectors/sidebar';
import { getSprintsNames } from '../../../redux/selectors/sprint';
import { getSelectedStory } from '../../../redux/selectors/story';
import { getTeamUsers } from '../../../redux/selectors/team';
import { getUser } from '../../../redux/selectors/user';
import { IStoryFormTypes } from '../../../types/forms';
import { ISelectedItem, IStory } from '../../../types/story';
import { IFullUser, IUser } from '../../../types/user';
import { validateInputFormField } from '../../../utils/forms';
import { createStoryEstimationDropdownItems, createStoryPriorityDropdownItems } from '../../../utils/story';
import { createUserPositionDropdownItems } from '../../../utils/user';
import SidebarStoryDescription, { ISidebarStoryDescription } from './SidebarStoryDescription';

const SidebarStoryDescriptionContainer = () => {
    const dispatch = useDispatch();

    const story: IStory = useSelector(getSelectedStory);
    const user: IFullUser = useSelector(getUser);
    const users: IUser[] = useSelector(getTeamUsers);
    const sprints: ISelectedItem[] = useSelector(getSprintsNames);
    const isLoading: boolean = useSelector(getSidebarIsLoading);

    const [isBlocked, setIsBlocked] = useState<boolean>(story.isBlocked);
    const [isReady, setIsReady] = useState<boolean>(story.isReady);

    const storyPriorities: ISelectedItem[] = useMemo(() => createStoryPriorityDropdownItems(), []);
    const storyEstimates: ISelectedItem[] = useMemo(() => createStoryEstimationDropdownItems(), []);
    const requiredPositions: ISelectedItem[] = useMemo(() => createUserPositionDropdownItems(), []);

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
            blockReason: values.blockReason?.trim() ?? null,
            description: values.description.trim(),
        };

        dispatch(storyUpdateChangesRequest(updatedStory));
    };

    const validateStoryTitle = (value: string) => {
        const isRequired = true;
        const minLength = 3;
        const maxLength = 16;

        return validateInputFormField(value, isRequired, minLength, maxLength, BaseRegexExpression);
    };

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
