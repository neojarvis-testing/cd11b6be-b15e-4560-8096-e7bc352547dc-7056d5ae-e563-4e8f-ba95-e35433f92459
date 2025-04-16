using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        // try
        // {
        //     //var (token) = await _authService.Login(model);
        //    // return Created("api/auth/login", new { Token = token });

        // }
        // catch (Exception ex)
        // {
        //     return StatusCode(500, $"Error: {ex.Message}");
        // }
        if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
 
            var (statusCode, result) = await _authService.Login(model);
            if (statusCode == 400)
            {
                return BadRequest(new { Message = result });
            }
 
            return Ok(result);
    }

    [HttpPost("/api/register")]
    public async Task<IActionResult> Register([FromBody] User model)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid registration details");

            await _authService.Registration(model, model.UserRole);
            return Created("api/auth/register", "User registered successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
}

}
