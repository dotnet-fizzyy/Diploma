import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialTeamState } from '../../../constants/teamConstants';
import * as teamActions from '../../../redux/actions/teamActions';
import * as projectSelectors from '../../../redux/selectors/projectSelectors';
import { ITeam } from '../../../types/teamTypes';
import TeamCreation, { ITeamCreationProps } from './TeamCreation';

const TeamCreationContainer = () => {
    const dispatch = useDispatch();
    const [team, setTeam] = useState<ITeam>(initialTeamState);

    const projects = useSelector(projectSelectors.getProjectNames);

    const onChangeTeamField = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { value, name } = event.target;
        setTeam((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onClickCreateTeam = () => {
        dispatch(teamActions.createTeamRequest(team));
    };

    const teamCreationProps: ITeamCreationProps = {
        team,
        projects,
        onChangeTeamField,
        onClickCreateTeam,
    };

    return <TeamCreation {...teamCreationProps} />;
};

export default TeamCreationContainer;
