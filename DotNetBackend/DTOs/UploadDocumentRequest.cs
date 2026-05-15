using Microsoft.AspNetCore.Http;

namespace DotNetBackend.DTOs
{
    public class UploadDocumentRequest
    {
        public string? Title { get; set; }
        public string? Department { get; set; }
        public string? Subject { get; set; }
        public string? Category { get; set; }
        public string? UploadedBy { get; set; }
        public IFormFile? File { get; set; }
    }
}
