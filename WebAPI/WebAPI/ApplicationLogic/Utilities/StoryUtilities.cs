using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Constants;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.ApplicationLogic.Utilities
{
    public static class StoryUtilities
    {
        public static List<Story> SortStoriesByCriteria(IEnumerable<Story> stories, string sortType, SortDirection sortDirection)
        {
            List<Story> sortedStories;

            if (sortDirection == SortDirection.Asc)
            {
                sortedStories = sortType switch
                {
                    SortTypes.Title => stories.OrderBy(story => story.Title).ToList(),
                    SortTypes.Priority => stories.OrderBy(story => story.StoryPriority).ToList(),
                    SortTypes.CreationDate => stories.OrderBy(story => story.CreationDate).ToList(),
                    SortTypes.Estimate => stories.OrderBy(story => story.Estimate).ToList(),
                    _ => stories.ToList()
                };
            }
            else
            {
                sortedStories = sortType switch
                {
                    SortTypes.Title => stories.OrderByDescending(story => story.Title).ToList(),
                    SortTypes.Priority => stories.OrderByDescending(story => story.StoryPriority).ToList(),
                    SortTypes.CreationDate => stories.OrderByDescending(story => story.CreationDate).ToList(),
                    SortTypes.Estimate => stories.OrderByDescending(story => story.Estimate).ToList(),
                    _ => stories.ToList()
                };
            }

            return sortedStories;
        }
    }
}