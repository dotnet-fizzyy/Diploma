using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Providers;
using WebAPI.Core.Configuration;
using WebAPI.Core.Entities;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Action;
using Xunit;

namespace WebAPI.UnitTests.Providers
{
    public class UserProviderTests
    {
        private readonly AppSettings _appSettings = new AppSettings
        {
            Redis = new RedisSettings
            {
                EnableRedis = false
            }
        };
        
        [Fact]
        public async Task ShouldGetFullUserInfoByUserIdAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var projectRepository = A.Fake<IProjectRepository>();
            var redisHandler = A.Fake<IRedisContext>();
            
            var userProvider = new UserProvider(userRepository, teamRepository, projectRepository, redisHandler, _appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string userName = "UserName";
            
            var userEntity = new User
            {
                Id = userId,
                UserName = userName,
                TeamUsers = new List<TeamUser>(),
            };

            var expectedModel = new FullUser
            {
                UserId = userId,
                UserName = userName,
            };
            
            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._, A<Expression<Func<User,object>>[]>._))
                .Returns(userEntity);

            //Act
            var result = await userProvider.GetFullUser(userId);

            //Assert
            Assert.Equal(expectedModel.UserId, result.UserId);
            Assert.Equal(expectedModel.UserName, result.UserName);
            Assert.NotNull(result.Teams);
            Assert.NotNull(result.Projects);
            Assert.Empty(result.Projects);
            Assert.Empty(result.Projects);

            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._, A<Expression<Func<User, object>>[]>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .MustNotHaveHappened();
            A.CallTo(() => projectRepository.GetProjectsByCollectionOfTeamIds(A<IEnumerable<Team>>._))
                .MustNotHaveHappened();
        }

        [Fact]
        public async Task ShouldThrowErrorOnMissingUserEntityAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var projectRepository = A.Fake<IProjectRepository>();
            var redisHandler = A.Fake<IRedisContext>();
            
            var userProvider = new UserProvider(userRepository, teamRepository, projectRepository, redisHandler, _appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804d22");

            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._, A<Expression<Func<User, object>>[]>._))
                .ThrowsAsync(new UserFriendlyException());
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await userProvider.GetFullUser(userId));

            A.CallTo(() => userRepository.SearchForSingleItemAsync(A<Expression<Func<User, bool>>>._, A<Expression<Func<User, object>>[]>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .MustNotHaveHappened();
            A.CallTo(() => projectRepository.GetProjectsByCollectionOfTeamIds(A<IEnumerable<Team>>._))
                .MustNotHaveHappened();
        }

        [Fact]
        public async Task ShouldGetFullUserInfoBySignInModelAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var projectRepository = A.Fake<IProjectRepository>();
            var redisHandler = A.Fake<IRedisContext>();
            
            var userProvider = new UserProvider(userRepository, teamRepository, projectRepository, redisHandler, _appSettings);

            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var teamId = new Guid("0493238f-6666-4e86-93fc-ab79b8804444");
            var projectId = new Guid("0493238f-6666-4e86-93fc-ab79b8804444");
            const string userName = "UserName";
            const string password = "123";
            const string teamName = "TeamName";
            const string projectName = "ProjectName";

            var signInUser = new SignInUser
            {
                Email = userName,
                Password = password
            };
            
            var userEntity = new User
            {
                Id = userId,
                UserName = userName,
                TeamUsers = new List<TeamUser>
                {
                    new TeamUser
                    {
                        UserId = userId,
                        TeamId = teamId
                    }   
                }
            };

            var teams = new List<Team>
            {
                new Team
                {
                    Id = teamId,
                    TeamName = teamName
                }
            };
            
            var projects = new List<Project>
            {
                new Project
                {
                    Id = projectId,
                    ProjectName = projectName
                }
            };
            
            var expectedModel = new FullUser
            {
                UserId = userId,
                UserName = userName,
                Teams = new List<UserTeam>
                {
                    new UserTeam
                    {
                        TeamId = teamId,
                        TeamName = teamName
                    }
                },
                Projects = new List<UserProject>
                {
                    new UserProject
                    {
                        ProjectId = projectId,
                        ProjectName = projectName
                    }
                }
            };
            
            A.CallTo(() => userRepository.AuthenticateUser(A<User>._))
                .Returns(userEntity);
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .Returns(teams);
            A.CallTo(() => projectRepository.GetProjectsByCollectionOfTeamIds(A<IEnumerable<Team>>._))
                .Returns(projects);

            //Act
            var result = await userProvider.GetFullUser(signInUser);

            //Assert
            Assert.Equal(expectedModel.UserId, result.UserId);
            Assert.Equal(expectedModel.UserName, result.UserName);
            Assert.NotNull(result.Teams);
            Assert.NotNull(result.Projects);
            Assert.NotEmpty(result.Projects);
            Assert.NotEmpty(result.Projects);
            Assert.Single(result.Projects);
            Assert.Single(result.Teams);
            Assert.Equal(expectedModel.Teams[0].TeamId, result.Teams[0].TeamId);
            Assert.Equal(expectedModel.Teams[0].TeamName, result.Teams[0].TeamName);
            Assert.Equal(expectedModel.Projects[0].ProjectId, result.Projects[0].ProjectId);
            Assert.Equal(expectedModel.Projects[0].ProjectName, result.Projects[0].ProjectName);

            A.CallTo(() => userRepository.AuthenticateUser(A<User>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => projectRepository.GetProjectsByCollectionOfTeamIds(A<IEnumerable<Team>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorOnSignInAsync()
        {
            //Arrange
            var userRepository = A.Fake<IUserRepository>();
            var teamRepository = A.Fake<ITeamRepository>();
            var projectRepository = A.Fake<IProjectRepository>();
            var redisHandler = A.Fake<IRedisContext>();
            
            var userProvider = new UserProvider(userRepository, teamRepository, projectRepository, redisHandler, _appSettings);

            const string userName = "UserName";
            const string password = "123";

            var signInUser = new SignInUser
            {
                Email = userName,
                Password = password
            };

            A.CallTo(() => userRepository.AuthenticateUser(A<User>._))
                .Returns((User)null);

            //Assert && Act
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await userProvider.GetFullUser(signInUser));

            A.CallTo(() => userRepository.AuthenticateUser(A<User>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => teamRepository.GetUserTeams(A<Guid>._))
                .MustNotHaveHappened();
            A.CallTo(() => projectRepository.GetProjectsByCollectionOfTeamIds(A<IEnumerable<Team>>._))
                .MustNotHaveHappened();
        }
    }
}