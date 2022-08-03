using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Models.Request;
using WebAPI.Presentation.Models.Response;

namespace WebAPI.Core.Interfaces.Services
{
    /// <summary>
    /// <see cref="User"/> business functionality.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Gets <see cref="FullUser"/> with related items by identifier.
        /// </summary>
        /// <param name="id">User identifier.</param>
        /// <returns><see cref="FullUser"/> model.</returns>
        Task<FullUser> GetFullDescriptionByIdAsync(Guid id);
     
        /// <summary>
        /// Gets <see cref="User"/> by identifier.
        /// </summary>
        /// <param name="id">User identifier.</param>
        /// <returns><see cref="User"/> model.</returns>
        Task<User> GetByIdAsync(Guid id);
        
        /// <summary>
        /// Authenticates user with provided email and password.
        /// </summary>
        /// <param name="signInUser"><see cref="SignInUserRequestModel"/> model.</param>
        /// <returns><see cref="AuthenticationUserResponseModel"/> model with tokens pair and user model.</returns>
        Task<AuthenticationUserResponseModel> AuthenticateUserAsync(SignInUserRequestModel signInUser);
        
        /// <summary>
        /// Creates user.
        /// </summary>
        /// <param name="user"><see cref="User"/> model.</param>
        /// <returns>Created <see cref="User"/> model.</returns>
        Task<User> CreateAsync(User user);

        // todo: remove in future.
        /// <summary>
        /// Creates user and assigns him to team.
        /// </summary>
        /// <param name="user"><see cref="User"/> user.</param>
        /// <param name="teamId">Team identifier.</param>
        /// <returns></returns>
        Task<User> CreateUserAndAssignToTeamAsync(User user, Guid teamId);

        /// <summary>
        /// Creates user with position of <b>Customer</b> and role <b>Customer</b>.
        /// </summary>
        /// <param name="userRequestModel"><see cref="SignUpUserRequestModel"/>.</param>
        /// <returns>Created <see cref="User"/> model.</returns>
        Task<User> RegisterUserAsync(SignUpUserRequestModel userRequestModel);

        /// <summary>
        /// Updates user.
        /// </summary>
        /// <param name="user"><see cref="User"/>.</param>
        /// <returns>Updated <see cref="User"/> model.</returns>
        Task<User> UpdateAsync(User user);

        /// <summary>
        /// Checks for user existence by email address.
        /// </summary>
        /// <param name="email">User email address.</param>
        /// <returns><see cref="EmailResponseModel"/> model.</returns>
        Task<EmailResponseModel> CheckEmailExistenceAsync(string email);
        
        /// <summary>
        /// Updates user password with a new one.
        /// </summary>
        /// <param name="userId">User identifier.</param>
        /// <param name="passwordUpdateRequestModel"><see cref="PasswordUpdateRequestModel"/> model.</param>
        /// <returns>Task representing successful asynchronous operation.</returns>
        Task UpdatePasswordAsync(Guid userId, PasswordUpdateRequestModel passwordUpdateRequestModel);
        
        /// <summary>
        /// Updates user avatar link (avatarLink).
        /// </summary>
        /// <param name="user"><see cref="User"/> model.</param>
        /// <returns>Task representing successful asynchronous operation.</returns>
        Task UpdateAvatarAsync(User user);
        
        /// <summary>
        /// Updates user activity status (isActive).
        /// </summary>
        /// <param name="user"><see cref="User"/> model.</param>
        /// <returns>Task representing successful asynchronous operation.</returns>
        Task ChangeActivityStatusAsync(User user);

        /// <summary>
        /// Removes user from DB.
        /// </summary>
        /// <param name="id">User identifier.</param>
        /// <returns>Task representing successful asynchronous operation.</returns>
        Task RemoveAsync(Guid id);
    }
}