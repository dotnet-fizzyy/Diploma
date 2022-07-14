using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Presentation.Mappers;

namespace WebAPI.Presentation.Aggregators
{
    public class FullProjectDescriptionAggregator : IFullProjectDescriptionAggregator
    {
        private readonly IProjectMapper _projectMapper;
        private readonly IEpicMapper _epicMapper;

        public FullProjectDescriptionAggregator(IProjectMapper projectMapper, IEpicMapper epicMapper)
        {
            _projectMapper = projectMapper;
            _epicMapper = epicMapper;
        }
        
        public FullProjectDescription AggregateFullProjectDescription(
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
            
            fullProjectDescription.Project = _projectMapper.MapToModel(project);
            fullProjectDescription.Epic = _epicMapper.MapToModel(epic);

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