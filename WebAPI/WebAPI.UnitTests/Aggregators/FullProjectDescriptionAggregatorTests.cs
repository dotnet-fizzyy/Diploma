using System;
using System.Collections.Generic;
using System.Linq;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;
using WebAPI.Presentation.Aggregators;
using Xunit;
using Epic = WebAPI.Core.Entities.Epic;

namespace WebAPI.UnitTests.Aggregators
{
    public class FullProjectDescriptionAggregatorTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullProjectOrEpic()
        {
            //Arrange
            var projectMapper = A.Fake<IProjectMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            var sprintMapper = A.Fake<ISprintMapper>();
            var teamMapper = A.Fake<ITeamMapper>();
            
            var projectId = new Guid();
            var epicId = new Guid();
            var teamId = new Guid();
            var sprintId = new Guid();
            
            var teamEntities = new List<Team>
            {
                new Team
                {
                    Id = teamId,
                    TeamName = "AwesomeTeam",
                    Location = "Minsk",
                    ProjectId = projectId
                }
            };

            var sprintEntities = new List<Sprint>
            {
                new Sprint
                {
                    Id = sprintId,
                    EpicId = epicId,
                    SprintName = "AwesomeSprint",
                    StartDate = new DateTime(2020, 10, 1),
                    EndDate = new DateTime(2020, 10, 30),
                    Progress = 100,
                }
            };

            Epic epicEntity = null;
            Project projectEntity = null;

            var projectAggregator = new FullProjectDescriptionAggregator(
                projectMapper,
                epicMapper,
                sprintMapper,
                teamMapper
            );

            var fullProjectDescription =
                projectAggregator.AggregateFullProjectDescription(
                    projectEntity, 
                    epicEntity, 
                    sprintEntities, 
                    teamEntities
                );
            
            //Assert
            Assert.NotNull(fullProjectDescription);
            
            A.CallTo(() => projectMapper.MapToModel(projectEntity))
                .MustNotHaveHappened();
            A.CallTo(() => epicMapper.MapToModel(epicEntity))
                .MustNotHaveHappened();
            A.CallTo(() => sprintMapper.MapToFullModel(sprintEntities.First()))
                .MustNotHaveHappened();
            A.CallTo(() => teamMapper.MapToFullModel(teamEntities.First()))
                .MustNotHaveHappened();
        }
        
        [Fact]
        public void ShouldAggregateFullProjectDescription()
        {
            //Arrange
            var projectMapper = A.Fake<IProjectMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            var sprintMapper = A.Fake<ISprintMapper>();
            var teamMapper = A.Fake<ITeamMapper>();
            
            var projectId = new Guid();
            var epicId = new Guid();
            var teamId = new Guid();
            var sprintId = new Guid();
            
            var teamEntities = new List<Team>
            {
                new Team
                {
                    Id = teamId,
                    TeamName = "AwesomeTeam",
                    Location = "Minsk",
                    ProjectId = projectId
                }
            };
            
            var sprintEntities = new List<Sprint>
            {
                new Sprint
                {
                    Id = sprintId,
                    EpicId = epicId,
                    SprintName = "AwesomeSprint",
                    StartDate = new DateTime(2020, 10, 1),
                    EndDate = new DateTime(2020, 10, 30),
                    Progress = 100,
                }
            };
            
            var epicEntity = new Epic
            {
                Id = epicId,
                EpicDescription = "Some epic description",
                StartDate = new DateTime(2020, 10, 1),
                EndDate = new DateTime(2020, 10, 30),
                Sprints = sprintEntities
            };
            
            var projectEntity = new Project
            {
                Id = projectId,
                ProjectName = "Project",
                ProjectDescription = "Some Description",
                Epics = new List<Epic>
                {
                    epicEntity
                },
                Teams = teamEntities,
            };

            var epicModel = new Models.Models.Epic
            {
                EpicId = epicId,
                EpicDescription = "Some epic description",
                StartDate = new DateTime(2020, 10, 1),
                EndDate = new DateTime(2020, 10, 30)
            };

            var sprintModels = new CollectionResponse<FullSprint>
            {
                Items = new List<FullSprint>
                {
                    new FullSprint
                    {
                        SprintId = sprintId,
                        EpicId = epicId,
                        SprintName = "AwesomeSprint",
                        StartDate = new DateTime(2020, 10, 1),
                        EndDate = new DateTime(2020, 10, 30),
                        Progress = 100,
                    }
                }
            };

            var teamModels = new CollectionResponse<FullTeam>
            {
                Items = new List<FullTeam>
                {
                    new FullTeam
                    {
                        TeamId = teamId,
                        TeamName = "AwesomeTeam",
                        Location = "Minsk"
                    }
                }
            };
            
            var projectModel = new Models.Models.Project
            {
                ProjectId = projectId,
                ProjectName = "Project",
                ProjectDescription = "Some Description",
            };

            var projectFullModel = new FullProjectDescription
            {
                Project = projectModel,
                Epic = epicModel,
                Teams = teamModels,
                Sprints = sprintModels
            };
            
            //Act
            A.CallTo(() => projectMapper.MapToModel(projectEntity)).Returns(projectModel);
            A.CallTo(() => epicMapper.MapToModel(epicEntity)).Returns(epicModel);
            A.CallTo(() => sprintMapper.MapToFullModel(sprintEntities.First()))
                .Returns(sprintModels.Items.First());
            A.CallTo(() => teamMapper.MapToFullModel(teamEntities.First()))
                .Returns(teamModels.Items.First());

            var projectAggregator = new FullProjectDescriptionAggregator(
                    projectMapper,
                    epicMapper,
                    sprintMapper,
                    teamMapper
                );

            var fullProjectDescription =
                projectAggregator.AggregateFullProjectDescription(
                    projectEntity, 
                    epicEntity, 
                    sprintEntities, 
                    teamEntities
                    );
            
            //Assert
            Assert.Equal(projectFullModel.Project.ProjectId, fullProjectDescription.Project.ProjectId);
            Assert.Equal(projectFullModel.Project.WorkSpaceId, fullProjectDescription.Project.WorkSpaceId);
            Assert.Equal(projectFullModel.Project.ProjectDescription, fullProjectDescription.Project.ProjectDescription);
            Assert.Equal(projectFullModel.Project.ProjectName, fullProjectDescription.Project.ProjectName);
            Assert.Equal(projectFullModel.Project.StartDate, fullProjectDescription.Project.StartDate);
            Assert.Equal(projectFullModel.Project.EndDate, fullProjectDescription.Project.EndDate);
            
            Assert.Equal(projectFullModel.Epic.EpicId, fullProjectDescription.Epic.EpicId);
            Assert.Equal(projectFullModel.Epic.EpicName, fullProjectDescription.Epic.EpicName);
            Assert.Equal(projectFullModel.Epic.EpicDescription, fullProjectDescription.Epic.EpicDescription);
            Assert.Equal(projectFullModel.Epic.StartDate, fullProjectDescription.Epic.StartDate);
            Assert.Equal(projectFullModel.Epic.EndDate, fullProjectDescription.Epic.EndDate);
            
            Assert.Equal(projectFullModel.Teams.Count, fullProjectDescription.Teams.Count);
            Assert.Equal(projectFullModel.Teams.Items.First().TeamId, fullProjectDescription.Teams.Items.First().TeamId);
            Assert.Equal(projectFullModel.Teams.Items.First().TeamName, fullProjectDescription.Teams.Items.First().TeamName);
            Assert.Equal(projectFullModel.Teams.Items.First().Location, fullProjectDescription.Teams.Items.First().Location);
            
            Assert.Equal(projectFullModel.Sprints.Count, fullProjectDescription.Sprints.Count);
            Assert.Equal(projectFullModel.Sprints.Items.First().SprintId, fullProjectDescription.Sprints.Items.First().SprintId);
            Assert.Equal(projectFullModel.Sprints.Items.First().EpicId, fullProjectDescription.Sprints.Items.First().EpicId);
            Assert.Equal(projectFullModel.Sprints.Items.First().SprintName, fullProjectDescription.Sprints.Items.First().SprintName);
            Assert.Equal(projectFullModel.Sprints.Items.First().StartDate, fullProjectDescription.Sprints.Items.First().StartDate);
            Assert.Equal(projectFullModel.Sprints.Items.First().EndDate, fullProjectDescription.Sprints.Items.First().EndDate);
            Assert.Equal(projectFullModel.Sprints.Items.First().Progress, fullProjectDescription.Sprints.Items.First().Progress);
            
            A.CallTo(() => projectMapper.MapToModel(projectEntity))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => epicMapper.MapToModel(epicEntity))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => sprintMapper.MapToFullModel(sprintEntities.First()))
                .MustHaveHappened();
            A.CallTo(() => teamMapper.MapToFullModel(teamEntities.First()))
                .MustHaveHappened();
        }
    }
}