using System;

namespace GiftShop.Infrastructure.Logs
{
    public static class LogHelper
    {
        private static readonly log4net.ILog _logger = log4net.LogManager.GetLogger(
                   System.Reflection.MethodBase.GetCurrentMethod()
                    .DeclaringType);



        public static void Info(string s)
        {
            _logger.Info(s);
        }

        public static void Warn(string s)
        {
            _logger.Warn(s);
        }

        public static void Debug(string s)
        {
            _logger.Debug(s);
        }

        public static void Error(string s, Exception e)
        {
            _logger.Error(s, e);
        }

        public static void Fatal(string s)
        {
            _logger.Fatal(s);
        }
    }
}
