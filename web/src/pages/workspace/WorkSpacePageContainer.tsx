import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { mockedProjectList } from '../../mock/mockedProject';
import { mockedTeamList } from '../../mock/mockedTeam';
import { usersList } from '../../mock/mockedUser';
import { openModal } from '../../redux/actions/modalActions';
import { getUserWorkSpaceRequest } from '../../redux/actions/workSpaceActions';
import { getWorkSpace, getWorkSpaceIsLoading } from '../../redux/selectors/workSpaceSelectors';
import { ModalTypes } from '../../types/modalTypes';
import { IProjectListItem } from '../../types/projectTypes';
import { ITeamListItem } from '../../types/teamTypes';
import { IUserListItem } from '../../types/userTypes';
import { IWorkSpace } from '../../types/workSpaceTypes';
import WorkSpacePage, { IWorkSpacePageProps } from './WorkSpacePage';

const WorkSpacePageContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const workSpace: IWorkSpace = useSelector(getWorkSpace);
    const isLoading: boolean = useSelector(getWorkSpaceIsLoading);
    const customersList: IUserListItem[] = usersList;
    const teamList: ITeamListItem[] = mockedTeamList;
    const projectList: IProjectListItem[] = mockedProjectList;

    const onClickCreateWorkSpace = (): void => {
        dispatch(openModal(ModalTypes.WORKSPACE));
    };

    const onClickUpdateWorkSpaceInfo = (): void => {};

    const onClickViewProject = (projectId: string): void => {
        history.push(`/project/${projectId}`);
    };

    const onClickViewTeam = (teamId: string): void => {
        history.push(`/project/${teamId}`);
    };

    const onClickCreateCustomer = (): void => {
        dispatch(openModal(ModalTypes.USER_CUSTOMER));
    };

    useEffect(() => {
        dispatch(getUserWorkSpaceRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const workSpacePageProps: IWorkSpacePageProps = {
        workSpace,
        isLoading,
        customersList,
        teamList,
        projectList,
        onClickCreateWorkSpace,
        onClickUpdateWorkSpaceInfo,
        onClickCreateCustomer,
        onClickViewProject,
        onClickViewTeam,
    };

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
