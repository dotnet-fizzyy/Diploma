import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../redux/actions/currentUserActions';
import * as userSelectors from '../../../redux/selectors/userSelectors';
import GeneralTab, { IGeneralTabProps } from './GeneralTab';

const GeneralTabContainer = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelectors.getUser);

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const onClickDisplayMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    };

    const onClickCloseMenu = () => {
        setAnchor(null);
    };

    const onClickLogOut = () => {
        dispatch(userActions.logOutUser());
    };

    const generalTabProps: IGeneralTabProps = {
        user,
        anchor,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickLogOut,
    };

    return <GeneralTab {...generalTabProps} />;
};

export default GeneralTabContainer;
