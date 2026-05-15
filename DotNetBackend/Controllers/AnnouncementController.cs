using DotNetBackend.Models;
using DotNetBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Security.Claims;

namespace DotNetBackend.Controllers
{
    [ApiController]
    [Route("api/announcements")]
    [Authorize]
    public class AnnouncementController : ControllerBase
    {
        private readonly MongoDbService _dbService;

        public AnnouncementController(MongoDbService dbService)
        {
            _dbService = dbService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAnnouncement([FromBody] Announcement req)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null || (user.Role != "Admin" && user.Role != "Faculty"))
            {
                return StatusCode(403, new { message = "Only Admin or Faculty can post announcements" });
            }

            var announcement = new Announcement
            {
                Title = req.Title,
                Description = req.Description,
                Author = req.Author ?? (string.IsNullOrEmpty(user.Name) ? user.Email : user.Name),
                Role = req.Role ?? user.Role,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _dbService.Announcements.InsertOneAsync(announcement);

            return StatusCode(201, new { message = "Announcement created ✅", data = announcement });
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAnnouncements()
        {
            var announcements = await _dbService.Announcements.Find(_ => true)
                .SortByDescending(a => a.CreatedAt)
                .ToListAsync();

            return Ok(announcements);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncement(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null || user.Role != "Admin")
            {
                return StatusCode(403, new { message = "Only Admin can delete announcements" });
            }

            var result = await _dbService.Announcements.DeleteOneAsync(a => a.Id == id);
            if (result.DeletedCount == 0)
            {
                return NotFound(new { message = "Announcement not found" });
            }

            return Ok(new { message = "Announcement deleted" });
        }
    }
}
