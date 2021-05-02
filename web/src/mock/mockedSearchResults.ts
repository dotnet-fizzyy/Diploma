import { IStory, Priority } from '../types/storyTypes';
import { UserPosition } from '../types/userTypes';

const mockedStory_1: IStory = {
    blockReason: '',
    columnType: 'todo',
    creationDate: new Date(),
    description: 'Some kind of description there',
    estimate: 5,
    isBlocked: false,
    isReady: false,
    notes: 'No notes are provided here',
    sprintId: 'test2',
    storyId: 'story_id_1',
    title: 'This is title of first story',
    userId: 'Dima',
    storyPriority: Priority.LOW,
    recordVersion: 515,
    requiredPosition: UserPosition.Developer,
};

const mockedStory_2: IStory = {
    blockReason: '',
    columnType: 'progress',
    creationDate: new Date(),
    description: '',
    estimate: 3,
    isBlocked: false,
    isReady: false,
    notes: '',
    sprintId: 'test2',
    storyId: 'story_id_2',
    title: 'This title belongs to second mock',
    userId: 'Ihar',
    storyPriority: Priority.HIGH,
    recordVersion: 521,
    requiredPosition: UserPosition.Architecture,
};

const mockedStory_3: IStory = {
    blockReason: 'Just block for test',
    columnType: 'progress',
    creationDate: new Date(),
    description: '',
    estimate: 1,
    isBlocked: true,
    isReady: false,
    notes: '',
    sprintId: 'test',
    storyId: 'story_id_3',
    title: 'Some title in 3 mock',
    userId: '',
    storyPriority: Priority.MEDIUM,
    recordVersion: 124,
    requiredPosition: UserPosition.Developer,
};

const mockedStory_4: IStory = {
    blockReason: '',
    columnType: 'review',
    creationDate: new Date(),
    description: 'Original description too',
    estimate: 3,
    isBlocked: false,
    isReady: true,
    notes: '',
    sprintId: 'test',
    storyId: 'story_id_4',
    title: 'Very original title',
    userId: '',
    storyPriority: Priority.LOW,
    recordVersion: 915,
    requiredPosition: UserPosition.Qa,
};

const mockedStories = [mockedStory_1, mockedStory_2, mockedStory_3, mockedStory_4];

export default mockedStories;
