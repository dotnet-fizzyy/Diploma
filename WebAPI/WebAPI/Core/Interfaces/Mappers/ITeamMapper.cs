using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface ITeamMapper
    {
        Entities.Team MapToEntity(Team team);
        
        Team MapToModel(Entities.Team teamEntity);
        
        FullTeam MapToFullModel(Entities.Team teamEntity);

        TeamSimpleModel MapToSimpleModel(Entities.Team team);
    }
}