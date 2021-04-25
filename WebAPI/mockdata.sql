/*
WorkSpace
*/
INSERT INTO public."WorkSpaces" ("WorkSpaceId", "WorkSpaceName", "WorkSpaceDescription", "CreationDate") VALUES 
('a6146fae-f27c-410d-aec8-70c566e30afa', 'MockedWorkSpace', 'This is description for workspace', timezone('utc', now()));

/*
Projects
*/
INSERT INTO public."Projects" ("ProjectId", "ProjectName", "ProjectDescription", "StartDate", "EndDate", "CreationDate", "WorkSpaceId") VALUES 
('e347a3a4-91be-4be6-9a95-499ff967b019', 'FirstProject', 'This is description for first project', '2021-05-01', '2021-12-01', timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa'),
('bad50c24-0b51-4563-a3f5-e5f918f5916e', 'SecondProject', 'This is description for second project', '2021-05-09', '2021-11-13', timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa'),
('af8fb354-c041-4e27-b3fd-40618fb1e629', 'ThirdProject', 'This is description for third project', '2021-04-01', '2021-09-01', timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa');

/*
Teams
*/
INSERT INTO public."Teams" ("TeamId", "ProjectId", "TeamName", "Location", "CreationDate") VALUES
('e4686ee7-4123-4a83-a33b-112e17049d51', 'e347a3a4-91be-4be6-9a95-499ff967b019', 'First Team', 'Minsk', timezone('utc', now())),
('70442356-9454-4922-85e5-6b119b1e99be', 'e347a3a4-91be-4be6-9a95-499ff967b019', 'Second-Team', 'Arizona', timezone('utc', now())),
('bb6bf3b9-12cc-4ca3-a2fe-306801be9a01', 'af8fb354-c041-4e27-b3fd-40618fb1e629', 'Third Awesome Team', 'Moscow', timezone('utc', now()));

/*
Epics
*/
INSERT INTO public."Epics" ("EpicId", "ProjectId", "EpicName", "EpicDescription", "StartDate", "EndDate", "CreationDate") VALUES
('bc9998c1-4bd4-466d-bf52-dc24a34867a0', 'e347a3a4-91be-4be6-9a95-499ff967b019', 'FirstEpic', 'This is description for first epic', '2021-05-01', '2021-07-01', timezone('utc', now())),
('800f5052-de37-400d-8496-d460f5d2bcff', 'e347a3a4-91be-4be6-9a95-499ff967b019', 'Second Epic', 'This is description for second epic', '2021-07-01', '2021-09-01', timezone('utc', now())),
('5da9f41c-7c47-43a7-8de8-148b7cc57d71', 'af8fb354-c041-4e27-b3fd-40618fb1e629', 'First New Epic', 'This is description for new project epic', '2021-04-01', '2021-06-01', timezone('utc', now()));

/*
Sprints
*/
INSERT INTO public."Sprints" ("SprintId", "EpicId", "SprintName", "StartDate", "EndDate", "CreationDate") VALUES
('77cafbf4-24db-48dc-b649-a4566a11b704', 'bc9998c1-4bd4-466d-bf52-dc24a34867a0', 'FirstSprint', '2021-05-01', '2021-06-01', timezone('utc', now())),
('bfe1a251-7245-4bf3-9c95-0e401ecf9118', 'bc9998c1-4bd4-466d-bf52-dc24a34867a0', 'SecondSprint', '2021-06-01', '2021-07-01', timezone('utc', now())),
('1e98afc3-dbaf-4ca3-a897-ca98fc9b5b23', '800f5052-de37-400d-8496-d460f5d2bcff', 'ThirdSprint', '2021-07-01', '2021-08-01', timezone('utc', now())),
('a0ac5ae2-59d4-4133-9b4e-7548edadb064', '800f5052-de37-400d-8496-d460f5d2bcff', 'FourthSprint', '2021-08-01', '2021-09-01', timezone('utc', now()));

/*
Users
*/
/* 
Password is using SHA256 hashing algorythm
A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3 - 123
865736A1C30A82DC67ABA820360A01B1D9D0DA5643234CD07C4D60B06EB530C5 - 321
9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08 - test
*/
INSERT INTO public."Users" ("UserId", "UserName", "Password", "UserRole", "UserPosition", "IsActive", "Email", "AvatarLink", "CreationDate", "WorkSpaceId") VALUES
('dab0e95f-3906-4ea8-9e45-dcdf12182788', 'Dmitry Yaniuk', 'A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3', 1, 6, true, 'test_email@mail.com', NULL, timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa'),
('6269201e-e569-4d73-9d91-da36ccfa4e15', 'Oleg Ryazin', '865736A1C30A82DC67ABA820360A01B1D9D0DA5643234CD07C4D60B06EB530C5', 4, 3, true, 'oleg.email@mail.com', NULL, timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa'),
('82aec964-ea06-4d64-86fc-109253352d35', 'Igor Zolotnik', '865736A1C30A82DC67ABA820360A01B1D9D0DA5643234CD07C4D60B06EB530C5', 4, 4, true, 'igor.email@mail.com', NULL, timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa'),
('a4494730-1826-4cb6-bb5b-8bf11292ae1e', 'Ulasevich Nikolai', '9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08', 4, 2, true, 'nikolai.email@mail.com', NULL, timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa'),
('86d2a87a-64f0-478e-a795-72df8b14f5bc', 'Mitsenko Alexei', 'A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3', 4, 5, true, 'alexei.email@mail.com', NULL, timezone('utc', now()), 'a6146fae-f27c-410d-aec8-70c566e30afa');

/*
TeamUsers
*/
INSERT INTO public."TeamUser" ("TeamId", "UserId") VALUES 
('e4686ee7-4123-4a83-a33b-112e17049d51', 'dab0e95f-3906-4ea8-9e45-dcdf12182788'),
('e4686ee7-4123-4a83-a33b-112e17049d51', '6269201e-e569-4d73-9d91-da36ccfa4e15'),
('e4686ee7-4123-4a83-a33b-112e17049d51', '82aec964-ea06-4d64-86fc-109253352d35'),
('e4686ee7-4123-4a83-a33b-112e17049d51', 'a4494730-1826-4cb6-bb5b-8bf11292ae1e'),
('e4686ee7-4123-4a83-a33b-112e17049d51', '86d2a87a-64f0-478e-a795-72df8b14f5bc');

/*
Stories
*/
INSERT INTO public."Stories" ("StoryId", "SprintId", "UserId", "Title", "Description", "Notes", "ColumnType", "StoryPriority", "Estimate", "IsReady", "IsBlocked", "BlockReason", "CreationDate", "IsDeleted") VALUES
('5af14402-7acf-49f7-96c7-e91da2b624a6', '77cafbf4-24db-48dc-b649-a4566a11b704', NULL, 'Story Title', 'Some description for story', '-', 2, 1, 1, false, false, null,  timezone('utc', now()), false),
('f88aaa7a-b469-4dd0-ae53-76676b928d59', '77cafbf4-24db-48dc-b649-a4566a11b704', '6269201e-e569-4d73-9d91-da36ccfa4e15', 'New Story Title', 'Some new description for story', '-', 1, 2, 3, false, false, null,  timezone('utc', now()), false),
('04c3f7d8-b67a-4b5a-ae70-3637636eee64', '77cafbf4-24db-48dc-b649-a4566a11b704', NULL, 'New Story Title', 'Some new description for story', '-', 1, 1, 2, false, true, 'Test Block',  timezone('utc', now()), false),
('b5d92f92-a994-40b0-b761-0d69f9a778ef', '77cafbf4-24db-48dc-b649-a4566a11b704', 'a4494730-1826-4cb6-bb5b-8bf11292ae1e', 'Story Title for Kolya', 'Awesome description for story', 'Notes', 3, 2, 5, false, false, NULL, timezone('utc', now()), false);

/*
StoryHistories
*/
INSERT INTO public."StoryHistories" ("StoryHistoryId", "CreationDate", "StoryHistoryAction", "FieldName", "PreviousValue", "CurrentValue", "UserId", "StoryId") VALUES
('b8e88a03-e235-453b-8aa1-9b4ec5947136', timezone('utc', now()), 1, '', '', '', 'dab0e95f-3906-4ea8-9e45-dcdf12182788', '5af14402-7acf-49f7-96c7-e91da2b624a6'),
('1e64654a-97fb-441f-9932-1c7074c47d7c', timezone('utc', now()), 1, '', '', '', 'dab0e95f-3906-4ea8-9e45-dcdf12182788', 'f88aaa7a-b469-4dd0-ae53-76676b928d59'),
('568a7549-c586-40e1-b631-902e2ac94341', timezone('utc', now()), 1, '', '', '', 'dab0e95f-3906-4ea8-9e45-dcdf12182788', '04c3f7d8-b67a-4b5a-ae70-3637636eee64'),
('78c8579e-0daf-4efb-9bfb-4a86da82c60f', timezone('utc', now()), 1, '', '', '', 'dab0e95f-3906-4ea8-9e45-dcdf12182788', 'b5d92f92-a994-40b0-b761-0d69f9a778ef');