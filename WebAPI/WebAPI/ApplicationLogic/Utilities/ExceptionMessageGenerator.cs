namespace WebAPI.ApplicationLogic.Utilities
{
    public static class ExceptionMessageGenerator
    {
        public static string GetMissingEntityMessage(string entityField) => $"Unable to find item with provided {entityField}";
        
        public static string GetMissingEntitiesMessage(string entityField) => $"Unable to find items with provided {entityField}";
    }
}