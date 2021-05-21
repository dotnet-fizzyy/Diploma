import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EpicInitialState } from '../../../constants/epicConstants';
import { ModalOptions } from '../../../constants/modalConstants';
import * as epicActions from '../../../redux/actions/epicActions';
import { getSelectedEpic } from '../../../redux/selectors/epicSelectors';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modalSelectors';
import { getSelectedProject } from '../../../redux/selectors/projectSelectors';
import { IEpic } from '../../../types/epicTypes';
import { IEpicFormTypes } from '../../../types/formTypes';
import { IProject } from '../../../types/projectTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import EpicModal, { IEpicCreationProps } from './EpicModal';

const EpicModalContainer = () => {
    const dispatch = useDispatch();
    const project: IProject = useSelector(getSelectedProject);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const selectedEpic: IEpic = useSelector(getSelectedEpic);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const isUpdate: boolean = modalOption === ModalOptions.EPIC_UPDATE;
    const initialValues: IEpicFormTypes = isUpdate
        ? {
              ...selectedEpic,
              epicId: selectedEpic.epicId,
          }
        : EpicInitialState;

    const onSubmitButton = (values: IEpicFormTypes) => {
        const epic: IEpic = {
            ...values,
            epicId: values.epicId,
            projectId: project.projectId,
        };

        dispatch(epicActions.createEpicRequest(epic));
    };

    const validateEpicName = (value: string) => new InputFormFieldValidator(value, 3, 100, true, null).validate();

    const epicCreationProps: IEpicCreationProps = {
        isPerformingRequest,
        isUpdate,
        initialValues,
        validateEpicName,
        onSubmitButton,
    };

    return <EpicModal {...epicCreationProps} />;
};

export default EpicModalContainer;
