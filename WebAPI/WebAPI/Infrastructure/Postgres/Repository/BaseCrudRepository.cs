using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public abstract class BaseCrudRepository<TContext, T> : IBaseCrudRepository<T> 
        where T : BaseEntity 
        where TContext : DbContext
    {
        protected readonly TContext DbContext;
 
        private readonly DbSet<T> _dbSet;

        protected BaseCrudRepository(TContext dbContext)
        {
            DbContext = dbContext;
            _dbSet = DbContext.Set<T>();
        }
        
        public async Task CreateAsync(T item)
        {
            await _dbSet.AddAsync(item);
        }

        public async Task CreateAsync(IEnumerable<T> items)
        {
            var entitiesList = items.ToList();

            await _dbSet.AddRangeAsync(entitiesList);
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> expression) => 
            await _dbSet.AnyAsync(expression);

        public async Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression)
        {
            var items = await _dbSet.Where(expression).AsNoTracking().ToListAsync();

            return items;
        }

        public async Task<List<T>> SearchForMultipleItemsAsync<K>(
            Expression<Func<T, bool>> expression,
            Expression<Func<T, K>> sort,
            OrderType orderType = OrderType.Asc)
        {
            List<T> items;

            if (orderType == OrderType.Asc)
            {
                items = await _dbSet.Where(expression).OrderBy(sort).AsNoTracking().ToListAsync();
            }
            else
            {
                items = await _dbSet.Where(expression).OrderByDescending(sort).AsNoTracking().ToListAsync();
            }

            return items;
        }
        
        public async Task<List<T>> SearchForMultipleItemsAsync<K>(
            Expression<Func<T, bool>> expression, 
            int offset, 
            int limit,
            Expression<Func<T, K>> sort, 
            OrderType orderType)
        {
            List<T> items;

            if (orderType == OrderType.Asc)
            {
                if (expression != null)
                {
                    items = await _dbSet
                        .Where(expression)
                        .Skip(offset)
                        .Take(limit)
                        .OrderBy(sort)
                        .AsNoTracking()
                        .ToListAsync();
                }
                else
                {
                    items = await _dbSet
                        .Skip(offset)
                        .Take(limit)
                        .OrderBy(sort)
                        .AsNoTracking()
                        .ToListAsync();
                }
            }
            else
            {
                if (expression != null)
                {
                    items = await _dbSet
                        .Where(expression)
                        .Skip(offset)
                        .Take(limit)
                        .OrderByDescending(sort)
                        .AsNoTracking()
                        .ToListAsync();
                }
                else
                {
                    items = await _dbSet
                        .Skip(offset)
                        .Take(limit)
                        .OrderByDescending(sort)
                        .AsNoTracking()
                        .ToListAsync();
                }
            }

            return items;
        }

        public async Task<T> SearchForItemById(Guid id, params Expression<Func<T, object>>[] includes) =>
            await SearchForSingleItemAsync(item => item.Id == id, includes);

        public async Task<int> CountAsync() =>
            await _dbSet.CountAsync();

        public async Task<int> CountAsync(Expression<Func<T, bool>> expression) => 
            await _dbSet.Where(expression).CountAsync();

        public async Task<T> SearchForSingleItemAsync(
            Expression<Func<T, bool>> expression, 
            params Expression<Func<T, object>>[] includes)
        {
            try
            {
                var query = _dbSet.Where(expression).AsNoTracking();

                if (includes.Any())
                {
                    query = includes
                        .Aggregate(query,
                            (
                                current, includeProperty) => current.Include(includeProperty)
                        );
                }

                var item = await query.SingleOrDefaultAsync();

                return item;
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException($"More then one item has been found. Error: {ex.Message}");
            }
            catch (Exception e)
            {
                throw new Exception($"Unable to find item in database. Error: {e.Message}");
            }
        }

        public void UpdateItem(T item)
        {
            _dbSet.Update(item);
        }
        
        public void UpdateItem(T item, params Expression<Func<T, object>>[] modifiedProperties)
        {
            var entryEntity = DbContext.Entry(item);

            foreach (var property in modifiedProperties)
            {
                entryEntity.Property(property).IsModified = true;
            }
        }

        public void UpdateItems(IEnumerable<T> items)
        {
            var entitiesList = items.ToList();
            
            DbContext.UpdateRange(entitiesList);
        }

        public void Remove(Expression<Func<T, bool>> expression)
        {
            _dbSet.RemoveRange(_dbSet.Where(expression));
        }
    }
}