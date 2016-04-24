using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace GiftShop.WebApp.Authentication
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class SessionExpireFilterAttribute : System.Web.Mvc.ActionFilterAttribute
    {

        private readonly string SessionKeyId = GiftShop.Infrastructure.Resources.SessionKeys.AccountId;

        public SessionExpireFilterAttribute()
        {

        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;

            if (ctx.Session[SessionKeyId] == null)
            {
                RedirectResponse(filterContext);
            }

            base.OnActionExecuting(filterContext);
        }

        private void RedirectResponse(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                filterContext.Result = new JsonResult()
                {
                    Data = GiftShop.Infrastructure.Resources.Messages.Forbidden
                };
            }
        }
    }
}