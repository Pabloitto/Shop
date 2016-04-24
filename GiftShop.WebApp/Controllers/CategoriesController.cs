using System.Linq;
using System.Web.Mvc;
using GiftShop.Infrastructure.Models;
using GiftShop.WebApp.Authentication;

namespace GiftShop.WebApp.Controllers
{
    [SessionExpireFilterAttribute]
    public class CategoriesController : BaseController
    {
        [HttpGet]
        public JsonResult GetCategories()
        {
            return Json(base.Repository.CategoriesRepository.GetCategoriesWithStock(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveCategory(CategoryModel category)
        {
            return Json(base.Repository.CategoriesRepository.SaveFromModel(category));
        }

        [HttpPost]
        public JsonResult DeleteCategory(int categoryId)
        {
            return Json(base.Repository.CategoriesRepository.DeleteFromModel(new CategoryModel
            {
                CategoryId = categoryId
            }));
        }

        [HttpGet]
        public JsonResult GetCategory(int categoryId)
        {
            return Json(base.Repository.CategoriesRepository.Collection.FirstOrDefault(a => a.CategoryId == categoryId), JsonRequestBehavior.AllowGet);
        }
    }
}
