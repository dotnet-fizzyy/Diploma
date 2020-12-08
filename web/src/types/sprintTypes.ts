export interface ISprint {
    sprintId: string;
    epicId: string;
    sprintName: string;
    startDate: Date;
    endDate: Date;
    progress: number;
    projectId?: string;
}
