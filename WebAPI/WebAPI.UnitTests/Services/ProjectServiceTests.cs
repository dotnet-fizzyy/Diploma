using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Enums;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Aggregators;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class ProjectServiceTests
    {
        [Fact]
        public async Task ShouldGetProjectByIdAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();

            var teamMapper = new TeamMapper();
            var epicMapper = new EpicMapper();
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper,
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string projectName = "ProjectName";
            const string projectDescription = "ProjectDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;
            
            var entity = new Core.Entities.Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new Project
            {
                ProjectId = projectId,
                ProjectDescription = projectDescription,
                ProjectName = projectName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .Returns(entity);
            
            //Act
            var result = await projectService.GetProjectAsync(projectId);

            //Assert
            AssertProjectModelProperties(expectedModel, result);

            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetProjectByIdAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper, 
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");


            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .Returns((Core.Entities.Project)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await projectService.GetProjectAsync(projectId));

            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetFullProjectDescriptionAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();

            var teamMapper = new TeamMapper();
            var epicMapper = new EpicMapper();
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper, 
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var epicId = new Guid("2593238f-87e6-4e86-93fc-ab79b8804de4");
            var sprintId = new Guid("6593238f-87e6-4e86-93fc-ab79b8804de7");
            var teamId = new Guid("3593238f-87e6-4e86-93fc-ab79b8804de5");
            const string projectName = "ProjectName";
            const string epicName = "EpicName";
            const string sprintName = "SprintName";
            const string projectDescription = "ProjectDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;
            
            var projectEntity = new Core.Entities.Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            var epicEntities = new List<Core.Entities.Epic>
            {
                new Core.Entities.Epic
                {
                    Id = epicId,
                    EpicName = epicName,
                    ProjectId = projectId
                }
            };

            var sprintEntities = new List<Core.Entities.Sprint>
            {
                new Core.Entities.Sprint
                {
                    Id = sprintId,
                    EpicId = epicId,
                    SprintName = sprintName
                }
            };

            var teamEntities = new List<Core.Entities.Team>
            {
                new Core.Entities.Team
                {
                    Id = teamId,
                    ProjectId = projectId
                }
            };
            
            var expectedModel = new FullProjectDescription
            {
                Project = new Project
                {
                    ProjectId = projectId,
                    ProjectDescription = projectDescription,
                    ProjectName = projectName,
                    StartDate = startDate,
                    EndDate = endDate,
                    CreationDate = creationDate   
                },
                Epic = new Epic
                {
                    EpicId = epicId,
                    EpicName = epicName,
                    ProjectId = projectId
                },
                Sprints = new CollectionResponse<FullSprint>
                {
                    Items = new List<FullSprint>
                    {
                        new FullSprint
                        {
                            SprintId = sprintId,
                            EpicId = epicId,
                            SprintName = sprintName
                        }
                    }
                },
                Teams = new CollectionResponse<FullTeam>
                {
                    Items = new List<FullTeam>
                    {
                        new FullTeam
                        {
                            TeamId = teamId,
                            ProjectId = projectId
                        }
                    }
                }
            };

            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .Returns(projectEntity);

            A.CallTo(() => epicRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A<Expression<Func<Core.Entities.Epic, DateTime>>>._, A<OrderType>._))
                .Returns(epicEntities);
            
            A.CallTo(() => sprintRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._, A<Expression<Func<Core.Entities.Sprint, DateTime>>>._, A<OrderType>._))
                .Returns(sprintEntities);

            A.CallTo(() => teamRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .Returns(teamEntities);
            
            //Act
            var result = await projectService.GetFullProjectDescriptionAsync(projectId);

            //Assert
            AssertProjectModelProperties(expectedModel.Project, result.Project);
            
            Assert.Equal(expectedModel.Epic.EpicId, result.Epic.EpicId);
            Assert.Equal(expectedModel.Epic.EpicName, result.Epic.EpicName);
            Assert.Equal(expectedModel.Epic.ProjectId, result.Epic.ProjectId);
            Assert.Equal(expectedModel.Sprints.Count, result.Sprints.Count);
            Assert.Equal(expectedModel.Teams.Count, result.Teams.Count);
            Assert.Equal(expectedModel.Sprints.Items[0].SprintId, result.Sprints.Items[0].SprintId);
            Assert.Equal(expectedModel.Sprints.Items[0].SprintName, result.Sprints.Items[0].SprintName);
            Assert.Equal(expectedModel.Teams.Items[0].TeamId, result.Teams.Items[0].TeamId);
            Assert.Equal(expectedModel.Teams.Items[0].ProjectId, result.Teams.Items[0].ProjectId);
            
            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => epicRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A<Expression<Func<Core.Entities.Epic, DateTime>>>._, A<OrderType>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => sprintRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._, A<Expression<Func<Core.Entities.Sprint, DateTime>>>._, A<OrderType>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => teamRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetFullProjectDescriptionAsyncOnlyWithProjectOnMissingEpic()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();

            var teamMapper = new TeamMapper();
            var epicMapper = new EpicMapper();
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper, 
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string projectName = "ProjectName";
            const string projectDescription = "ProjectDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;
            
            var projectEntity = new Core.Entities.Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            var expectedModel = new FullProjectDescription
            {
                Project = new Project
                {
                    ProjectId = projectId,
                    ProjectDescription = projectDescription,
                    ProjectName = projectName,
                    StartDate = startDate,
                    EndDate = endDate,
                    CreationDate = creationDate   
                }
            };

            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .Returns(projectEntity);

            A.CallTo(() => epicRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A<Expression<Func<Core.Entities.Epic, DateTime>>>._, A<OrderType>._))
                .Returns(new List<Core.Entities.Epic>());

            //Act
            var result = await projectService.GetFullProjectDescriptionAsync(projectId);

            //Assert
            AssertProjectModelProperties(expectedModel.Project, result.Project);

            Assert.Null(result.Sprints);
            Assert.Null(result.Teams);
            
            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => epicRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Epic, bool>>>._, A<Expression<Func<Core.Entities.Epic, DateTime>>>._, A<OrderType>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => sprintRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Sprint, bool>>>._, A<Expression<Func<Core.Entities.Sprint, DateTime>>>._, A<OrderType>._))
                .MustNotHaveHappened();
            A.CallTo(() => teamRepository.SearchForMultipleItemsAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .MustNotHaveHappened();
        }

        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetFullProjectDescriptionAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                new ProjectMapper(), 
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");


            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .Returns((Core.Entities.Project)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await projectService.GetFullProjectDescriptionAsync(projectId));

            A.CallTo(() => projectRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldCreateProjectAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();

            var teamMapper = new TeamMapper();
            var epicMapper = new EpicMapper();
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper,
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string projectName = "ProjectName";
            const string projectDescription = "ProjectDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new Project
            {
                ProjectDescription = projectDescription,
                ProjectName = projectName,
                StartDate = startDate,
                EndDate = endDate,
            };
            
            var entity = new Core.Entities.Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new Project
            {
                ProjectId = projectId,
                ProjectDescription = projectDescription,
                ProjectName = projectName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => projectRepository.CreateAsync(A<Core.Entities.Project>._))
                .Returns(entity);
            
            //Act
            var result = await projectService.CreateProjectAsync(model);

            //Assert
            AssertProjectModelProperties(expectedModel, result);

            A.CallTo(() => projectRepository.CreateAsync(A<Core.Entities.Project>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldUpdateProjectAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();

            var teamMapper = new TeamMapper();
            var epicMapper = new EpicMapper();
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper,
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string projectName = "ProjectName";
            const string projectDescription = "ProjectDescription";
            var startDate = DateTime.UtcNow;
            var endDate = DateTime.UtcNow.AddDays(2);
            var creationDate = DateTime.UtcNow;

            var model = new Project
            {
                ProjectId = projectId,
                ProjectDescription = projectDescription,
                ProjectName = projectName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var entity = new Core.Entities.Project
            {
                Id = projectId,
                ProjectName = projectName,
                ProjectDescription = projectDescription,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };
            
            var expectedModel = new Project
            {
                ProjectId = projectId,
                ProjectDescription = projectDescription,
                ProjectName = projectName,
                StartDate = startDate,
                EndDate = endDate,
                CreationDate = creationDate
            };

            A.CallTo(() => projectRepository.UpdateItemAsync(A<Core.Entities.Project>._))
                .Returns(entity);
            
            //Act
            var result = await projectService.UpdateProjectAsync(model);

            //Assert
            AssertProjectModelProperties(expectedModel, result);

            A.CallTo(() => projectRepository.UpdateItemAsync(A<Core.Entities.Project>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldRemoveProjectSoftAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper,
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var project = new Project
            {
                ProjectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec")
            };
            
            A.CallTo(() => projectRepository.DeleteSoftAsync(A<Guid>._))
                .DoesNothing();
            
            //Act
            await projectService.RemoveProjectSoftAsync(project);

            //Assert
            A.CallTo(() => projectRepository.DeleteSoftAsync(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveProjectAsync()
        {
            //Arrange
            var projectRepository = A.Fake<IProjectRepository>();
            var epicRepository = A.Fake<IEpicRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var sprintRepository = A.Fake<ISprintRepository>();
            var teamMapper = A.Fake<ITeamMapper>();
            var epicMapper = A.Fake<IEpicMapper>();
            
            var projectMapper = new ProjectMapper();
            
            var projectService = new ProjectService(
                projectRepository, 
                epicRepository, 
                sprintRepository, 
                teamRepository, 
                projectMapper,
                new FullProjectDescriptionAggregator(projectMapper, epicMapper, teamMapper)
            );

            var projectId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            
            A.CallTo(() => projectRepository.DeleteAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .DoesNothing();
            
            //Act
            await projectService.RemoveProjectAsync(projectId);

            //Assert
            A.CallTo(() => projectRepository.DeleteAsync(A<Expression<Func<Core.Entities.Project, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        private static void AssertProjectModelProperties(Project expectedModel, Project result)
        {
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
            Assert.Equal(expectedModel.WorkSpaceId, result.WorkSpaceId);
            Assert.Equal(expectedModel.ProjectName, result.ProjectName);
            Assert.Equal(expectedModel.ProjectDescription, result.ProjectDescription);
            Assert.Equal(expectedModel.StartDate, result.StartDate);
            Assert.Equal(expectedModel.EndDate, result.EndDate);
            Assert.Equal(expectedModel.CreationDate.Date, result.CreationDate.Date);
        }
    }
}