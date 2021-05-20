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
    hoverOffset: number;
}

export interface IDoughnutChartTypes {
    labels: string[];
    onClick: (value: number) => void;
    datasets: IDoughnutChartDataSetTypes[];
}
