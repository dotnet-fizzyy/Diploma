using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Models.Models;
using WebAPI.Presentation.Mappers;
using Xunit;

namespace WebAPI.UnitTests.Services
{
    public class WorkSpaceServiceTests
    {
        [Fact]
        public async Task ShouldGetWorkSpaceByIdAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string name = "Name";
            const string description = "Description";
            var creationDate = DateTime.UtcNow;
            
            var entity = new Core.Entities.WorkSpace
            {
                Id = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };
            
            var expectedWorkSpaceModel = new WorkSpace
            {
                WorkSpaceId = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };

            A.CallTo(() => workSpaceRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.WorkSpace, bool>>>._))
                .Returns(entity);
            
            //Act
            var result = await workSpaceService.GetWorkSpaceByIdAsync(id);

            //Assert
            AssertWorkSpaceModelProperties(expectedWorkSpaceModel, result);

            A.CallTo(() => workSpaceRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.WorkSpace, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetWorkSpaceByIdAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => workSpaceRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.WorkSpace, bool>>>._))
                .Returns((Core.Entities.WorkSpace)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await workSpaceService.GetWorkSpaceByIdAsync(id));

            A.CallTo(() => workSpaceRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.WorkSpace, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetUserWorkSpaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string name = "Name";
            const string description = "Description";
            var creationDate = DateTime.UtcNow;
            
            var entity = new Core.Entities.WorkSpace
            {
                Id = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };
            
            var expectedWorkSpaceModel = new WorkSpace
            {
                WorkSpaceId = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };

            A.CallTo(() => workSpaceRepository.GetUserWorkSpaceAsync(A<Guid>._))
                .Returns(entity);
            
            //Act
            var result = await workSpaceService.GetUserWorkSpaceAsync(id);

            //Assert
            AssertWorkSpaceModelProperties(expectedWorkSpaceModel, result);

            A.CallTo(() => workSpaceRepository.GetUserWorkSpaceAsync(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldThrowErrorForMissingEntityOnGetUserWorkSpaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => workSpaceRepository.GetUserWorkSpaceAsync(A<Guid>._))
                .Returns((Core.Entities.WorkSpace)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await workSpaceService.GetUserWorkSpaceAsync(id));

            A.CallTo(() => workSpaceRepository.GetUserWorkSpaceAsync(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldCreateWorkSpaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string name = "Name";
            const string description = "Description";
            var creationDate = DateTime.UtcNow;
            
            var workSpaceModel = new WorkSpace
            {
                WorkSpaceName = name,
                WorkSpaceDescription = description
            };

            var entity = new Core.Entities.WorkSpace
            {
                Id = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };
            
            var expectedWorkSpaceModel = new WorkSpace
            {
                WorkSpaceId = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };

            A.CallTo(() => workSpaceRepository.CreateAsync(A<Core.Entities.WorkSpace>._))
                .Returns(entity);
            
            //Act
            var result = await workSpaceService.CreateWorkSpaceAsync(workSpaceModel);

            //Assert
            AssertWorkSpaceModelProperties(expectedWorkSpaceModel, result);
        }
        
        [Fact]
        public async Task ShouldCreateWorkSpaceAndUpdateCustomerAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            var userId = new Guid("4443238f-87e6-4e86-93fc-ab79b8804444");
            const string name = "Name";
            const string description = "Description";
            var creationDate = DateTime.UtcNow;
            
            var workSpaceModel = new WorkSpace
            {
                WorkSpaceName = name,
                WorkSpaceDescription = description
            };

            var entity = new Core.Entities.WorkSpace
            {
                Id = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };
            
            var expectedWorkSpaceModel = new WorkSpace
            {
                WorkSpaceId = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };

            A.CallTo(() => workSpaceRepository.CreateAsync(A<Core.Entities.WorkSpace>._))
                .Returns(entity);

            A.CallTo(() => userRepository.UpdateUserWorkSpace(A<Core.Entities.User>._))
                .DoesNothing();
            
            //Act
            var result = await workSpaceService.CreateWorkSpaceWithUserAsync(workSpaceModel, userId);

            //Assert
            AssertWorkSpaceModelProperties(expectedWorkSpaceModel, result);

            A.CallTo(() => workSpaceRepository.CreateAsync(A<Core.Entities.WorkSpace>._))
                .MustHaveHappenedOnceExactly();
            A.CallTo(() => userRepository.UpdateUserWorkSpace(A<Core.Entities.User>._))
                .DoesNothing();
        }

        [Fact]
        public async Task ShouldUpdateWorkSpaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string name = "Name";
            const string description = "Description";
            var creationDate = DateTime.UtcNow;
            
            var workSpaceModel = new WorkSpace
            {
                WorkSpaceName = name,
                WorkSpaceDescription = description
            };

            var entity = new Core.Entities.WorkSpace
            {
                Id = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };
            
            var expectedWorkSpaceModel = new WorkSpace
            {
                WorkSpaceId = id,
                WorkSpaceName = name,
                WorkSpaceDescription = description,
                CreationDate = creationDate
            };

            A.CallTo(() => workSpaceRepository.UpdateItemAsync(A<Core.Entities.WorkSpace>._))
                .Returns(entity);
            
            //Act
            var result = await workSpaceService.UpdateWorkSpaceAsync(workSpaceModel);

            //Assert
            AssertWorkSpaceModelProperties(expectedWorkSpaceModel, result);

            A.CallTo(() => workSpaceRepository.UpdateItemAsync(A<Core.Entities.WorkSpace>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveWorkspaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();
            var workSpaceMapper = new WorkSpaceMapper();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, workSpaceMapper, userRepository);
            
            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => workSpaceRepository.DeleteAsync(A<Expression<Func<WebAPI.Core.Entities.WorkSpace,bool>>>._))
                .DoesNothing();

            //Act
            await workSpaceService.RemoveWorkSpaceAsync(id);

            //Assert
            A.CallTo(() => workSpaceRepository.DeleteAsync(A<Expression<Func<WebAPI.Core.Entities.WorkSpace, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        private static void AssertWorkSpaceModelProperties(WorkSpace expectedWorkSpaceModel, WorkSpace result)
        {
            Assert.Equal(expectedWorkSpaceModel.WorkSpaceId, result.WorkSpaceId);
            Assert.Equal(expectedWorkSpaceModel.WorkSpaceName, result.WorkSpaceName);
            Assert.Equal(expectedWorkSpaceModel.WorkSpaceDescription, result.WorkSpaceDescription);
            Assert.Equal(expectedWorkSpaceModel.CreationDate.Date, result.CreationDate.Date);
        }
    }
}