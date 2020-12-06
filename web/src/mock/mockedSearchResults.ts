import { IStory, Priority } from '../types/storyTypes';

const mockedStory_1: IStory = {
    blockReason: '',
    columnType: 'todo',
    creationDate: '13.10.2020',
    description: 'Some kind of description there',
    estimate: 5,
    isDefect: false,
    isBlocked: false,
    isReady: false,
    notes: 'No notes are provided here',
    sprintId: 'test2',
    storyId: 'story_id_1',
    title: 'This is title of first story',
    userId: 'Dima',
    priority: Priority.LOW,
    recordVersion: 515,
};

const mockedStory_2: IStory = {
    blockReason: '',
    columnType: 'progress',
    creationDate: '11.09.2020',
    description: '',
    estimate: 3,
    isDefect: true,
    isBlocked: false,
    isReady: false,
    notes: '',
    sprintId: 'test2',
    storyId: 'story_id_2',
    title: 'This title belongs to second mock',
    userId: 'Ihar',
    priority: Priority.HIGH,
    recordVersion: 521,
};

const mockedStory_3: IStory = {
    blockReason: 'Just block for test',
    columnType: 'progress',
    creationDate: '10.10.2020',
    description: '',
    estimate: 1,
    isDefect: false,
    isBlocked: true,
    isReady: false,
    notes: '',
    sprintId: 'test',
    storyId: 'story_id_3',
    title: 'Some title in 3 mock',
    userId: '',
    priority: Priority.MEDIUM,
    recordVersion: 124,
};

const mockedStory_4: IStory = {
    blockReason: '',
    columnType: 'review',
    creationDate: '19.09.2020',
    description: 'Original description too',
    estimate: 3,
    isDefect: false,
    isBlocked: false,
    isReady: true,
    notes: '',
    sprintId: 'test',
    storyId: 'story_id_4',
    title: 'Very original title',
    userId: '',
    priority: Priority.LOW,
    recordVersion: 915,
};

const mockedStories = [mockedStory_1, mockedStory_2, mockedStory_3, mockedStory_4];

export default mockedStories;