namespace WebAPI.Core.Interfaces.Mappers
{
    public interface IRefreshTokenMapper
    {
        WebAPI.Core.Entities.RefreshToken MapToEntity(WebAPI.Models.Models.RefreshToken refreshToken);
        
        WebAPI.Models.Models.RefreshToken MapToModel(WebAPI.Core.Entities.RefreshToken refreshToken);
    }
}