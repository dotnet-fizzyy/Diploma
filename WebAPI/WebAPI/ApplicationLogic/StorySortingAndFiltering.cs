using System;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Core.Constants;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Database;
using WebAPI.Core.Interfaces.Mappers;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.ApplicationLogic
{
    public class StorySortingAndFiltering : IStorySortingAndFiltering
    {
        private readonly IStoryRepository _storyRepository;
        private readonly IStoryMapper _storyMapper;

        public StorySortingAndFiltering(IStoryRepository storyRepository, IStoryMapper storyMapper)
        {
            _storyRepository = storyRepository;
            _storyMapper = storyMapper;
        }

        public async Task<CollectionResponse<Story>> SortStoriesByCriteria(Guid epicId, string sortType,
            OrderType orderType)
        {
            var epicStories = await _storyRepository.GetStoriesByEpicId(epicId);

            if (epicStories.Count == 0)
            {
                return null;
            }
            
            if (orderType == OrderType.Asc)
            {
                epicStories = sortType switch
                {
                    SortTypes.Title => epicStories.OrderBy(x => x.Title).ToList(),
                    SortTypes.Priority => epicStories.OrderBy(x => x.StoryPriority).ToList(),
                    SortTypes.CreationDate => epicStories.OrderBy(x => x.CreationDate).ToList(),
                    SortTypes.Estimate => epicStories.OrderBy(x => x.Estimate).ToList(),
                    _ => epicStories
                };
            }
            else
            {
                epicStories = sortType switch
                {
                    SortTypes.Title => epicStories.OrderByDescending(x => x.Title).ToList(),
                    SortTypes.Priority => epicStories.OrderByDescending(x => x.StoryPriority).ToList(),
                    SortTypes.CreationDate => epicStories.OrderByDescending(x => x.CreationDate).ToList(),
                    SortTypes.Estimate => epicStories.OrderByDescending(x => x.Estimate).ToList(),
                    _ => epicStories
                };
            }

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = epicStories.Select(_storyMapper.MapToModel).ToList(),
            };

            return collectionResponse;
        }
    }
}