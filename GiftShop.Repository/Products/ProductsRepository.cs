using System.Linq;
using GiftShop.DataAccess;
using GiftShop.Infrastructure.Models;

namespace GiftShop.Repository.Products
{
    public class ProductsRepository : RepositoryBase<Product, ProductModel>
    {

        public override bool SaveFromModel(ProductModel model)
        {
            if (model.ProductId == 0)
            {
                Product newProduct = new Product
                {
                    CategoryId = model.CategoryId,
                    Code = model.Code,
                    CompanyPhoto = model.CompanyPhoto,
                    Description = model.Description,
                    Name = model.Name,
                    Photo = model.Photo,
                    Price = model.Price,
                    Stock = model.Stock
                };
                return base.Save(newProduct);
            }
            else
            {
                Product dbProduct = base.Collection.FirstOrDefault(a => a.ProductId == model.ProductId);
                if (dbProduct != null)
                {
                    dbProduct.CategoryId = model.CategoryId;
                    dbProduct.Code = model.Code;
                    dbProduct.CompanyPhoto = model.CompanyPhoto;
                    dbProduct.Description = model.Description;
                    dbProduct.Photo = model.Photo;
                    dbProduct.Name = model.Name;
                    dbProduct.Price = model.Price;
                    dbProduct.Stock = model.Stock;
                    return base.Update(dbProduct);
                }
            }
            return false;
        }

        public override bool DeleteFromModel(ProductModel model)
        {
            var toDelete = this.Collection.FirstOrDefault(a => a.ProductId == model.ProductId);
            if (toDelete == null) return false;
            return base.Delete(toDelete);
        }
    }
}
