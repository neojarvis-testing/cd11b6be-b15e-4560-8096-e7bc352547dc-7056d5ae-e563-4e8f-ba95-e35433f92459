using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    public class CakeController : ControllerBase
    {
        private readonly CakeService _cakeService;

        public CakeController(CakeService cakeService)
        {
            _cakeService = cakeService;
        }

        [HttpGet("/api/cakes")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Cake>>> GetAllCakes()
        {
            var cakes = await _cakeService.GetAllCakes();
            return Ok(cakes);
        }

        [HttpGet("/api/cakes/{cakeId}")]
        [Authorize]
        public async Task<ActionResult<Cake>> GetCakeById(int cakeId)
        {
            var cake = await _cakeService.GetCakeById(cakeId);
            if (cake == null)
                return NotFound("Cake not found");

            return Ok(cake);
        }

        [HttpPost("/api/cakes")]
        [Authorize(Roles = "Baker")]
        public async Task<ActionResult> AddCake([FromBody] Cake cake)
        {
            try
            {
                if (cake == null || string.IsNullOrEmpty(cake.Name) || cake.Price <= 0 || cake.Quantity < 0)
                {
                    return BadRequest("Invalid cake details");
                }

                var name=await _cakeService.AddCake(cake);
                if(name==false)
                    return BadRequest("A cake with this name already exists");
                return Ok("Cake added successfully");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpPut("/api/cakes/{cakeId}")]
        [Authorize(Roles = "Baker")]
        public async Task<ActionResult> UpdateCake(int cakeId, [FromBody] Cake cake)
        {
            try
            {
                var existingCake = await _cakeService.GetCakeById(cakeId);
                if (existingCake == null)
                {
                    return NotFound("Cake not found");
                }

                var cate = await _cakeService.UpdateCake(cakeId, cake);
                if(cate==false)
                    return BadRequest("A cake with this category already exists");
                return Ok("Cake updated successfully");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpDelete("/api/cakes/{cakeId}")]
        [Authorize(Roles = "Baker")]
        public async Task<ActionResult> DeleteCake(int cakeId)
        {
            try
            {
                var existingCake = await _cakeService.GetCakeById(cakeId);
                if (existingCake == null)
                {
                    return NotFound("Cake not found");
                }

                await _cakeService.DeleteCake(cakeId);
                return Ok("Cake deleted successfully");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }
    }
}