import React from 'react';
import { useDispatch } from 'react-redux';
import { BaseRegexExpression } from '../../../constants';
import { ProjectLengthDescriptionMaxLength } from '../../../constants/projectConstants';
import { createProjectRequest } from '../../../redux/actions/projectActions';
import { IProjectForm } from '../../../types/formTypes';
import { IProject } from '../../../types/projectTypes';
import { InputFormFieldValidator } from '../../../utils/formHelper';
import ProjectCreation, { IProjectCreationProps } from './ProjectCreation';

const ProjectCreationContainer = () => {
    const dispatch = useDispatch();

    const onSubmitProjectHandling = (values: IProjectForm) => {
        const project: IProject = {
            projectName: values.projectName,
            projectDescription: values.projectDescription,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
        };

        dispatch(createProjectRequest(project));
    };

    const validateProjectName = (value: string) =>
        new InputFormFieldValidator(value, 2, ProjectLengthDescriptionMaxLength, true, BaseRegexExpression).validate();

    const projectCreationProps: IProjectCreationProps = {
        onSubmitProjectHandling,
        validateProjectName,
    };

    return <ProjectCreation {...projectCreationProps} />;
};

export default ProjectCreationContainer;
