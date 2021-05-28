import React, { useEffect, useState } from 'react';
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

    const [selectedDate, setSelectedDate] = useState<string>('');

    const onChangeSelectedDateFilter = (newDate: string): void => {
        setSelectedDate(newDate);
    };

    useEffect(() => {
        if (params && params.storyId) {
            dispatch(getStoryHistoryRequest(params.storyId));
        }
    }, [params, dispatch]);

    const storyHistoryPageProps: IStoryHistoryPageProps = {
        storyHistoryItems,
        story,
        selectedDate,
        onChangeSelectedDateFilter,
    };

    return <StoryHistoryPage {...storyHistoryPageProps} />;
};

export default StoryHistoryPageContainer;
