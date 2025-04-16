using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace dotnetapp.Services
{
    public class AuthService:IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        public AuthService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context)
            {
                _userManager=userManager;
                _roleManager=roleManager;
                _configuration=configuration;
                _context=context;
            }
    public async Task<(int, string)> Registration (User model, string role)
    {
        try
        {
        var existingUser=await _userManager.FindByEmailAsync(model.Email);
        if(existingUser!=null)
        {
            return (0, "User already exists");
        }
        var user=new ApplicationUser
        {
            UserName=model.Username,
            Email=model.Email,
            PhoneNumber=model.MobileNumber,
            Name=model.Username
        };
        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
            return (0, "User creation failed! Please check user details and try again.");
        }
        if (!await _roleManager.RoleExistsAsync(role))
        {
            await _roleManager.CreateAsync(new IdentityRole(role));
        }
            await _userManager.AddToRoleAsync(user, role);
            return (1, "User created successfully!");
    }
    catch(Exception ex)
    {
        Console.WriteLine($"Error during registration: {ex.Message}");
        return (0, "An unexpected error occurred. Please try again later.");
    }
    }
    public async Task<(int, object)>Login (LoginModel model)
    {
        try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return (0, "Invalid email");
                }
                var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
                if (!isPasswordValid)
                {
                    return (0, "Invalid password");
                }
                var userRoles = await _userManager.GetRolesAsync(user);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Email, user.Email)
                };
                foreach (var role in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }
                var token = GenerateToken(claims);
                return (1, new { Token = token });
            }
        catch (Exception ex)
            {
                Console.WriteLine($"Error during login: {ex.Message}");
                return (0, "An unexpected error occurred. Please try again later.");
            }
    }
    private string GenerateToken(IEnumerable<Claim> claims)
        {
            var jwtSettings = _configuration.GetSection("JWT");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = jwtSettings["ValidIssuer"],
                Audience = jwtSettings["ValidAudience"],
                SigningCredentials = credentials
            };
 
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
 
            return tokenHandler.WriteToken(token);
        }
 
    }
}
