using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Interfaces.Database
{
    public interface IBaseCrudRepository<T> where T : class
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

        Task<T> SearchForSingleItemAsync(
            Expression<Func<T, bool>> expression, 
            params Expression<Func<T, object>>[] includes);

        // todo: remove in future
        void UpdateItemField(T item, Expression<Func<T, object>> property);
        
        void UpdateItem(T item);
        
        void UpdateItem(T item, params Expression<Func<T, object>>[] nonModifiedProperties);

        void UpdateItems(IEnumerable<T> items);
        
        void Remove(Expression<Func<T, bool>> expression);
    }
}