import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as storyActions from '../../redux/actions/storiesActions';
import * as storySelectors from '../../redux/selectors/storiesSelectors';
import StoryHistory, { IStoryHistoryProps } from './StoryHistory';

const StoryHistoryContainer = () => {
    const dispatch = useDispatch();
    const params: any = useParams();

    const storyHistory = useSelector(storySelectors.getStoryHistory);

    useEffect(() => {
        dispatch(storyActions.getStoryHistoryRequest(params.storyId));
    }, [dispatch, params.storyId]);

    const storyHistoryProps: IStoryHistoryProps = {
        storyHistory,
    };

    return <StoryHistory {...storyHistoryProps} />;
};

export default StoryHistoryContainer;
