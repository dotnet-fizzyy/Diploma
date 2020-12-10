import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import * as projectSelectors from '../../redux/selectors/projectSelectors';
import * as teamSelectors from '../../redux/selectors/teamSelectors';
import * as currentUserSelectors from '../../redux/selectors/userSelectors';
import MainPage, { IMainPageProps } from './MainPage';

const MainPageContainer = () => {
    const history = useHistory();
    const teams = useSelector(teamSelectors.getTeams);
    const projects = useSelector(projectSelectors.getProjects);
    const user = useSelector(currentUserSelectors.getUser);

    const onSelectTeam = (value: string) => {
        console.log(value);
    };

    const onSelectProject = (value: string) => {
        console.log(value);
    };

    const onClickCreateProject = () => {
        history.push(routeConstants.ProjectsViewerRoute);
    };

    const onClickCreateTeam = () => {
        history.push(routeConstants.TeamsViewerRoute);
    };

    useEffect(() => {}, []);

    const mainPageProps: IMainPageProps = {
        teams,
        projects,
        user,
        onSelectTeam,
        onSelectProject,
        onClickCreateTeam,
        onClickCreateProject,
    };

    return <MainPage {...mainPageProps} />;
};

export default MainPageContainer;
