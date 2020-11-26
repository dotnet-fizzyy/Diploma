import React, { useState } from 'react';
import { initialStory } from '../../../constants/storyConstants';
import { IStory } from '../../../types/storyTypes';
import StoryCreation, { IStoryCreationProps } from './StoryCreation';

const StoryCreationContainer = () => {
    const [story, setStory] = useState<IStory>(initialStory);

    const onChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        console.log(story);
    };

    const storyCreationProps: IStoryCreationProps = {
        story,
        onChangeTextField,
        onClickCreateStory,
    };

    return <StoryCreation {...storyCreationProps} />;
};

export default StoryCreationContainer;
