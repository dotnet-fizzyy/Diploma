import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeStatsEpic, setSelectedEpicById } from '../../redux/actions/epic';
import { getProjectStatsPageRequest } from '../../redux/actions/project';
import { changeStatsSprint } from '../../redux/actions/sprintActions';
import { getEpicsDropdownItems, getSelectedEpicId } from '../../redux/selectors/epic';
import { getSelectedProject } from '../../redux/selectors/projectSelectors';
import { getSelectedSprintId, getSprintDropdownItems } from '../../redux/selectors/sprintSelectors';
import { getStorySimpleModels } from '../../redux/selectors/storySelectors';
import { IProject } from '../../types/projectTypes';
import { ISelectedItem, IStorySimpleModel } from '../../types/storyTypes';
import { validateGuid } from '../../utils';
import { getColumnKeys } from '../../utils/columnUtils';
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

    const [selectedChartColumn, setSelectedChartColumn] = useState<string>('');

    const onChangeEpic = (e): void => {
        dispatch(changeStatsEpic(e.target.value));
    };

    const onChangeSprint = (e): void => {
        dispatch(changeStatsSprint(e.target.value));
    };

    const onClickChartPart = (index: number): void => {
        const columnKeys: string[] = getColumnKeys();
        if (columnKeys[index]) {
            setSelectedChartColumn(columnKeys[index]);
        }
    };

    const onClickResetColumns = (): void => {
        setSelectedChartColumn('');
    };

    useEffect(() => {
        setSelectedChartColumn('');
    }, [selectedEpicId]);

    useEffect(() => {
        const projectId: string = getQueryParameter(location.search, 'projectId');

        if (!validateGuid(projectId)) {
            return;
        }

        dispatch(setSelectedEpicById(''));
        dispatch(getProjectStatsPageRequest(projectId));
        // eslint-disable-next-line
    }, []);

    const statsPageProps: IStatsPageProps = {
        project,
        selectedEpicId,
        selectedSprintId,
        selectedChartColumn,
        epics,
        sprints,
        stories,
        onChangeEpic,
        onChangeSprint,
        onClickChartPart,
        onClickResetColumns,
    };

    return <StatsPage {...statsPageProps} />;
};

export default StatsPageContainer;
