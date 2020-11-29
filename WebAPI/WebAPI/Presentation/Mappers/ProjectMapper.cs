using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Result;

namespace WebAPI.Presentation.Mappers
{
    public class ProjectMapper : IProjectMapper
    {
        private readonly ITeamMapper _teamMapper;
        private readonly IEpicMapper _epicMapper;
        
        public ProjectMapper(ITeamMapper teamMapper, IEpicMapper epicMapper)
        {
            _teamMapper = teamMapper;
            _epicMapper = epicMapper;
        }
        
        public Project MapToEntity(Models.Models.Project project)
        {
            if (project == null)
            {
                return new Project();
            }
            
            var projectEntity = new Project
            {
                ProjectId = project.ProjectId,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Customer = project.Customer,
            };

            return projectEntity;
        }

        public Models.Models.Project MapToModel(Project project)
        {
            if (project == null)
            {
                return new Models.Models.Project();
            }
            
            var projectModel = new Models.Models.Project
            {
                ProjectId = project.ProjectId,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Customer = project.Customer,
            };

            return projectModel;
        }

        public FullProject MapToFullModel(Project project)
        {
            if (project == null)
            {
                return new FullProject();
            }
            
            var projectFullModel = new FullProject
            {
                ProjectId = project.ProjectId,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Customer = project.Customer,
                Teams = project.Teams.Select(_teamMapper.MapToModel).ToList(),
                Epics = project.Epics.Select(_epicMapper.MapToModel).ToList(),
            };

            return projectFullModel;
        }
    }
}