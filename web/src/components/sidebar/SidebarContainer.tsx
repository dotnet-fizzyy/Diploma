import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    areStoriesEqual,
    createStoryEstimationDropdownItems,
    createStoryPriorityDropdownItems,
} from '../../helpers/storyHelper';
import * as sidebarActions from '../../redux/actions/sidebarActions';
import * as sprintSelectors from '../../redux/selectors/sprintsSelectors';
import * as storySelectors from '../../redux/selectors/storiesSelectors';
import * as teamSelectors from '../../redux/selectors/teamSelectors';
import { IStory } from '../../types/storyTypes';
import Sidebar, { ISidebarProps } from './Sidebar';

const SidebarContainer = () => {
    const dispatch = useDispatch();
    const story = useSelector(storySelectors.getSelectedStory);
    const team = useSelector(teamSelectors.getUserNames);
    const sprints = useSelector(sprintSelectors.getSprintsNames);
    const storyPriorities = createStoryPriorityDropdownItems();
    const storyEstimates = createStoryEstimationDropdownItems();

    const [updatedStory, setUpdatedStory] = useState(story);
    const [hasStoryChanged, setHasStoryChanged] = useState(false);

    const onCloseTab = () => {
        dispatch(sidebarActions.sidebarHandleVisibility(false));
    };

    const onClickConfirmChanges = () => {
        console.log(updatedStory);
    };

    const onClickCancelChanges = () => {
        setUpdatedStory(story);
        setHasStoryChanged(false);
    };

    const onSetStoryBlocked = () => {
        setUpdatedStory(
            (prevState) =>
                ({
                    ...prevState,
                    isBlocked: true,
                    isReady: false,
                } as IStory)
        );
    };

    const onSetStoryReady = () => {
        setUpdatedStory(
            (prevState) =>
                ({
                    ...prevState,
                    isBlocked: false,
                    isReady: true,
                } as IStory)
        );
    };

    const onChangeTextField = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const {
            target: { value, name },
        } = event;

        setUpdatedStory((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        if (!areStoriesEqual(story, updatedStory)) {
            setHasStoryChanged(true);
        } else {
            setHasStoryChanged(false);
        }
    }, [story, updatedStory]);

    const sidebarProps: ISidebarProps = {
        hasStoryChanged,
        story: updatedStory,
        team,
        sprints,
        storyPriorities,
        storyEstimates,
        onCloseTab,
        onSetStoryBlocked,
        onSetStoryReady,
        onClickCancelChanges,
        onClickConfirmChanges,
        onChangeTextField,
    };

    return <Sidebar {...sidebarProps} />;
};

export default React.memo(SidebarContainer);
