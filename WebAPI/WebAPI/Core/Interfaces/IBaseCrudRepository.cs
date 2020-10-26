using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WebAPI.Core.Interfaces
{
    public interface IBaseCrudRepository<T> where T : class
    {
        Task<T> CreateAsync(T item);

        Task<List<T>> CreateAsync(IList<T> items);

        Task<bool> ExistsAsync(Expression<Func<T, bool>> expression);

        Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression);
        
        Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression, int offset, int limit);

        Task<T> SearchForSingleItemAsync(
            Expression<Func<T, bool>> expression, 
            params Expression<Func<T, object>>[] includes
            );

        Task<T> UpdateItemAsync(T item);

        Task DeleteAsync(Expression<Func<T, bool>> expression);
    }
}