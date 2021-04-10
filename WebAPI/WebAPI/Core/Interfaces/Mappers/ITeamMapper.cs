using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface ITeamMapper
    {
        Entities.Team MapToEntity(WebAPI.Models.Models.Team team);
        
        WebAPI.Models.Models.Team MapToModel(Entities.Team team);
        
        WebAPI.Models.Result.FullTeam MapToFullModel(Entities.Team team);

        TeamSimpleModel MapToSimpleModel(Entities.Team team);
    }
}