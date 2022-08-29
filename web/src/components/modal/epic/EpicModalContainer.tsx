import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EpicInitialState } from '../../../constants/epic';
import { ModalOptions } from '../../../constants/modal';
import { createEpicRequest, removeEpicRequest, updateEpicRequest } from '../../../redux/actions/epic';
import { getSelectedEpic } from '../../../redux/selectors/epic';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modal';
import { getSelectedProject } from '../../../redux/selectors/project';
import { IEpic } from '../../../types/epic';
import { IEpicFormTypes } from '../../../types/forms';
import { IProject } from '../../../types/project';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import ModalRemove, { IModalRemoveProps } from '../ModalRemove';
import EpicModal, { IEpicCreationProps } from './EpicModal';

const EpicModalContainer = () => {
    const dispatch = useDispatch();
    const project: IProject = useSelector(getSelectedProject);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const selectedEpic: IEpic = useSelector(getSelectedEpic);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const isUpdate: boolean = modalOption === ModalOptions.EPIC_UPDATE;
    const isRemove: boolean = modalOption === ModalOptions.EPIC_REMOVE;
    const initialValues: IEpicFormTypes = isUpdate
        ? {
              ...selectedEpic,
              epicId: selectedEpic.epicId,
          }
        : EpicInitialState;

    const onSubmitButton = (values: IEpicFormTypes): void => {
        const epic: IEpic = {
            ...values,
            epicId: values.epicId,
            projectId: project.projectId,
            creationDate: isUpdate ? selectedEpic.creationDate : null,
        };

        if (isUpdate) {
            dispatch(updateEpicRequest(epic));
        } else {
            dispatch(createEpicRequest(epic));
        }
    };

    const onClickRemoveEpic = (): void => {
        dispatch(removeEpicRequest(selectedEpic.epicId));
    };

    const validateEpicName = (value: string) => new InputFormFieldValidator(value, 3, 100, true, null).validate();

    const epicRemoveProps: IModalRemoveProps = {
        entity: 'epic',
        entityName: selectedEpic ? selectedEpic.epicName : '',
        onClick: onClickRemoveEpic,
    };

    const epicCreationProps: IEpicCreationProps = {
        isPerformingRequest,
        isUpdate,
        initialValues,
        validateEpicName,
        onSubmitButton,
    };

    return isRemove ? <ModalRemove {...epicRemoveProps} /> : <EpicModal {...epicCreationProps} />;
};

export default EpicModalContainer;
