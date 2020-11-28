import React from 'react';
import { IStoryHistory } from '../../types/storyTypes';

export interface IStoryHistoryProps {
    storyHistory: IStoryHistory[];
}

const StoryHistory = (props: IStoryHistoryProps) => {
    return <span>history</span>;
};

export default StoryHistory;
