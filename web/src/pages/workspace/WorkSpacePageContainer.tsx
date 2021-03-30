import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
import { getUserWorkSpaceRequest } from '../../redux/actions/workSpaceActions';
import { ModalTypes } from '../../types/modalTypes';
import WorkSpacePage, { IWorkSpacePageProps } from './WorkSpacePage';

const WorkSpacePageContainer = () => {
    const dispatch = useDispatch();

    const onClickCreateWorkSpace = (): void => {
        dispatch(openModal(ModalTypes.WORKSPACE));
    };

    const workSpacePageProps: IWorkSpacePageProps = {
        onClickCreateWorkSpace,
    };

    useEffect(() => {
        dispatch(getUserWorkSpaceRequest());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
