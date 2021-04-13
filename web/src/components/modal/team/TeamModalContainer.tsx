import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { initialTeamState } from '../../../constants/teamConstants';
import * as teamActions from '../../../redux/actions/teamActions';
import { getModalOption } from '../../../redux/selectors/modalSelectors';
import * as projectSelectors from '../../../redux/selectors/projectSelectors';
import { getSelectProjectId } from '../../../redux/selectors/projectSelectors';
import { ModalOptions } from '../../../types/modalTypes';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam } from '../../../types/teamTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import TeamModal, { ITeamModalProps } from './TeamModal';

const TeamModalContainer = () => {
    const dispatch = useDispatch();

    const projectId: string = useSelector(getSelectProjectId);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const projects: ISelectedItem[] = useSelector(projectSelectors.getProjectNames);
    const isUpdate: boolean = modalOption === ModalOptions.TEAM_UPDATE;
    const initialTeam = isUpdate ? { ...initialTeamState } : initialTeamState;

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
        isUpdate,
        projects,
        initialTeam,
        validateField,
        onSubmit,
    };

    return <TeamModal {...teamCreationProps} />;
};

export default TeamModalContainer;
