import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSortFields } from '../../../helpers/storyHelper';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import * as userSelectors from '../../../redux/selectors/userSelectors';
import { SortFields } from '../../../types/storyTypes';
import InfoTab, { IInfoTabProps } from './InfoTab';

const InfoTabContainer = () => {
    const team = useSelector(teamSelectors.getCurrentTeam);
    const user = useSelector(userSelectors.getUser);
    const sortFields = createSortFields();

    const [sortType, setSortType] = useState(SortFields.PRIORITY);

    const onChangeSortType = (value: string) => {
        setSortType(value);
    };

    const onClickAddStory = () => {
        console.log('click');
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
