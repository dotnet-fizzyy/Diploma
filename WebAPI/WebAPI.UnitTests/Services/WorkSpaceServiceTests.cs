using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using FakeItEasy;
using WebAPI.ApplicationLogic.Services;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Models.Models.Models;
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

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);

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
            var result = await workSpaceService.GetByIdAsync(id);

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

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => workSpaceRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.WorkSpace, bool>>>._))
                .Returns((Core.Entities.WorkSpace)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await workSpaceService.GetByIdAsync(id));

            A.CallTo(() => workSpaceRepository.SearchForSingleItemAsync(A<Expression<Func<Core.Entities.WorkSpace, bool>>>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldGetUserWorkSpaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);

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
            var result = await workSpaceService.GetUsersWorkSpaceAsync(id);

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

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);

            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => workSpaceRepository.GetUserWorkSpaceAsync(A<Guid>._))
                .Returns((Core.Entities.WorkSpace)null);
            
            //Act && Assert
            await Assert.ThrowsAsync<UserFriendlyException>(async () => await workSpaceService.GetUsersWorkSpaceAsync(id));

            A.CallTo(() => workSpaceRepository.GetUserWorkSpaceAsync(A<Guid>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldCreateWorkSpaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);

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
            var result = await workSpaceService.CreateAsync(workSpaceModel);

            //Assert
            AssertWorkSpaceModelProperties(expectedWorkSpaceModel, result);
        }
        
        [Fact]
        public async Task ShouldCreateWorkSpaceAndUpdateCustomerAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);

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
            var result = await workSpaceService.CreateWithUserAsync(workSpaceModel, userId);

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

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);

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

            A.CallTo(() => workSpaceRepository.UpdateItem(A<Core.Entities.WorkSpace>._))
                .Returns(entity);
            
            //Act
            var result = await workSpaceService.UpdateAsync(workSpaceModel);

            //Assert
            AssertWorkSpaceModelProperties(expectedWorkSpaceModel, result);

            A.CallTo(() => workSpaceRepository.UpdateItem(A<Core.Entities.WorkSpace>._))
                .MustHaveHappenedOnceExactly();
        }
        
        [Fact]
        public async Task ShouldRemoveWorkspaceAsync()
        {
            //Arrange
            var workSpaceRepository = A.Fake<IWorkSpaceRepository>();
            var userRepository = A.Fake<IUserRepository>();

            var workSpaceService = new WorkSpaceService(workSpaceRepository, userRepository);
            
            var id = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");

            A.CallTo(() => workSpaceRepository.Remove(A<Expression<Func<WebAPI.Core.Entities.WorkSpace,bool>>>._))
                .DoesNothing();

            //Act
            await workSpaceService.RemoveAsync(id);

            //Assert
            A.CallTo(() => workSpaceRepository.Remove(A<Expression<Func<WebAPI.Core.Entities.WorkSpace, bool>>>._))
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