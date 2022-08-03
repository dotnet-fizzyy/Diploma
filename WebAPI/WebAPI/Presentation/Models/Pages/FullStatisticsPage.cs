using System.Collections.Generic;
using WebAPI.Models.Light;
using WebAPI.Models.Models.Models;

namespace WebAPI.Presentation.Models.Pages
{
    public class FullStatisticsPage : StatisticsPage
    {
        public IList<EpicLightModel> Epics { get; set; }
        
        public Project Project { get; set; }
    }
}