using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Dynamic;


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
        /// A simple function that takes a parameter and returns all applicable results
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

        public class LambdaQuery
        {
            public string query;
        }


        public enum ValidField { author, country, language, title }
        public class SearchFields
        {
            public ValidField type;
            public string value;

            public SearchFields(ValidField fieldType, string fieldValue)
            {
                type = fieldType;
                value = fieldValue;
            }

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
            // Console.WriteLine(input.query);
            Regex rx = new Regex(@"(((author)|(country)|(language)|(title)):).+?((?=(((author)|(country)|(language)|(title)):))|$)", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            MatchCollection rxMatches = rx.Matches(input);
            List<SearchFields> searches = new List<SearchFields>();
            foreach (Match match in rxMatches)
            {
                string matchText = match.Value;
                string[] versions = matchText.Split(":", 4, StringSplitOptions.RemoveEmptyEntries);
                ValidField type = (ValidField)Enum.Parse(typeof(ValidField), versions[0]);
                string value = versions[1];
                SearchFields searchField = new SearchFields(type, value);
                searches.Add(searchField);


            }

            List<Book> books = LoadJson();
            List<Book> bookMatches = new List<Book>();
            foreach (Book book in books)
            {
                if (searches.Count == 0)
                {
                    if (book.author.Contains(input))
                    {
                        bookMatches.Add(book);
                    }
                    else if (book.language.Contains(input))
                    {
                        bookMatches.Add(book);
                    }
                    else if (book.country.Contains(input))
                    {
                        bookMatches.Add(book);
                    }
                    else if (book.title.Contains(input))
                    {
                        bookMatches.Add(book);
                    }
                }
                else
                {
                    foreach (SearchFields fields in searches)
                    {
                        switch (fields.type)
                        {
                            case ValidField.author:
                                if (book.author.Contains(fields.value))
                                {
                                    bookMatches.Add(book);
                                }
                                break;
                            case ValidField.country:
                                if (book.country.Contains(fields.value))
                                {
                                    bookMatches.Add(book);
                                }
                                break;
                            case ValidField.language:
                                if (book.language.Contains(fields.value))
                                {
                                    bookMatches.Add(book);
                                }
                                break;
                            case ValidField.title:
                                if (book.title.Contains(fields.value))
                                {
                                    bookMatches.Add(book);
                                }
                                break;
                        }
                    }
                }

            }

            return JsonConvert.SerializeObject(bookMatches);
        }
    }


}
