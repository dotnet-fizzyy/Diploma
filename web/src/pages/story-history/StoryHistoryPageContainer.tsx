import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStoryHistoryRequest } from '../../redux/actions/storyActions';
import { getStoryFromHistory, getStoryHistory } from '../../redux/selectors/storySelectors';
import { IStory, IStoryHistory } from '../../types/storyTypes';
import StoryHistoryPage, { IStoryHistoryPageProps } from './StoryHistoryPage';

const StoryHistoryPageContainer = () => {
    const dispatch = useDispatch();
    const params: any = useParams();

    const storyHistoryItems: IStoryHistory[] = useSelector(getStoryHistory);
    const story: IStory = useSelector(getStoryFromHistory);

    useEffect(() => {
        if (params && params.storyId) {
            dispatch(getStoryHistoryRequest(params.storyId));
        }
    }, [params, dispatch]);

    const storyHistoryPageProps: IStoryHistoryPageProps = {
        storyHistoryItems,
        story,
    };

    return <StoryHistoryPage {...storyHistoryPageProps} />;
};

export default StoryHistoryPageContainer;
