namespace WebAPI.Core.Constants
{
    public static class SortTypes
    {
        public const string Priority = "PRIORITY";
        public const string Title = "NAME";
        public const string Estimate = "ESTIMATE";
        public const string CreationDate = "CREATION_DATE";
    }

    public static class StoryFields
    {
        public const string User = "User";
        public const string Sprint = "Sprint";
        public const string Description = "Description";
        public const string Notes = "Notes";
        public const string ColumnType = "Column";
        public const string Priority = "Priority";
        public const string Title = "Title";
        public const string Estimate = "Estimate";
        public const string IsReady = "Ready";
        public const string IsBlocked = "Blocked";
        public const string BlockReason = "Block reason";
        public const string RequiredPosition = "Required position";
    }

    public static class Search
    {
        public const int TeamsLimit = 5;
        public const int ProjectsLimit = 5;
        public const int StoriesLimit = 5;
    }
}