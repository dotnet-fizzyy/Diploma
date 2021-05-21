import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ModalOptions } from '../../../constants/modalConstants';
import { initialTeamState } from '../../../constants/teamConstants';
import { createTeamRequest, updateTeamRequest } from '../../../redux/actions/teamActions';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modalSelectors';
import { getProjectNames } from '../../../redux/selectors/projectSelectors';
import { getSelectProjectId } from '../../../redux/selectors/projectSelectors';
import { getSelectedTeam } from '../../../redux/selectors/teamSelectors';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import TeamModal, { ITeamModalProps } from './TeamModal';

const TeamModalContainer = () => {
    const dispatch = useDispatch();

    const projectId: string = useSelector(getSelectProjectId);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const projects: ISelectedItem[] = useSelector(getProjectNames);
    const team: ITeam = useSelector(getSelectedTeam);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const isUpdate: boolean = modalOption === ModalOptions.TEAM_UPDATE;
    const initialTeam = isUpdate ? { ...team } : initialTeamState;

    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, 1, 100, true, BaseRegexExpression).validate();

    const onSubmit = (values: ITeam) => {
        const team: ITeam = {
            ...values,
            projectId: isUpdate ? values.projectId : projectId,
        };

        if (isUpdate) {
            dispatch(updateTeamRequest(team));
        } else {
            dispatch(createTeamRequest(team));
        }
    };

    const teamCreationProps: ITeamModalProps = {
        isUpdate,
        projects,
        initialTeam,
        isPerformingRequest,
        validateField,
        onSubmit,
    };

    return <TeamModal {...teamCreationProps} />;
};

export default TeamModalContainer;
