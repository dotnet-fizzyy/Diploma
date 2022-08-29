import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { registerables, ActiveElement, Chart, ChartEvent } from 'chart.js';
import React from 'react';
import { ILineChart } from '../../types/charts';

Chart.register(...registerables);

const useStyles = () =>
    createStyles({
        root: {
            height: '100%',
            width: '100%',
        },
    });

export interface ILineChartProps {
    classes: {
        root: string;
    };
    data: ILineChart;
    onClick: (index: number) => void;
}

export interface ILineChartState {
    chartRef: React.RefObject<HTMLCanvasElement>;
}

class LineChart extends React.Component<ILineChartProps, ILineChartState> {
    private readonly chartRef: React.RefObject<HTMLCanvasElement>;
    private chart: any;

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate(prevProps: Readonly<ILineChartProps>, prevState: Readonly<ILineChartState>) {
        const ctx = this.chartRef.current.getContext('2d');

        const prevDataSets = prevProps.data.datasets[0].data;
        const currentDataSets = this.props.data.datasets[0].data;

        if (prevDataSets.length !== currentDataSets.length) {
            if (this.chart) {
                this.chart.destroy();
            }

            const { onClick } = this.props;

            this.chart = new Chart(ctx, {
                type: 'line',
                data: this.props.data,
                options: {
                    plugins: {
                        tooltip: {
                            displayColors: false,
                        },
                        legend: {
                            display: false,
                        },
                    },
                    onHover(event: ChartEvent, elements: ActiveElement[]) {
                        (event.native.target as any).style.cursor = elements[0] ? 'pointer' : 'default';
                    },
                    onClick(event: ChartEvent, elements: ActiveElement[], chart: Chart) {
                        elements && elements.length && onClick(elements[0].index);
                    },
                },
            });
        }
    }

    render() {
        const { classes } = this.props;

        return <canvas className={classes.root} ref={this.chartRef} />;
    }
}

export default withStyles(useStyles)(LineChart);
