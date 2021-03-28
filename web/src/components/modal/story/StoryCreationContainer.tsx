import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialStory } from '../../../constants/storyConstants';
import { createStoryEstimationDropdownItems, createStoryPriorityDropdownItems } from '../../../utils/storyHelper';
import * as storyActions from '../../../redux/actions/storiesActions';
import * as sprintSelectors from '../../../redux/selectors/sprintsSelectors';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import { IStory } from '../../../types/storyTypes';
import StoryCreation, { IStoryCreationProps } from './StoryCreation';

const StoryCreationContainer = () => {
    const dispatch = useDispatch();

    const teamMembers = useSelector(teamSelectors.getUserNames);
    const sprints = useSelector(sprintSelectors.getSprintsNames);
    const priorities = createStoryPriorityDropdownItems();
    const storyEstimation = createStoryEstimationDropdownItems();

    const [story, setStory] = useState<IStory>(initialStory);

    const onChangeField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {
            target: { value, name },
        } = event;

        setStory((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onClickCreateStory = () => {
        dispatch(storyActions.createStoryRequest(story));
    };

    const storyCreationProps: IStoryCreationProps = {
        story,
        teamMembers,
        priorities,
        sprints,
        storyEstimation,
        onChangeField,
        onClickCreateStory,
    };

    return <StoryCreation {...storyCreationProps} />;
};

export default StoryCreationContainer;
