using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class RefreshTokenMapper : IRefreshTokenMapper
    {
        public RefreshToken MapToEntity(Models.Models.RefreshToken refreshToken)
        {
            if (refreshToken == null)
            {
                return new RefreshToken();
            }
            
            var entityRefreshToken = new RefreshToken
            {
                RefreshTokenId = refreshToken.RefreshTokenId,
                UserId = refreshToken.UserId,
                Value = refreshToken.Value,
                IsActive = refreshToken.IsActive,
            };

            return entityRefreshToken;
        }

        public Models.Models.RefreshToken MapToModel(RefreshToken refreshToken)
        {
            if (refreshToken == null)
            {
                return new Models.Models.RefreshToken();
            }
            
            var modelRefreshToken = new Models.Models.RefreshToken
            {
                RefreshTokenId = refreshToken.RefreshTokenId,
                UserId = refreshToken.UserId,
                Value = refreshToken.Value,
                IsActive = refreshToken.IsActive,
            };

            return modelRefreshToken;
        }
    }
}