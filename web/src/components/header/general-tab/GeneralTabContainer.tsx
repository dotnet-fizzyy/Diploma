import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalTypes } from '../../../constants/modal';
import { LoginScreenRoute } from '../../../constants/routes';
import { openModal } from '../../../redux/actions/modal';
import { changeUserProject, changeUserTeam, logOutUser } from '../../../redux/actions/user';
import { blurSearchTitleTerm, setSearchTitleTermRequest } from '../../../redux/actions/workspace';
import { getUser, getUserSelectedProjectId, getUserSelectedTeamId } from '../../../redux/selectors/user';
import {
    getIsSearchTermSearching,
    getSearchProjects,
    getSearchTeams,
    getSearchTitleTerm,
} from '../../../redux/selectors/workspace';
import { IProjectSimpleModel } from '../../../types/project';
import { ITeamSimpleModel } from '../../../types/team';
import { IFullUser } from '../../../types/user';
import { clearCredentialsFromLocalStorage } from '../../../utils';
import GeneralTab, { IGeneralTabProps } from './GeneralTab';

const GeneralTabContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user: IFullUser = useSelector(getUser);
    const searchTerm: string = useSelector(getSearchTitleTerm);
    const searchProjects: IProjectSimpleModel[] = useSelector(getSearchProjects);
    const searchTeams: ITeamSimpleModel[] = useSelector(getSearchTeams);
    const selectedTeamId: string = useSelector(getUserSelectedTeamId);
    const selectedProjectId: string = useSelector(getUserSelectedProjectId);
    const searching: boolean = useSelector(getIsSearchTermSearching);

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [anchorPopoverEl, setAnchorPopoverEl] = useState<SVGSVGElement | null>(null);

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

    const onClickOpenPopover = (event: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
        setAnchorPopoverEl(event.currentTarget);
    };

    const onClickClosePopover = (): void => {
        setAnchorPopoverEl(null);
    };

    const onClickViewTeam = (teamId: string) => {
        dispatch(setSearchTitleTermRequest(''));
        history.push(`/team/${teamId}`);
    };

    const onClickViewProject = (projectId: string) => {
        dispatch(setSearchTitleTermRequest(''));
        history.push(`/project/${projectId}`);
    };

    const generalTabProps: IGeneralTabProps = {
        user,
        anchor,
        searchTerm,
        searchProjects,
        searchTeams,
        selectedTeamId,
        selectedProjectId,
        searching,
        anchorPopoverEl,
        onClickDisplayMenu,
        onClickCloseMenu,
        onClickLogOut,
        onClickOpenProfile,
        onChangeSearchTerm,
        onChangeTeam,
        onChangeProject,
        onBlur,
        onClickOpenPopover,
        onClickClosePopover,
        onClickViewProject,
        onClickViewTeam,
    };

    return <GeneralTab {...generalTabProps} />;
};

export default GeneralTabContainer;
