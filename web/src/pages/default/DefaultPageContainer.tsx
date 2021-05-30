import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalTypes } from '../../constants/modalConstants';
import { openModal } from '../../redux/actions/modalActions';
import { getMainPageDataRequest } from '../../redux/actions/projectActions';
import { getStorySimpleModels } from '../../redux/selectors/storySelectors';
import { getTeamSimpleItems } from '../../redux/selectors/teamSelectors';
import { getUser } from '../../redux/selectors/userSelectors';
import { IStorySimpleModel } from '../../types/storyTypes';
import { ITeamSimpleModel } from '../../types/teamTypes';
import { IFullUser } from '../../types/userTypes';
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
