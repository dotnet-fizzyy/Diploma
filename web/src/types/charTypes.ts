export interface ILineChartDataSetTypes {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
}

export interface ILineChartConfigTypes {
    labels: string[];
    datasets: ILineChartDataSetTypes[];
}
