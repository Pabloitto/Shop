using System;

namespace GiftShop.Infrastructure.Models.Helpers
{
    [Serializable]
    public class CategoryStockModel : CategoryModel
    {
        public int Stock { get; set; }
    }
}
