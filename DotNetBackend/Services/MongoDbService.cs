using DotNetBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DotNetBackend.Services
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IOptions<DatabaseSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _database = client.GetDatabase(options.Value.DatabaseName);
        }

        public IMongoCollection<User> Users => _database.GetCollection<User>("users");
        public IMongoCollection<Document> Documents => _database.GetCollection<Document>("documents");
        public IMongoCollection<Announcement> Announcements => _database.GetCollection<Announcement>("announcements");
    }
}
