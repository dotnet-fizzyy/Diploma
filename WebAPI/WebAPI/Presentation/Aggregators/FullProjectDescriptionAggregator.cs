using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;

namespace WebAPI.Presentation.Aggregators
{
    public class FullProjectDescriptionAggregator : IFullProjectDescriptionAggregator
    {
        private readonly IProjectMapper _projectMapper;
        private readonly IEpicMapper _epicMapper;
        private readonly ISprintMapper _sprintMapper;
        private readonly ITeamMapper _teamMapper;

        public FullProjectDescriptionAggregator(
            IProjectMapper projectMapper, 
            IEpicMapper epicMapper,
            ISprintMapper sprintMapper, 
            ITeamMapper teamMapper
            )
        {
            _projectMapper = projectMapper;
            _teamMapper = teamMapper;
            _epicMapper = epicMapper;
            _sprintMapper = sprintMapper;
        }
        
        public FullProjectDescription AggregateFullProjectDescription(Project project, Epic epic, IEnumerable<Sprint> sprints,
            IEnumerable<Team> teams)
        {
            var fullProjectDescription = new FullProjectDescription();

            fullProjectDescription.Project = _projectMapper.MapToModel(project);
            fullProjectDescription.Epic = _epicMapper.MapToModel(epic);
            
            fullProjectDescription.Sprints = new CollectionResponse<FullSprint>
            {
                Items = sprints.Select(_sprintMapper.MapToFullModel).ToList()
            };

            fullProjectDescription.Teams = new CollectionResponse<FullTeam>
            {
                Items = teams.Select(_teamMapper.MapToFullModel).ToList()
            };
            
            return fullProjectDescription;
        }
    }
}