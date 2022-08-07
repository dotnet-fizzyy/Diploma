using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Core.Entities;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Database;

namespace WebAPI.Infrastructure.Postgres.Repository
{
    public class StoryRepository : BaseCrudRepository<DatabaseContext, Story>, IStoryRepository
    {
        public StoryRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
            
        }
        
        public async Task<List<Story>> GetStoriesByEpicAndTeamIds(Guid epicId, Guid teamId)
        {
            IQueryable<Story> query;

            if (teamId != default)
            {
                query = 
                    from sprints in DbContext.Sprints
                    join stories in DbContext.Stories on sprints.Id equals stories.SprintId
                    where sprints.EpicId == epicId && stories.TeamId == teamId
                    select stories;
            }
            else
            {
                query = 
                    from sprints in DbContext.Sprints
                    join stories in DbContext.Stories on sprints.Id equals stories.SprintId
                    where sprints.EpicId == epicId 
                    select stories;
            }

            var storiesFromEpic = await query.ToListAsync();
            
            return storiesFromEpic;
        }

        public async Task<List<Story>> SearchForStories(
            Guid? epicId,
            Guid? sprintId,
            Guid? teamId,
            string sortField,
            SortDirection sortDirection)
        {
            var sqlJoins = new List<string>();
            var sqlConditions = new List<string>();

            if (epicId.HasValue || sprintId.HasValue)
            {
                CreateSqlJoinQueryForSprint(sqlJoins);
            }

            if (epicId.HasValue)
            {
                CreateSqlJoinQueryForEpic(sqlJoins);
                CreateSqlConditionQueryForEpic(sqlConditions, epicId.Value);
            }

            if (sprintId.HasValue)
            {
                CreateSqlConditionQueryForSprint(sqlConditions, sprintId.Value);
            }
            
            if (teamId.HasValue)
            {
                CreateSqlJoinQueryForTeam(sqlJoins);
                CreateSqlConditionQueryForTeam(sqlConditions, teamId.Value);
            }

            var sortSqlQuery = CreateSqlSortCondition(sortField, sortDirection);

            var sqlJoinQuery = string.Join(" ", sqlJoins);
            var sqlConditionQuery = string.Join(" AND ", sqlConditions);
            var finalSqlQuery = $"SELECT ST.*, ST.\"xmin\" FROM public.\"Stories\" AS ST {sqlJoinQuery} WHERE {sqlConditionQuery} {sortSqlQuery}";

            // todo: SQL Data client
            return await DbContext.Stories
                .FromSqlRaw(finalSqlQuery)
                .AsQueryable()
                .ToListAsync();
        }
        
        private static void CreateSqlJoinQueryForSprint(ICollection<string> sqlJoins)
        {
            const string sprintSqlJoinQuery = "INNER JOIN \"Sprints\" AS SP on SP.\"SprintId\" = ST.\"SprintId\"";
            
            sqlJoins.Add(sprintSqlJoinQuery);
        }
        
        private static void CreateSqlJoinQueryForEpic(ICollection<string> sqlJoins)
        {
            const string epicSqlJoinQuery = "INNER JOIN \"Epics\" E on E.\"EpicId\" = SP.\"EpicId\"";
            
            sqlJoins.Add(epicSqlJoinQuery);
        }

        private static void CreateSqlJoinQueryForTeam(ICollection<string> sqlJoins)
        {
            const string teamSqlJoinQuery = "INNER JOIN \"Teams\" T on T.\"TeamId\" = ST.\"TeamId\"";
            
            sqlJoins.Add(teamSqlJoinQuery);
        }

        private static void CreateSqlConditionQueryForEpic(ICollection<string> sqlConditions, Guid epicId)
        {
            var epicSqlJoinQuery = $"E.\"EpicId\" = '{epicId}'";
           
            sqlConditions.Add(epicSqlJoinQuery);
        }
        
        private static void CreateSqlConditionQueryForTeam(ICollection<string> sqlConditions, Guid teamId)
        {
            var epicSqlJoinQuery = $"T.\"TeamId\" = '{teamId}'";
           
            sqlConditions.Add(epicSqlJoinQuery);
        }
        
        private static void CreateSqlConditionQueryForSprint(ICollection<string> sqlConditions, Guid sprintId)
        {
            var epicSqlJoinQuery = $"SP.\"SprintId\" = '{sprintId}'";
           
            sqlConditions.Add(epicSqlJoinQuery);
        }

        private static string CreateSqlSortCondition(string sortField, SortDirection sortDirection)
        {
            var sqlSortDirection = sortDirection == SortDirection.Asc ? "ASC" : "DESC";
            
            return $"ORDER BY ST.\"{sortField}\" {sqlSortDirection}";
        }
    }
}