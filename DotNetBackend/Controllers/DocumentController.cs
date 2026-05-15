using DotNetBackend.DTOs;
using DotNetBackend.Models;
using DotNetBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Security.Claims;
using System.Text.Json;

namespace DotNetBackend.Controllers
{
    [ApiController]
    [Route("api/documents")]
    [Authorize]
    public class DocumentController : ControllerBase
    {
        private readonly MongoDbService _dbService;
        private readonly IWebHostEnvironment _env;

        public DocumentController(MongoDbService dbService, IWebHostEnvironment env)
        {
            _dbService = dbService;
            _env = env;
        }

        private FilterDefinition<Document> BuildScopeFilter(User user)
        {
            var builder = Builders<Document>.Filter;
            if (user == null || user.Role == "Admin") return builder.Empty;

            if (user.Role == "Faculty")
            {
                var dept = user.Department ?? "";
                var teaching = user.Subjects ?? new List<string>();

                var assignmentMatch = builder.And(
                    builder.Eq(d => d.Category, "Assignment"),
                    builder.Eq(d => d.Department, dept)
                );

                if (teaching.Count > 0)
                {
                    assignmentMatch &= builder.In(d => d.Subject, teaching);
                }

                return builder.Or(
                    builder.Eq(d => d.UploaderId, user.Id),
                    assignmentMatch
                );
            }

            // Student
            var studentDept = user.Department ?? "";
            if (string.IsNullOrEmpty(studentDept))
            {
                return builder.And(
                    builder.Eq(d => d.Category, "Assignment"),
                    builder.Eq(d => d.UploaderId, user.Id)
                );
            }

            return builder.Or(
                builder.And(
                    builder.Ne(d => d.Category, "Assignment"),
                    builder.Eq(d => d.Department, studentDept)
                ),
                builder.And(
                    builder.Eq(d => d.Category, "Assignment"),
                    builder.Eq(d => d.UploaderId, user.Id)
                ),
                builder.And(
                    builder.Eq(d => d.Category, "Assignment"),
                    builder.Eq(d => d.Department, studentDept),
                    builder.Or(
                        builder.Eq(d => d.AssignmentKind, "handout"),
                        builder.In(d => d.UploaderRole, new[] { "Faculty", "Admin" })
                    )
                )
            );
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument([FromForm] UploadDocumentRequest req)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) return Unauthorized(new { message = "User not found" });

            var role = user.Role;
            var finalCategory = req.Category;

            if (role == "Student") finalCategory = "Assignment";

            if (role == "Student" && finalCategory != "Assignment")
            {
                return StatusCode(403, new { message = "Students may only submit assignments" });
            }

            if (req.File == null || req.File.Length == 0)
                return BadRequest("No file uploaded");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}-{req.File.FileName}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await req.File.CopyToAsync(stream);
            }

            var doc = new Document
            {
                Title = req.Title,
                Department = req.Department,
                Subject = req.Subject,
                Category = finalCategory,
                UploadedBy = !string.IsNullOrEmpty(req.UploadedBy) ? req.UploadedBy : user.Email,
                UploaderId = user.Id,
                UploaderRole = role,
                FileName = req.File.FileName,
                FileUrl = $"uploads\\{fileName}", // matching original multer logic
                CreatedAt = DateTime.UtcNow
            };

            if (finalCategory == "Assignment")
            {
                doc.AssignmentKind = role == "Student" ? "submission" : "handout";
            }

            await _dbService.Documents.InsertOneAsync(doc);

            return Ok(new
            {
                success = true,
                message = "Uploaded successfully",
                data = doc
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetDocuments()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) return Unauthorized(new { message = "User not found" });

            var filter = BuildScopeFilter(user);
            var docs = await _dbService.Documents.Find(filter).SortByDescending(d => d.CreatedAt).ToListAsync();

            return Ok(docs);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null) return Unauthorized(new { message = "User not found" });

            var doc = await _dbService.Documents.Find(d => d.Id == id).FirstOrDefaultAsync();
            if (doc == null) return NotFound(new { message = "Document not found" });

            var role = user.Role;

            if (role == "Admin")
            {
                await _dbService.Documents.DeleteOneAsync(d => d.Id == id);
                return Ok(new { message = "Deleted" });
            }

            if (doc.UploaderId != userId)
            {
                return StatusCode(403, new { message = "Forbidden" });
            }

            if (role == "Student" && doc.Category != "Assignment")
            {
                return StatusCode(403, new { message = "Forbidden" });
            }

            if (role == "Faculty" && (doc.AssignmentKind == "submission" || doc.UploaderRole == "Student"))
            {
                return StatusCode(403, new { message = "Faculty cannot delete student submissions" });
            }

            await _dbService.Documents.DeleteOneAsync(d => d.Id == id);
            return Ok(new { message = "Deleted" });
        }
    }
}
