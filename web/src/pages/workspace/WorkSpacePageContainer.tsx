import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersList } from '../../mock/mockedUser';
import { openModal } from '../../redux/actions/modalActions';
import { getUserWorkSpaceRequest } from '../../redux/actions/workSpaceActions';
import { getWorkSpace, getWorkSpaceIsLoading } from '../../redux/selectors/workSpaceSelectors';
import { ModalTypes } from '../../types/modalTypes';
import { IUserListItem } from '../../types/userTypes';
import { IWorkSpace } from '../../types/workSpaceTypes';
import WorkSpacePage, { IWorkSpacePageProps } from './WorkSpacePage';

const WorkSpacePageContainer = () => {
    const dispatch = useDispatch();

    const workSpace: IWorkSpace = useSelector(getWorkSpace);
    const isLoading: boolean = useSelector(getWorkSpaceIsLoading);
    const customersList: IUserListItem[] = usersList;

    const onClickCreateWorkSpace = (): void => {
        dispatch(openModal(ModalTypes.WORKSPACE));
    };

    const onClickUpdateWorkSpaceInfo = (): void => {};

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
        onClickCreateWorkSpace,
        onClickUpdateWorkSpaceInfo,
        onClickCreateCustomer,
    };

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
