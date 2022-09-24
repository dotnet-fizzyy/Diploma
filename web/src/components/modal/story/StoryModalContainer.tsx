import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { createStoryRequest } from '../../../redux/actions/story';
import { getModalRequestPerforming } from '../../../redux/selectors/modal';
import { getSprints } from '../../../redux/selectors/sprint';
import { getTeamUsers } from '../../../redux/selectors/team';
import { getUserSelectedTeamId } from '../../../redux/selectors/user';
import { IStoryFormTypes } from '../../../types/forms';
import { ISprint } from '../../../types/sprint';
import { ISelectedItem, IStory } from '../../../types/story';
import { IUser } from '../../../types/user';
import { validateInputFormField } from '../../../utils/forms';
import { getSprintNames } from '../../../utils/sprint';
import {
    createStoryEstimationDropdownItems,
    createStoryPriorityDropdownItems,
    getInitialValuesWithLatestSprintIdForStory,
} from '../../../utils/story';
import { createUserPositionDropdownItems } from '../../../utils/user';
import StoryModal, { IStoryCreationProps } from './StoryModal';

const StoryModalContainer = () => {
    const dispatch = useDispatch();

    const teamId: string = useSelector(getUserSelectedTeamId);
    const teamMembers: IUser[] = useSelector(getTeamUsers);
    const sprints: ISprint[] = useSelector(getSprints);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const priorities: ISelectedItem[] = useMemo(() => createStoryPriorityDropdownItems(), []);
    const storyEstimation: ISelectedItem[] = useMemo(() => createStoryEstimationDropdownItems(), []);
    const requiredPositions: ISelectedItem[] = useMemo(() => createUserPositionDropdownItems(), []);
    const initialValues: IStoryFormTypes = useMemo(() => getInitialValuesWithLatestSprintIdForStory(sprints), [
        sprints,
    ]);

    const onSubmitStory = (values: IStoryFormTypes) => {
        const story: IStory = {
            ...values,
            teamId,
        };

        dispatch(createStoryRequest(story));
    };

    const validateStoryTitle = (value: string) => {
        const isRequired = true;
        const minLength = 3;
        const maxLength = 100;

        return validateInputFormField(value, isRequired, minLength, maxLength, BaseRegexExpression);
    };

    const storyCreationProps: IStoryCreationProps = {
        isPerformingRequest,
        teamMembers,
        priorities,
        sprints: getSprintNames(sprints),
        storyEstimation,
        requiredPositions,
        initialValues,
        onSubmitStory,
        validateStoryTitle,
    };

    return <StoryModal {...storyCreationProps} />;
};

export default StoryModalContainer;
