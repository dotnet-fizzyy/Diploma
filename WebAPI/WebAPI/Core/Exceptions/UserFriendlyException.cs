using System;
using WebAPI.Core.Enums;

namespace WebAPI.Core.Exceptions
{
    public class UserFriendlyException : Exception
    {
        public ErrorStatus ErrorStatus { get; }
        
        public UserFriendlyException() { }
        
        public UserFriendlyException(ErrorStatus errorStatus, string message) : base(message)
        {
            ErrorStatus = errorStatus;
        }
    }
}