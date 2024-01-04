using API.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace API.Services
{
    public class TagsService
    {
        private readonly IMongoCollection<Zyme> _tagsCollection;
        private readonly IMongoCollection<DiskusijaZyme> _diskusijaZymeCollection;

        public TagsService(MongoDatabase database)
        {
            _tagsCollection = database.Database.GetCollection<Zyme>("Tags");
        }

        public Zyme CreateOrGetTag(string tagLabel)
        {
            // Check if the tag exists and create if it doesn't
            var existingTag = _tagsCollection.Find(t => t.Žymės_pavadinimas == tagLabel).FirstOrDefault();
            if (existingTag == null)
            {
                var newTag = new Zyme { Žymės_pavadinimas = tagLabel };
                _tagsCollection.InsertOne(newTag);
                return newTag;
            }
            return existingTag;
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

        public Zyme GetTagByName(string zymesPavadinimas)
        {
            // Assuming you want a case-insensitive search
            var filter = Builders<Zyme>.Filter.Eq(tag => tag.Žymės_pavadinimas, zymesPavadinimas);
            return _tagsCollection.Find(filter).FirstOrDefault();
        }


    }
}
