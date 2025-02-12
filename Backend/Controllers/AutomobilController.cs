
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Automobil.Controllers

{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AutomobilController : ControllerBase
    {

        private readonly AutomobilContext _context;

        public AutomobilController(AutomobilContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Automobili);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var automobil = _context.Automobili.Find(id);
                if (automobil == null)
                {
                    return NotFound($"Automobil s sifrom {id} ne postoji");
                }
                return Ok(automobil);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


       

    }
}
