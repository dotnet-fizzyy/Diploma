import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { openModal } from '../../redux/actions/modalActions';
import { getUserWorkSpacePageRequest } from '../../redux/actions/workSpaceActions';
import { getWorkSpace, getWorkSpaceIsLoading, getWorkSpaceProjects } from '../../redux/selectors/workSpaceSelectors';
import { IWorkSpace, IWorkSpacePageProject } from '../../types/workSpaceTypes';
import WorkSpacePage, { IWorkSpacePageProps } from './WorkSpacePage';

const WorkSpacePageContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const workSpace: IWorkSpace = useSelector(getWorkSpace);
    const isLoading: boolean = useSelector(getWorkSpaceIsLoading);
    const workSpaceProjects: IWorkSpacePageProject[] = useSelector(getWorkSpaceProjects);

    const [selectedProjectId, setSelectedProjectId] = useState<string>('');

    const onChangeSelectedProjectId = (projectId: string): void => {
        setSelectedProjectId(projectId);
    };

    const onClickCreateProject = (): void => {
        dispatch(openModal(ModalTypes.PROJECT));
    };

    const onClickUpdateWorkSpaceInfo = (): void => {
        dispatch(openModal(ModalTypes.WORKSPACE, ModalOptions.WORKSPACE_UPDATE));
    };

    const onClickViewProject = (projectId: string): void => {
        history.push(`/project/${projectId}`);
    };

    const onClickViewTeam = (teamId: string): void => {
        history.push(`/team/${teamId}`);
    };

    useEffect(() => {
        dispatch(getUserWorkSpacePageRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const workSpacePageProps: IWorkSpacePageProps = {
        workSpace,
        isLoading,
        workSpaceProjects,
        selectedProjectId,
        onClickUpdateWorkSpaceInfo,
        onClickCreateProject,
        onClickViewProject,
        onClickViewTeam,
        onChangeSelectedProjectId,
    };

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
