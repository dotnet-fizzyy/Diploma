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
            //Arrange
            var epicMapper = new WorkSpaceMapper();
            
            //Act
            var mappedResult = epicMapper.MapToModel(null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange
            var epicMapper = new WorkSpaceMapper();
            
            //Act
            var mappedResult = epicMapper.MapToEntity(null);

            //Assert
            Assert.NotNull(mappedResult);
        }

        [Fact]
        public void ShouldMapModelToEntity()
        {
            //Arrange
            var workSpaceId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string workSpaceName = "WorkSpaceName";
            const string workSpaceDescription = "WorkSpaceDescription";
            var creationDate = DateTime.UtcNow;
            
            var epicModel = new Models.Models.Models.WorkSpace
            {
                WorkSpaceId = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };

            var epicEntity = new WorkSpace
            {
                Id = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };
            
            var epicMapper = new WorkSpaceMapper();
            
            //Act
            var mappedResult = epicMapper.MapToEntity(epicModel);

            //Assert
            Assert.NotNull(mappedResult);
            Assert.Equal(epicEntity.Id, mappedResult.Id);
            Assert.Equal(epicEntity.WorkSpaceName, mappedResult.WorkSpaceName);
            Assert.Equal(epicEntity.WorkSpaceDescription, mappedResult.WorkSpaceDescription);
            Assert.Equal(epicEntity.CreationDate.Date, mappedResult.CreationDate.Date);
        }
        
        [Fact]
        public void ShouldMapToEntityToModel()
        {
            var workSpaceId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string workSpaceName = "WorkSpaceName";
            const string workSpaceDescription = "WorkSpaceDescription";
            var creationDate = DateTime.UtcNow;
            
            //Arrange
            var epicModel = new Models.Models.Models.WorkSpace
            {
                WorkSpaceId = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };

            var epicEntity = new WorkSpace
            {
                Id = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };
            
            //Act
            var epicMapper = new WorkSpaceMapper();
            var mappedResult = epicMapper.MapToModel(epicEntity);

            //Assert
            Assert.NotNull(mappedResult);
            Assert.Equal(epicModel.WorkSpaceId, mappedResult.WorkSpaceId);
            Assert.Equal(epicModel.WorkSpaceName, mappedResult.WorkSpaceName);
            Assert.Equal(epicModel.WorkSpaceDescription, mappedResult.WorkSpaceDescription);
            Assert.Equal(epicModel.CreationDate.Date, mappedResult.CreationDate.Date);
        }
    }
}