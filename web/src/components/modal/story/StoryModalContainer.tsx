import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { createStoryRequest } from '../../../redux/actions/storyActions';
import { getSprints } from '../../../redux/selectors/sprintSelectors';
import { getTeamUsers } from '../../../redux/selectors/teamSelectors';
import { IStoryFormTypes } from '../../../types/formTypes';
import { ISprint } from '../../../types/sprintTypes';
import { ISelectedItem, IStory } from '../../../types/storyTypes';
import { IUser } from '../../../types/userTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import {
    createStoryEstimationDropdownItems,
    createStoryPriorityDropdownItems,
    getInitialValuesWithLatestSprintIdForStory,
    getSprintNames,
} from '../../../utils/storyUtils';
import { createUserPositionDropdownItems } from '../../../utils/userUtils';
import StoryModal, { IStoryCreationProps } from './StoryModal';

const StoryModalContainer = () => {
    const dispatch = useDispatch();

    const teamMembers: IUser[] = useSelector(getTeamUsers);
    const sprints: ISprint[] = useSelector(getSprints);
    const priorities: ISelectedItem[] = createStoryPriorityDropdownItems();
    const storyEstimation: ISelectedItem[] = createStoryEstimationDropdownItems();
    const requiredPositions: ISelectedItem[] = createUserPositionDropdownItems();
    const initialValues: IStoryFormTypes = getInitialValuesWithLatestSprintIdForStory(sprints);

    const onSubmitStory = (values: IStoryFormTypes) => {
        const story: IStory = {
            ...values,
        };
        dispatch(createStoryRequest(story));
    };

    const validateStoryTitle = (value: string) =>
        new InputFormFieldValidator(value, 3, 100, true, BaseRegexExpression).validate();

    const storyCreationProps: IStoryCreationProps = {
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
