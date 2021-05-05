using System;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IRefreshTokenAggregator
    {
        RefreshToken GenerateRefreshTokenEntityOnSave(Guid userId, string token, double tokenLifeTime);
    }
}