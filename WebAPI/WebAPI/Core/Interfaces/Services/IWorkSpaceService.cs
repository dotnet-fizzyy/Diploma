using System;
using System.Threading.Tasks;
using WebAPI.Models.Basic;

namespace WebAPI.Core.Interfaces.Services
{
    /// <summary>
    /// <see cref="WorkSpace"/> business functionality.
    /// </summary>
    public interface IWorkSpaceService
    {
        /// <summary>
        /// Gets <see cref="WorkSpace"/> by identifier.
        /// </summary>
        /// <param name="id">Workspace identifier.</param>
        /// <returns><see cref="WorkSpace"/> model.</returns>
        Task<WorkSpace> GetByIdAsync(Guid id);
        
        /// <summary>
        /// Gets <see cref="WorkSpace"/> that belong to user by user identifier.
        /// </summary>
        /// <param name="userId">User identifier.</param>
        /// <returns><see cref="WorkSpace"/> model.</returns>
        Task<WorkSpace> GetUsersWorkSpaceAsync(Guid userId);

        /// <summary>
        /// Creates workspace.
        /// </summary>
        /// <param name="workspace"><see cref="WorkSpace"/> model.</param>
        /// <returns>Created <see cref="WorkSpace"/> model.</returns>
        Task<WorkSpace> CreateAsync(WorkSpace workspace);

        /// <summary>
        /// Assigns user to workspace.
        /// </summary>
        /// <param name="workspaceId">Workspace identifier.</param>
        /// <param name="userId">User identifier.</param>
        /// <returns>Task representing successful asynchronous operation.</returns>
        Task AssignUserToWorkspace(Guid workspaceId, Guid userId);
        
        /// <summary>
        /// Updates workspace.
        /// </summary>
        /// <param name="workspace"><see cref="WorkSpace"/> model.</param>
        /// <returns>Updated <see cref="WorkSpace"/> model.</returns>
        Task<WorkSpace> UpdateAsync(WorkSpace workspace);
        
        /// <summary>
        /// Removes workspace from DB.
        /// </summary>
        /// <param name="id">Workspace identifier.</param>
        /// <returns>Task representing successful asynchronous operation.</returns>
        Task RemoveAsync(Guid id);
    }
}