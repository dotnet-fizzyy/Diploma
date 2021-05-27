using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Core.Constants;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.ApplicationLogic.Handlers
{
    public static class StoryHandler
    {
        public static List<Story> SortStoriesByCriteria(IEnumerable<Story> stories, string sortType, OrderType orderType)
        {
            List<Story> sortedStories;
            if (orderType == OrderType.Asc)
            {
                sortedStories = sortType switch
                {
                    SortTypes.Title => stories.OrderBy(x => x.Title).ToList(),
                    SortTypes.Priority => stories.OrderBy(x => x.StoryPriority).ToList(),
                    SortTypes.CreationDate => stories.OrderBy(x => x.CreationDate).ToList(),
                    SortTypes.Estimate => stories.OrderBy(x => x.Estimate).ToList(),
                    _ => stories.ToList()
                };
            }
            else
            {
                sortedStories = sortType switch
                {
                    SortTypes.Title => stories.OrderByDescending(x => x.Title).ToList(),
                    SortTypes.Priority => stories.OrderByDescending(x => x.StoryPriority).ToList(),
                    SortTypes.CreationDate => stories.OrderByDescending(x => x.CreationDate).ToList(),
                    SortTypes.Estimate => stories.OrderByDescending(x => x.Estimate).ToList(),
                    _ => stories.ToList()
                };
            }

            return sortedStories;
        }
    }
}