import { Priority } from '../constants/storyConstants';
import { UserPosition } from '../constants/userConstants';
import { IStory } from '../types/story';

const mockedStory_1: IStory = {
    blockReason: '',
    columnType: 'todo',
    creationDate: new Date(),
    description: 'Some kind of description there',
    estimate: 5,
    isBlocked: false,
    isReady: false,
    notes: 'No notes are provided here',
    sprintId: '',
    storyId: 'story_id_1',
    title: 'This is title of first story',
    userId: '',
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
    sprintId: '',
    storyId: 'story_id_2',
    title: 'This title belongs to second mock',
    userId: '',
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
    sprintId: '',
    storyId: 'story_id_3',
    title: 'Some title in 3 mock',
    userId: '',
    storyPriority: Priority.MEDIUM,
    recordVersion: 124,
    requiredPosition: UserPosition.Qa,
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
    sprintId: '',
    storyId: 'story_id_4',
    title: 'Very original title',
    userId: '',
    storyPriority: Priority.LOW,
    recordVersion: 915,
    requiredPosition: UserPosition.DevOps,
};

const mockedStories = [mockedStory_1, mockedStory_2, mockedStory_3, mockedStory_4];

export default mockedStories;
