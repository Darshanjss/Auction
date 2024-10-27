using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;

namespace AuctionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private static readonly List<User> _users = new List<User>();
        private readonly PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();

        [HttpPost("register")]
        public ActionResult Register([FromBody] RegisterUserDto registerDto)
        {
            if (_users.Any(u => u.Username == registerDto.Username || u.Email == registerDto.Email))
            {
                return BadRequest("Username or email already exists.");
            }


            var user = new User
            {
                Id = _users.Count > 0 ? _users.Max(u => u.Id) + 1 : 1,
                Username = registerDto.Username,
                Email = registerDto.Email
            };
            user.Password = _passwordHasher.HashPassword(user, registerDto.Password);

            _users.Add(user);

            return CreatedAtAction(nameof(Register), new { id = user.Id }, new { user.Username, user.Email });
        }
    }
}
