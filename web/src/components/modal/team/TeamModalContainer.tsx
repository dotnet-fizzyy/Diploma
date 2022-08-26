import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ModalOptions } from '../../../constants/modalConstants';
import { initialTeamState } from '../../../constants/teamConstants';
import { createTeamRequest, removeTeamRequest, updateTeamRequest } from '../../../redux/actions/team';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modal';
import { getProjectNames } from '../../../redux/selectors/project';
import { getSelectProjectId } from '../../../redux/selectors/project';
import { getSelectedTeam, getSelectedTeamFromSimpleItems } from '../../../redux/selectors/teamSelectors';
import { ISelectedItem } from '../../../types/storyTypes';
import { ITeam, ITeamSimpleModel } from '../../../types/teamTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import ModalRemove, { IModalRemoveProps } from '../ModalRemove';
import TeamModal, { ITeamModalProps } from './TeamModal';

const TeamModalContainer = () => {
    const dispatch = useDispatch();

    const projectId: string = useSelector(getSelectProjectId);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const projects: ISelectedItem[] = useSelector(getProjectNames);
    const team: ITeam = useSelector(getSelectedTeam);
    const teamSimpleModel: ITeamSimpleModel = useSelector(getSelectedTeamFromSimpleItems);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const isUpdate: boolean = modalOption === ModalOptions.TEAM_UPDATE;
    const isRemove: boolean = modalOption === ModalOptions.TEAM_REMOVE;
    const initialTeam = isUpdate ? { ...team } : initialTeamState;

    const validateField = (value: string): string =>
        new InputFormFieldValidator(value, 1, 100, true, BaseRegexExpression).validate();

    const onSubmit = (values: ITeam) => {
        const newTeam: ITeam = {
            ...values,
            projectId: isUpdate ? values.projectId : projectId,
            creationDate: isUpdate ? team.creationDate : null,
        };

        if (isUpdate) {
            dispatch(updateTeamRequest(newTeam));
        } else {
            dispatch(createTeamRequest(newTeam));
        }
    };

    const onClickRemoveTeam = (): void => {
        dispatch(removeTeamRequest(teamSimpleModel.teamId));
    };

    const modalRemoveProps: IModalRemoveProps = {
        entity: 'team',
        entityName: teamSimpleModel ? teamSimpleModel.teamName : '',
        onClick: onClickRemoveTeam,
    };

    const teamCreationProps: ITeamModalProps = {
        isUpdate,
        projects,
        initialTeam,
        isPerformingRequest,
        validateField,
        onSubmit,
    };

    return isRemove ? <ModalRemove {...modalRemoveProps} /> : <TeamModal {...teamCreationProps} />;
};

export default TeamModalContainer;
