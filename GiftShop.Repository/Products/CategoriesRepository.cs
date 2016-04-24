using System.Collections.Generic;
using System.Linq;
using GiftShop.DataAccess;
using GiftShop.Infrastructure.Models;
using GiftShop.Infrastructure.Models.Helpers;

namespace GiftShop.Repository.Products
{
    public class CategoriesRepository : RepositoryBase<Category,CategoryModel>
    {
        public List<CategoryStockModel> GetCategoriesWithStock()
        {
            return (from cat in this._context.Categories
                    select new CategoryStockModel
                    {
                        CategoryId = cat.CategoryId,
                        Name = cat.Name,
                        Description = cat.Description,
                        Stock = this._context.Products.Any(p => p.CategoryId == cat.CategoryId)
                         ? this._context.Products.Where(p => p.CategoryId == cat.CategoryId)
                                                      .Sum(p => p.Stock) : 0
                    }).ToList<CategoryStockModel>();
        }

        public override bool SaveFromModel(CategoryModel model)
        {
            if (model.CategoryId == 0)
            {
                Category newCategory = new Category
                {
                    CategoryId = model.CategoryId,
                    Name = model.Name,
                    Description = model.Description
                };
                return base.Save(newCategory);
            }
            else
            {
                Category dbCategory = base.Collection.FirstOrDefault(a => a.CategoryId == model.CategoryId);
                if (dbCategory != null)
                {
                    dbCategory.CategoryId = model.CategoryId;
                    dbCategory.Name = model.Name;
                    dbCategory.Description = model.Description;
                    return base.Update(dbCategory);
                }
            }
            return false;
        }

        public override bool DeleteFromModel(CategoryModel model)
        {
            var toDelete = this.Collection.FirstOrDefault(a => a.CategoryId == model.CategoryId);
            if (toDelete == null) return false;
            return base.Delete(toDelete);
        }
    }
}
