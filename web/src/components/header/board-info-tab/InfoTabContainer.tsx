import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSortFields } from '../../../helpers/storyHelper';
import * as modalActions from '../../../redux/actions/modalActions';
import * as storiesActions from '../../../redux/actions/storiesActions';
import * as epicsSelectors from '../../../redux/selectors/epicsSelectors';
import * as projectSelectors from '../../../redux/selectors/projectSelectors';
import * as storiesSelectors from '../../../redux/selectors/storiesSelectors';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import * as userSelectors from '../../../redux/selectors/userSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import InfoTab, { IInfoTabProps } from './InfoTab';

const InfoTabContainer = () => {
    const dispatch = useDispatch();
    const team = useSelector(teamSelectors.getCurrentTeam);
    const user = useSelector(userSelectors.getUser);
    const epic = useSelector(epicsSelectors.getCurrentEpic);
    const epics = useSelector(epicsSelectors.getEpicsNames);
    const project = useSelector(projectSelectors.getProject);
    const sortType = useSelector(storiesSelectors.getSortType);
    const sortFields = createSortFields();

    const onChangeEpic = (value: string) => {
        dispatch(storiesActions.changeEpicRequest(value));
    };

    const onChangeSortType = (value: string) => {
        dispatch(storiesActions.sortStoriesRequest(value));
    };

    const onClickAddStory = () => {
        dispatch(modalActions.openModal(ModalTypes.STORY_CREATION));
    };

    useEffect(() => {}, []);

    const infoTabProps: IInfoTabProps = {
        team,
        project,
        user,
        epic,
        epics,
        sortFields,
        sortType,
        onChangeSortType,
        onClickAddStory,
        onChangeEpic,
    };

    return <InfoTab {...infoTabProps} />;
};

export default InfoTabContainer;
