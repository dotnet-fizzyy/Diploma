import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalTypes } from '../../constants/modal';
import { openModal } from '../../redux/actions/modal';
import { getMainPageDataRequest } from '../../redux/actions/project';
import { getStorySimpleModels } from '../../redux/selectors/story';
import { getTeamSimpleItems } from '../../redux/selectors/team';
import { getUser } from '../../redux/selectors/user';
import { IStorySimpleModel } from '../../types/story';
import { ITeamSimpleModel } from '../../types/team';
import { IFullUser } from '../../types/user';
import DefaultPage, { IMainPageProps } from './DefaultPage';

const DefaultPageContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user: IFullUser = useSelector(getUser);
    const teams: ITeamSimpleModel[] = useSelector(getTeamSimpleItems);
    const stories: IStorySimpleModel[] = useSelector(getStorySimpleModels);

    const onSelectTeam = (value: string) => {
        history.push(`/team/${value}`);
    };

    const onSelectProject = (value: string) => {
        history.push(`/project/${value}`);
    };

    const onClickCreateWorkSpace = () => {
        dispatch(openModal(ModalTypes.WORKSPACE));
    };

    useEffect(() => {
        dispatch(getMainPageDataRequest());
        // eslint-disable-next-line
    }, []);

    const mainPageProps: IMainPageProps = {
        user,
        teams,
        stories,
        onSelectTeam,
        onSelectProject,
        onClickCreateWorkSpace,
    };

    return <DefaultPage {...mainPageProps} />;
};

export default DefaultPageContainer;
