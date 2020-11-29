namespace WebAPI.Models.Result
{
    public class BoardResponse
    {
        public CollectionResponse<FullSprint> SprintsCollection { get; set; }
        
        public FullTeam Team { get; set; }
    }
}