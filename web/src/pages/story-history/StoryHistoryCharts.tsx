import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import LineChart from '../../components/charts/LineChart';
import { DateFormat } from '../../constants';
import { ILineChartTypes } from '../../types/charTypes';
import { IStoryHistory } from '../../types/storyTypes';

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
}

const StoryHistoryCharts = (props: IStoryHistoryChartsProps) => {
    const classes = useStyles();
    const { storyHistoryItems } = props;

    const mappedDataByDates = storyHistoryItems
        .sort((a, b) => (a.creationDate as any) - (b.creationDate as any))
        .map((x) => ({
            ...x,
            creationDate: moment(x.creationDate).format(DateFormat),
        }));
    const uniqueDateLabels: string[] = Array.from(new Set(mappedDataByDates.map((x) => x.creationDate)));

    const chartsData: ILineChartTypes = {
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
            <LineChart data={chartsData} />
        </div>
    );
};

export default StoryHistoryCharts;
