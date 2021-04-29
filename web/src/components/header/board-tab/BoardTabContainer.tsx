import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../redux/actions/modalActions';
import { changeEpicRequest, sortStoriesRequest } from '../../../redux/actions/storiesActions';
import { getEpicsNames, getSelectedEpicId } from '../../../redux/selectors/epicsSelectors';
import { getSelectProject } from '../../../redux/selectors/projectSelectors';
import { getSortType } from '../../../redux/selectors/storiesSelectors';
import { getSelectedTeam } from '../../../redux/selectors/teamSelectors';
import { getUser } from '../../../redux/selectors/userSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import { createSortFields } from '../../../utils/storyHelper';
import BoardTab, { IBoardTabProps } from './BoardTab';

const BoardTabContainer = () => {
    const dispatch = useDispatch();
    const team = useSelector(getSelectedTeam);
    const user = useSelector(getUser);
    const selectedEpicId = useSelector(getSelectedEpicId);
    const epics = useSelector(getEpicsNames);
    const project = useSelector(getSelectProject);
    const sortType = useSelector(getSortType);
    const sortFields = createSortFields();

    const onChangeEpic = (value: string): void => {
        dispatch(changeEpicRequest(value));
    };

    const onChangeSortType = (e): void => {
        dispatch(sortStoriesRequest(e.target.value));
    };

    const onClickAddStory = (): void => {
        dispatch(openModal(ModalTypes.STORY));
    };

    const onClickCreateUser = (): void => {
        dispatch(openModal(ModalTypes.USER_CUSTOMER));
    };

    const infoTabProps: IBoardTabProps = {
        team,
        projectName: project && project.projectName,
        userId: user && user.userId,
        selectedEpicId,
        epics,
        sortFields,
        sortType,
        onChangeSortType,
        onClickAddStory,
        onChangeEpic,
        onClickCreateUser,
    };

    return <BoardTab {...infoTabProps} />;
};

export default BoardTabContainer;
