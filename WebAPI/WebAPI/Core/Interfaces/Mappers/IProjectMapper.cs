namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IProjectMapper
    {
        WebAPI.Core.Entities.Project MapToEntity(WebAPI.Models.Models.Project project);
        
        WebAPI.Models.Models.Project MapToModel(WebAPI.Core.Entities.Project project);
        
        WebAPI.Models.Result.FullProject MapToFullModel(WebAPI.Core.Entities.Project project);
    }
}