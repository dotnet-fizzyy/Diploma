import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import MainLabel, { LabelType } from '../../components/common/MainLabel';
import StatsFilters from '../../components/stats/StatsFilters';
import StatsProjectShortInfo from '../../components/stats/StatsProjectShortInfo';
import { IProject } from '../../types/projectTypes';
import { ISelectedItem, IStorySimpleModel } from '../../types/storyTypes';
import StatsPageChart from './StatsPageChart';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#FAFAFA',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
    })
);

export interface IStatsPageProps {
    project: IProject;
    selectedEpicId: string;
    selectedSprintId: string;
    epics: ISelectedItem[];
    sprints: ISelectedItem[];
    stories: IStorySimpleModel[];
    onChangeEpic: (e) => void;
    onChangeSprint: (e) => void;
}

const StatsPage = (props: IStatsPageProps) => {
    const classes = useStyles();
    const { project, selectedEpicId, selectedSprintId, epics, stories, sprints, onChangeEpic, onChangeSprint } = props;

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <MainLabel title="Statistics" variant={LabelType.PRIMARY} />
                {project && (
                    <StatsProjectShortInfo
                        projectName={project.projectName}
                        startDate={project.startDate}
                        endDate={project.endDate}
                    />
                )}
                <StatsPageChart stories={stories} />
                <StatsFilters
                    selectedEpicId={selectedEpicId}
                    selectedSprintId={selectedSprintId}
                    epics={epics}
                    sprints={sprints}
                    onChangeEvent={onChangeEpic}
                    onChangeSprint={onChangeSprint}
                />
            </div>
        </div>
    );
};

export default StatsPage;
