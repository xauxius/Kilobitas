using API.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;


namespace API.Services
{
    public class DiscussionsService
    {
        private readonly IMongoCollection<Discussion> _discussionCollection;
        private readonly IMongoCollection<Zyme> _tagCollection;

        public DiscussionsService(MongoDatabase database)
        {
            _discussionCollection = database.Database.GetCollection<Discussion>("Discussions");
            _tagCollection = database.Database.GetCollection<Zyme>("Tags");
        }

        public List<Discussion> GetDiscussions()
        {
            var discussions = _discussionCollection
                                .Aggregate()
                                .Lookup("Tags", "TagIds", "_id", "TagsArray") // "TagsArray" is the new field that will contain the joined data
                                .As<Discussion>()
                                .ToList();

            return discussions;
        }

        public Discussion GetDiscussion(Guid id)
        {
            var discussion = _discussionCollection
                                .Aggregate()
                                .Match(new BsonDocument("_id", id))
                                .Lookup("Tags", "TagIds", "_id", "Tags")
                                .As<Discussion>()
                                .FirstOrDefault();

            return discussion;
        }

        public void AddDiscussion(Discussion discussion)
        {
            _discussionCollection.InsertOne(discussion);
        }

        public void DeleteDiscussion(Guid id)
        {
            _discussionCollection.DeleteOne(discussion => discussion.Id == id);
        }

        public void UpdateDiscussion(Guid id, Discussion discussionToUpdate)
        {
            var updateDef = Builders<Discussion>.Update
                .Set(d => d.Pavadinimas, discussionToUpdate.Pavadinimas)
                .Set(d => d.Turinys, discussionToUpdate.Turinys)
                .Set(d => d.Kategorija, discussionToUpdate.Kategorija)
                .Set(d => d.Kurėjo_vardas, discussionToUpdate.Kurėjo_vardas)
                .Set(d => d.Kurėjo_Pavardė, discussionToUpdate.Kurėjo_Pavardė)
                .Set(d => d.Sukurimo_data, discussionToUpdate.Sukurimo_data)
                .Set(d => d.TagIds, discussionToUpdate.TagIds); // Assuming TagIds is the field where tag references are stored

            _discussionCollection.UpdateOne(discussion => discussion.Id == id, updateDef);
        }
    }
}
