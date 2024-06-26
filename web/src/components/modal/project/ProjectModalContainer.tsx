import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ModalOptions } from '../../../constants/modalConstants';
import { initialProjectFormValues, ProjectLengthDescriptionMaxLength } from '../../../constants/projectConstants';
import {
    createProjectRequest,
    removeProjectRequest,
    updateProjectRequest,
} from '../../../redux/actions/projectActions';
import { getModalOption, getModalRequestPerforming } from '../../../redux/selectors/modalSelectors';
import { getSelectedProject, getSelectedWorkSpaceProject } from '../../../redux/selectors/projectSelectors';
import { getWorkSpaceId } from '../../../redux/selectors/workSpaceSelectors';
import { IProjectForm } from '../../../types/formTypes';
import { IProject } from '../../../types/projectTypes';
import { IWorkSpacePageProject } from '../../../types/workSpaceTypes';
import { InputFormFieldValidator } from '../../../utils/formUtils';
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
