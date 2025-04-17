using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Cake
    {
        public int CakeId{get;set;}
        public string Name{get;set;}
        public string Category{get;set;}
        public decimal Price{get;set;}
        public decimal Quantity{get;set;}
        public string CakeImage{get;set;}
    }
}