import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalOptions } from '../../../constants/modalConstants';
import { createSprintRequest } from '../../../redux/actions/sprintActions';
import { getSelectedEpicId } from '../../../redux/selectors/epicSelectors';
import { getModalOption } from '../../../redux/selectors/modalSelectors';
import { ISprint } from '../../../types/sprintTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import SprintModal, { ISprintCreationProps } from './SprintModal';

const SprintModalContainer = () => {
    const dispatch = useDispatch();

    const epicId: string = useSelector(getSelectedEpicId);
    const modalOptions: ModalOptions = useSelector(getModalOption);
    const isUpdate: boolean = modalOptions === ModalOptions.SPRINT_UPDATE;

    const onSubmitButton = (values: ISprint) => {
        const sprint: ISprint = {
            ...values,
            epicId,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
        };

        dispatch(createSprintRequest(sprint));
    };

    const validateSprintName = (value: string) => new InputFormFieldValidator(value, 3, 100, true, null).validate();

    const sprintCreationProps: ISprintCreationProps = {
        isUpdate,
        onSubmitButton,
        validateSprintName,
    };

    return <SprintModal {...sprintCreationProps} />;
};

export default SprintModalContainer;
