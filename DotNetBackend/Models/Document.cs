using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace DotNetBackend.Models
{
    [BsonIgnoreExtraElements]
    public class Document
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonPropertyName("_id")]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string? Title { get; set; }

        [BsonElement("department")]
        public string? Department { get; set; }

        [BsonElement("subject")]
        public string? Subject { get; set; }

        [BsonElement("category")]
        public string? Category { get; set; }

        [BsonElement("fileName")]
        public string? FileName { get; set; }

        [BsonElement("fileUrl")]
        public string? FileUrl { get; set; }

        [BsonElement("uploadedBy")]
        public string? UploadedBy { get; set; }

        [BsonElement("uploaderId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? UploaderId { get; set; }

        [BsonElement("uploaderRole")]
        public string? UploaderRole { get; set; }

        [BsonElement("assignmentKind")]
        [BsonIgnoreIfNull]
        public string? AssignmentKind { get; set; }

        [BsonElement("createdAt")]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
