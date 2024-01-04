using API.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public class TagsService
    {
        private readonly IMongoCollection<Zyme> _tagsCollection;

        public TagsService(MongoDatabase database)
        {
            _tagsCollection = database.Database.GetCollection<Zyme>("Tags");
        }

        public List<Zyme> GetAllTags()
        {
            return _tagsCollection.Find(tag => true).ToList();
        }

        public Zyme GetTagById(Guid id)
        {
            return _tagsCollection.Find(tag => tag.Id == id).FirstOrDefault();
        }

        public void CreateTag(Zyme tag)
        {
            // Ensure the ID is unique or let MongoDB handle it if using ObjectId
            tag.Id = Guid.NewGuid();
            _tagsCollection.InsertOne(tag);
        }

    }
}
