namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IUserMapper
    {
        Entities.User MapToEntity(WebAPI.Models.Models.User user);
        
        WebAPI.Models.Models.User MapToModel(Entities.User user);
        
        Entities.User MapToEntity(WebAPI.Models.Models.Authentication.SignUpUser user);
        
        Entities.User MapToEntity(WebAPI.Models.Models.Authentication.SignInUser user);
        
        WebAPI.Models.Result.FullUser MapToFullModel(Entities.User user, Entities.Project project, Entities.Team team);
    }
}