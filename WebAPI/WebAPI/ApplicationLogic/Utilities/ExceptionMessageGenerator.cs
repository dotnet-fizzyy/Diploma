namespace WebAPI.ApplicationLogic.Utilities
{
    public static class ExceptionMessageGenerator
    {
        public static string GetMissingEntityMessage(string fieldName) => $"Unable to find item with provided {fieldName}";
        
        public static string GetMissingEntitiesMessage(string fieldName) => $"Unable to find items with provided {fieldName}";

        public static string GetInvalidDataMessage(string fieldName) => $"{fieldName} has invalid value to continue execution";
    }
}