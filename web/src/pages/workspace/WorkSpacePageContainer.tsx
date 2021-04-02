import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
import { getUserWorkSpaceRequest } from '../../redux/actions/workSpaceActions';
import { getWorkSpace, getWorkSpaceIsLoading } from '../../redux/selectors/workSpaceSelectors';
import { ModalTypes } from '../../types/modalTypes';
import { IWorkSpace } from '../../types/workSpaceTypes';
import WorkSpacePage, { IWorkSpacePageProps } from './WorkSpacePage';

const WorkSpacePageContainer = () => {
    const dispatch = useDispatch();

    const workSpace: IWorkSpace = useSelector(getWorkSpace);
    const isLoading: boolean = useSelector(getWorkSpaceIsLoading);

    const onClickCreateWorkSpace = (): void => {
        dispatch(openModal(ModalTypes.WORKSPACE));
    };

    const workSpacePageProps: IWorkSpacePageProps = {
        workSpace,
        isLoading,
        onClickCreateWorkSpace,
    };

    useEffect(() => {
        dispatch(getUserWorkSpaceRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
