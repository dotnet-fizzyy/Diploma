import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ModalOptions } from '../../../constants/modal';
import { initialProjectFormValues, ProjectLengthDescriptionMaxLength } from '../../../constants/project';
import { createProjectRequest, removeProjectRequest, updateProjectRequest } from '../../../redux/actions/project';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modal';
import { getSelectedProject, getSelectedWorkSpaceProject } from '../../../redux/selectors/project';
import { getWorkSpaceId } from '../../../redux/selectors/workspace';
import { IProjectForm } from '../../../types/forms';
import { IProject } from '../../../types/project';
import { IWorkSpacePageProject } from '../../../types/workspace';
import { InputFormFieldValidator } from '../../../utils/forms';
import ModalRemove, { IModalRemoveProps } from '../ModalRemove';
import ProjectModal, { IProjectCreationProps } from './ProjectModal';

const ProjectModalContainer = () => {
    const dispatch = useDispatch();
    const workSpaceId: string = useSelector(getWorkSpaceId);
    const modalOption: ModalOptions = useSelector(getModalOption);
    const project: IProject = useSelector(getSelectedProject);
    const workSpaceProject: IWorkSpacePageProject = useSelector(getSelectedWorkSpaceProject);
    const isPerformingRequest: boolean = useSelector(getModalRequestPerforming);

    const isUpdate: boolean = modalOption === ModalOptions.PROJECT_UPDATE;
    const isRemove: boolean = modalOption === ModalOptions.PROJECT_REMOVE;
    const initialValues: IProject = isUpdate ? project : initialProjectFormValues;

    const onSubmitProjectHandling = (values: IProjectForm) => {
        const newProject: IProject = {
            ...values,
            projectName: values.projectName,
            projectDescription: values.projectDescription,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
            workSpaceId: isUpdate ? values.workSpaceId : workSpaceId,
            creationDate: isUpdate ? project.creationDate : null,
        };

        if (isUpdate) {
            dispatch(updateProjectRequest(newProject));
        } else {
            dispatch(createProjectRequest(newProject));
        }
    };

    const onClickRemoveProject = (): void => {
        dispatch(removeProjectRequest(workSpaceProject.projectId));
    };

    const validateProjectName = (value: string) =>
        new InputFormFieldValidator(value, 2, ProjectLengthDescriptionMaxLength, true, BaseRegexExpression).validate();

    const modalRemove: IModalRemoveProps = {
        entity: 'project',
        entityName: workSpaceProject ? workSpaceProject.projectName : '',
        onClick: onClickRemoveProject,
    };

    const projectCreationProps: IProjectCreationProps = {
        initialValues,
        isUpdate,
        isPerformingRequest,
        onSubmitProjectHandling,
        validateProjectName,
    };

    return isRemove ? <ModalRemove {...modalRemove} /> : <ProjectModal {...projectCreationProps} />;
};

export default ProjectModalContainer;
