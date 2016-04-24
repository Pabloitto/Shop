using System;
using System.Net;
using System.Web.Mvc;
using GiftShop.Infrastructure.Exceptions;
using GiftShop.Infrastructure.Logs;
using GiftShop.Infrastructure.Resources;
using GiftShop.Repository;

namespace GiftShop.WebApp.Controllers
{
    public class BaseController : Controller
    {
        protected int? AccountId
        {
            get
            {
                object data = Session[SessionKeys.AccountId];
                if (data == null) return null;
                return Convert.ToInt32(data.ToString());
            }
            set
            {
                Session[SessionKeys.AccountId] = value;
            }
        }



        public GiftShop.Infrastructure.Enums.UserType? UserType
        {
            get
            {
                object data = Session[SessionKeys.UserType];
                if (data == null) return null;
                return (GiftShop.Infrastructure.Enums.UserType)data;
            }
            set
            {
                Session[SessionKeys.UserType] = value;
            }
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            Exception ex = filterContext.Exception;

            JsonResult json = null;

            filterContext.ExceptionHandled = true;

            filterContext.HttpContext.Response.Clear();
            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;

            if (ex is BusinessException)
            {
                LogHelper.Info(ex.Message);
                json = Json(new { Message = ex.Message, Error = true });
            }
            else
            {
                LogHelper.Error(BusinessException.DefaultMessage, ex);
                json = Json(new { Message = BusinessException.DefaultMessage, Error = true }, JsonRequestBehavior.AllowGet);
            }

            filterContext.Result = json;
        }

        protected RepositoryFactory Repository
        {
            get
            {
                return RepositoryFactory.Instance;
            }
        }

        public virtual ActionResult Index()
        {
            return View();
        }
    }
}
