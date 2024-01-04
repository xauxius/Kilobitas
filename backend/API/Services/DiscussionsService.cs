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


        public DiscussionsService(MongoDatabase database)
        {
            _discussionCollection = database.Database.GetCollection<Discussion>("Discussions");
        }

        public List<Discussion> GetDiscussions()
        {
            var discussions = _discussionCollection
                                .Aggregate()
                                .As<Discussion>()
                                .ToList();

            return discussions;
        }

        public Discussion GetDiscussion(Guid id)
        {
            var discussions = _discussionCollection.Find(_ => true).ToList();
            return discussions.FirstOrDefault(d => d.Id == id);
        }

        public List<Discussion> GetDiscussionsByCategory(string category)
        {
            return _discussionCollection.Find(d => d.Kategorija == category).ToList();
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
                .Set(d => d.Sukurimo_data, discussionToUpdate.Sukurimo_data);

            _discussionCollection.UpdateOne(discussion => discussion.Id == id, updateDef);
        }
    }
}
