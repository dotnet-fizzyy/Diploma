import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mockedWorkSpaceTable } from '../../mock/mockedWorkSpace';
import { openModal } from '../../redux/actions/modalActions';
import { getUserWorkSpaceRequest } from '../../redux/actions/workSpaceActions';
import { getWorkSpace, getWorkSpaceIsLoading } from '../../redux/selectors/workSpaceSelectors';
import { ModalOptions, ModalTypes } from '../../types/modalTypes';
import { IWorkSpace, IWorkSpaceTable } from '../../types/workSpaceTypes';
import WorkSpacePage, { IWorkSpacePageProps } from './WorkSpacePage';

const WorkSpacePageContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const workSpace: IWorkSpace = useSelector(getWorkSpace);
    const isLoading: boolean = useSelector(getWorkSpaceIsLoading);
    const workSpaceTable: IWorkSpaceTable = mockedWorkSpaceTable;

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
        dispatch(getUserWorkSpaceRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const workSpacePageProps: IWorkSpacePageProps = {
        workSpace,
        isLoading,
        workSpaceTable,
        onClickCreateWorkSpace,
        onClickUpdateWorkSpaceInfo,
        onClickCreateProject,
        onClickCreateCustomer,
        onClickViewProject,
    };

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
