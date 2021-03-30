import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../../redux/actions/modalActions';
import * as teamActions from '../../../redux/actions/teamActions';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import TeamManagement, { ITeamManagementProps } from './TeamManagement';

const TeamManagementContainer = () => {
    const dispatch = useDispatch();
    const team = useSelector(teamSelectors.getCurrentTeam);

    const onClickAddUser = () => {
        dispatch(modalActions.openModal(ModalTypes.USER));
    };

    const teamManagementProps: ITeamManagementProps = {
        team,
        onClickAddUser,
    };

    useEffect(() => {
        dispatch(teamActions.getUserTeamsRequest());
    }, [dispatch]);

    return <TeamManagement {...teamManagementProps} />;
};

export default TeamManagementContainer;
