using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IBaseCrudRepository<T> where T : class
    {
        Task<T> CreateAsync(T item);

        Task<List<T>> CreateAsync(IEnumerable<T> items);

        Task<bool> ExistsAsync(Expression<Func<T, bool>> expression);

        Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression);

        Task<int> CountAsync(Expression<Func<T, bool>> expression);
        
        Task<List<T>> SearchForMultipleItemsAsync<K>(
            Expression<Func<T, bool>> expression, 
            Expression<Func<T, K>> sort, 
            OrderType orderType
            );
        
        Task<List<T>> SearchForMultipleItemsAsync<K>(
            Expression<Func<T, bool>> expression, 
            int offset, 
            int limit,
            Expression<Func<T, K>> sort, 
            OrderType orderType
            );

        Task<T> SearchForSingleItemAsync(
            Expression<Func<T, bool>> expression, 
            params Expression<Func<T, object>>[] includes
            );

        Task<T> UpdateItemAsync(T item);

        Task<List<T>> UpdateItemsAsync(IEnumerable<T> items);

        Task DeleteAsync(Expression<Func<T, bool>> expression);
    }
}