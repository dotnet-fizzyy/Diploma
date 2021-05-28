import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import MainLabel, { LabelType } from '../../components/common/MainLabel';
import StatsFilters from '../../components/stats/StatsFilters';
import StatsGeneralInfo from '../../components/stats/StatsGeneralInfo';
import StatsProjectShortInfo from '../../components/stats/StatsProjectShortInfo';
import StatsStoriesFromSearchParameters from '../../components/stats/StatsStoriesFromSearchParameters';
import { IProject } from '../../types/projectTypes';
import { ISelectedItem, IStorySimpleModel } from '../../types/storyTypes';
import StatsPageChart from './StatsPageChart';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#FAFAFA',
            padding: '30px',
            boxSizing: 'border-box',
        },
        body: {
            display: 'flex',
            flexDirection: 'row',
        },
        flexContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        chartsWrapperContainer: {
            flexGrow: 1,
            flexBasis: 0,
            flexShrink: 0,
        },
        storiesWrapperContainer: {
            flexGrow: 1.5,
            flexBasis: 0,
            flexShrink: 0,
        },
    })
);

export interface IStatsPageProps {
    project: IProject;
    selectedEpicId: string;
    selectedSprintId: string;
    selectedChartColumn: string;
    epics: ISelectedItem[];
    sprints: ISelectedItem[];
    stories: IStorySimpleModel[];
    onChangeEpic: (e) => void;
    onChangeSprint: (e) => void;
    onClickChartPart: (index: number) => void;
    onClickResetColumns: () => void;
}

const StatsPage = (props: IStatsPageProps) => {
    const classes = useStyles();
    const {
        project,
        selectedEpicId,
        selectedSprintId,
        selectedChartColumn,
        epics,
        stories,
        sprints,
        onChangeEpic,
        onChangeSprint,
        onClickChartPart,
        onClickResetColumns,
    } = props;

    return (
        <div className={classes.root}>
            <MainLabel title="Statistics" variant={LabelType.PRIMARY} />
            <div className={classes.body}>
                <div className={classnames(classes.flexContainer, classes.chartsWrapperContainer)}>
                    {project && (
                        <StatsProjectShortInfo
                            projectName={project.projectName}
                            startDate={project.startDate}
                            endDate={project.endDate}
                        />
                    )}
                    <StatsPageChart stories={stories} onClickChartPart={onClickChartPart} />
                    <StatsFilters
                        selectedEpicId={selectedEpicId}
                        selectedSprintId={selectedSprintId}
                        epics={epics}
                        sprints={sprints}
                        onChangeEvent={onChangeEpic}
                        onChangeSprint={onChangeSprint}
                        onClickResetColumns={onClickResetColumns}
                    />
                </div>
                <div className={classnames(classes.storiesWrapperContainer, classes.chartsWrapperContainer)}>
                    <StatsGeneralInfo stories={stories} />
                    <StatsStoriesFromSearchParameters
                        stories={stories}
                        selectedSprintId={selectedSprintId}
                        selectedChartColumn={selectedChartColumn}
                    />
                </div>
            </div>
        </div>
    );
};

export default StatsPage;
