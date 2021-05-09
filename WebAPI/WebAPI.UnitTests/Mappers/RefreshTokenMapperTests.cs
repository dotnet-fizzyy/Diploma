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
            var refreshTokenMapper = new RefreshTokenMapper();
            
            //Act
            var mappedResult = refreshTokenMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var refreshTokenMapper = new RefreshTokenMapper();
            
            //Act
            var mappedResult = refreshTokenMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapEntityToModel()
        {
            //Arrange
            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var refreshTokenId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            const string refreshTokenValue = "RefreshToken";
            
            var refreshTokenEntity = new RefreshToken
            {
                Id = refreshTokenId,
                UserId = userId,
                Value = refreshTokenValue
            };

            var refreshTokenModel = new Models.Models.Models.RefreshToken
            {
                RefreshTokenId = refreshTokenId,
                UserId = userId,
                Value = refreshTokenValue
            };
            
            var refreshTokenMapper = new RefreshTokenMapper();
            
            //Act
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
            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var refreshTokenId = new Guid("3333238f-87e6-4e86-93fc-ab79b8804444");
            const string refreshTokenValue = "RefreshToken";
            
            var refreshTokenModel = new Models.Models.Models.RefreshToken
            {
                RefreshTokenId = refreshTokenId,
                UserId = userId,
                Value = refreshTokenValue
            };
            
            var refreshTokenEntity = new RefreshToken
            {
                Id = refreshTokenId,
                UserId = userId,
                Value = refreshTokenValue
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