import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSortFields } from '../../../helpers/storyHelper';
import * as modalActions from '../../../redux/actions/modalActions';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import * as userSelectors from '../../../redux/selectors/userSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import { SortFields } from '../../../types/storyTypes';
import InfoTab, { IInfoTabProps } from './InfoTab';

const InfoTabContainer = () => {
    const dispatch = useDispatch();
    const team = useSelector(teamSelectors.getCurrentTeam);
    const user = useSelector(userSelectors.getUser);
    const sortFields = createSortFields();

    const [sortType, setSortType] = useState(SortFields.PRIORITY);

    const onChangeSortType = (value: string) => {
        setSortType(value);
    };

    const onClickAddStory = () => {
        dispatch(modalActions.openModal(ModalTypes.STORY_CREATION));
    };

    const infoTabProps: IInfoTabProps = {
        team,
        user,
        sortFields,
        sortType,
        onChangeSortType,
        onClickAddStory,
    };

    return <InfoTab {...infoTabProps} />;
};

export default InfoTabContainer;
