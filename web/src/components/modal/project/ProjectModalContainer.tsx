import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ProjectLengthDescriptionMaxLength } from '../../../constants/projectConstants';
import { createProjectRequest } from '../../../redux/actions/projectActions';
import { getWorkSpaceId } from '../../../redux/selectors/workSpaceSelectors';
import { IProjectForm } from '../../../types/formTypes';
import { IProject } from '../../../types/projectTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import ProjectModal, { IProjectCreationProps } from './ProjectModal';

const ProjectModalContainer = () => {
    const dispatch = useDispatch();
    const workSpaceId: string = useSelector(getWorkSpaceId);

    const onSubmitProjectHandling = (values: IProjectForm) => {
        const project: IProject = {
            projectName: values.projectName,
            projectDescription: values.projectDescription,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
            workSpaceId,
        };

        dispatch(createProjectRequest(project));
    };

    const validateProjectName = (value: string) =>
        new InputFormFieldValidator(value, 2, ProjectLengthDescriptionMaxLength, true, BaseRegexExpression).validate();

    const projectCreationProps: IProjectCreationProps = {
        onSubmitProjectHandling,
        validateProjectName,
    };

    return <ProjectModal {...projectCreationProps} />;
};

export default ProjectModalContainer;
