import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ModalOptions } from '../../../constants/modalConstants';
import { InitialWorkSpaceFormValues } from '../../../constants/workSpaceContants';
import { createWorkSpaceRequest, updateWorkSpaceRequest } from '../../../redux/actions/workSpaceActions';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modalSelectors';
import { getWorkSpace } from '../../../redux/selectors/workSpaceSelectors';
import { IWorkSpaceForm } from '../../../types/formTypes';
import { IWorkSpace } from '../../../types/workSpaceTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import WorkSpaceModal, { IWorkSpaceModalProps } from './WorkSpaceModal';

const WorkSpaceModalContainer = () => {
    const dispatch = useDispatch();
    const modalOption: ModalOptions = useSelector(getModalOption);
    const workSpaceDescription: IWorkSpace = useSelector(getWorkSpace);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const isUpdate: boolean = modalOption === ModalOptions.WORKSPACE_UPDATE;
    const initialState: IWorkSpaceForm = isUpdate
        ? {
              ...workSpaceDescription,
          }
        : InitialWorkSpaceFormValues;

    const onSubmitButton = (values: IWorkSpaceForm): void => {
        const workSpace: IWorkSpace = {
            workSpaceId: values.workSpaceId,
            workSpaceName: values.workSpaceName,
            workSpaceDescription: values.workSpaceDescription,
            creationDate: values.creationDate,
        };

        if (isUpdate) {
            dispatch(updateWorkSpaceRequest(workSpace));
        } else {
            dispatch(createWorkSpaceRequest(workSpace));
        }
    };

    const validateWorkSpaceName = (value: string) =>
        new InputFormFieldValidator(value, 3, 100, true, BaseRegexExpression).validate();

    const workSpaceModalProps: IWorkSpaceModalProps = {
        isPerformingRequest,
        isUpdate,
        initialState,
        onSubmitButton,
        validateWorkSpaceName,
    };

    return <WorkSpaceModal {...workSpaceModalProps} />;
};

export default WorkSpaceModalContainer;
