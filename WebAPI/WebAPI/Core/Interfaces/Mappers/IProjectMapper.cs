using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IProjectMapper
    {
        Entities.Project MapToEntity(WebAPI.Models.Models.Project project);
        
        WebAPI.Models.Models.Project MapToModel(Entities.Project project);
        
        FullProject MapToFullModel(Entities.Project project);

        ProjectSimpleModel MapToSimpleModel(Entities.Project project);
    }
}