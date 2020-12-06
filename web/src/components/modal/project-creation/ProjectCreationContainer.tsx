import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { initialProjectState } from '../../../constants/projectConstants';
import * as projectActions from '../../../redux/actions/projectActions';
import { IProject } from '../../../types/projectTypes';
import ProjectCreation, { IProjectCreationProps } from './ProjectCreation';

const ProjectCreationContainer = () => {
    const dispatch = useDispatch();
    const [project, setProject] = useState<IProject>(initialProjectState);

    const onChangeProjectField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setProject((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const onClickProjectCreate = () => {
        dispatch(projectActions.createProjectRequest(project));
    };

    const projectCreationProps: IProjectCreationProps = {
        project,
        onChangeProjectField,
        onClickProjectCreate,
    };

    return <ProjectCreation {...projectCreationProps} />;
};

export default ProjectCreationContainer;
