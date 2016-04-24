using System.Collections.Generic;
using System.Linq;
using GiftShop.DataAccess;
using GiftShop.Infrastructure.Encrypt;
using GiftShop.Infrastructure.Models;
using GiftShop.Infrastructure.Models.Helpers;

namespace GiftShop.Repository.Accounts
{
    public class AccountsRepository : RepositoryBase<Account,AccountModel>
    {
        public override bool SaveFromModel(AccountModel account)
        {
            if (account.AccountId == 0)
            {
                account.Password = account.Password.Encrypt();
                Account newAccount = new Account
                {
                    AccountName = account.AccountName,
                    Password = account.Password,
                    UserType = (int)account.UserType
                };
                return base.Save(newAccount);
            }
            else
            {
                Account dbAccount = base.Collection.FirstOrDefault(a => a.AccountId == account.AccountId);
                if (dbAccount != null)
                {
                    dbAccount.AccountName = account.AccountName;
                    dbAccount.UserType = (int)account.UserType;

                    if (dbAccount.Password != account.Password)
                    {
                        dbAccount.Password = account.Password.Encrypt();
                    }

                    return base.Update(dbAccount);
                }
            }
            return false;
        }

        public override bool DeleteFromModel(AccountModel model)
        {
            var toDelete = this.Collection.FirstOrDefault(a => a.AccountId == model.AccountId);
            if (toDelete == null) return false;
            return base.Delete(toDelete);
        }

        public List<AccountTypeModel> GetAccountTypes()
        {
            return this._context.UserTypes.Select(ut => new AccountTypeModel
            {
                Id = ut.UserType1,
                Text = ut.Text
            }).ToList();
        }
    }
}
