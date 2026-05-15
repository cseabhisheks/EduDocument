using DotNetBackend.DTOs;
using DotNetBackend.Models;
using DotNetBackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace DotNetBackend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly MongoDbService _dbService;
        private readonly IConfiguration _configuration;

        public AuthController(MongoDbService dbService, IConfiguration configuration)
        {
            _dbService = dbService;
            _configuration = configuration;
        }

        private string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"]);
            
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim("email", user.Email),
                new Claim("role", user.Role),
                new Claim("name", user.Name ?? ""),
                new Claim("department", user.Department ?? "")
            };

            if (user.Subjects != null && user.Subjects.Count > 0)
            {
                claims.Add(new Claim("subjects", JsonSerializer.Serialize(user.Subjects)));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest req)
        {
            if (string.IsNullOrEmpty(req.Email) || string.IsNullOrEmpty(req.Password))
                return BadRequest(new { message = "Required fields missing" });

            var exists = await _dbService.Users.Find(u => u.Email == req.Email).FirstOrDefaultAsync();
            if (exists != null)
                return BadRequest(new { message = "User already exists ❌" });

            var role = !string.IsNullOrEmpty(req.Role) ? req.Role : "Student";
            var subjectsList = new List<string>();
            
            if (role == "Faculty" && req.Subjects != null)
            {
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
                else if (req.Subjects is string strSubjects)
                {
                    subjectsList = strSubjects.Split(',').Select(s => s.Trim()).Where(s => !string.IsNullOrEmpty(s)).ToList();
                }
            }

            var user = new User
            {
                Name = req.Name,
                Email = req.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(req.Password),
                Role = role,
                Department = req.Department,
                Enrollment = req.Enrollment,
                Subjects = role == "Faculty" ? subjectsList : new List<string>(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _dbService.Users.InsertOneAsync(user);
            
            // Remove password before returning
            user.Password = null;
            
            return StatusCode(201, new { message = "Registered successfully ✅", user });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _dbService.Users.Find(u => u.Email == req.Email).FirstOrDefaultAsync();
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials ❌" });
            }

            bool passwordIsValid = false;
            if (!string.IsNullOrEmpty(user.Password))
            {
                if (user.Password.StartsWith("$2"))
                {
                    passwordIsValid = BCrypt.Net.BCrypt.Verify(req.Password, user.Password);
                }
                else
                {
                    passwordIsValid = (req.Password == user.Password);
                }
            }

            if (!passwordIsValid)
            {
                return Unauthorized(new { message = "Invalid credentials ❌" });
            }

            var token = GenerateToken(user);
            user.Password = null;

            return Ok(new
            {
                message = "Login successful ✅",
                token,
                user
            });
        }
    }
}
