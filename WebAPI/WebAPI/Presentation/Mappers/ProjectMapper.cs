using System.Linq;
using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Result;
using WebAPI.Models.Models.Simple;

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
        
        public Project MapToEntity(Models.Models.Models.Project project)
        {
            if (project == null)
            {
                return new Project();
            }
            
            var projectEntity = new Project
            {
                Id = project.ProjectId,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                WorkSpaceId = project.WorkSpaceId,
                CreationDate = project.CreationDate,
            };

            return projectEntity;
        }

        public Models.Models.Models.Project MapToModel(Project project)
        {
            if (project == null)
            {
                return new Models.Models.Models.Project();
            }
            
            var projectModel = new Models.Models.Models.Project
            {
                ProjectId = project.Id,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                WorkSpaceId = project.WorkSpaceId,
                CreationDate = project.CreationDate,
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
                ProjectId = project.Id,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                WorkSpaceId = project.WorkSpaceId,
                CreationDate = project.CreationDate,
                Teams = project.Teams.Select(_teamMapper.MapToModel).ToList(),
                Epics = project.Epics.Select(_epicMapper.MapToModel).ToList(),
            };

            return projectFullModel;
        }

        public ProjectSimpleModel MapToSimpleModel(Project project)
        {
            if (project == null)
            {
                return new ProjectSimpleModel();
            }

            var simpleModel = new ProjectSimpleModel
            {
                ProjectId = project.Id,
                ProjectName = project.ProjectName,
            };

            return simpleModel;
        }
    }
}