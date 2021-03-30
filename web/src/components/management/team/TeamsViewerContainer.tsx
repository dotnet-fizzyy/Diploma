import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as modalActions from '../../../redux/actions/modalActions';
import * as teamActions from '../../../redux/actions/teamActions';
import * as teamSelectors from '../../../redux/selectors/teamSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import TeamsViewer, { ITeamsViewerProps } from './TeamsViewer';

const TeamsViewerContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const teams = useSelector(teamSelectors.getTeams);

    const onClickAddTeam = () => {
        dispatch(modalActions.openModal(ModalTypes.TEAM));
    };

    const onTeamSelect = (value: string) => {
        dispatch(teamActions.setSelectedTeamById(value));
        history.push(`/team/${value}`);
    };

    useEffect(() => {
        dispatch(teamActions.getUserTeamsRequest());
    }, [dispatch]);

    const teamManagementProps: ITeamsViewerProps = {
        teams,
        onClickAddTeam,
        onTeamSelect,
    };

    return <TeamsViewer {...teamManagementProps} />;
};

export default TeamsViewerContainer;
