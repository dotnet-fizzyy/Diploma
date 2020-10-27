namespace WebAPI.Core.Interfaces.Mappers
{
    public interface ITeamMapper
    {
        WebAPI.Core.Entities.Team MapToEntity(WebAPI.Models.Models.Team team);
        
        WebAPI.Models.Models.Team MapToModel(WebAPI.Core.Entities.Team team);
    }
}