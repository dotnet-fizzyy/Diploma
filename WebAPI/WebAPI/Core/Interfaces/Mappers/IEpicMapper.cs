using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IEpicMapper
    {
        WebAPI.Core.Entities.Epic MapToEntity(Epic epic);
        
        Epic MapToModel(WebAPI.Core.Entities.Epic epicEntity);
        
        FullEpic MapToFullModel(WebAPI.Core.Entities.Epic epicEntity);

        EpicSimpleModel MapToSimpleModel(Entities.Epic epicEntity);
    }
}