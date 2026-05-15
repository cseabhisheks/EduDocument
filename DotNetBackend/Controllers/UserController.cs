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
    [Route("api/users")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly MongoDbService _dbService;

        public UserController(MongoDbService dbService)
        {
            _dbService = dbService;
        }

        private object StripPassword(User u)
        {
            return new
            {
                _id = u.Id,
                name = u.Name,
                email = u.Email,
                role = u.Role,
                department = u.Department,
                enrollment = u.Enrollment,
                subjects = u.Subjects,
                createdAt = u.CreatedAt,
                updatedAt = u.UpdatedAt
            };
        }

        [HttpGet]
        public async Task<IActionResult> ListUsers([FromQuery] string? role)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null || user.Role != "Admin") return StatusCode(403, new { message = "Forbidden" });

            var filter = Builders<User>.Filter.Empty;
            if (!string.IsNullOrEmpty(role))
            {
                filter = Builders<User>.Filter.Eq(u => u.Role, role);
            }

            var users = await _dbService.Users.Find(filter)
                .SortByDescending(u => u.CreatedAt)
                .ToListAsync();

            return Ok(users.Select(StripPassword));
        }

        [HttpGet("department-students")]
        public async Task<IActionResult> ListDepartmentStudents()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null || (user.Role != "Admin" && user.Role != "Faculty"))
            {
                return StatusCode(403, new { message = "Forbidden" });
            }

            var builder = Builders<User>.Filter;
            var filter = builder.Eq(u => u.Role, "Student");

            if (user.Role == "Faculty")
            {
                filter &= builder.Eq(u => u.Department, user.Department ?? "");
            }

            var users = await _dbService.Users.Find(filter)
                .SortBy(u => u.Name)
                .ToListAsync();

            return Ok(users.Select(StripPassword));
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] RegisterRequest req)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var currentUser = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (currentUser == null || currentUser.Role != "Admin")
            {
                return StatusCode(403, new { message = "Forbidden" });
            }

            var userToUpdate = await _dbService.Users.Find(u => u.Id == id).FirstOrDefaultAsync();
            if (userToUpdate == null) return NotFound(new { message = "User not found" });

            if (req.Name != null) userToUpdate.Name = req.Name;
            if (req.Email != null) userToUpdate.Email = req.Email;
            if (req.Role != null) userToUpdate.Role = req.Role;
            if (req.Department != null) userToUpdate.Department = req.Department;
            if (req.Enrollment != null) userToUpdate.Enrollment = req.Enrollment;

            if (req.Subjects != null)
            {
                var subjectsList = new List<string>();
                if (req.Subjects is JsonElement el)
                {
                    if (el.ValueKind == JsonValueKind.Array)
                    {
                        foreach (var item in el.EnumerateArray())
                        {
                            subjectsList.Add(item.GetString()!);
                        }
                    }
                    else if (el.ValueKind == JsonValueKind.String)
                    {
                        var str = el.GetString();
                        if (!string.IsNullOrEmpty(str))
                        {
                            subjectsList = str.Split(',').Select(s => s.Trim()).Where(s => !string.IsNullOrEmpty(s)).ToList();
                        }
                    }
                }
                userToUpdate.Subjects = subjectsList;
            }

            if (!string.IsNullOrEmpty(req.Password))
            {
                userToUpdate.Password = BCrypt.Net.BCrypt.HashPassword(req.Password);
            }

            if (userToUpdate.Role != "Faculty")
            {
                userToUpdate.Subjects = new List<string>();
            }

            userToUpdate.UpdatedAt = DateTime.UtcNow;

            await _dbService.Users.ReplaceOneAsync(u => u.Id == id, userToUpdate);

            return Ok(StripPassword(userToUpdate));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _dbService.Users.Find(u => u.Id == userId).FirstOrDefaultAsync();
            if (user == null || user.Role != "Admin") return StatusCode(403, new { message = "Forbidden" });

            if (id == userId) return BadRequest(new { message = "Cannot delete your own account" });

            var result = await _dbService.Users.DeleteOneAsync(u => u.Id == id);
            if (result.DeletedCount == 0) return NotFound(new { message = "User not found" });

            return Ok(new { message = "User deleted" });
        }
    }
}
