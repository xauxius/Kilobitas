using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace API.Models
{
    public class Discussion
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("Pavadinimas")]
        public string? Pavadinimas { get; set; }

        [BsonElement("Turinys")]
        public string? Turinys { get; set; }

        [BsonElement("Kategorija")]
        public string? Kategorija { get; set; }

        [BsonElement("Kurėjo_vardas")]
        public string? Kurėjo_vardas { get; set; }

        [BsonElement("Kurėjo_Pavardė")]
        public string? Kurėjo_Pavardė { get; set; }

        [BsonElement("Sukurimo_data")]
        public DateTime Sukurimo_data { get; set; }

        [BsonElement("TagIds")]
        public List<Guid> TagIds { get; set; } = new List<Guid>();

        [BsonElement("TagsArray")]
        public List<Zyme> Tags { get; set; }

    }
}
