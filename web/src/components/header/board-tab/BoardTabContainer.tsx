import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalTypes } from '../../../constants/modalConstants';
import { openModal } from '../../../redux/actions/modalActions';
import { changeEpicRequest, sortStoriesRequest } from '../../../redux/actions/storiesActions';
import { getEpicsNames, getSelectedEpicId } from '../../../redux/selectors/epicsSelectors';
import { getSelectedSprintId, getSprintNamesForBoard } from '../../../redux/selectors/sprintsSelectors';
import { getSortType } from '../../../redux/selectors/storiesSelectors';
import { getSelectedTeam } from '../../../redux/selectors/teamSelectors';
import { getUser } from '../../../redux/selectors/userSelectors';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import { IUser } from '../../../types/userTypes';
import { createSortFields } from '../../../utils/storyHelper';
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
    const sortFields: ISelectedItem[] = createSortFields();

    const onChangeEpic = (value: string): void => {
        dispatch(changeEpicRequest(value));
    };

    const onChangeSortType = (e): void => {
        dispatch(sortStoriesRequest(e.target.value));
    };

    const onChangeSprint = (e): void => {
        console.log(e.target.value);
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
        onChangeSortType,
        onClickAddStory,
        onChangeEpic,
        onChangeSprint,
        onClickCreateUser,
    };

    return <BoardTab {...infoTabProps} />;
};

export default BoardTabContainer;
