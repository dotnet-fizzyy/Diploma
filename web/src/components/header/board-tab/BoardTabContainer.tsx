import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../constants/modal';
import { SortDirection } from '../../../constants/story';
import { openModal } from '../../../redux/actions/modal';
import {
    changeEpicRequest,
    changeSortDirectionRequest,
    changeStorySprintRequest,
    sortStoriesRequest,
} from '../../../redux/actions/story';
import { getEpicsDropdownItems, getSelectedEpicId } from '../../../redux/selectors/epic';
import { getSelectedSprintId, getSprintDropdownItems } from '../../../redux/selectors/sprint';
import { getSortDirection, getSortType } from '../../../redux/selectors/story';
import { getSelectedTeam } from '../../../redux/selectors/team';
import { getUser } from '../../../redux/selectors/user';
import { ISelectedItem } from '../../../types/story';
import { ITeam } from '../../../types/team';
import { IUser } from '../../../types/user';
import { createSortFields } from '../../../utils/story';
import BoardTab, { IBoardTabProps } from './BoardTab';

const BoardTabContainer = () => {
    const dispatch = useDispatch();
    const team: ITeam = useSelector(getSelectedTeam);
    const user: IUser = useSelector(getUser);
    const selectedEpicId: string = useSelector(getSelectedEpicId);
    const epics: ISelectedItem[] = useSelector(getEpicsDropdownItems);
    const selectedSprintId: string = useSelector(getSelectedSprintId);
    const sprints: ISelectedItem[] = useSelector(getSprintDropdownItems);
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
        userRole: user && user.userRole,
        userPosition: user && user.userPosition,
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
