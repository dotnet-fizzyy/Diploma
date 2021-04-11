import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../../redux/actions/modalActions';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import TeamManagement, { ITeamManagementProps } from './TeamManagement';

const TeamManagementContainer = () => {
    const dispatch = useDispatch();
    const team = useSelector(teamSelectors.getSelectedTeam);

    const onClickAddUser = () => {
        dispatch(modalActions.openModal(ModalTypes.USER_CUSTOMER));
    };

    const teamManagementProps: ITeamManagementProps = {
        team,
        onClickAddUser,
    };

    return <TeamManagement {...teamManagementProps} />;
};

export default TeamManagementContainer;
