using System.Collections.Generic;
using System.Linq;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.Core.Entities;
using WebAPI.Models.Extensions;
using WebAPI.Models.Models.Result;

namespace WebAPI.ApplicationLogic.Aggregators
{
    public static class FullProjectDescriptionAggregator
    {
        public static FullProjectDescription AggregateFullProjectDescription(
            Project project,
            Epic epic,
            IEnumerable<Sprint> sprints,
            IEnumerable<Team> teams)
        {
            var fullProjectDescription = new FullProjectDescription();

            if (project == null || epic == null)
            {
                return fullProjectDescription;
            }
            
            fullProjectDescription.Project = ProjectMapper.Map(project);
            fullProjectDescription.Epic = EpicMapper.Map(epic);

            fullProjectDescription.Sprints = new CollectionResponse<FullSprint>
            {
                Items = sprints?.Select(SprintMapper.MapToFullModel).ToList() ?? new List<FullSprint>()
            };

            fullProjectDescription.Teams = new CollectionResponse<FullTeam>
            {
                Items = teams?.Select(TeamMapper.MapToFullModel).ToList() ?? new List<FullTeam>()
            };
            
            return fullProjectDescription;
        }
    }
}