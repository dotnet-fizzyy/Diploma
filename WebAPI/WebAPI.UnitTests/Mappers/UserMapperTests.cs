using System;
using WebAPI.Models.Models.Models;
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
            var userMapper = new UserMapper();
            
            //Act
            var mappedResult = userMapper.MapToModel(null);
            
            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var userMapper = new UserMapper();
            
            //Act
            var mappedResult = userMapper.MapToEntity((User)null);
            
            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldMapUserEntityToModel()
        {
            //Arrange
            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var workSpaceId = new Guid("1113238f-87e6-4e86-93fc-ab79b8804111");
            const string userName = "SomeUser"; 
            const string avatarLink = "AvatarLink"; 
            const string email = "test@mail.com"; 
            var creationDate = DateTime.UtcNow;
            const bool isActive = true;
            
            var userEntity = new Core.Entities.User
            {
                Id = userId,
                UserName = userName,
                UserPosition = Core.Enums.UserPosition.Developer,
                UserRole = Core.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = avatarLink,
                Email = email,
                CreationDate = creationDate,
                IsActive = isActive
            };

            var userModel = new User
            {
                UserId = userId,
                UserName = userName,
                UserPosition = Models.Enums.UserPosition.Developer,
                UserRole = Models.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = avatarLink,
                Email = email,
                CreationDate = creationDate,
                IsActive = isActive
            };
            
            var userMapper = new UserMapper();
            
            //Act
            var mappedResult = userMapper.MapToModel(userEntity);

            //Assert
            Assert.Equal(userModel.UserId, mappedResult.UserId);
            Assert.Equal(userModel.UserName, mappedResult.UserName);
            Assert.Equal(userModel.UserPosition.ToString(), mappedResult.UserPosition.ToString());
            Assert.Equal(userModel.UserRole.ToString(), mappedResult.UserRole.ToString());
            Assert.Equal(userModel.AvatarLink, mappedResult.AvatarLink);
            Assert.Equal(userModel.Email, mappedResult.Email);
            Assert.Equal(userModel.IsActive, mappedResult.IsActive);
            Assert.Equal(userModel.CreationDate, mappedResult.CreationDate);
        }
        
        [Fact]
        public void ShouldMapUserModelToEntity()
        {
            //Arrange
            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var workSpaceId = new Guid("1113238f-87e6-4e86-93fc-ab79b8804111");
            const string userName = "SomeUser"; 
            const string avatarLink = "AvatarLink"; 
            const string email = "test@mail.com"; 
            var creationDate = DateTime.UtcNow;
            const bool isActive = true;
            
            var userEntity = new Core.Entities.User
            {
                Id = userId,
                UserName = userName,
                UserPosition = Core.Enums.UserPosition.Developer,
                UserRole = Core.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = avatarLink,
                Email = email,
                CreationDate = creationDate,
                IsActive = isActive
            };

            var userModel = new User
            {
                UserId = userId,
                UserName = userName,
                UserPosition = Models.Enums.UserPosition.Developer,
                UserRole = Models.Enums.UserRole.Engineer,
                WorkSpaceId = workSpaceId,
                AvatarLink = avatarLink,
                Email = email,
                CreationDate = creationDate,
                IsActive = isActive
            };
            
            var userMapper = new UserMapper();
            
            //Act
            var mappedResult = userMapper.MapToEntity(userModel);

            //Assert
            Assert.Equal(userEntity.Id, mappedResult.Id);
            Assert.Equal(userEntity.UserName, mappedResult.UserName);
            Assert.Equal(userEntity.UserPosition.ToString(), mappedResult.UserPosition.ToString());
            Assert.Equal(userEntity.UserRole.ToString(), mappedResult.UserRole.ToString());
            Assert.Equal(userEntity.AvatarLink, mappedResult.AvatarLink);
            Assert.Equal(userEntity.Email, mappedResult.Email);
            Assert.Equal(userEntity.IsActive, mappedResult.IsActive);
            Assert.Equal(userModel.CreationDate, mappedResult.CreationDate);
            
        }
    }
}