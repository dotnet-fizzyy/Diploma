using System.Collections.Generic;
using WebAPI.Core.Entities;
using WebAPI.Models.Models.Pages;

namespace WebAPI.Core.Interfaces.Aggregators
{
    public interface IWorkSpaceAggregator
    {
        WorkSpacePage CreateWorkSpacePageModel(WorkSpace workSpace, IEnumerable<Project> projects);
    }
}