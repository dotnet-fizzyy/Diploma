using WebAPI.Models.Models.Models;

namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IRefreshTokenMapper
    {
        WebAPI.Core.Entities.RefreshToken MapToEntity(RefreshToken refreshToken);
        
        RefreshToken MapToModel(WebAPI.Core.Entities.RefreshToken refreshToken);
    }
}