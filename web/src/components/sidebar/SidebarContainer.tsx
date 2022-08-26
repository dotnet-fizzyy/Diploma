import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarTypes } from '../../constants';
import { sidebarHandleVisibility } from '../../redux/actions/sidebar';
import { getSidebarIsLoading, getSidebarType } from '../../redux/selectors/sidebar';
import Sidebar, { ISidebarProps } from './Sidebar';

const SidebarContainer = () => {
    const dispatch = useDispatch();

    const sidebarType: SidebarTypes = useSelector(getSidebarType);
    const isLoading: boolean = useSelector(getSidebarIsLoading);

    const onCloseTab = (): void => {
        dispatch(sidebarHandleVisibility(null, false));
    };

    const sidebarProps: ISidebarProps = {
        sidebarType,
        isLoading,
        onCloseTab,
    };

    return <Sidebar {...sidebarProps} />;
};

export default React.memo(SidebarContainer);
