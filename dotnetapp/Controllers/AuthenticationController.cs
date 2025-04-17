using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
namespace dotnetapp.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("/api/login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                var (status, result) = await _authService.Login(model);
                if (status == 1)
                {
                    return Created("api/auth/login", result);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpPost("/api/register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid registration details");
                }

                var (status, result) = await _authService.Registration(model, model.UserRole);
                if (status == 1)
                {
                    return Created("api/auth/register", result);
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}
