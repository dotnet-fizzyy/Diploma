using System;
using WebAPI.Models.Models;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class UserMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange & Act
            var userMapper = new UserMapper();
            var mappedResult = userMapper.MapToModel(null);
            
            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var userMapper = new UserMapper();
            var mappedResult = userMapper.MapToEntity((User)null);
            
            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapUserEntityToModel()
        {
            //Arrange
            var userId = new Guid();
            var workSpaceId = new Guid();
            
            var userEntity = new Core.Entities.User
            {
                Id = userId,
                UserName = "SomeUser",
                UserPosition = Core.Enums.UserPosition.Developer,
                UserRole = Core.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = "avatarLink",
                Email = "test@mail.com",
                CreationDate = new DateTime(2021, 3, 1),
                IsActive = true
            };

            var userModel = new Models.Models.User
            {
                UserId = userId,
                UserName = "SomeUser",
                UserPosition = Models.Enums.UserPosition.Developer,
                UserRole = Models.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = "avatarLink",
                Email = "test@mail.com",
                CreationDate = new DateTime(2021, 3, 1),
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
        }
        
        [Fact]
        public void ShouldMapUserModelToEntity()
        {
            //Arrange
            var userId = new Guid();
            var workSpaceId = new Guid();
            
            var userEntity = new Core.Entities.User
            {
                Id = userId,
                UserName = "SomeUser2",
                UserPosition = Core.Enums.UserPosition.Developer,
                UserRole = Core.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = "avatarLink123_321",
                Email = "testTest@mail.com",
                CreationDate = new DateTime(2021, 3, 1),
                IsActive = false
            };

            var userModel = new Models.Models.User
            {
                UserId = userId,
                UserName = "SomeUser2",
                UserPosition = Models.Enums.UserPosition.Developer,
                UserRole = Models.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = "avatarLink123_321",
                Email = "testTest@mail.com",
                CreationDate = new DateTime(2021, 3, 1),
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
            
        }
    }
}