using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Aggregators;
using Xunit;

namespace WebAPI.UnitTests.Aggregators
{
    public class FullProjectDescriptionAggregatorTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullProjectOrEpic()
        {
            //Arrange
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
                }
            };

            var projectAggregator = new FullProjectDescriptionAggregator();

            var fullProjectDescription =
                projectAggregator.AggregateFullProjectDescription(
                    null, 
                    null, 
                    sprintEntities, 
                    teamEntities
                );
            
            //Assert
            Assert.NotNull(fullProjectDescription);
        }
        
        [Fact]
        public void ShouldAggregateFullProjectDescription()
        {
            //Arrange
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

            var epicModel = new Models.Models.Models.Epic
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
            
            var projectModel = new Models.Models.Models.Project
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
            var projectAggregator = new FullProjectDescriptionAggregator();

            var fullProjectDescription = projectAggregator.AggregateFullProjectDescription(
                    projectEntity, 
                    epicEntity, 
                    sprintEntities, 
                    teamEntities);
            
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
        }
    }
}