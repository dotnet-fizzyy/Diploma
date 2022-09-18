using System.Collections.Generic;
using System.Linq;
using WebAPI.ApplicationLogic.Mappers;
using WebAPI.Models.Complete;
using WebAPI.Models.Extensions;

using ProjectEntity = WebAPI.Core.Entities.Project;
using EpicEntity = WebAPI.Core.Entities.Epic;
using EpicModel = WebAPI.Models.Basic.Epic;
using TeamEntity = WebAPI.Core.Entities.Team;
using TeamModel = WebAPI.Models.Basic.Team;

namespace WebAPI.ApplicationLogic.Aggregators
{
    public static class ProjectAggregator
    {
        public static ProjectComplete AggregateFullProjectDescription(
            ProjectEntity project,
            IEnumerable<EpicEntity> epics,
            IEnumerable<TeamEntity> teams)
        {
            var projectComplete = new ProjectComplete();

            if (project == null)
            {
                return projectComplete;
            }
            
            projectComplete.Project = ProjectMapper.Map(project);

            projectComplete.Epics = new CollectionResponse<EpicModel>
            {
                Items = epics?.Select(EpicMapper.Map).ToList() ?? new List<EpicModel>()
            };
            projectComplete.Teams = new CollectionResponse<TeamModel>
            {
                Items = teams?.Select(TeamMapper.Map).ToList() ?? new List<TeamModel>()
            };
            
            return projectComplete;
        }
    }
}