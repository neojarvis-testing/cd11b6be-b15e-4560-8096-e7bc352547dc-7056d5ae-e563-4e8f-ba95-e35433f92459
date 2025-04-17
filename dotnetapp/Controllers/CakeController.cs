using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
   // [Route("api/[controller]")]
    public class CakeController : ControllerBase
    {
        private readonly CakeService _cakeService;

        public CakeController(CakeService icakeService)
        {
            _cakeService = icakeService;
        } 

        [HttpGet("/api/cakes")]
        public async Task<ActionResult<IEnumerable<Cake>>> GetAllCakes()
        {
            var cakes = await _cakeService.GetAllCakes();
            return Ok(cakes);
        }

        [HttpGet("/api/cakes/{cakeId}")]
        public async Task<ActionResult<Cake>> GetCakeById(int cakeId)
        {
            var cake = await _cakeService.GetCakeById(cakeId);
            if (cake == null)
                return NotFound("Cannot find any cake");

            return Ok(cake);
        }

        [HttpPost("/api/cakes")]
        public async Task<ActionResult> AddCake([FromBody] Cake cake)
        {
            try
            {
                if(cake==null) return BadRequest("Failed to add cake");

                await _cakeService.AddCake(cake);
                return Ok("Cake added successfully");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPut("/api/cakes/{cakeId}")]
        public async Task<ActionResult> UpdateCake(int cakeId, [FromBody] Cake cake)
        {
            try
            {
                var success = await _cakeService.GetCakeById(cakeId);
                if (success== null){
                     return NotFound("Cannot find any cake");
                }
                await _cakeService.UpdateCake(cakeId, cake);
                return Ok("Cake updated successfully");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpDelete("/api/cakes/{cakeId}")]
        public async Task<ActionResult> DeleteCake(int cakeId)
        {
            try
            {
                var success = await _cakeService.GetCakeById(cakeId) ;
            if (success== null){
                return NotFound("Cannot find any cake");
            }  
                _cakeService.DeleteCake(cakeId);
                return Ok("Cake deleted successfully");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
    }
}