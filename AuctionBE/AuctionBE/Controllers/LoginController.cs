using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Collections.Generic;

namespace AuctionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private static readonly List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "john_doe", Email = "john@example.com", PasswordHash = new PasswordHasher<User>().HashPassword(null, "password123") }
        };

        private readonly PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequestDto loginDto)
        {
            var user = _users.FirstOrDefault(u => u.Email == loginDto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

        
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Invalid email or password.");
            }
            return Ok(new { Message = "Login successful", UserId = user.Id, Username = user.Username });
        }
    }
}
