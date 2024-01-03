using API.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace API.Services
{
	public class KrepselisService
	{
		private IMongoCollection<Krepselis> _krepselisCollection;
		private readonly IMongoCollection<Preke> _prekeCollection;

		public KrepselisService(MongoDatabase database)
		{
			_krepselisCollection = database.Database.GetCollection<Krepselis>("Krepselis");
			_prekeCollection = database.Database.GetCollection<Preke>("Preke");
		}

		public void AddKrepselis(Krepselis item)
		{
			_krepselisCollection.InsertOne(item);
		}

		public List<PrekiuKrepselis> GetPrekiuKrepseliai(Guid userId)
		{
			var prekiuKrepseliai = _krepselisCollection
				.Find(item => item.Vartotojo_id == userId)
				.ToList();

			var result = new List<PrekiuKrepselis>();

			foreach (var krepselis in prekiuKrepseliai)
			{
				var preke = _prekeCollection.Find(p => p.Id == krepselis.Preke_id).FirstOrDefault();

				if (preke != null)
				{
					var prekiuKrepselis = new PrekiuKrepselis
					{
						Id = krepselis.Id,
						Preke_id = krepselis.Preke_id,
						Vartotojo_id = krepselis.Vartotojo_id,
						Kiekis = krepselis.Kiekis,
						Pavadinimas = preke.Pavadinimas,
						Kaina = preke.Kaina
					};

					result.Add(prekiuKrepselis);
				}
			}

			return result;
		}

		public void DeleteKrepselis(Guid id)
		{
			_krepselisCollection.DeleteOne(item => item.Id == id);
		}

		public void UpdateKrepselis(Guid id, Krepselis item)
		{
			var updateDef = Builders<Krepselis>.Update
				.Set(i => i.Kiekis, item.Kiekis);

			_krepselisCollection.UpdateOne(item => item.Id == id, updateDef);
		}
	}
}
