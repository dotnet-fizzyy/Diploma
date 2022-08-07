using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using NpgsqlTypes;
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
            var sqlParams = new List<NpgsqlParameter>();

            if (epicId.HasValue || sprintId.HasValue)
            {
                CreateSqlJoinQueryForSprint(sqlJoins);
            }

            if (epicId.HasValue)
            {
                CreateSqlJoinQueryForEpic(sqlJoins);
                CreateSqlConditionQueryForEpic(sqlConditions, sqlParams, epicId.Value);
            }

            if (sprintId.HasValue)
            {
                CreateSqlConditionQueryForSprint(sqlConditions, sqlParams, sprintId.Value);
            }
            
            if (teamId.HasValue)
            {
                CreateSqlJoinQueryForTeam(sqlJoins);
                CreateSqlConditionQueryForTeam(sqlConditions, sqlParams, teamId.Value);
            }

            var sortSqlQuery = CreateSqlSortCondition(sortField, sortDirection);

            var finalSqlQuery = CreateSqlQuery(sqlConditions, sqlJoins, sortSqlQuery);

            return await DbContext.Stories
                .FromSqlRaw(finalSqlQuery, sqlParams.Cast<object>().ToArray())
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

        private static void CreateSqlConditionQueryForEpic(
            ICollection<string> sqlConditions, 
            ICollection<NpgsqlParameter> sqlParameters, 
            Guid epicId)
        {
            const string epicSqlJoinQuery = "E.\"EpicId\" = @epicId";

            var sqlParam = new NpgsqlParameter
            {
                ParameterName = "@epicId",
                NpgsqlDbType = NpgsqlDbType.Uuid,
                Value = epicId
            };
            
            sqlConditions.Add(epicSqlJoinQuery);
            sqlParameters.Add(sqlParam);
        }
        
        private static void CreateSqlConditionQueryForTeam(
            ICollection<string> sqlConditions,
            ICollection<NpgsqlParameter> sqlParameters,
            Guid teamId)
        {
            const string epicSqlJoinQuery = "T.\"TeamId\" = @teamId";

            var sqlParam = new NpgsqlParameter
            {
                ParameterName = "@teamId",
                NpgsqlDbType = NpgsqlDbType.Uuid,
                Value = teamId
            };
            
            sqlConditions.Add(epicSqlJoinQuery);
            sqlParameters.Add(sqlParam);
        }
        
        private static void CreateSqlConditionQueryForSprint(
            ICollection<string> sqlConditions,
            ICollection<NpgsqlParameter> sqlParameters,
            Guid sprintId)
        {
            const string epicSqlJoinQuery = "SP.\"SprintId\" = @sprintId";
           
            var sqlParam = new NpgsqlParameter
            {
                ParameterName = "@sprintId",
                NpgsqlDbType = NpgsqlDbType.Uuid,
                Value = sprintId
            };
            
            sqlConditions.Add(epicSqlJoinQuery);
            sqlParameters.Add(sqlParam);
        }

        private static string CreateSqlSortCondition(
            string sortField,
            SortDirection sortDirection)
        {
            var sqlSortDirection = sortDirection == SortDirection.Asc ? "ASC" : "DESC";

            return $"ORDER BY \"{sortField}\" {sqlSortDirection}";
        }

        private static string CreateSqlQuery(
            ICollection<string> sqlConditions,
            ICollection<string> sqlJoins,
            string sortSqlQuery)
        {
            var sqlJoinQuery = string.Join(" ", sqlJoins);
            var sqlConditionQuery = string.Join(" AND ", sqlConditions);

            return $"SELECT ST.*, ST.\"xmin\" FROM public.\"Stories\" AS ST {sqlJoinQuery} WHERE {sqlConditionQuery} {sortSqlQuery}";
        }
    }
}