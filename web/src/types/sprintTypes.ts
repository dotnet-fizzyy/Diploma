import { IStory } from './storyTypes';

export interface ISprint {
    sprintId?: string;
    epicId: string;
    sprintName: string;
    startDate: Date;
    endDate: Date;
    creationDate?: Date;
}

export interface IFullSprint extends ISprint {
    stories: IStory[];
}
