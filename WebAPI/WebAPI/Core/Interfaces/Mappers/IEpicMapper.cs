using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IEpicMapper
    {
        WebAPI.Core.Entities.Epic MapToEntity(WebAPI.Models.Models.Epic epic);
        
        WebAPI.Models.Models.Epic MapToModel(WebAPI.Core.Entities.Epic epic);
        
        FullEpic MapToFullModel(WebAPI.Core.Entities.Epic epic);

        EpicSimpleModel MapToSimpleModel(Entities.Epic epic);
    }
}