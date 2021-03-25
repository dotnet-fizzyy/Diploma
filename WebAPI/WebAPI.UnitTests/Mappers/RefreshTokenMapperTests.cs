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
            //Arrange & Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToEntity(null);

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
                Id = refreshTokenId,
                UserId = userId,
                Value = "RefreshToken"
            };

            var refreshTokenModel = new Models.Models.RefreshToken
            {
                RefreshTokenId = refreshTokenId,
                UserId = userId,
                Value = "RefreshToken"
            };
            
            //Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToModel(refreshTokenEntity);

            //Assert
            Assert.Equal(refreshTokenModel.RefreshTokenId, mappedResult.RefreshTokenId);
            Assert.Equal(refreshTokenModel.UserId, mappedResult.UserId);
            Assert.Equal(refreshTokenModel.Value, mappedResult.Value);
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
                Value = "RefreshTokenValue"
            };
            
            var refreshTokenEntity = new RefreshToken
            {
                Id = refreshTokenId,
                UserId = userId,
                Value = "RefreshTokenValue"
            };

            //Act
            var refreshTokenMapper = new RefreshTokenMapper();
            var mappedResult = refreshTokenMapper.MapToModel(refreshTokenEntity);

            //Assert
            Assert.Equal(refreshTokenModel.RefreshTokenId, mappedResult.RefreshTokenId);
            Assert.Equal(refreshTokenModel.UserId, mappedResult.UserId);
            Assert.Equal(refreshTokenModel.Value, mappedResult.Value);
        }
    }
}