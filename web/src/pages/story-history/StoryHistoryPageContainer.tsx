import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStoryHistoryRequest } from '../../redux/actions/story';
import { getStoryFromHistory, getStoryHistory } from '../../redux/selectors/story';
import { IStory, IStoryHistory } from '../../types/story';
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

    const onClickResetFilter = (): void => {
        setSelectedDate('');
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
        onClickResetFilter,
    };

    return <StoryHistoryPage {...storyHistoryPageProps} />;
};

export default StoryHistoryPageContainer;
