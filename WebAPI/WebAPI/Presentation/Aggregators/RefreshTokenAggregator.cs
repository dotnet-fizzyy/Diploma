using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;

namespace WebAPI.Presentation.Aggregators
{
    public class RefreshTokenAggregator : IRefreshTokenAggregator
    {
        public RefreshToken GenerateRefreshTokenEntityOnSave(Guid userId, string token)
        {
            if (token == null)
            {
                return new RefreshToken();
            }
            
            return new RefreshToken
            {
                UserId = userId,
                Value = token
            };
        }
    }
}