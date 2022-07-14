using ProjectEntity = WebAPI.Core.Entities.Project;
using ProjectModel = WebAPI.Models.Models.Models.Project;
using ProjectSimpleModel = WebAPI.Models.Models.Simple.ProjectSimpleModel;

namespace WebAPI.Presentation.Mappers
{
    public static class ProjectMapper
    {
        public static ProjectEntity Map(ProjectModel project)
        {
            if (project == null)
            {
                return new ProjectEntity();
            }
            
            var projectEntity = new ProjectEntity
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

        public static ProjectModel Map(ProjectEntity project)
        {
            if (project == null)
            {
                return new ProjectModel();
            }

            var projectModel = new ProjectModel();
            
            MapBase(projectModel, project);

            return projectModel;
        }

        public static ProjectSimpleModel MapToSimpleModel(ProjectEntity project)
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


        private static void MapBase(ProjectModel model, ProjectEntity entity)
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