using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IProjectMapper
    {
        Entities.Project MapToEntity(Project project);
        
        Project MapToModel(Entities.Project project);
        
        FullProject MapToFullModel(Entities.Project project);

        ProjectSimpleModel MapToSimpleModel(Entities.Project project);
    }
}