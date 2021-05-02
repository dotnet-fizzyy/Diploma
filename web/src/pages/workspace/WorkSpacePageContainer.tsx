import React, { useEffect } from 'react';
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

    const onClickCreateWorkSpace = (): void => {
        dispatch(openModal(ModalTypes.WORKSPACE));
    };

    const onClickCreateProject = (): void => {
        dispatch(openModal(ModalTypes.PROJECT));
    };

    const onClickCreateCustomer = (): void => {
        dispatch(openModal(ModalTypes.USER_CUSTOMER, ModalOptions.CUSTOMER_CREATION));
    };

    const onClickUpdateWorkSpaceInfo = (): void => {
        dispatch(openModal(ModalTypes.WORKSPACE, ModalOptions.WORKSPACE_UPDATE));
    };

    const onClickViewProject = (projectId: string): void => {
        history.push(`/project/${projectId}`);
    };

    useEffect(() => {
        dispatch(getUserWorkSpacePageRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const workSpacePageProps: IWorkSpacePageProps = {
        workSpace,
        isLoading,
        workSpaceProjects,
        onClickCreateWorkSpace,
        onClickUpdateWorkSpaceInfo,
        onClickCreateProject,
        onClickCreateCustomer,
        onClickViewProject,
    };

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
