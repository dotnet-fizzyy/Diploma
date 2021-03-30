import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/modalActions';
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

    return <WorkSpacePage {...workSpacePageProps} />;
};

export default WorkSpacePageContainer;
