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
                Id = refreshToken.RefreshTokenId,
                UserId = refreshToken.UserId,
                Value = refreshToken.Value
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
                RefreshTokenId = refreshToken.Id,
                UserId = refreshToken.UserId,
                Value = refreshToken.Value
            };

            return modelRefreshToken;
        }
        
        public RefreshToken MapToEntityOnSave(Models.Models.RefreshToken refreshToken)
        {
            if (refreshToken == null)
            {
                return new RefreshToken();
            }
            
            var entityRefreshToken = new RefreshToken
            {
                Id = refreshToken.RefreshTokenId,
                UserId = refreshToken.UserId,
                Value = refreshToken.Value
            };

            return entityRefreshToken;
        }
    }
}