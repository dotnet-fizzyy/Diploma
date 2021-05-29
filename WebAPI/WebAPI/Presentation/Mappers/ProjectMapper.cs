using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Mappers
{
    public class ProjectMapper : IProjectMapper
    {
        public Project MapToEntity(WebAPI.Models.Models.Models.Project project)
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
                IsDeleted = project.IsDeleted
            };

            return projectEntity;
        }

        public WebAPI.Models.Models.Models.Project MapToModel(Project project)
        {
            if (project == null)
            {
                return new WebAPI.Models.Models.Models.Project();
            }

            var projectModel = new WebAPI.Models.Models.Models.Project();
            
            MapBaseEntityToModel(projectModel, project);

            return projectModel;
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
                StartDate = project.StartDate,
                EndDate = project.EndDate
            };

            return simpleModel;
        }


        private static void MapBaseEntityToModel(WebAPI.Models.Models.Models.Project model, Project entity)
        {
            model.ProjectId = entity.Id;
            model.ProjectDescription = entity.ProjectDescription;
            model.ProjectName = entity.ProjectName;
            model.StartDate = entity.StartDate;
            model.EndDate = entity.EndDate;
            model.WorkSpaceId = entity.WorkSpaceId;
            model.CreationDate = entity.CreationDate;
            model.IsDeleted = entity.IsDeleted;
        }
    }
}