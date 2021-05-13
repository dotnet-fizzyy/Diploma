import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarTypes } from '../../constants';
import { sidebarHandleVisibility } from '../../redux/actions/sidebarActions';
import { getSidebarType } from '../../redux/selectors/sidebarSelectors';
import Sidebar, { ISidebarProps } from './Sidebar';

const SidebarContainer = () => {
    const dispatch = useDispatch();

    const sidebarType: SidebarTypes = useSelector(getSidebarType);

    const onCloseTab = (): void => {
        dispatch(sidebarHandleVisibility(null, false));
    };

    const sidebarProps: ISidebarProps = {
        sidebarType,
        onCloseTab,
    };

    return <Sidebar {...sidebarProps} />;
};

export default React.memo(SidebarContainer);
