import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalTypes } from '../../../constants/modalConstants';
import { SignInUrl } from '../../../constants/routeConstants';
import { openModal } from '../../../redux/actions/modalActions';
import { blurStoryTitleTerm, setStoryTitleTermRequest } from '../../../redux/actions/storiesActions';
import { changeUserProject, changeUserTeam, logOutUser } from '../../../redux/actions/userActions';
import { getSearchResults, getStoryTitleTerm } from '../../../redux/selectors/storiesSelectors';
import { getUser, getUserSelectedProjectId, getUserSelectedTeamId } from '../../../redux/selectors/userSelectors';
import { IStory } from '../../../types/storyTypes';
import { IFullUser } from '../../../types/userTypes';
import GeneralTab, { IGeneralTabProps } from './GeneralTab';

const GeneralTabContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user: IFullUser = useSelector(getUser);
    const searchTerm: string = useSelector(getStoryTitleTerm);
    const searchResults: IStory[] = useSelector(getSearchResults);
    const selectedTeamId: string = useSelector(getUserSelectedTeamId);
    const selectedProjectId: string = useSelector(getUserSelectedProjectId);

    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const onChangeSearchTerm = (value: string): void => {
        dispatch(setStoryTitleTermRequest(value));
    };

    const onBlur = (): void => {
        dispatch(blurStoryTitleTerm());
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
        dispatch(logOutUser());
        history.push(SignInUrl);
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
