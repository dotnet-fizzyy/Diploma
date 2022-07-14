using System;
using System.Collections.Generic;
using WebAPI.ApplicationLogic.Aggregators;
using WebAPI.Core.Entities;
using Xunit;

namespace WebAPI.UnitTests.Aggregators
{
    public class PageServiceAggregatorTests
    {
        [Fact]
        public void ShouldCreateSearchResultResponseBySearchTerm()
        {
            //Arrange
            var projectId = new Guid("807e22d0-d244-439c-bdde-4908b45c9707");
            var teamId = new Guid("1115d0d1-8e12-4068-b68e-f8294cf0ffff");
            
            var teams = new List<Team>
            {
                new Team
                {
                    Id = teamId
                }
            };

            var project = new List<Project>
            {
                new Project
                {
                    Id = projectId
                }
            };
            
            //Act
            var result = PageAggregator.CreateSearchResultsByTerm(teams, project);

            //Assert
            Assert.NotNull(result);
            
            Assert.NotNull(result.Teams);
            Assert.NotEmpty(result.Teams);
            
            Assert.NotNull(result.Projects);
            Assert.NotEmpty(result.Projects);
        }
        
        [Fact]
        public void ShouldReturnEmptySearchResultResponseBySearchTermOnNullModels()
        {
            //Arrange & Act
            var result = PageAggregator.CreateSearchResultsByTerm(null, null);

            //Assert
            Assert.NotNull(result);
            
            Assert.NotNull(result.Teams);
            Assert.Empty(result.Teams);
            
            Assert.NotNull(result.Projects);
            Assert.Empty(result.Projects);
        }
        
        [Fact]
        public void ShouldCreateBoardPageModel()
        {
            //Arrange
            var projectId = new Guid("807e22d0-d244-439c-bdde-4908b45c9707");
            var epicId = new Guid("9a15d0d1-8e12-4068-b68e-f8294cf0f90a");
            var teamId = new Guid("1115d0d1-8e12-4068-b68e-f8294cf0ffff");
            var sprintId = new Guid("f6064878-bfd4-4fd7-b119-d7838abae643");
            var storyId = new Guid("66664878-bfd4-4fd7-b119-d7838abae555");
            
            var team = new Team
            {
                Id = teamId,
                TeamName = "TeamName"
            };
            var project = new Project
            {
                Id = projectId,
                ProjectName = "ProjectName",
            };
            var epics = new List<Epic>
            {
                new Epic
                {
                    Id = epicId,
                    EpicName = "epic name"
                }
            };
            var sprints = new List<Sprint>
            {
                new Sprint
                {
                    Id = sprintId,
                    SprintName = "SprintName",
                    Stories = new List<Story>
                    {
                        new Story
                        {
                            Id = storyId,
                            Title = "Title",
                        }
                    },
                },
            };
            
            //Act
            var result = PageAggregator.CreateBoardPageModel(team, project, epics, sprints);

            //Assert
            Assert.NotNull(result);
            
            Assert.NotNull(result.Project);
            Assert.NotEqual(result.Project.ProjectId, Guid.Empty);
            Assert.NotEqual(result.Project.ProjectName, string.Empty);
            
            Assert.NotNull(result.Team);
            Assert.NotEqual(result.Team.TeamId, Guid.Empty);
            Assert.NotEqual(result.Team.TeamName, string.Empty);
            
            Assert.NotNull(result.Epics);
            Assert.NotEmpty(result.Epics);
            
            Assert.NotNull(result.Sprints);
            Assert.NotEmpty(result.Sprints);
            
            Assert.NotNull(result.Stories);
            Assert.NotEmpty(result.Stories);
        }
        
        [Fact]
        public void ShouldCreateBoardPageModelOnNullModels()
        {
            //Arrange & Act
            var result = PageAggregator.CreateBoardPageModel(null, null, null, null);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Project);
            Assert.NotNull(result.Team);
            Assert.NotNull(result.Epics);
            Assert.NotNull(result.Sprints);
            Assert.NotNull(result.Stories);
            Assert.Empty(result.Epics);
            Assert.Empty(result.Sprints);
            Assert.Empty(result.Stories);
        }

        [Fact]
        public void ShouldCreateTeamPageModel()
        {
            //Arrange
            var workSpaceId = new Guid("f6064878-bfd4-4fd7-b119-d7838abae643");
            var teamId = new Guid("66664878-bfd4-4fd7-b119-d7838abae555");
            
            var workSpace = new WorkSpace
            {
                Id = workSpaceId,
                WorkSpaceName = "WorkSpaceName"
            };
            var team = new Team
            {
                Id = teamId,
                TeamName = "TeamName"
            };
            
            //Act
            var result = PageAggregator.CreateTeamPageModel(workSpace, team);

            //Assert
            Assert.NotNull(result);
            
            Assert.NotNull(result.WorkSpace);
            Assert.NotEqual(result.WorkSpace.WorkSpaceId, Guid.Empty);
            Assert.NotEqual(result.WorkSpace.WorkSpaceName, string.Empty);
            
            Assert.NotNull(result.Team);
            Assert.NotEqual(result.Team.TeamId, Guid.Empty);
            Assert.NotEqual(result.Team.TeamName, string.Empty);
        }
        
        [Fact]
        public void ShouldCreateTeamPageModelOnNullModels()
        {
            //Arrange & Act
            var result = PageAggregator.CreateTeamPageModel(null, null);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.WorkSpace);
            Assert.NotNull(result.Team);
        }

        [Fact]
        public void ShouldCreateProjectPageModel()
        {
            //Arrange
            var projectId = new Guid("807e22d0-d244-439c-bdde-4908b45c9707");
            var epicId = new Guid("9a15d0d1-8e12-4068-b68e-f8294cf0f90a");
            var teamId = new Guid("f6064878-bfd4-4fd7-b119-d7838abae643");
            
            var project = new Project
            {
                Id = projectId,
                ProjectName = "ProjectName",
                Teams = new List<Team>
                {
                    new Team
                    {
                        Id = teamId
                    },
                },
                Epics = new List<Epic>
                {
                    new Epic
                    {
                        Id = epicId
                    },
                }
            };
            
            //Act
            var result = PageAggregator.CreateProjectPageModel(project);

            //Assert
            Assert.NotNull(result);
            
            Assert.NotNull(result.Project);
            Assert.NotEqual(result.Project.ProjectId, Guid.Empty);
            Assert.NotEqual(result.Project.ProjectName, string.Empty);
            
            Assert.NotNull(result.Epics);
            Assert.NotEmpty(result.Epics);
            
            Assert.NotNull(result.Teams);
            Assert.NotEmpty(result.Teams);
        }
        
        [Fact]
        public void ShouldCreateProjectPageModelOnNullModel()
        {
            //Arrange & Act
            var result = PageAggregator.CreateProjectPageModel(null);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Project);
            Assert.NotNull(result.Epics);
            Assert.NotNull(result.Teams);
            Assert.Empty(result.Epics);
            Assert.Empty(result.Teams);
        }
        
        [Fact]
        public void ShouldCreateWorkSpacePageModel()
        {
            //Arrange & Act
            var workSpaceId = new Guid("f6064878-bfd4-4fd7-b119-d7838abae643");
            var projectId = new Guid("66664878-bfd4-4fd7-b119-d7838abae555");

            var workSpace = new WorkSpace
            {
                Id = workSpaceId,
                WorkSpaceName = "WorkSpaceName",
            };
            var projects = new List<Project>
            {
                new Project
                {
                    Id = projectId,
                    ProjectName = "ProjectName"
                }
            };
            
            //Act
            var result = PageAggregator.CreateWorkSpacePageModel(workSpace, projects);

            //Assert
            Assert.NotNull(result);
            
            Assert.NotNull(result.WorkSpace);
            Assert.NotEqual(result.WorkSpace.WorkSpaceId, Guid.Empty);
            Assert.NotEqual(result.WorkSpace.WorkSpaceName, string.Empty);
            
            Assert.NotNull(result.Projects);
            Assert.NotEmpty(result.Projects);
        }
        
        [Fact]
        public void ShouldCreateWorkSpacePageModelOnNullModels()
        {
            //Arrange & Act
            var result = PageAggregator.CreateWorkSpacePageModel(null, null);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.WorkSpace);
            Assert.NotNull(result.Projects);
            Assert.Empty(result.Projects);
        }
        
        [Fact]
        public void ShouldCreateStatsPageModel()
        {
            //Arrange
            var projectId = new Guid("807e22d0-d244-439c-bdde-4908b45c9707");
            var epicId = new Guid("9a15d0d1-8e12-4068-b68e-f8294cf0f90a");
            var sprintId = new Guid("f6064878-bfd4-4fd7-b119-d7838abae643");
            var storyId = new Guid("66664878-bfd4-4fd7-b119-d7838abae555");
            
            var project = new Project
            {
                Id = projectId,
                ProjectName = "ProjectName",
            };
            var epics = new List<Epic>
            {
                new Epic
                {
                    Id = epicId,
                    ProjectId = projectId,
                    EpicName = "EpicName",
                }
            };
            var sprints = new List<Sprint>
            {
                new Sprint
                {
                    Id = sprintId,
                    EpicId = epicId,
                    SprintName = "SprintName",
                    Stories = new List<Story>
                    {
                        new Story
                        {
                            Id = storyId,
                            Title = "Title",
                            SprintId = sprintId,
                        }
                    }
                }
            };
            
            //Act
            var result = PageAggregator.CreateStatisticsPageModel(project, epics, sprints);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Project);
            Assert.NotEqual(result.Project.ProjectId, Guid.Empty);
            Assert.NotEqual(result.Project.ProjectName, string.Empty);
            
            Assert.NotNull(result.Epics);
            Assert.NotEmpty(result.Epics);
            
            Assert.NotNull(result.Sprints);
            Assert.NotEmpty(result.Sprints);
            
            Assert.NotNull(result.Stories);
            Assert.NotEmpty(result.Stories);
        }
        
        [Fact]
        public void ShouldCreateStatsPageModelWithNullModels()
        {
            //Arrange & Act
            var result = PageAggregator.CreateStatisticsPageModel(null, null, null);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Project);
            Assert.Empty(result.Epics);
            Assert.Empty(result.Sprints);
            Assert.Empty(result.Stories);
        }
    }
}