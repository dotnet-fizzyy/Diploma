using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Pages;

namespace WebAPI.Presentation.Aggregators
{
    public class WorkSpaceAggregator : IWorkSpaceAggregator
    {
        private readonly IWorkSpaceMapper _workSpaceMapper;
        private readonly ITeamMapper _teamMapper;

        public WorkSpaceAggregator(IWorkSpaceMapper workSpaceMapper, ITeamMapper teamMapper)
        {
            _workSpaceMapper = workSpaceMapper;
            _teamMapper = teamMapper;
        }

        public WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects)
        {
            var workSpacePage = new WorkSpacePage
            {
                WorkSpace = _workSpaceMapper.MapToModel(workSpace),
                Projects = projects.Select(project => new WorkSpacePageProject
                {
                    ProjectId = project.Id,
                    ProjectName = project.ProjectName,
                    Teams = project.Teams.Select(_teamMapper.MapToSimpleModel).ToList(),
                }).ToList(),
            };

            return workSpacePage;
        }
    }
}