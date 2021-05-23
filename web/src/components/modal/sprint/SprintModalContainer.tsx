import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalOptions } from '../../../constants/modalConstants';
import { InitialSprintState } from '../../../constants/sprintConstants';
import { createSprintRequest, updateSprintRequest } from '../../../redux/actions/sprintActions';
import { getSelectedEpicId } from '../../../redux/selectors/epicSelectors';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modalSelectors';
import { getSelectedSprint } from '../../../redux/selectors/sprintSelectors';
import { ISprint } from '../../../types/sprintTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import SprintModal, { ISprintCreationProps } from './SprintModal';

const SprintModalContainer = () => {
    const dispatch = useDispatch();

    const epicId: string = useSelector(getSelectedEpicId);
    const modalOptions: ModalOptions = useSelector(getModalOption);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);
    const sprint: ISprint = useSelector(getSelectedSprint);

    const isUpdate: boolean = modalOptions === ModalOptions.SPRINT_UPDATE;
    const initialValues: ISprint = isUpdate ? sprint : InitialSprintState;

    const onSubmitButton = (values: ISprint) => {
        const sprint: ISprint = {
            ...values,
            epicId,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
        };

        if (isUpdate) {
            dispatch(updateSprintRequest(sprint));
        } else {
            dispatch(createSprintRequest(sprint));
        }
    };

    const validateSprintName = (value: string) => new InputFormFieldValidator(value, 3, 100, true, null).validate();

    const sprintCreationProps: ISprintCreationProps = {
        initialValues,
        isPerformingRequest,
        isUpdate,
        onSubmitButton,
        validateSprintName,
    };

    return <SprintModal {...sprintCreationProps} />;
};

export default SprintModalContainer;
