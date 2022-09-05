using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Presentation.Models.Request
{
    public class SearchRequest : PaginationRequest
    {
        [FromQuery(Name = "term")]
        public string Term { get; set; }
    }
}