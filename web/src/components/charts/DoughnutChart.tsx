import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { registerables, ActiveElement, Chart, ChartEvent } from 'chart.js';
import React from 'react';
import { IDoughnutChartTypes } from '../../types/charTypes';

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
    data: IDoughnutChartTypes;
}

export interface IDoughnutChartState {
    chartRef: React.RefObject<HTMLCanvasElement>;
}

class DoughnutChart extends React.Component<IDoughnutChartProps, IDoughnutChartState> {
    private readonly chartRef: React.RefObject<HTMLCanvasElement>;
    private chart: any;

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate(prevProps: Readonly<IDoughnutChartProps>, prevState: Readonly<IDoughnutChartState>) {
        const ctx = this.chartRef.current.getContext('2d');
        if (this.chart) {
            this.chart.destroy();
        }

        if (prevProps.data.datasets !== this.props.data.datasets) {
            const { onClick } = this.props.data;

            this.chart = new Chart(ctx, {
                type: 'doughnut',
                data: this.props.data,
                options: {
                    events: ['mousemove', 'click'],
                    onHover(event: ChartEvent, elements: ActiveElement[]) {
                        (event.native.target as any).style.cursor = elements[0] ? 'pointer' : 'default';
                    },
                    onClick(event: ChartEvent, elements: ActiveElement[]) {
                        elements && elements.length && onClick(elements[0].index);
                    },
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
    }

    render() {
        const { classes } = this.props;

        return <canvas className={classes.root} ref={this.chartRef} />;
    }
}

export default withStyles(useStyles)(DoughnutChart);
