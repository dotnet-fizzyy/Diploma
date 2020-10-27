using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class RefreshTokenMapper : IRefreshTokenMapper
    {
        public RefreshToken MapToEntity(Models.Models.RefreshToken refreshToken)
        {
            var entityRefreshToken = new RefreshToken
            {
                RefreshTokenId = refreshToken.RefreshTokenId,
                Value = refreshToken.Value,
                IsActive = refreshToken.IsActive,
            };

            return entityRefreshToken;
        }

        public Models.Models.RefreshToken MapToModel(RefreshToken refreshToken)
        {
            var modelRefreshToken = new Models.Models.RefreshToken
            {
                RefreshTokenId = refreshToken.RefreshTokenId,
                Value = refreshToken.Value,
                IsActive = refreshToken.IsActive,
            };

            return modelRefreshToken;
        }
    }
}