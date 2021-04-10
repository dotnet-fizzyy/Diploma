namespace WebAPI.ApplicationLogic.Utilities
{
    public static class ExceptionMessageGenerator
    {
        public static string GetMissingEntityMessage(string entityField) => $"Unable to find workspace with provided {entityField}";
    }
}