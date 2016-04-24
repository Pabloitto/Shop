using System.Linq;
using System.Web.Mvc;
using GiftShop.Infrastructure.Models;
using GiftShop.WebApp.Authentication;

namespace GiftShop.WebApp.Controllers
{
    public class AccountController : BaseController
    {
        [HttpPost]
        public JsonResult SaveAccount(AccountModel account)
        {
            return Json(base.Repository.AccountsRepository.SaveFromModel(account));
        }

        [SessionExpireFilterAttribute]
        [HttpPost]
        public JsonResult DeleteAccount(int accountId)
        {
            return Json(base.Repository.AccountsRepository.DeleteFromModel(new AccountModel
            {
                AccountId = accountId
            }));
        }

        [SessionExpireFilterAttribute]
        [HttpGet]
        public JsonResult GetAccount(int accountId)
        {
            AccountModel account = base.Repository.AccountsRepository.Collection.Select(a=> new AccountModel{
                AccountId = a.AccountId,
                AccountName = a.AccountName,
                Password = a.Password,
                UserType = (GiftShop.Infrastructure.Enums.UserType)a.UserType
            }).FirstOrDefault(a => a.AccountId == accountId);

            return Json(account, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetAccountTypes()
        {
            return Json(base.Repository.AccountsRepository.GetAccountTypes(), JsonRequestBehavior.AllowGet);
        }

    }
}
