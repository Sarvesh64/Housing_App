using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dc;
        public CityController(DataContext dc)
        {
            this.dc = dc;
        }

        [HttpGet]
        public IActionResult GetCities()
        {
            var cities = dc.Cities.ToList();
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Mumbai";
        }

    }
}
