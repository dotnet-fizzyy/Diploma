import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalTypes } from '../../../constants/modalConstants';
import { LoginScreenRoute } from '../../../constants/routeConstants';
import { openModal } from '../../../redux/actions/modalActions';
import { changeUserProject, changeUserTeam, logOutUser } from '../../../redux/actions/userActions';
import { blurSearchTitleTerm, setSearchTitleTermRequest } from '../../../redux/actions/workSpaceActions';
import { getUser, getUserSelectedProjectId, getUserSelectedTeamId } from '../../../redux/selectors/userSelectors';
import { getSearchTitleTerm } from '../../../redux/selectors/workSpaceSelectors';
import { IStory } from '../../../types/storyTypes';
import { IFullUser } from '../../../types/userTypes';
import { clearCredentialsFromLocalStorage } from '../../../utils';
import GeneralTab, { IGeneralTabProps } from './GeneralTab';

const GeneralTabContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user: IFullUser = useSelector(getUser);
    const searchTerm: string = useSelector(getSearchTitleTerm);
    const searchResults: IStory[] = [];
    const selectedTeamId: string = useSelector(getUserSelectedTeamId);
    const selectedProjectId: string = useSelector(getUserSelectedProjectId);

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const onChangeSearchTerm = (value: string): void => {
        dispatch(setSearchTitleTermRequest(value));
    };

    const onBlur = (): void => {
        dispatch(blurSearchTitleTerm());
    };

    const onClickDisplayMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchor(event.currentTarget);
    };

    const onClickCloseMenu = (): void => {
        setAnchor(null);
    };

    const onClickOpenProfile = (): void => {
        dispatch(openModal(ModalTypes.USER_SELF));
    };

    const onClickLogOut = (): void => {
        history.push(LoginScreenRoute);

        dispatch(logOutUser());
        clearCredentialsFromLocalStorage();
    };

    const onChangeTeam = (e: any): void => {
        dispatch(changeUserTeam(e.target.value));
    };

    const onChangeProject = (e: any): void => {
        dispatch(changeUserProject(e.target.value));
    };

    const generalTabProps: IGeneralTabProps = {
        user,
        anchor,
        searchTerm,
        searchResults,
        selectedTeamId,
        selectedProjectId,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickLogOut,
        onClickOpenProfile,
        onChangeSearchTerm,
        onChangeTeam,
        onChangeProject,
        onBlur,
    };

    return <GeneralTab {...generalTabProps} />;
};

export default GeneralTabContainer;
