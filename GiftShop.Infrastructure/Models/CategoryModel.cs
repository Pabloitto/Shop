using System;

namespace GiftShop.Infrastructure.Models
{
    [Serializable]
    public class CategoryModel
    {
        public CategoryModel()
        {

        }

        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
