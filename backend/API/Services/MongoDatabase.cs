using MongoDB.Driver;

namespace API.Services
{
    public class MongoDatabase
    {
        public IMongoDatabase Database { get; }
        public MongoDatabase()
        {
            var client = new MongoClient("mongodb+srv://kilobitas:CesnakinisBatonas@main.fsrryh2.mongodb.net/?retryWrites=true&w=majority");
            this.Database = client.GetDatabase("kilobitas");
        }
    }
}
