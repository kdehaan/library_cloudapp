using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;

using Amazon.Lambda.Core;
using Amazon.S3;
// using Amazon.S3.Transfer;
using Amazon;
using Newtonsoft.Json;



// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace getLibraryBooks
{
    public class Function
    {

        /// <summary>
        /// A simple function that takes a string and does a ToUpper
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>


        public class Book
        {
            public string author;
            public string country;
            public string imagelink;
            public string language;
            public string link;
            public int pages;
            public string title;
            public int year;
        }

        public List<Book> LoadJson()
        {

            using (var stream = GetType().Assembly.GetManifestResourceStream("getLibraryBooks.books.json"))
            {
                using (var reader = new StreamReader(stream))
                {
                    string json = reader.ReadToEnd();
                    List<Book> books = JsonConvert.DeserializeObject<List<Book>>(json);
                    return books;
                }

            }


        }
        public string FunctionHandler(string input, ILambdaContext context)
        {

            List<Book> books = LoadJson();

            return books[0].author;
            // List<Book> books = LoadJson();
            // return books[0].title;
            // return input?.ToUpper();
        }
    }


}
