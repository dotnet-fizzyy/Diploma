using System;
using WebAPI.Core.Entities;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Mappers
{
    public class WorkSpaceMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange & Act
            var epicMapper = new WorkSpaceMapper();
            var mappedResult = epicMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var epicMapper = new WorkSpaceMapper();
            var mappedResult = epicMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapModelToEntity()
        {
            var workSpaceId = new Guid();
            
            //Arrange
            var epicModel = new Models.Models.WorkSpace
            {
                WorkSpaceId = workSpaceId,
                WorkSpaceName = "Name",
                WorkSpaceDescription = string.Empty,
                CreationDate = new DateTime(2021, 3, 1),
            };

            var epicEntity = new WorkSpace
            {
                Id = workSpaceId,
                WorkSpaceName = "Name",
                WorkSpaceDescription = string.Empty,
                CreationDate = new DateTime(2021, 3, 1),
            };
            
            //Act
            var epicMapper = new WorkSpaceMapper();
            var mappedResult = epicMapper.MapToEntity(epicModel);

            //Assert
            Assert.NotNull(mappedResult);
            Assert.Equal(epicEntity.Id, mappedResult.Id);
            Assert.Equal(epicEntity.WorkSpaceName, mappedResult.WorkSpaceName);
            Assert.Equal(epicEntity.WorkSpaceDescription, mappedResult.WorkSpaceDescription);
            Assert.Equal(epicEntity.CreationDate, mappedResult.CreationDate);
        }
        
        [Fact]
        public void ShouldMapToEntityToModel()
        {
            var workSpaceId = new Guid();
            
            //Arrange
            var epicModel = new Models.Models.WorkSpace
            {
                WorkSpaceId = workSpaceId,
                WorkSpaceName = "Name",
                WorkSpaceDescription = string.Empty,
                CreationDate = new DateTime(2021, 3, 1),
            };

            var epicEntity = new WorkSpace
            {
                Id = workSpaceId,
                WorkSpaceName = "Name",
                WorkSpaceDescription = string.Empty,
                CreationDate = new DateTime(2021, 3, 1),
            };
            
            //Act
            var epicMapper = new WorkSpaceMapper();
            var mappedResult = epicMapper.MapToModel(epicEntity);

            //Assert
            Assert.NotNull(mappedResult);
            Assert.Equal(epicModel.WorkSpaceId, mappedResult.WorkSpaceId);
            Assert.Equal(epicModel.WorkSpaceName, mappedResult.WorkSpaceName);
            Assert.Equal(epicModel.WorkSpaceDescription, mappedResult.WorkSpaceDescription);
            Assert.Equal(epicModel.CreationDate, mappedResult.CreationDate);
        }
    }
}