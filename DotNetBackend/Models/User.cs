using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace DotNetBackend.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("_id")]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string? Name { get; set; }

        [BsonElement("email")]
        public string Email { get; set; } = null!;

        [BsonElement("password")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Password { get; set; }

        [BsonElement("role")]
        public string Role { get; set; } = "Student";

        [BsonElement("department")]
        public string? Department { get; set; }

        [BsonElement("enrollment")]
        public string? Enrollment { get; set; }

        [BsonElement("subjects")]
        public List<string> Subjects { get; set; } = new();

        [BsonElement("createdAt")]
        public DateTime? CreatedAt { get; set; }

        [BsonElement("updatedAt")]
        public DateTime? UpdatedAt { get; set; }
    }
}
