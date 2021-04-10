import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EpicInitialState } from '../../../constants/epicConstants';
import * as epicActions from '../../../redux/actions/epicActions';
import { getCurrentEpic } from '../../../redux/selectors/epicsSelectors';
import { getModalOption } from '../../../redux/selectors/modalSelectors';
import { getProject } from '../../../redux/selectors/projectSelectors';
import { IEpic, IEpicFormTypes } from '../../../types/epicTypes';
import { ModalOptions } from '../../../types/modalTypes';
import { IProject } from '../../../types/projectTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import EpicModal, { IEpicCreationProps } from './EpicModal';

const EpicModalContainer = () => {
    const dispatch = useDispatch();
    const project: IProject = useSelector(getProject);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const selectedEpic: IEpic = useSelector(getCurrentEpic);

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
        isUpdate,
        initialValues,
        validateEpicName,
        onSubmitButton,
    };

    return <EpicModal {...epicCreationProps} />;
};

export default EpicModalContainer;
