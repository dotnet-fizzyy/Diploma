using System;
using System.Threading.Tasks;

namespace WebAPI.Core.Interfaces.Database
{
    public interface ICacheContext
    {
        Task<T> Get<T>(string key);
        
        Task Set<T>(string key, T value, TimeSpan? expiry = null);
    }
}