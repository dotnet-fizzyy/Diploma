import { IEpic, IEpicSimpleModel } from '../types/epicTypes';

export function mapToEpicModel(data: any): IEpic {
    return {
        epicId: data.epicId,
        epicName: data.epicName,
        epicDescription: data.epicDescription,
        startDate: data.startDate,
        endDate: data.endDate,
        projectId: data.projectId,
    };
}

export function mapToEpicSimpleModel(data: any): IEpicSimpleModel {
    return {
        epicId: data.epicId,
        epicName: data.epicName,
        startDate: data.startDate,
        endDate: data.endDate,
    };
}
