import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { DateFormat } from '../../constants';
import { ILineChart } from '../../types/charts';
import { IStoryHistory } from '../../types/story';
import LineChart from '../charts/LineChart';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '600px',
            margin: '20px 0',
        },
    })
);

export interface IStoryHistoryChartsProps {
    storyHistoryItems: IStoryHistory[];
    selectedDate: string;
    onChangeSelectedDateFilter: (selectedDate: string) => void;
}

const StoryHistoryCharts = (props: IStoryHistoryChartsProps) => {
    const classes = useStyles();
    const { storyHistoryItems, selectedDate, onChangeSelectedDateFilter } = props;

    const mappedDataByDates = storyHistoryItems
        .sort((a, b) => (a.creationDate as any) - (b.creationDate as any))
        .map((x) => ({
            ...x,
            creationDate: moment(x.creationDate).format(DateFormat),
        }));
    const uniqueDateLabels: string[] = Array.from(new Set(mappedDataByDates.map((x) => x.creationDate)));

    const onClick = (index: number): void => {
        if (uniqueDateLabels[index] && selectedDate !== uniqueDateLabels[index]) {
            onChangeSelectedDateFilter(uniqueDateLabels[index]);
        }
    };

    const chartsData: ILineChart = {
        labels: uniqueDateLabels,
        datasets: [
            {
                label: 'Changes',
                data: uniqueDateLabels.reduce(
                    (acc, x) => [...acc, mappedDataByDates.filter((t) => x === t.creationDate).length],
                    []
                ),
                fill: false,
                borderColor: '#75BAF7',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className={classes.root}>
            <LineChart data={chartsData} onClick={onClick} />
        </div>
    );
};

export default StoryHistoryCharts;
