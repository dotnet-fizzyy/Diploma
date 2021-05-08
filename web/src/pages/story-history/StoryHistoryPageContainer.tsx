import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStoryHistoryRequest } from '../../redux/actions/storiesActions';
import { getStoryHistory } from '../../redux/selectors/storiesSelectors';
import { IStoryHistory } from '../../types/storyTypes';
import StoryHistoryPage, { IStoryHistoryPageProps } from './StoryHistoryPage';

const StoryHistoryPageContainer = () => {
    const dispatch = useDispatch();
    const params: any = useParams();

    const storyHistoryItems: IStoryHistory[] = useSelector(getStoryHistory);

    useEffect(() => {
        if (params && params.storyId) {
            dispatch(getStoryHistoryRequest(params.storyId));
        }
    }, [params, dispatch]);

    const storyHistoryPageProps: IStoryHistoryPageProps = {
        storyHistoryItems,
    };

    return <StoryHistoryPage {...storyHistoryPageProps} />;
};

export default StoryHistoryPageContainer;
