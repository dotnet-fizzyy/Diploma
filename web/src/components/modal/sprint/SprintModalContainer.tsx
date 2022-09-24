import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalOptions } from '../../../constants/modal';
import { InitialSprintState } from '../../../constants/sprint';
import { createSprintRequest, removeSprintRequest, updateSprintRequest } from '../../../redux/actions/sprint';
import { getSelectedEpicId } from '../../../redux/selectors/epic';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modal';
import { getSelectedSprint } from '../../../redux/selectors/sprint';
import { ISprint } from '../../../types/sprint';
import { validateInputFormField } from '../../../utils/forms';
import ModalRemove, { IModalRemoveProps } from '../ModalRemove';
import SprintModal, { ISprintCreationProps } from './SprintModal';

const SprintModalContainer = () => {
    const dispatch = useDispatch();

    const epicId: string = useSelector(getSelectedEpicId);
    const modalOptions: ModalOptions = useSelector(getModalOption);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);
    const sprint: ISprint = useSelector(getSelectedSprint);

    const isUpdate: boolean = modalOptions === ModalOptions.SPRINT_UPDATE;
    const isDelete: boolean = modalOptions === ModalOptions.SPRINT_REMOVE;

    const initialValues: ISprint = isUpdate ? sprint : InitialSprintState;

    const onClickRemoveSprint = (): void => {
        dispatch(removeSprintRequest(sprint.sprintId));
    };

    const onSubmitButton = (values: ISprint): void => {
        const newSprint: ISprint = {
            ...values,
            epicId,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
            creationDate: isUpdate ? sprint.creationDate : null,
        };

        if (isUpdate) {
            dispatch(updateSprintRequest(newSprint));
        } else {
            dispatch(createSprintRequest(newSprint));
        }
    };

    const validateSprintName = (value: string) => {
        const isRequired = true;
        const minLength = 3;
        const maxLength = 100;

        return validateInputFormField(value, isRequired, minLength, maxLength);
    };

    const sprintRemoveProps: IModalRemoveProps = {
        entity: 'sprint',
        entityName: isUpdate ? sprint.sprintName : '',
        onClick: onClickRemoveSprint,
    };

    const sprintCreationProps: ISprintCreationProps = {
        initialValues,
        isPerformingRequest,
        isUpdate,
        onSubmitButton,
        validateSprintName,
    };

    return isDelete ? <ModalRemove {...sprintRemoveProps} /> : <SprintModal {...sprintCreationProps} />;
};

export default SprintModalContainer;
