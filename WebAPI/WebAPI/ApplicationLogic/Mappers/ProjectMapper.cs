using ProjectEntity = WebAPI.Core.Entities.Project;
using ProjectModel = WebAPI.Models.Basic.Project;
using ProjectLightModel = WebAPI.Models.Light.ProjectLightModel;

namespace WebAPI.ApplicationLogic.Mappers
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

        public static ProjectLightModel MapToSimpleModel(ProjectEntity project)
        {
            if (project == null)
            {
                return new ProjectLightModel();
            }

            var simpleModel = new ProjectLightModel
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