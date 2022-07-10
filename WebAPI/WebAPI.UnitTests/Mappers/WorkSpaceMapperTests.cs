using System;
using WebAPI.Presentation.Mappers;
using Xunit;

using WorkSpaceEntity = WebAPI.Core.Entities.WorkSpace;
using WorkSpaceModel = WebAPI.Models.Models.Models.WorkSpace;

namespace WebAPI.UnitTests.Mappers
{
    public class WorkSpaceMapperTests
    {
        [Fact]
        public void ShouldReturnEmptyModelOnNullEntity()
        {
            //Arrange & Act
            var mappedResult = WorkSpaceMapper.Map((WorkSpaceEntity)null);

            //Assert
            Assert.NotNull(mappedResult);
        }
        
        [Fact]
        public void ShouldReturnEmptyEntityOnNullModel()
        {
            //Arrange & Act
            var mappedResult = WorkSpaceMapper.Map((WorkSpaceModel)null);

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
            
            var epicModel = new WorkSpaceModel
            {
                WorkSpaceId = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };

            var epicEntity = new WorkSpaceEntity
            {
                Id = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };

            //Act
            var mappedResult = WorkSpaceMapper.Map(epicModel);

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
            var epicModel = new WorkSpaceModel
            {
                WorkSpaceId = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };

            var epicEntity = new WorkSpaceEntity
            {
                Id = workSpaceId,
                WorkSpaceName = workSpaceName,
                WorkSpaceDescription = workSpaceDescription,
                CreationDate = creationDate
            };
            
            //Act
            var mappedResult = WorkSpaceMapper.Map(epicEntity);

            //Assert
            Assert.NotNull(mappedResult);
            Assert.Equal(epicModel.WorkSpaceId, mappedResult.WorkSpaceId);
            Assert.Equal(epicModel.WorkSpaceName, mappedResult.WorkSpaceName);
            Assert.Equal(epicModel.WorkSpaceDescription, mappedResult.WorkSpaceDescription);
            Assert.Equal(epicModel.CreationDate.Date, mappedResult.CreationDate.Date);
        }
    }
}