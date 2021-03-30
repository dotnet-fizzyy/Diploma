import React from 'react';
import { useDispatch } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { createWorkSpaceRequest } from '../../../redux/actions/workSpaceActions';
import { IWorkSpaceForm } from '../../../types/formTypes';
import { IWorkSpace } from '../../../types/workSpaceTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import WorkSpaceModal, { IWorkSpaceModalProps } from './WorkSpaceModal';

const WorkSpaceModalContainer = () => {
    const dispatch = useDispatch();

    const onSubmitButton = (values: IWorkSpaceForm): void => {
        const workSpace: IWorkSpace = {
            workSpaceName: values.workSpaceName,
            workSpaceDescription: values.workSpaceDescription,
        };

        dispatch(createWorkSpaceRequest(workSpace));
    };

    const validateWorkSpaceName = (value: string) =>
        new InputFormFieldValidator(value, 3, 100, true, BaseRegexExpression).validate();

    const workSpaceModalProps: IWorkSpaceModalProps = {
        onSubmitButton,
        validateWorkSpaceName,
    };

    return <WorkSpaceModal {...workSpaceModalProps} />;
};

export default WorkSpaceModalContainer;
