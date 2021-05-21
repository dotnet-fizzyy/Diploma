using System.Collections.Generic;
using WebAPI.Models.Models.Models;
using WebAPI.Models.Models.Simple;

namespace WebAPI.Presentation.Models.Pages
{
    public class FullStatisticsPage : StatisticsPage
    {
        public IList<EpicSimpleModel> Epics { get; set; }
        
        public Project Project { get; set; }
    }
}