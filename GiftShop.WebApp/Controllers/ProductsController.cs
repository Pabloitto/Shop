using System;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GiftShop.Infrastructure.Logs;
using GiftShop.Infrastructure.Models;
using GiftShop.WebApp.Authentication;

namespace GiftShop.WebApp.Controllers
{
    [SessionExpireFilterAttribute]
    public class ProductsController : BaseController
    {

        [HttpGet]
        public JsonResult GetProducts()
        {
            return Json(base.Repository.ProductsRepository.Collection.Select(p => new ProductModel()
            {
                ProductId = p.ProductId,
                Code = p.Code,
                Name = p.Name,
                Photo = p.Photo,
                CompanyPhoto = p.CompanyPhoto,
                Price = (decimal)p.Price,
                Stock = p.Stock,
                CategoryId = p.CategoryId
            }).ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetProductById(int productId)
        {
            var productDB = base.Repository.ProductsRepository.Collection.FirstOrDefault(p => p.ProductId == productId);

            return Json(new
            {
                productDB.Name,
                productDB.Description,
                productDB.Code,
                productDB.CompanyPhoto,
                productDB.Photo,
                productDB.ProductId,
                productDB.Price,
                productDB.Stock,
                productDB.CategoryId
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveProduct(ProductModel product)
        {
            return Json(base.Repository.ProductsRepository.SaveFromModel(product));
        }

        [HttpPost]
        public JsonResult DeleteProduct(int productId)
        {
            return Json(base.Repository.ProductsRepository.DeleteFromModel(new ProductModel
            {
                ProductId = productId
            }));
        }

        [HttpPost]
        public JsonResult UploadFile()
        {
            HttpPostedFileBase file = Request.Files[0];

            string fileName = file.FileName;

            try
            {
                string path = Path.Combine(Server.MapPath("~/Content/app/images"), fileName);

                if (!System.IO.File.Exists(path))
                {
                    file.SaveAs(path);
                }
            }
            catch (Exception e)
            {
                LogHelper.Info(e.ToString());
            }

            return Json("images/" + fileName);
        }
        

    }
}
