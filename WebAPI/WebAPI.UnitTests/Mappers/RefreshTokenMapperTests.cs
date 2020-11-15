using System;
using WebAPI.Core.Entities;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class RefreshTokenMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange
            RefreshToken refreshTokenEntity = null;

            //Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToModel(refreshTokenEntity);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            Models.Models.RefreshToken refreshTokenModel = null;

            //Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToEntity(refreshTokenModel);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var userId = new Guid();
            var refreshTokenId = new Guid();
            
            var refreshTokenEntity = new RefreshToken
            {
                RefreshTokenId = refreshTokenId,
                UserId = userId,
                Value = "RefreshToken",
                IsActive = true,
            };

            var refreshTokenModel = new Models.Models.RefreshToken
            {
                RefreshTokenId = refreshTokenId,
                UserId = userId,
                Value = "RefreshToken",
                IsActive = true,
            };
            
            //Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToModel(refreshTokenEntity);

            //Assert
            Assert.Equal(refreshTokenModel.RefreshTokenId, mappedResult.RefreshTokenId);
            Assert.Equal(refreshTokenModel.UserId, mappedResult.UserId);
            Assert.Equal(refreshTokenModel.Value, mappedResult.Value);
            Assert.Equal(refreshTokenModel.IsActive, mappedResult.IsActive);
        }

        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var userId = new Guid();
            var refreshTokenId = new Guid();
            
            var refreshTokenModel = new Models.Models.RefreshToken
            {
                RefreshTokenId = refreshTokenId,
                UserId = userId,
                Value = "RefreshTokenValue",
                IsActive = false,
            };
            
            var refreshTokenEntity = new RefreshToken
            {
                RefreshTokenId = refreshTokenId,
                UserId = userId,
                Value = "RefreshTokenValue",
                IsActive = false,
            };

            //Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToModel(refreshTokenEntity);

            //Assert
            Assert.Equal(refreshTokenModel.RefreshTokenId, mappedResult.RefreshTokenId);
            Assert.Equal(refreshTokenModel.UserId, mappedResult.UserId);
            Assert.Equal(refreshTokenModel.Value, mappedResult.Value);
            Assert.Equal(refreshTokenModel.IsActive, mappedResult.IsActive);
        }
    }
}