using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface ITeamMapper
    {
        Entities.Team MapToEntity(Team team);
        
        Team MapToModel(Entities.Team team);
        
        FullTeam MapToFullModel(Entities.Team team);

        TeamSimpleModel MapToSimpleModel(Entities.Team team);
    }
}