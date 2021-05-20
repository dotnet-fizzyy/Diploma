using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IUserMapper
    {
        Entities.User MapToEntity(User user);
        
        User MapToModel(Entities.User user);
        
        Entities.User MapToEntity(SignUpUser user);
        
        Entities.User MapToEntity(SignInUser user);
        
        FullUser MapToFullModel(Entities.User user, IEnumerable<Entities.Project> projects, IEnumerable<Entities.Team> teams);

        UserSimpleModel MapToSimpleModel(Entities.User userEntity);
    }
}