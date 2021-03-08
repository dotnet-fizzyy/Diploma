using System;
using System.Collections.Generic;
using System.Linq;
using FakeItEasy;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class TeamMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();

            Team teamEntity = null;
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToModel(teamEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();

            Models.Models.Team teamModel = null;
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToEntity(teamModel);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyFullModelOnNullEntity()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();

            Team teamEntity = null;
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToFullModel(teamEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();
            
            var teamId = new Guid();

            var teamModel = new Models.Models.Team
            {
                TeamId = teamId,
                TeamName = "TeamName",
                Location = "Phoenix",
                MembersCount = 0
            };
            
            var teamEntity = new Team
            {
                Id = teamId,
                TeamName = "TeamName",
                Location = "Phoenix",
                Users = new List<User>(),
            };
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToEntity(teamModel);

            //Assert
            Assert.Equal(teamEntity.Id, mappedResult.Id);
            Assert.Equal(teamEntity.TeamName, mappedResult.TeamName);
            Assert.Equal(teamEntity.Location, mappedResult.Location);
            Assert.Equal(teamEntity.MembersCount, mappedResult.MembersCount);
        }
        
        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();
            
            var teamId = new Guid();
            
            var teamEntity = new Team
            {
                Id = teamId,
                TeamName = "Team",
                Location = "Minsk",
                Users = new List<User>(),
            };
            
            var teamModel = new Models.Models.Team
            {
                TeamId = teamId,
                TeamName = "Team",
                Location = "Minsk",
                MembersCount = 0
            };
            
            //Act
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToModel(teamEntity);

            //Assert
            Assert.Equal(teamModel.TeamId, mappedResult.TeamId);
            Assert.Equal(teamModel.TeamName, mappedResult.TeamName);
            Assert.Equal(teamModel.Location, mappedResult.Location);
            Assert.Equal(teamModel.MembersCount, mappedResult.MembersCount);
        }
        
        [Fact]
        public void ShouldMapEntityToFullModel()
        {
            //Arrange
            var userMapper = A.Fake<IUserMapper>();

            var teamId = new Guid();
            var userId = new Guid();
            
            var teamEntity = new Team
            {
                Id = teamId,
                TeamName = "Team",
                Location = "Minsk",
                Users = new List<User>
                {
                    new User
                    {
                        Id = userId,
                        UserName = "SomeUser",
                        UserPosition = Core.Enums.UserPosition.Developer,
                        UserRole = Core.Enums.UserRole.Engineer,
                        AvatarLink = "avatarLink",
                        Email = "test@mail.com",
                        RecordVersion = 12345,
                        IsActive = true
                    }
                }
            };

            var teamFullModel = new FullTeam
            {
                TeamId = teamId,
                TeamName = "Team",
                Location = "Minsk",
                Users = new List<Models.Models.User>
                {
                    new Models.Models.User
                    {
                        UserId = userId,
                        UserName = "SomeUser",
                        UserPosition = Models.Enums.UserPosition.Developer,
                        UserRole = Models.Enums.UserRole.Engineer,
                        AvatarLink = "avatarLink",
                        Email = "test@mail.com",
                        RecordVersion = 12345,
                        IsActive = true
                    }
                }
            };
            
            //Act
            A.CallTo(() => userMapper.MapToModel(teamEntity.Users.First()))
                .Returns(teamFullModel.Users.First());
            
            var teamMapper = new TeamMapper(userMapper);
            var mappedResult = teamMapper.MapToFullModel(teamEntity);

            //Assert
            Assert.Equal(teamFullModel.TeamId, mappedResult.TeamId);
            Assert.Equal(teamFullModel.TeamName, mappedResult.TeamName);
            Assert.Equal(teamFullModel.Location, mappedResult.Location);
            Assert.Equal(teamFullModel.MembersCount, mappedResult.MembersCount);
            Assert.All(mappedResult.Users, user =>
            {
                Assert.Equal(teamFullModel.Users.First().UserId, user.UserId);
                Assert.Equal(teamFullModel.Users.First().Email, user.Email);
                Assert.Equal(teamFullModel.Users.First().UserName, user.UserName);
                Assert.Equal(teamFullModel.Users.First().UserPosition.ToString(), user.UserPosition.ToString());
                Assert.Equal(teamFullModel.Users.First().RecordVersion, user.RecordVersion);
                Assert.Equal(teamFullModel.Users.First().AvatarLink, user.AvatarLink);
                Assert.Equal(teamFullModel.Users.First().IsActive, user.IsActive);
                Assert.Equal(teamFullModel.Users.First().UserRole.ToString(), user.UserRole.ToString());
            });
            
            A.CallTo(() => userMapper.MapToModel(teamEntity.Users.First()))
                .MustHaveHappened();
        }
    }
}