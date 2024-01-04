using API.Models;
using MongoDB.Driver;

namespace API.Services
{
    public class RecommendedService
    {
        private IMongoCollection<Sesijos_Perziureta_Preke> _session_viewed_collection; 
        private IMongoCollection<Preke> _item_collection;
        private IMongoCollection<Sesija> _sessions_collection;
        private IMongoCollection<Taip_Pat_Domejosi> _also_viewed_collection;

        public RecommendedService(MongoDatabase database)
        {
            _session_viewed_collection = database.Database.GetCollection<Sesijos_Perziureta_Preke>("Sesijos_Perziureta_Preke");
            _item_collection = database.Database.GetCollection<Preke>("Preke");
            _sessions_collection = database.Database.GetCollection<Sesija>("Sesija");
            _also_viewed_collection = database.Database.GetCollection<Taip_Pat_Domejosi>("Taip_Pat_Domejosi");

        }

        public void UpdateRecommended()
        {
            var sessions_to_update = _sessions_collection.Find(session => !session.Atnaujinta_Rekomendacijose).ToEnumerable();

            foreach (var session in sessions_to_update)
            {
                var viewed_in_session = _session_viewed_collection.Find(sv => sv.Sesijos_Id == session.Id).ToList();

                for (int i = 0; i < viewed_in_session.Count; i++)
                {
                    for (int j = i + 1; j < viewed_in_session.Count; j++)
                    {
                        var id1 = viewed_in_session[i].Prekes_Id;
                        var id2 = viewed_in_session[j].Prekes_Id;

                        var also_viewed = _also_viewed_collection.Find(av =>
                            (av.PrekesA_Id == id1 && av.PrekesB_Id == id2) || (av.PrekesA_Id == id2 && av.PrekesB_Id == id1)
                        ).First();

                        var update_av = Builders<Taip_Pat_Domejosi>.Update.Set(av => av.Kartojimai, also_viewed.Kartojimai + 1);
                        _also_viewed_collection.UpdateOne(av => 
                            av.PrekesA_Id == also_viewed.PrekesA_Id && av.PrekesB_Id == also_viewed.PrekesB_Id, update_av
                        );
                    }
                }
            }

            var update = Builders<Sesija>.Update.Set(s => s.Atnaujinta_Rekomendacijose, true);

            _sessions_collection.UpdateMany(s => !s.Atnaujinta_Rekomendacijose, update);
        }

        public Guid StartSession()
        {
            var session = new Sesija();
            _sessions_collection.InsertOne(session);
            return session.Id;
        }

        public IEnumerable<Sesija> GetSessions()
        {
            return _sessions_collection.Find(Builders<Sesija>.Filter.Empty).ToEnumerable();
        }

        public void AddViewedItem(Guid session_id, Guid item_id)
        {
            var vals = _session_viewed_collection.Find(sv => sv.Sesijos_Id == session_id && sv.Prekes_Id == item_id).ToList();
            if (!vals.Any())
            {
                var sessionView = new Sesijos_Perziureta_Preke(session_id, item_id);
                _session_viewed_collection.InsertOne(sessionView);

            }
        }

        public IEnumerable<Sesijos_Perziureta_Preke> GetViewed(Guid session_id)
        {
            return _session_viewed_collection.Find(sv => sv.Sesijos_Id == session_id).ToEnumerable();
        }

        public IEnumerable<Preke> GetRecommended(Guid id)
        {
            var most_av = _also_viewed_collection
                .Find(av => av.PrekesA_Id == id || av.PrekesB_Id == id)
                .ToList().OrderByDescending(av => av.Kartojimai).Take(5);

            var other_items = most_av.Select(av => findOtherId(av, id) ).ToList();

            var recommended = _item_collection.Find(i => other_items.Contains(i.Id)).ToList();

            return recommended;
        }

        private Guid findOtherId(Taip_Pat_Domejosi av, Guid id)
        {
            return av.PrekesA_Id == id ? av.PrekesB_Id : av.PrekesA_Id;
        }

        public void AddRelations(Preke item)
        {
            var other_items = _item_collection.Find(i => i.Id != item.Id).ToList();
            var av_list = new List<Taip_Pat_Domejosi>();

            foreach (var other_item in other_items)
            {
                var av = new Taip_Pat_Domejosi(item.Id, other_item.Id);
                av_list.Add(av);
            }

            _also_viewed_collection.InsertMany(av_list);
        }

        public void RecreateRelations()
        {
            _also_viewed_collection.DeleteMany(Builders<Taip_Pat_Domejosi>.Filter.Empty);
            var items = _item_collection.Find(Builders<Preke>.Filter.Empty).ToList();
            var av_list = new List<Taip_Pat_Domejosi>();

            for (int i = 0; i < items.Count; i++)
            {
                for (int j = i + 1;  j < items.Count; j++)
                {
                    var av = new Taip_Pat_Domejosi(items[i].Id, items[j].Id);
                    av_list.Add(av);
                }
            }

            _also_viewed_collection.InsertMany(av_list);
        }

        public void RemoveRelations(Guid item_id)
        {
            _also_viewed_collection.DeleteMany(av => av.PrekesA_Id == item_id || av.PrekesB_Id == item_id);
        }
    }
}
