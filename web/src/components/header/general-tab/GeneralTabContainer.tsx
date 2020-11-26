import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../../redux/actions/currentUserActions';
import * as storyActions from '../../../redux/actions/storiesActions';
import * as storiesSelectors from '../../../redux/selectors/storiesSelectors';
import * as userSelectors from '../../../redux/selectors/userSelectors';
import GeneralTab, { IGeneralTabProps } from './GeneralTab';

const GeneralTabContainer = () => {
    const dispatch = useDispatch();
    const user = useSelector(userSelectors.getUser);
    const searchTerm = useSelector(storiesSelectors.getStoryTitleTerm);

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const onChangeSearchTerm = (value: string) => {
        dispatch(storyActions.setStoryTitleTerm(value));
    };

    const onBlur = () => {
        dispatch(storyActions.blurStoryTitleTerm());
    };

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
        searchTerm,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickLogOut,
        onChangeSearchTerm,
        onBlur,
    };

    return <GeneralTab {...generalTabProps} />;
};

export default GeneralTabContainer;
