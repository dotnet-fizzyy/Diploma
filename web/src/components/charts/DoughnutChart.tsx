import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { registerables, Chart } from 'chart.js';
import React from 'react';

Chart.register(...registerables);

const useStyles = () =>
    createStyles({
        root: {
            height: '100%',
            width: '100%',
        },
    });

export interface IDoughnutChartProps {
    classes: { root: string };
}

export interface IDoughnutChartState {
    chartRef: React.RefObject<HTMLCanvasElement>;
}

class DoughnutChart extends React.Component<IDoughnutChartProps, IDoughnutChartState> {
    private readonly chartRef: React.RefObject<HTMLCanvasElement>;

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const ctx = this.chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: [300, 70, 100],
                        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'] as any,
                    },
                ],
            },
            options: {
                plugins: {
                    tooltip: {
                        displayColors: false,
                    },
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    render() {
        const { classes } = this.props;

        return <canvas className={classes.root} ref={this.chartRef} />;
    }
}

export default withStyles(useStyles)(DoughnutChart);
