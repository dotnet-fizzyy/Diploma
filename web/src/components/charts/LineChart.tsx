import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { registerables, Chart } from 'chart.js';
import React from 'react';
import { ILineChartTypes } from '../../types/charTypes';

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
    data: ILineChartTypes;
}

export interface ILineChartState {
    chartRef: React.RefObject<HTMLCanvasElement>;
}

class LineChart extends React.Component<ILineChartProps, ILineChartState> {
    private readonly chartRef: React.RefObject<HTMLCanvasElement>;

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate(prevProps: Readonly<ILineChartProps>, prevState: Readonly<ILineChartState>) {
        const ctx = this.chartRef.current.getContext('2d');
        if (prevProps.data !== this.props.data) {
            new Chart(ctx, {
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
