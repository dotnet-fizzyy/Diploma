export interface IEpic {
    epicId: string;
    projectId: string;
    epicName: string;
    startDate: Date;
    endDate: Date;
    epicDescription: string;
}

export interface IEpicSimpleModel {
    epicId: string;
    epicName: string;
    startDate: Date;
    endDate: Date;
}
