
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers

{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AutomobilController : ControllerBase
    {

        private readonly EdunovaContext _context;

        public AutomobilController(EdunovaContext context)
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
                var smjer = _context.Automobili.Find(id);
                if (smjer == null)
                {
                    return NotFound($"Automobil s sifrom {id} ne postoji");
                }
                return Ok(smjer);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


       

    }
}
