using System;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;

namespace WebAPI.Presentation.Aggregators
{
    public class RefreshTokenAggregator : IRefreshTokenAggregator
    {
        public RefreshToken GenerateRefreshTokenEntityOnSave(Guid userId, string token, double tokenLifeTime) =>
            new RefreshToken
            {
                UserId = userId,
                Value = token,
                ExpirationDate = DateTime.UtcNow.Add(TimeSpan.FromMinutes(tokenLifeTime)),
                CreationDate = DateTime.UtcNow
            };
    }
}