using System;
using System.IO;

namespace GiftShop.Infrastructure.Encrypt
{
    public static class EncrptyonHelper
    {
        private static readonly string SecuritySalt;
        private static readonly string Password;


        static EncrptyonHelper()
        {
            SecuritySalt = System.Configuration.ConfigurationManager.AppSettings["SecuritySalt"];
            Password = System.Configuration.ConfigurationManager.AppSettings["Password"];
        }

        public static string Encrypt(this string plainText)
        {
            if (string.IsNullOrEmpty(plainText)) throw new ArgumentNullException("plainText");
            

            try
            {
                return RijndaelEncryptDecrypt.EncryptDecryptUtils.Encrypt(plainText, Password, SecuritySalt, "SHA256");
            }
            catch
            {
                return plainText;
            }
        }


        public static string Decrypt(this string cipherText)
        {
            if (string.IsNullOrEmpty(cipherText)) throw new ArgumentNullException("cipherText");

            try
            {
                return RijndaelEncryptDecrypt.EncryptDecryptUtils.Decrypt(cipherText, Password, SecuritySalt, "SHA256");
            }
            catch
            {
                return cipherText;
            }
        }

        private static byte[] ReadByteArray(Stream s)
        {
            byte[] rawLength = new byte[sizeof(int)];

            bool containsNonProperlyContent = s.Read(rawLength, 0, rawLength.Length) != rawLength.Length;

            if (containsNonProperlyContent) throw new SystemException("Stream did not contain properly formatted byte array");


            byte[] buffer = new byte[BitConverter.ToInt32(rawLength, 0)];

            bool noHasBytes = s.Read(buffer, 0, buffer.Length) != buffer.Length;

            if (noHasBytes) throw new SystemException("Did not read byte array properly");

            return buffer;
        }
    }
}
