using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Pages;
using WebAPI.Models.Models.Result;

namespace WebAPI.Presentation.Aggregators
{
    public class PageAggregator : IPageAggregator
    {
        private readonly IWorkSpaceMapper _workSpaceMapper;
        private readonly ITeamMapper _teamMapper;
        private readonly IProjectMapper _projectMapper;
        private readonly IEpicMapper _epicMapper;

        public PageAggregator(
            IWorkSpaceMapper workSpaceMapper, 
            ITeamMapper teamMapper, 
            IProjectMapper projectMapper, 
            IEpicMapper epicMapper
            )
        {
            _workSpaceMapper = workSpaceMapper;
            _teamMapper = teamMapper;
            _projectMapper = projectMapper;
            _epicMapper = epicMapper;
        }

        public FullTeam CreateFullTeamModel(Team team)
        {
            var fullTeam = _teamMapper.MapToFullModel(team);

            return fullTeam;
        }

        public ProjectPage CreateProjectPageModel(Project project)
        {
            var projectPage = new ProjectPage
            {
                Project = _projectMapper.MapToModel(project),
                Team = project.Teams.Select(_teamMapper.MapToSimpleModel).ToList(),
                Epics =  project.Epics.Select(_epicMapper.MapToModel).ToList()
            };

            return projectPage;
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