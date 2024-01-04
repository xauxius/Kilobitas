using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using System;

public class DiskusijaZyme
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("DiskusijaId")]
    [BsonRepresentation(BsonType.String)]
    public Guid DiskusijaId { get; set; }

    [BsonElement("ZymeId")]
    [BsonRepresentation(BsonType.String)]
    public Guid ZymeId { get; set; }
}
