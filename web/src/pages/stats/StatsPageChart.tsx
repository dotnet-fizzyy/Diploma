import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DoughnutChart from '../../components/charts/DoughnutChart';
import { doughnutChartColors } from '../../constants';
import { IDoughnutChart } from '../../types/charts';
import { IStorySimpleModel } from '../../types/story';
import { getColumnKeyValuePair } from '../../utils/columns';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '500px',
        },
    })
);

export interface IStatsPageChartProps {
    stories: IStorySimpleModel[];
    onClickChartPart: (index: number) => void;
}

const StatsPageChart = (props: IStatsPageChartProps) => {
    const classes = useStyles();
    const { stories, onClickChartPart } = props;

    const storyColumns = getColumnKeyValuePair();
    const storiesCount = storyColumns.reduce(
        (acc: number[], x) => [...acc, stories.filter((t) => t.columnType === x.key).length],
        []
    );

    const onClick = (value: number): void => {
        onClickChartPart(value);
    };

    const doughnutChartData: IDoughnutChart = {
        labels: storyColumns.map((x) => x.value),
        datasets: [
            {
                label: 'Sprint chart',
                data: storiesCount,
                backgroundColor: doughnutChartColors.map((x, index) =>
                    x.key === storyColumns[index].key ? x.value : x.key
                ),
                hoverOffset: 4,
            },
        ],
        onClick,
    };

    return (
        <div className={classes.root}>
            <DoughnutChart data={doughnutChartData} />
        </div>
    );
};

export default StatsPageChart;
