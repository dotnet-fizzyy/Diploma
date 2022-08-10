using System;

namespace WebAPI.Presentation.Models.Request
{
    public class AssignUserToTeamRequestModel
    {
        public Guid TeamId { get; set; }
        
        public Guid UserId { get; set; }
    }
}