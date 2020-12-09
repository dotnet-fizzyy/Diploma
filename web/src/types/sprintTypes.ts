import { IStory } from './storyTypes';

export interface ISprint {
    sprintId: string;
    epicId: string;
    sprintName: string;
    startDate: Date;
    endDate: Date;
    progress: number;
}

export interface IFullSprint {
    sprintId: string;
    epicId: string;
    sprintName: string;
    startDate: Date;
    endDate: Date;
    progress: number;
    stories: IStory[];
}
