using System.Collections.Generic;

namespace WebAPI.Models.Extensions
{
    public class CollectionResponse<T> where T : class
    {
        public IList<T> Items { get; set; }

        public int Count => Items.Count;
    }
}