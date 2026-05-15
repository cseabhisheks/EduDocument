namespace DotNetBackend.DTOs
{
    public class RegisterRequest
    {
        public string? Name { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Role { get; set; }
        public string? Department { get; set; }
        public string? Enrollment { get; set; }
        public object? Subjects { get; set; }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
