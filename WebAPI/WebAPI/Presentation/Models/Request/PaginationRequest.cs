using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Presentation.Models.Request
{
    public class PaginationRequest
    {
        [FromQuery(Name = "limit")]
        public int Limit { get; set; }
        
        [FromQuery(Name = "offset")]
        public int Offset { get; set; }
    }
}