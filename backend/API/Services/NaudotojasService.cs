using API.Models;
using MongoDB.Driver;

namespace API.Services
{
    public class NaudotojasService
    {
        private IMongoCollection<Naudotojas> _collection;

        public NaudotojasService(MongoDatabase database)
        {
            this._collection = database.Database.GetCollection<Naudotojas>("Naudotojas");
        }

        public void AddNaudotojas(Naudotojas naudotojas)
        {
            this._collection.InsertOne(naudotojas);
        }
        /*
        public Naudotojas GetNaudotojas(Guid id)
        {
            var naudotojas = this._collection.Find(naudotojas => naudotojas.Id == id).First();
            return naudotojas;
        }

        public IEnumerable<Naudotojas> GetNaudotojai()
        {
            return this._collection.Find(Builders<Naudotojas>.Filter.Empty).ToEnumerable();
        }
        */
        public void DeleteNaudotojas(Guid id)
        {
            this._collection.DeleteOne(naudotojas => naudotojas.Id == id);
        }

        public void UpdateNaudotojas(Guid id, Naudotojas naudotojas)
        {
            var updateDef = Builders<Naudotojas>.Update
                .Set(i => i.Username, naudotojas.Username)
                .Set(i => i.Email, naudotojas.Email)
                .Set(i => i.Password, naudotojas.Password)
                .Set(i => i.Name, naudotojas.Name)
                .Set(i => i.Lastname, naudotojas.Lastname)
                .Set(i => i.Phone, naudotojas.Phone)
                .Set(i => i.BirthDate, naudotojas.BirthDate)
                .Set(i => i.Blocked, naudotojas.Blocked)
                .Set(i => i.UserType, naudotojas.UserType);

            _collection.UpdateOne(naudotojas => naudotojas.Id == id, updateDef);
        }

        public Naudotojas GetNaudotojas(Guid id)
        {
            try
            {
                var naudotojas = this._collection.Find(n => n.Id == id).FirstOrDefault();
                return naudotojas;
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine($"Error in GetNaudotojas: {ex.Message}");
                return null;
            }
        }

        public IEnumerable<Naudotojas> GetNaudotojai()
        {
            try
            {
                return this._collection.Find(Builders<Naudotojas>.Filter.Empty).ToEnumerable();
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine($"Error in GetNaudotojai: {ex.Message}");
                return Enumerable.Empty<Naudotojas>();
            }
        }

    }
}
