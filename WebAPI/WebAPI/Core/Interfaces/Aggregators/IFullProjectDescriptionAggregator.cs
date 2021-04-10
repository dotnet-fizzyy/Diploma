using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Models.Models.Result;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IFullProjectDescriptionAggregator
    {
        FullProjectDescription AggregateFullProjectDescription(Project project, Epic epic, IEnumerable<Sprint> sprints, IEnumerable<Team> teams);
    }
}