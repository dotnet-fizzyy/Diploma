using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public abstract class BaseCrudRepository<TContext, T> : IBaseCrudRepository<T> 
        where T : class 
        where TContext : DbContext
    {
        protected readonly TContext _dbContext;
        private readonly DbSet<T> _dbSet;

        protected BaseCrudRepository(TContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }
        
        public async Task<T> CreateAsync(T item)
        {
            try
            {
                await _dbSet.AddAsync(item);

                await _dbContext.SaveChangesAsync();

                _dbContext.Entry(item).State = EntityState.Detached;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception($"Could not create item in database. Error: {e.Message}");
            }

            return item;
        }

        public async Task<List<T>> CreateAsync(IEnumerable<T> items)
        {
            var entitiesList = items.ToList();
            
            try
            {
                await _dbSet.AddRangeAsync(entitiesList);

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception($"Could not create items in database. Error: {e.Message}");
            }

            return entitiesList;
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> expression)
        {
            var exists = await _dbSet.Where(expression).AnyAsync();

            return exists;
        }

        public async Task<List<T>> SearchForMultipleItemsAsync()
        {
            var items = await _dbSet.AsNoTracking().ToListAsync();

            return items;
        }

        public async Task<List<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression)
        {
            var items = await _dbSet.Where(expression).AsNoTracking().ToListAsync();

            return items;
        }

        public async Task<List<T>> SearchForMultipleItemsAsync<K>(
            Expression<Func<T, bool>> expression,
            Expression<Func<T, K>> sort,
            OrderType orderType = OrderType.Asc
        )
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
            OrderType orderType
            )
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
        
        public async Task<int> CountAsync(Expression<Func<T, bool>> expression)
        {
            var count = expression == null 
                ? await _dbSet.CountAsync()
                : await _dbSet.Where(expression).CountAsync();

            return count;
        }
        
        public async Task<T> SearchForSingleItemAsync(
            Expression<Func<T, bool>> expression, 
            params Expression<Func<T, object>>[] includes
            )
        {
            try
            {
                var query = _dbSet.Where(expression).AsNoTracking();

                if (includes.Length != 0)
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
                Console.WriteLine(ex);
                throw new InvalidOperationException($"More then one item has been found. Error: {ex.Message}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception($"Unable to find item in database. Error: {e.Message}");
            }
        }

        public async Task<T> UpdateItemAsync(T item)
        {
            try
            {
                _dbSet.Update(item);

                await _dbContext.SaveChangesAsync();

                _dbContext.Entry(item).State = EntityState.Detached;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception($"Unable to update item. Error: {e.Message}");
            }

            return item;
        }
        
        public async Task<T> UpdateItemAsync(T item, params Expression<Func<T, object>>[] unmodifiedProperties)
        {
            try
            {
                _dbSet.Update(item);
                foreach (var property in unmodifiedProperties)
                {
                    _dbContext.Entry(item).Property(property).IsModified = false;
                }
                
                await _dbContext.SaveChangesAsync();

                _dbContext.Entry(item).State = EntityState.Detached;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception($"Unable to update item. Error: {e.Message}");
            }

            return item;
        }

        public async Task<List<T>> UpdateItemsAsync(IEnumerable<T> items)
        {
            var entitiesList = items.ToList();
            
            try
            {
                _dbContext.UpdateRange(entitiesList);

                await _dbContext.SaveChangesAsync();

                foreach (var entity in entitiesList)
                {
                    _dbContext.Entry(entity).State = EntityState.Detached;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception($"Unable to update items. Error: {e.Message}");
            }

            return entitiesList;
        }

        public async Task DeleteAsync(Expression<Func<T, bool>> expression)
        {
            try
            {
                _dbSet.RemoveRange(_dbSet.Where(expression));

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw new Exception($"Unable to remove item or items. Error: {e.Message}");
            }
        }
    }
}