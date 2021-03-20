using System;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Exceptions
{
    public class UserFriendlyException : Exception
    {
        public ErrorStatus ErrorStatus { get; }
        
        public UserFriendlyException() { }
        
        public UserFriendlyException(string message) : base(message) {}
        
        public UserFriendlyException(string message, Exception exception) : base(message, exception) {}
        
        public UserFriendlyException(ErrorStatus errorStatus, string message) : base(message)
        {
            ErrorStatus = errorStatus;
        }
        
        public UserFriendlyException(ErrorStatus errorStatus, string message, Exception exception) : base(message,
            exception)
        {
            ErrorStatus = errorStatus;
        }
    }
}