import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import * as teamActions from '../../../redux/actions/teamActions';
import * as projectSelectors from '../../../redux/selectors/projectSelectors';
import { ITeam } from '../../../types/teamTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import TeamModal, { ITeamModalProps } from './TeamModal';

const TeamContainerModal = () => {
    const dispatch = useDispatch();

    const projects = useSelector(projectSelectors.getProjectNames);

    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, 1, 100, true, BaseRegexExpression).validate();

    const onSubmit = (values: ITeam) => {
        dispatch(teamActions.createTeamRequest(values));
    };

    const teamCreationProps: ITeamModalProps = {
        projects,
        validateField,
        onSubmit,
    };

    return <TeamModal {...teamCreationProps} />;
};

export default TeamContainerModal;
