import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import * as teamActions from '../../../redux/actions/teamActions';
import { getSelectProjectId } from '../../../redux/selectors/projectSelectors';
import * as projectSelectors from '../../../redux/selectors/projectSelectors';
import { ITeam } from '../../../types/teamTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import TeamModal, { ITeamModalProps } from './TeamModal';

const TeamModalContainer = () => {
    const dispatch = useDispatch();

    const projectId: string = useSelector(getSelectProjectId);
    const projects = useSelector(projectSelectors.getProjectNames);

    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, 1, 100, true, BaseRegexExpression).validate();

    const onSubmit = (values: ITeam) => {
        const team: ITeam = {
            ...values,
            projectId,
        };

        dispatch(teamActions.createTeamRequest(team));
    };

    const teamCreationProps: ITeamModalProps = {
        projects,
        validateField,
        onSubmit,
    };

    return <TeamModal {...teamCreationProps} />;
};

export default TeamModalContainer;
