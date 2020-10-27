using WebAPI.Core.Entities;
using WebAPI.Core.Interfaces.Mappers;

namespace WebAPI.Presentation.Mappers
{
    public class ProjectMapper : IProjectMapper
    {
        public Project MapToEntity(Models.Models.Project project)
        {
            var projectEntity = new Project
            {
                ProjectId = project.ProjectId,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
            };

            return projectEntity;
        }

        public Models.Models.Project MapToModel(Project project)
        {
            var projectModel = new Models.Models.Project
            {
                ProjectId = project.ProjectId,
                ProjectDescription = project.ProjectDescription,
                ProjectName = project.ProjectName,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
            };

            return projectModel;
        }
    }
}