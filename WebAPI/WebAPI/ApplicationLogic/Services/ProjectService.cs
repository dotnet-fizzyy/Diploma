using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Aggregators;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.ApplicationLogic.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IEpicRepository _epicRepository;
        private readonly ITeamRepository _teamRepository;
        private readonly ISprintRepository _sprintRepository;
        private readonly IProjectMapper _projectMapper;
        private readonly IFullProjectDescriptionAggregator _fullProjectDescriptionAggregator;

        public ProjectService(
            IProjectMapper projectMapper, 
            ITeamRepository teamRepository, 
            IEpicRepository epicRepository, 
            ISprintRepository sprintRepository,
            IProjectRepository projectRepository,
            IFullProjectDescriptionAggregator fullProjectDescriptionAggregator
            )
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _epicRepository = epicRepository;
            _sprintRepository = sprintRepository;
            _projectMapper = projectMapper;
            _fullProjectDescriptionAggregator = fullProjectDescriptionAggregator;
        }
        
        public async Task<CollectionResponse<Project>> GetAllProjects()
        {
            var projectEntities = await _projectRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Project>
            {
                Items = projectEntities.Select(_projectMapper.MapToModel).ToList()
            };
            
            return collectionResponse;
        }

        public async Task<Project> GetProject(Guid projectId)
        {
            var projectEntity = await _projectRepository.SearchForSingleItemAsync(
                x => x.ProjectId == projectId
            );

            if (projectEntity == null)
            {
                return null;
            }

            var projectModel = _projectMapper.MapToModel(projectEntity);

            return projectModel;
        }

        public async Task<FullProjectDescription> GetFullProjectDescription(Guid projectId)
        {
            //Receive project description
            var projectEntity = await _projectRepository.SearchForSingleItemAsync(
                x => x.ProjectId == projectId
            );

            if (projectEntity == null)
            {
                return null;
            }

            //Receive latest and actual epic for project
            var projectEpicEntity =
                (await _epicRepository.SearchForMultipleItemsAsync(
                    x => x.ProjectId == projectId,
                    x => x.StartDate, OrderType.Desc)
                ).FirstOrDefault();

            if (projectEpicEntity == null)
            {
                return new FullProjectDescription
                {
                    Project = _projectMapper.MapToModel(projectEntity)
                };
            }
            
            //Receive sprints for teams
            var epicSprints =
                await _sprintRepository.SearchForMultipleItemsAsync(
                    x => x.EpicId == projectEpicEntity.EpicId,
                    x => x.StartDate,
                    OrderType.Desc
                    );
            
            //Receive teams working on it
            var projectTeams = 
                await _teamRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectId);

            var fullProjectDescription = _fullProjectDescriptionAggregator.AggregateFullProjectDescription(
                projectEntity,
                projectEpicEntity,
                epicSprints,
                projectTeams
                );
            
            return fullProjectDescription;
        }

        public async Task<FullProject> GetFullProject(Guid projectId)
        {
            var projectEntity = await _projectRepository.SearchForSingleItemAsync(
                x => x.ProjectId == projectId,
                x => x.Teams
            );

            if (projectEntity == null)
            {
                return null;
            }

            var projectModel = _projectMapper.MapToFullModel(projectEntity);

            return projectModel;
        }

        public async Task<Project> AddProject(Project project)
        {
            var projectEntity = _projectMapper.MapToEntity(project);

            var createdProject = await _projectRepository.CreateAsync(projectEntity);

            var createdProjectModel = _projectMapper.MapToModel(createdProject);

            return createdProjectModel;
        }

        public async Task<Project> UpdateProject(Project project)
        {
            var projectEntity = _projectMapper.MapToEntity(project);

            var updatedProject = await _projectRepository.UpdateItemAsync(projectEntity);

            var updatedProjectModel = _projectMapper.MapToModel(updatedProject);

            return updatedProjectModel;
        }

        public async Task RemoveProject(Guid projectId)
        {
            using (var scope = new TransactionScope
                (
                    TransactionScopeOption.Required, 
                    new TransactionOptions
                    {
                        IsolationLevel = IsolationLevel.Serializable,
                    },
                    TransactionScopeAsyncFlowOption.Enabled
                )
            )
            {
                await _teamRepository.DeleteAsync(x => x.ProjectId == projectId);
                await _epicRepository.DeleteAsync(x => x.ProjectId == projectId);
                await _projectRepository.DeleteAsync(x => x.ProjectId == projectId);
                
                scope.Complete();
            }
        }
    }
}