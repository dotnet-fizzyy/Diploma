using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class TeamServiceTests
    {
        [Fact]
        public async Task ShouldGetTeamByIdAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            const string location = "Minsk";
            var creationDate = DateTime.UtcNow;

            var entity = new Core.Entities.Team
            {
                Id = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
            };
            
            var expectedModel = new Team
            {
                TeamId = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
            };

            A.CallTo(() => teamRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .Returns(entity);
            
            //Act
            var result = await teamService.GetTeamByIdAsync(teamId);

            //Assert
            AssertTeamModelProperties(expectedModel, result);
            
            A.CallTo(() => teamRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetTeamByIdAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => teamRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .Returns((Core.Entities.Team)null);
            
            //Act && Assert
           await Assert.ThrowsAsync<UserFriendlyException>(async () => await teamService.GetTeamByIdAsync(teamId));

            A.CallTo(() => teamRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetUserTeamsAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            const string location = "Minsk";
            var creationDate = DateTime.UtcNow;

            var entities = new List<Core.Entities.Team>
            {
                new Core.Entities.Team
                {
                    Id = teamId,
                    TeamName = teamName,
                    Location = location,
                    ProjectId = projectId,
                    CreationDate = creationDate,
                }
            };

            var expectedModels = new CollectionResponse<Team>
            {
                Items = new List<Team>
                {
                    new Team
                    {
                        TeamId = teamId,
                        TeamName = teamName,
                        Location = location,
                        ProjectId = projectId,
                        CreationDate = creationDate,
                    }
                }
            };
            
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .Returns(entities);
            
            //Act
            var result = await teamService.GetUserTeamsAsync(teamId);

            //Assert
            Assert.Equal(expectedModels.Count, result.Count);
            
            AssertTeamModelProperties(expectedModels.Items[0], result.Items[0]);
            
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldReturnEmptyCollectionsForMissingUserTeamsOnGetUserTeamsAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");


            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .Returns(new List<Core.Entities.Team>());
            
            //Act
            var result = await teamService.GetUserTeamsAsync(teamId);

            //Assert
            Assert.NotNull(result);
            Assert.Empty(result.Items);
            
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetFullTeamDescriptionAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            var userId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            const string location = "Minsk";
            const string userName = "UserName";
            var creationDate = DateTime.UtcNow;

            var entity = new Core.Entities.Team
            {
                Id = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
                TeamUsers = new List<Core.Entities.TeamUser>
                {
                    new Core.Entities.TeamUser
                    {
                        User = new Core.Entities.User
                        {
                            Id = userId,
                            UserName = userName
                        }
                    },
                }
            };
            
            var expectedModel = new FullTeam
            {
                TeamId = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
                Users = new List<User>
                {
                    new User
                    {
                        UserId = userId,
                        UserName = userName
                    }
                }
            };

            A.CallTo(() => teamRepository.GetTeamWithUsers(A<Guid>._))
                .Returns(entity);
            
            //Act
            var result = await teamService.GetFullTeamDescriptionAsync(teamId);

            //Assert
            AssertTeamModelProperties(expectedModel, result);
            
            Assert.NotNull(result.Users);
            Assert.NotEmpty(result.Users);
            Assert.Single(result.Users);
            Assert.Equal(expectedModel.Users[0].UserId, result.Users[0].UserId);
            Assert.Equal(expectedModel.Users[0].UserName, result.Users[0].UserName);
            
            A.CallTo(() => teamRepository.GetTeamWithUsers(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetFullTeamDescriptionAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => teamRepository.GetTeamWithUsers(A<Guid>._))
                .Returns((Core.Entities.Team)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await teamService.GetFullTeamDescriptionAsync(teamId));

            A.CallTo(() => teamRepository.GetTeamWithUsers(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldCreateTeamAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            const string location = "Minsk";
            var creationDate = DateTime.UtcNow;

            var model = new Team
            {
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
            };
            
            var entity = new Core.Entities.Team
            {
                Id = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
            };
            
            var expectedModel = new Team
            {
                TeamId = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
            };

            A.CallTo(() => teamRepository.CreateAsync(A<Core.Entities.Team>._))
                .Returns(entity);
            
            //Act
            var result = await teamService.CreateTeamAsync(model);

            //Assert
            AssertTeamModelProperties(expectedModel, result);
            
            A.CallTo(() => teamRepository.CreateAsync(A<Core.Entities.Team>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldUpdateTeamAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var projectId = new Guid("5593238f-87e6-4e86-93fc-ab79b8804444");
            const string teamName = "TeamName";
            const string location = "Minsk";
            var creationDate = DateTime.UtcNow;

            var model = new Team
            {
                TeamId = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
            };
            
            var entity = new Core.Entities.Team
            {
                Id = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
            };
            
            var expectedModel = new Team
            {
                TeamId = teamId,
                TeamName = teamName,
                Location = location,
                ProjectId = projectId,
                CreationDate = creationDate,
            };

            A.CallTo(() => teamRepository.UpdateItemAsync(A<Core.Entities.Team>._))
                .Returns(entity);
            
            //Act
            var result = await teamService.UpdateTeamAsync(model);

            //Assert
            AssertTeamModelProperties(expectedModel, result);
            
            A.CallTo(() => teamRepository.UpdateItemAsync(A<Core.Entities.Team>._))
                .MustHaveHappenedOnceExactly();
        }

        [Fact]
        public async Task ShouldRemoveTeamSoftAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);

            var team = new Team
            {
                TeamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec")
            };
            
            A.CallTo(() => teamRepository.DeleteSoftAsync(A<Guid>._))
                .DoesNothing();
            
            //Act
            await teamService.RemoveTeamSoftAsync(team);

            //Assert
            A.CallTo(() => teamRepository.DeleteSoftAsync(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveTeamAsync()
        {
            //Arrange
            var teamRepository = A.Fake<ITeamRepository>();
            var teamMapper = new TeamMapper(new UserMapper());

            var teamService = new TeamService(teamRepository, teamMapper);
            
            var teamId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => teamRepository.DeleteAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .DoesNothing();
            
            //Act
            await teamService.RemoveTeamAsync(teamId);

            //Assert
            A.CallTo(() => teamRepository.DeleteAsync(A<Expression<Func<Core.Entities.Team, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        
        private static void AssertTeamModelProperties(Team expectedModel, Team result)
        {
            Assert.Equal(expectedModel.TeamId, result.TeamId);
            Assert.Equal(expectedModel.TeamName, result.TeamName);
            Assert.Equal(expectedModel.Location, result.Location);
            Assert.Equal(expectedModel.ProjectId, result.ProjectId);
            Assert.Equal(expectedModel.CreationDate.Date, result.CreationDate.Date);
        }
    }
}