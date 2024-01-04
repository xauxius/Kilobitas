using API.Models;
using API.Models.DTO;
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
        }

        public Guid StartSession()
        {
            var session = new Sesija();
            _sessions_collection.InsertOne(session);
            return session.Id;
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

        public IEnumerable<Preke> GetRecommended(Guid id)
        {
            var most_av = _also_viewed_collection
                .Find(av => av.PrekesA_Id == id || av.PrekesB_Id == id)
                .ToList().OrderBy(av => av.Kartojimai).Take(5);

            var other_items = most_av.Select(av => findOtherId(av, id) ).ToList();

            var recommended = _item_collection.Find(i => other_items.Contains(i.Id)).ToList();

            return recommended;
        }

        private Guid findOtherId(Taip_Pat_Domejosi av, Guid id)
        {
            return av.PrekesA_Id == id ? av.PrekesB_Id : av.PrekesA_Id;
        }
    }
}
