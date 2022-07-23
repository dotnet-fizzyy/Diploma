using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IBaseCrudRepository<T> 
        where T : BaseEntity
    {
        Task CreateAsync(T item);

        Task CreateAsync(IEnumerable<T> items);

        Task<bool> ExistsAsync(Expression<Func<T, bool>> expression);

        Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression);

        Task<int> CountAsync();

        Task<int> CountAsync(Expression<Func<T, bool>> expression);
        
        Task<List<T>> SearchForMultipleItemsAsync<K>(
            Expression<Func<T, bool>> expression, 
            Expression<Func<T, K>> sort, 
            OrderType orderType);
        
        Task<List<T>> SearchForMultipleItemsAsync<K>(
            Expression<Func<T, bool>> expression, 
            int offset, 
            int limit,
            Expression<Func<T, K>> sort, 
            OrderType orderType);

        Task<T> SearchForItemById(Guid id, params Expression<Func<T, object>>[] includes);

        Task<T> SearchForSingleItemAsync(
            Expression<Func<T, bool>> expression, 
            params Expression<Func<T, object>>[] includes);

        void UpdateItem(T item);
        
        void UpdateItem(T item, params Expression<Func<T, object>>[] modifiedProperties);

        void UpdateItems(IEnumerable<T> items);
        
        void Remove(Expression<Func<T, bool>> expression);
    }
}