import { IStory } from "../types";

const mockedStory_1: IStory = {
  blockReason: "",
  columnType: "ToDo",
  creationDate: "13.10.2020",
  description: "Some kind of description there",
  estimate: 5,
  isDefect: false,
  isBlocked: false,
  isReady: false,
  notes: "No notes are provided here",
  sprintId: "",
  storyId: "story_id_1",
  title: "This is title of first story",
  userId: "",
};

const mockedStory_2: IStory = {
  blockReason: "",
  columnType: "InProgress",
  creationDate: "11.09.2020",
  description: "",
  estimate: 3,
  isDefect: true,
  isBlocked: false,
  isReady: false,
  notes: "",
  sprintId: "",
  storyId: "story_id_2",
  title: "This title belongs to second mock",
  userId: "",
};

const mockedStory_3: IStory = {
  blockReason: "Just block for test",
  columnType: "InProgress",
  creationDate: "10.10.2020",
  description: "",
  estimate: 1,
  isDefect: false,
  isBlocked: true,
  isReady: false,
  notes: "",
  sprintId: "",
  storyId: "story_id_3",
  title: "Some title in 3 mock",
  userId: "",
};

const mockedStory_4: IStory = {
  blockReason: "",
  columnType: "InReview",
  creationDate: "19.09.2020",
  description: "Original description too",
  estimate: 3,
  isDefect: false,
  isBlocked: false,
  isReady: true,
  notes: "",
  sprintId: "",
  storyId: "story_id_4",
  title: "Very original title",
  userId: "",
};

const mockedStories = [
  mockedStory_1,
  mockedStory_2,
  mockedStory_3,
  mockedStory_4,
];

export default mockedStories;
