using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using GiftShop.Infrastructure.Encrypt;

namespace GiftShop.WebApp.Controllers
{
    public class HomeController : BaseController
    {
        [HttpGet]
        public JsonResult IsAuth()
        {
            if (!base.AccountId.HasValue) return Json(false, JsonRequestBehavior.AllowGet);
            return Json(base.UserType.ToString(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SignIn(string account, string password)
        {
            if (string.IsNullOrEmpty(account) || string.IsNullOrEmpty(password))
            {
                return Json(false);
            }

            password = password.Encrypt();

            var accountDB = base.Repository.AccountsRepository.Collection.FirstOrDefault(u => u.AccountName == account && u.Password == password);

            if (accountDB == null)
            {
                return Json(false);
            }

            base.AccountId = accountDB.AccountId;
            base.UserType = (GiftShop.Infrastructure.Enums.UserType)accountDB.UserType;
            

            FormsAuthentication.SetAuthCookie(account, false);

            return Json(true);
        }

        [HttpPost]
        public JsonResult SignOut()
        {
            Session.Clear();
            FormsAuthentication.SignOut();
            return Json(true);
        }

    }
}
