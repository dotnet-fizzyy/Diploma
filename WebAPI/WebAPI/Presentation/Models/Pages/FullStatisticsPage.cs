using System.Collections.Generic;
using WebAPI.Models.Basic;
using WebAPI.Models.Light;

namespace WebAPI.Presentation.Models.Pages
{
    public class FullStatisticsPage : StatisticsPage
    {
        public IList<EpicLight> Epics { get; set; }
        
        public Project Project { get; set; }
    }
}