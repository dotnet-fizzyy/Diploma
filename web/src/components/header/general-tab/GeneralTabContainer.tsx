import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SignInUrl } from '../../../constants/routeConstants';
import { openModal } from '../../../redux/actions/modalActions';
import { blurStoryTitleTerm, setStoryTitleTermRequest } from '../../../redux/actions/storiesActions';
import { logOutUser } from '../../../redux/actions/userActions';
import { getSearchResults, getStoryTitleTerm } from '../../../redux/selectors/storiesSelectors';
import { getUser } from '../../../redux/selectors/userSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import GeneralTab, { IGeneralTabProps } from './GeneralTab';

const GeneralTabContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(getUser);
    const searchTerm = useSelector(getStoryTitleTerm);
    const searchResults = useSelector(getSearchResults);

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const onChangeSearchTerm = (value: string) => {
        dispatch(setStoryTitleTermRequest(value));
    };

    const onBlur = () => {
        dispatch(blurStoryTitleTerm());
    };

    const onClickDisplayMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchor(event.currentTarget);
    };

    const onClickCloseMenu = () => {
        setAnchor(null);
    };

    const onClickOpenProfile = () => {
        dispatch(openModal(ModalTypes.USER_SELF));
    };

    const onClickLogOut = () => {
        dispatch(logOutUser());
        history.push(SignInUrl);
    };

    const generalTabProps: IGeneralTabProps = {
        user,
        anchor,
        searchTerm,
        searchResults,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickLogOut,
        onClickOpenProfile,
        onChangeSearchTerm,
        onBlur,
    };

    return <GeneralTab {...generalTabProps} />;
};

export default GeneralTabContainer;
