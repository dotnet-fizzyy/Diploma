import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../constants/modalConstants';
import { SortDirection } from '../../../constants/storyConstants';
import { openModal } from '../../../redux/actions/modalActions';
import {
    changeEpicRequest,
    changeSortDirectionRequest,
    changeStorySprintRequest,
    sortStoriesRequest,
} from '../../../redux/actions/storyActions';
import { getEpicsNames, getSelectedEpicId } from '../../../redux/selectors/epicSelectors';
import { getSelectedSprintId, getSprintNamesForBoard } from '../../../redux/selectors/sprintSelectors';
import { getSortDirection, getSortType } from '../../../redux/selectors/storySelectors';
import { getSelectedTeam } from '../../../redux/selectors/teamSelectors';
import { getUser } from '../../../redux/selectors/userSelectors';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import { IUser } from '../../../types/userTypes';
import { createSortFields } from '../../../utils/storyUtils';
import BoardTab, { IBoardTabProps } from './BoardTab';

const BoardTabContainer = () => {
    const dispatch = useDispatch();
    const team: ITeam = useSelector(getSelectedTeam);
    const user: IUser = useSelector(getUser);
    const selectedEpicId: string = useSelector(getSelectedEpicId);
    const epics: ISelectedItem[] = useSelector(getEpicsNames);
    const selectedSprintId: string = useSelector(getSelectedSprintId);
    const sprints: ISelectedItem[] = useSelector(getSprintNamesForBoard);
    const sortType: string = useSelector(getSortType);
    const sortDirection: SortDirection = useSelector(getSortDirection);

    const sortFields: ISelectedItem[] = createSortFields();

    const onChangeEpic = (e): void => {
        dispatch(changeEpicRequest(e.target.value));
    };

    const onChangeSortType = (e): void => {
        dispatch(sortStoriesRequest(e.target.value));
    };

    const onChangeSortDirection = (value: SortDirection): void => {
        dispatch(changeSortDirectionRequest(value));
    };

    const onChangeSprint = (e): void => {
        dispatch(changeStorySprintRequest(e.target.value));
    };

    const onClickAddStory = (): void => {
        dispatch(openModal(ModalTypes.STORY));
    };

    const onClickCreateUser = (): void => {
        dispatch(openModal(ModalTypes.USER_CUSTOMER));
    };

    const infoTabProps: IBoardTabProps = {
        team,
        userId: user && user.userId,
        selectedEpicId,
        selectedSprintId,
        epics,
        sprints,
        sortFields,
        sortType,
        sortDirection,
        onChangeSortType,
        onClickAddStory,
        onChangeEpic,
        onChangeSprint,
        onClickCreateUser,
        onChangeSortDirection,
    };

    return <BoardTab {...infoTabProps} />;
};

export default BoardTabContainer;
