using WebAPI.ApplicationLogic.Utilities;
using WebAPI.Core.Exceptions;
using Xunit;

namespace WebAPI.UnitTests.Utilities
{
    public class PasswordHashingTests
    {
        [Fact]
        public void ShouldCreateHashForPasswordWithSha512()
        {
            //Arrange
            const string password = "123";
            const string expectedHash = "3C9909AFEC25354D551DAE21590BB26E38D53F2173B8D3DC3EEE4C047E7AB1C1EB8B85103E3BE7BA613B31BB5C9C36214DC9F14A42FD7A2FDB84856BCA5C44C2";
            
            //Act
            var result = PasswordHashing.CreateHashPassword(password);

            //Assert
            Assert.Equal(expectedHash, result);
        }
        
        [Fact]
        public void ShouldThrowErrorForInvalidInitialPasswordOnPasswordHashing()
        {
            //Arrange
            var password = string.Empty;
            
            //Act && Assert
            Assert.Throws<UserFriendlyException>(() => PasswordHashing.CreateHashPassword(password));
        }
    }
}