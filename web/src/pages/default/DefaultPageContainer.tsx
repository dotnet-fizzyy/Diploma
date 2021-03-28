import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import * as projectActions from '../../redux/actions/projectActions';
import * as projectSelectors from '../../redux/selectors/projectSelectors';
import * as teamSelectors from '../../redux/selectors/teamSelectors';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import DefaultPage, { IMainPageProps } from './DefaultPage';

const DefaultPageContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const teams = useSelector(teamSelectors.getTeams);
    const projects = useSelector(projectSelectors.getProjects);
    const user = useSelector(currentUserSelectors.getUser);

    const onSelectTeam = (value: string) => {
        history.push(`/team/${value}`);
    };

    const onSelectProject = (value: string) => {
        history.push(`/project/${value}`);
    };

    const onClickMoveBoard = (value: string) => {
        history.push(`/board/${value}`);
    };

    const onClickCreateProject = () => {
        history.push(routeConstants.ProjectsViewerRoute);
    };

    useEffect(() => {
        if (!teams.length && !projects.length) {
            dispatch(projectActions.getUserProjectsRequest());
        }
    }, [dispatch, teams.length, projects.length]);

    const mainPageProps: IMainPageProps = {
        teams,
        projects,
        user,
        onSelectTeam,
        onSelectProject,
        onClickCreateProject,
        onClickMoveBoard,
    };

    return <DefaultPage {...mainPageProps} />;
};

export default DefaultPageContainer;
