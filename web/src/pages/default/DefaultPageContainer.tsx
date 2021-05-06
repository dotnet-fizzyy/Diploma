import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalTypes } from '../../constants/modalConstants';
import { openModal } from '../../redux/actions/modalActions';
import { getUserProjectsRequest } from '../../redux/actions/projectActions';
import { getProjects } from '../../redux/selectors/projectSelectors';
import { getTeams } from '../../redux/selectors/teamSelectors';
import { getUser } from '../../redux/selectors/userSelectors';
import DefaultPage, { IMainPageProps } from './DefaultPage';

const DefaultPageContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const teams = useSelector(getTeams);
    const projects = useSelector(getProjects);
    const user = useSelector(getUser);

    const onSelectTeam = (value: string) => {
        history.push(`/team/${value}`);
    };

    const onSelectProject = (value: string) => {
        history.push(`/project/${value}`);
    };

    const onClickMoveBoard = (value: string) => {
        history.push(`/board/${value}`);
    };

    const onClickCreateWorkSpace = () => {
        dispatch(openModal(ModalTypes.WORKSPACE));
    };

    useEffect(() => {
        if (!teams.length && !projects.length) {
            dispatch(getUserProjectsRequest());
        }
    }, [dispatch, teams.length, projects.length]);

    const mainPageProps: IMainPageProps = {
        teams,
        projects,
        user,
        onSelectTeam,
        onSelectProject,
        onClickCreateWorkSpace,
        onClickMoveBoard,
    };

    return <DefaultPage {...mainPageProps} />;
};

export default DefaultPageContainer;
