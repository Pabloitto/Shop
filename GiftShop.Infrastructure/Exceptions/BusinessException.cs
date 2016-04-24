using System;
using GiftShop.Infrastructure.Resources;

namespace GiftShop.Infrastructure.Exceptions
{
    public class BusinessException : ApplicationException
    {
        public static readonly string DefaultMessage = Messages.GenericMessage;

        public BusinessException(string message)
            : base(message)
        {

        }

        public BusinessException()
            : base(DefaultMessage)
        {

        }
    }
}
