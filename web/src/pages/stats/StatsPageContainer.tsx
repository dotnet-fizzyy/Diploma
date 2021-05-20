import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProjectStatsPageRequest } from '../../redux/actions/projectActions';
import { getEpicsDropdownItems, getSelectedEpicId } from '../../redux/selectors/epicSelectors';
import { getSelectedProject } from '../../redux/selectors/projectSelectors';
import { getSelectedSprintId, getSprintDropdownItems } from '../../redux/selectors/sprintSelectors';
import { getStorySimpleModels } from '../../redux/selectors/storySelectors';
import { IProject } from '../../types/projectTypes';
import { ISelectedItem, IStorySimpleModel } from '../../types/storyTypes';
import { validateGuid } from '../../utils';
import { getQueryParameter } from '../../utils/routeUtils';
import StatsPage, { IStatsPageProps } from './StatsPage';

const StatsPageContainer = () => {
    const dispatch = useDispatch();
    const location: any = useLocation();

    const project: IProject = useSelector(getSelectedProject);
    const epics: ISelectedItem[] = useSelector(getEpicsDropdownItems);
    const selectedEpicId: string = useSelector(getSelectedEpicId);
    const sprints: ISelectedItem[] = useSelector(getSprintDropdownItems);
    const selectedSprintId: string = useSelector(getSelectedSprintId);
    const stories: IStorySimpleModel[] = useSelector(getStorySimpleModels);

    const onChangeEpic = (e): void => {
        console.warn(e.target.value);
    };

    const onChangeSprint = (e): void => {
        console.warn(e.target.value);
    };

    useEffect(() => {
        const projectId: string = getQueryParameter(location.search, 'projectId');

        if (!validateGuid(projectId)) {
            return;
        }

        dispatch(getProjectStatsPageRequest(projectId));
        // eslint-disable-next-line
    }, []);

    const statsPageProps: IStatsPageProps = {
        project,
        selectedEpicId,
        selectedSprintId,
        epics,
        sprints,
        stories,
        onChangeEpic,
        onChangeSprint,
    };

    return <StatsPage {...statsPageProps} />;
};

export default StatsPageContainer;
