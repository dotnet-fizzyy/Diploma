import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as storyActions from '../../redux/actions/storyActions';
import * as storySelectors from '../../redux/selectors/storySelectors';
import * as teamSelectors from '../../redux/selectors/teamSelectors';
import StoryHistory, { IStoryHistoryProps } from './StoryHistory';

const StoryHistoryContainer = () => {
    const dispatch = useDispatch();
    const params: any = useParams();

    const storyHistory = useSelector(storySelectors.getStoryHistory);
    const team = useSelector(teamSelectors.getSelectedTeam);

    useEffect(() => {
        if (!storyHistory.length) {
            dispatch(storyActions.getStoryHistoryRequest(params.storyId));
        }
    }, [dispatch, params.storyId, storyHistory.length]);

    const storyHistoryProps: IStoryHistoryProps = {
        storyHistory,
        team,
    };

    return <StoryHistory {...storyHistoryProps} />;
};

export default StoryHistoryContainer;
