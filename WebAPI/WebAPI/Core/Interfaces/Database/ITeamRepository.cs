using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Core.Entities;

namespace WebAPI.Core.Interfaces.Database
{
    public interface ITeamRepository : IBaseCrudRepository<Team>
    {
        Task<List<Team>> GetUserTeams(Guid userId);
    }
}