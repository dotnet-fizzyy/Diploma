export interface ILineChartDataSetTypes {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
}

export interface ILineChartTypes {
    labels: string[];
    datasets: ILineChartDataSetTypes[];
}

export interface IDoughnutChartDataSetTypes {
    label: string;
    data: number[];
    backgroundColor: string[];
}

export interface IDoughnutChartTypes {
    labels: string[];
    datasets: IDoughnutChartDataSetTypes[];
}
