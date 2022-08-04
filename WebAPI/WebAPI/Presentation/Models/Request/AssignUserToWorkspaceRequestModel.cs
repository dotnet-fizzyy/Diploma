using System;

namespace WebAPI.Presentation.Models.Request
{
    public class AssignUserToWorkspaceRequestModel
    {
        public Guid UserId { get; set; }
        
        public Guid WorkspaceId { get; set; }
    }
}