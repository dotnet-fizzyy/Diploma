namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IEpicMapper
    {
        WebAPI.Core.Entities.Epic MapToEntity(WebAPI.Models.Models.Epic epic);
        
        WebAPI.Models.Models.Epic MapToModel(WebAPI.Core.Entities.Epic epic);
        
        WebAPI.Models.Result.FullEpic MapToFullModel(WebAPI.Core.Entities.Epic epic);
    }
}