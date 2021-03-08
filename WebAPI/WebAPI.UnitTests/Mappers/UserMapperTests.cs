using System;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class UserMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            Core.Entities.User userEntity = null;

            //Act
            var userMapper = new UserMapper();
            var mappedResult = userMapper.MapToModel(userEntity);
            
            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            Models.Models.User userModel = null;

            //Act
            var userMapper = new UserMapper();
            var mappedResult = userMapper.MapToEntity(userModel);
            
            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapUserEntityToModel()
        {
            //Arrange
            var userId = new Guid();
            
            var userEntity = new Core.Entities.User
            {
                Id = userId,
                UserName = "SomeUser",
                UserPosition = Core.Enums.UserPosition.Developer,
                UserRole = Core.Enums.UserRole.Engineer,
                AvatarLink = "avatarLink",
                Email = "test@mail.com",
                RecordVersion = 12345,
                IsActive = true
            };

            var userModel = new Models.Models.User
            {
                UserId = userId,
                UserName = "SomeUser",
                UserPosition = Models.Enums.UserPosition.Developer,
                UserRole = Models.Enums.UserRole.Engineer,
                AvatarLink = "avatarLink",
                Email = "test@mail.com",
                RecordVersion = 12345,
                IsActive = true
            };
            
            //Act
            var userMapper = new UserMapper();
            var mappedResult = userMapper.MapToModel(userEntity);

            //Assert
            Assert.Equal(userModel.UserId, mappedResult.UserId);
            Assert.Equal(userModel.UserName, mappedResult.UserName);
            Assert.Equal(userModel.UserPosition.ToString(), mappedResult.UserPosition.ToString());
            Assert.Equal(userModel.UserRole.ToString(), mappedResult.UserRole.ToString());
            Assert.Equal(userModel.AvatarLink, mappedResult.AvatarLink);
            Assert.Equal(userModel.Email, mappedResult.Email);
            Assert.Equal(userModel.IsActive, mappedResult.IsActive);
            Assert.Equal(userModel.RecordVersion, mappedResult.RecordVersion);
        }
        
        [Fact]
        public void ShouldMapUserModelToEntity()
        {
            //Arrange
            var userId = new Guid();
            
            var userEntity = new Core.Entities.User
            {
                Id = userId,
                UserName = "SomeUser2",
                UserPosition = Core.Enums.UserPosition.Developer,
                UserRole = Core.Enums.UserRole.Engineer,
                AvatarLink = "avatarLink123_321",
                Email = "testTest@mail.com",
                RecordVersion = 55555,
                IsActive = false
            };

            var userModel = new Models.Models.User
            {
                UserId = userId,
                UserName = "SomeUser2",
                UserPosition = Models.Enums.UserPosition.Developer,
                UserRole = Models.Enums.UserRole.Engineer,
                AvatarLink = "avatarLink123_321",
                Email = "testTest@mail.com",
                RecordVersion = 55555,
                IsActive = false
            };
            
            //Act
            var userMapper = new UserMapper();
            var mappedResult = userMapper.MapToEntity(userModel);

            //Assert
            Assert.Equal(userEntity.Id, mappedResult.Id);
            Assert.Equal(userEntity.UserName, mappedResult.UserName);
            Assert.Equal(userEntity.UserPosition.ToString(), mappedResult.UserPosition.ToString());
            Assert.Equal(userEntity.UserRole.ToString(), mappedResult.UserRole.ToString());
            Assert.Equal(userEntity.AvatarLink, mappedResult.AvatarLink);
            Assert.Equal(userEntity.Email, mappedResult.Email);
            Assert.Equal(userEntity.IsActive, mappedResult.IsActive);
            Assert.Equal(userEntity.RecordVersion, mappedResult.RecordVersion);
        }
    }
}