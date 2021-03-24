using System;
using System.Threading.Tasks;
using WebAPI.Core.Enums;
using WebAPI.Models.Models;
using WebAPI.Models.Result;

namespace WebAPI.Core.Interfaces.Handlers
{
    public interface IStorySortingAndFiltering
    {
        Task<CollectionResponse<Story>> SortStoriesByCriteria(Guid epicId, string sortType, OrderType orderType);
    }
}