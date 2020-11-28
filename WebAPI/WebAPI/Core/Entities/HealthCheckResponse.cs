using System;
using System.Collections.Generic;

namespace WebAPI.Core.Entities
{
    public class HealthCheckResponse
    {
        public string Status { get; set; }
        
        public IEnumerable<HealthCheckComponent> HealthCheckComponents { get; set; }
        
        public TimeSpan Duration { get; set; }
    }

    public class HealthCheckComponent
    {
        public string Status { get; set; }
        
        public string Component { get; set; }
    }
}