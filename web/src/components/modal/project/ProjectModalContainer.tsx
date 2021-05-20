import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ModalOptions } from '../../../constants/modalConstants';
import { initialProjectFormValues, ProjectLengthDescriptionMaxLength } from '../../../constants/projectConstants';
import { createProjectRequest, updateProjectRequest } from '../../../redux/actions/projectActions';
import { getModalOption } from '../../../redux/selectors/modalSelectors';
import { getSelectedProject } from '../../../redux/selectors/projectSelectors';
import { getWorkSpaceId } from '../../../redux/selectors/workSpaceSelectors';
import { IProjectForm } from '../../../types/formTypes';
import { IProject } from '../../../types/projectTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
import ProjectModal, { IProjectCreationProps } from './ProjectModal';

const ProjectModalContainer = () => {
    const dispatch = useDispatch();
    const workSpaceId: string = useSelector(getWorkSpaceId);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const project: IProject = useSelector(getSelectedProject);

    const isUpdate: boolean = modalOption === ModalOptions.PROJECT_UPDATE;
    const initialValues: IProject = isUpdate ? project : initialProjectFormValues;

    const onSubmitProjectHandling = (values: IProjectForm) => {
        const project: IProject = {
            ...values,
            projectName: values.projectName,
            projectDescription: values.projectDescription,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
            workSpaceId: isUpdate ? values.workSpaceId : workSpaceId,
        };

        if (isUpdate) {
            dispatch(updateProjectRequest(project));
        } else {
            dispatch(createProjectRequest(project));
        }
    };

    const validateProjectName = (value: string) =>
        new InputFormFieldValidator(value, 2, ProjectLengthDescriptionMaxLength, true, BaseRegexExpression).validate();

    const projectCreationProps: IProjectCreationProps = {
        initialValues,
        isUpdate,
        onSubmitProjectHandling,
        validateProjectName,
    };

    return <ProjectModal {...projectCreationProps} />;
};

export default ProjectModalContainer;
