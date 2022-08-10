using System.Collections.Generic;
using System.Linq;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.Core.Entities;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

namespace WebAPI.ApplicationLogic.Aggregators
{
    public static class ProjectAggregator
    {
        public static ProjectComplete AggregateFullProjectDescription(
            Project project,
            Epic epic,
            IEnumerable<Sprint> sprints,
            IEnumerable<Team> teams)
        {
            var projectComplete = new ProjectComplete();

            if (project == null || epic == null)
            {
                return projectComplete;
            }
            
            projectComplete.Project = ProjectMapper.Map(project);
            projectComplete.Epic = EpicMapper.Map(epic);

            projectComplete.Sprints = new CollectionResponse<SprintComplete>
            {
                Items = sprints?.Select(SprintMapper.MapToComplete).ToList() ?? new List<SprintComplete>()
            };

            projectComplete.Teams = new CollectionResponse<TeamComplete>
            {
                Items = teams?.Select(TeamMapper.MapToFullModel).ToList() ?? new List<TeamComplete>()
            };
            
            return projectComplete;
        }
    }
}