using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using WebAPI.Presentation.Models.Request;

namespace WebAPI.Presentation.Filters
{
    public class PaginationFilter : ActionFilterAttribute
    {
        private const string SearchActionArgumentKey = "search";
        private const int MaxPaginationValue = 100000;
        
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var actionArgExists = context.ActionArguments.TryGetValue(SearchActionArgumentKey, out var searchActionArgument);
            var paginationRequest = searchActionArgument as PaginationRequest;
            var isRequestInvalid = !actionArgExists || paginationRequest == null;
            
            if (isRequestInvalid)
            {
                SetBadRequestResponse(
                    context.HttpContext.Response,
                    "Unable to parse pagination parameters");
                
                return;
            }

            var arePaginationParamsInvalid = PaginationRequestParamsInvalid(paginationRequest);

            if (arePaginationParamsInvalid)
            {
                SetBadRequestResponse(
                    context.HttpContext.Response, 
                    "\"limit\" or \"offset\" parameter cannot be less or equal 0");
                
                return;
            }
            
            var totalPaginationValue = CalculateTotalPaginationValue(paginationRequest.Limit, paginationRequest.Offset);
            var totalPaginationValueExceededLimit = HasTotalPaginationValueExceededLimit(totalPaginationValue);
            
            if (totalPaginationValueExceededLimit)
            {
                SetBadRequestResponse(
                    context.HttpContext.Response, 
                    "Pagination parameters are too big");
            }
        }

        private static bool PaginationRequestParamsInvalid(PaginationRequest requestModel) =>
            requestModel.Limit <= default(int) || requestModel.Offset <= default(int);
        
        private static int CalculateTotalPaginationValue(int limit, int offset) =>
            limit * offset;

        private static bool HasTotalPaginationValueExceededLimit(int paginationValue) =>
            paginationValue >= MaxPaginationValue;

        private static void SetBadRequestResponse(HttpResponse response, string message)
        {
            response.StatusCode = StatusCodes.Status400BadRequest;
            response.ContentType = "application/json";
            
            response
                .WriteAsync(
                    $@"
                            {{
                                ""errors"": [
                                    ""code"":""API_server_error"",
                                    ""status"": ""{response.StatusCode}"",
                                    ""message"":""{message}""
                                ]
                            }}
                        ")
                .GetAwaiter();
        }
    }
}