using System;

namespace GiftShop.Infrastructure.Models
{
    [Serializable]
    public class ProductModel
    {
        public ProductModel()
        {
        }

        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public string CompanyPhoto { get; set; }
        public int CategoryId { get; set; }
        public long Code { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
    }
}
