namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IUserMapper
    {
        WebAPI.Core.Entities.User MapToEntity(WebAPI.Models.Models.User user);
        
        WebAPI.Models.Models.User MapToModel(WebAPI.Core.Entities.User user);
    }
}