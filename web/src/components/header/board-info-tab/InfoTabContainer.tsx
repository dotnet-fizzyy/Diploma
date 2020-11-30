import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSortFields } from '../../../helpers/storyHelper';
import * as modalActions from '../../../redux/actions/modalActions';
import * as storiesActions from '../../../redux/actions/storiesActions';
import * as epicsSelectors from '../../../redux/selectors/epicsSelectors';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import * as userSelectors from '../../../redux/selectors/userSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import { SortFields } from '../../../types/storyTypes';
import InfoTab, { IInfoTabProps } from './InfoTab';

const InfoTabContainer = () => {
    const dispatch = useDispatch();
    const team = useSelector(teamSelectors.getCurrentTeam);
    const user = useSelector(userSelectors.getUser);
    const epic = useSelector(epicsSelectors.getCurrentEpic);
    const epics = useSelector(epicsSelectors.getEpicsNames);
    const sortFields = createSortFields();

    const [sortType, setSortType] = useState(SortFields.PRIORITY);

    const onChangeEpic = (value: string) => {
        dispatch(storiesActions.changeEpicRequest(value));
    };

    const onChangeSortType = (value: string) => {
        setSortType(value);
    };

    const onClickAddStory = () => {
        dispatch(modalActions.openModal(ModalTypes.STORY_CREATION));
    };

    const infoTabProps: IInfoTabProps = {
        team,
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
