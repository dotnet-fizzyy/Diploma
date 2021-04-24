using System.Collections.Generic;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IUserMapper
    {
        Entities.User MapToEntity(WebAPI.Models.Models.User user);
        
        WebAPI.Models.Models.User MapToModel(Entities.User user);
        
        Entities.User MapToEntity(WebAPI.Models.Models.Authentication.SignUpUser user);
        
        Entities.User MapToEntity(WebAPI.Models.Models.Authentication.SignInUser user);
        
        FullUser MapToFullModel(Entities.User user, IEnumerable<Entities.Project> projects, IEnumerable<Entities.Team> teams);
    }
}