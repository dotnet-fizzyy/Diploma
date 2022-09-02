import { IEpic, IEpicSimpleModel } from '../types/epic';

export const mapToEpicModel = (data): IEpic => ({
    epicId: data.epicId,
    epicName: data.epicName,
    epicDescription: data.epicDescription,
    startDate: data.startDate,
    endDate: data.endDate,
    projectId: data.projectId,
    creationDate: data.creationDate,
});

export const mapToEpicSimpleModel = (data): IEpicSimpleModel => ({
    epicId: data.epicId,
    epicName: data.epicName,
    startDate: data.startDate,
    endDate: data.endDate,
});
