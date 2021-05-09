using System;
using System.Collections.Generic;
using System.Security.Claims;
using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Exceptions;
using WebAPI.Core.Models;
using WebAPI.Models.Enums;
using Xunit;

namespace WebAPI.UnitTests.Utilities
{
    public class ClaimsReaderTests
    {
        [Fact]
        public void ShouldReadClaims()
        {
            //Arrange
            var userId = new Guid("b593238f-87e6-4e86-93fc-ab79b8804dec");
            const string userName = "UserName";
            const UserRole userRole = UserRole.Engineer;
            
            var user = new ClaimsPrincipal(new ClaimsIdentity(new []
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, userRole.ToString())
            }));

            var expectedClaims = new UserClaims(userId, userName, userRole);
            
            var claimsReader = new ClaimsReader();

            //Act
            var result = claimsReader.GetUserClaims(user);

            //Assert
            Assert.Equal(expectedClaims.UserId, result.UserId);
            Assert.Equal(expectedClaims.UserName, result.UserName);
            Assert.Equal(expectedClaims.UserRole, result.UserRole);
        }

        [Theory]
        [MemberData(nameof(ClaimsData))]
        public void ShouldThrowErrorOnOneOfMissingClaims(string userId, string userName, string userRole)
        {
            //Arrange
            var user = new ClaimsPrincipal(new ClaimsIdentity(new []
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, userRole)
            }));

            var claimsReader = new ClaimsReader();

            //Act && Assert
            Assert.Throws<UserFriendlyException>(() => claimsReader.GetUserClaims(user));
        }

        public static IEnumerable<object[]> ClaimsData
        {
            get
            {
                yield return new object[] {string.Empty, "UserName", UserRole.Engineer.ToString()};
                yield return new object[] {"b593238f-87e6-4e86-93fc-ab79b8804dec", string.Empty, UserRole.Engineer.ToString()};
                yield return new object[] {"b593238f-87e6-4e86-93fc-ab79b8804dec", "UserName", string.Empty};
            }
        }
    }
}