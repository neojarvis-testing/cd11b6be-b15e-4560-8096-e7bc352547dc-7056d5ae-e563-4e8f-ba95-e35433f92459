using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public class CakeService{
        private readonly ApplicationDbContext _context;
        public CakeService(ApplicationDbContext context){
            _context = context;
        }
        public async Task<IEnumerable<Cake>> GetAllCakes(){
            return await _context.Cakes.ToListAsync();
        }
        public async Task<Cake> GetCakeById(int cakeId){
            return await _context.Cakes.FindAsync(cakeId);
        }
        public async Task<bool> AddCake(Cake cake){
            var exists = await _context.Cakes.FirstOrDefaultAsync(c=>c.Name==cake.Name);
            if(exists!= null){
                return false;
            }
            _context.Cakes.Add(cake);
            await _context.SaveChangesAsync();
            return true;
        }
        
        // public async Task<bool> UpdateCake(int cakeId,Cake cake){
        //     var exists1 = await _context.Cakes.FindAsync(cakeId);
        //     if(exists1==null){
        //         return false;
        //     }
        //     var exists2 = await _context.Cakes.FirstOrDefaultAsync(c=>c.Category ==cake.Category && c.CakeId !=cakeId);
        //     if(exists2 != null){
        //         return false;
        //     }
 
        //     exists1.Name=cake.Name;
        //     exists1.Category = cake.Category;
        //     exists1.Price = cake.Price;
        //     exists1.Quantity = cake.Quantity;
        //     exists1.CakeImage = cake.CakeImage;
 
        //     await _context.SaveChangesAsync();
        //     return true;
        // }


        public async Task<bool> UpdateCake(int cakeId, Cake cake)
        {
            var existingCake = await _context.Cakes.FindAsync(cakeId);
            if (existingCake == null)
            {
                return false;
            }
            existingCake.Name = !string.IsNullOrEmpty(cake.Name) ? cake.Name : existingCake.Name;
            existingCake.Category = !string.IsNullOrEmpty(cake.Category) ? cake.Category : existingCake.Category;
            existingCake.Quantity = cake.Quantity > 0 ? cake.Quantity : existingCake.Quantity;
            existingCake.Price = cake.Price > 0 ? cake.Price : existingCake.Price;
            existingCake.CakeImage = !string.IsNullOrEmpty(cake.CakeImage) ? cake.CakeImage : existingCake.CakeImage;

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeleteCake(int cakeId){
         var delcake = await _context.Cakes.FindAsync(cakeId);
         if(delcake==null){
            return false;
         }
         _context.Cakes.Remove(delcake);
         await _context.SaveChangesAsync();
         return true;
        }
    }
}