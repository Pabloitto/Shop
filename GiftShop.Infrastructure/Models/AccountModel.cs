using GiftShop.Infrastructure.Enums;

namespace GiftShop.Infrastructure.Models
{
    public class AccountModel
    {
        public int AccountId { get; set; }
        public string AccountName { get; set; }
        public UserType UserType { get; set; }
        public string Password { get; set; }
    }
}
