using System.Web.Mvc;

namespace GiftShop.WebApp.Controllers
{
    public class ResourcesController : Controller
    {
        [HttpGet]
        public JsonResult GetMessagesAsObject()
        {
            return Json(new
            {
                Forbidden = GiftShop.Infrastructure.Resources.Messages.Forbidden
            }, JsonRequestBehavior.AllowGet);
        }

    }
}
