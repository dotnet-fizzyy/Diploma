namespace WebAPI.Core.Constants
{
    public class SortTypes
    {
        public const string Priority = "PRIORITY";
        public const string Title = "NAME";
        public const string Estimate = "ESTIMATE";
        public const string CreationDate = "CREATION_DATE";
    }

    public class StoryFields
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
    }

    public static class Search
    {
        public const int EpicsLimit = 2;
        public const int SprintsLimit = 3;
        public const int StoriesLimit = 5;
    }
}