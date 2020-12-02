import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as teamActions from '../../redux/actions/teamActions';
import * as teamSelectors from '../../redux/selectors/teamSelectors';
import TeamsViewer, { ITeamsViewerProps } from './TeamsViewer';

const TeamsViewerContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const teams = useSelector(teamSelectors.getTeams);

    const onTeamSelect = (value: string) => {
        dispatch(teamActions.setSelectedTeamById(value));
        history.push(`/team/${value}`);
    };

    const teamManagementProps: ITeamsViewerProps = {
        teams,
        onTeamSelect,
    };

    return <TeamsViewer {...teamManagementProps} />;
};

export default TeamsViewerContainer;
