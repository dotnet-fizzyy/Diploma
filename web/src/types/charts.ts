export interface ILineChartDataSet {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
}

export interface ILineChart {
    labels: string[];
    datasets: ILineChartDataSet[];
}

export interface IDoughnutChartDataSet {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
}

export interface IDoughnutChart {
    labels: string[];
    onClick: (value: number) => void;
    datasets: IDoughnutChartDataSet[];
}
