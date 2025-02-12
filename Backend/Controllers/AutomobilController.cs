
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

        [HttpPost]
        public IActionResult Post(Automobil automobil)
        {
            try
            {
                _context.Automobili.Add(automobil);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, automobil);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Automobil automobil)
        {
            try
            {

                var automobilBaza = _context.Automobili.Find(sifra);
                if (automobilBaza == null)
                {
                    return NotFound(new { poruka = $"Automobil s šifrom {sifra} ne postoji" });
                }

                // rucni mapping - kasnije automatika
                automobilBaza.Naziv = automobil.Naziv;
                automobilBaza.Trajanje = automobil.Trajanje;
                automobilBaza.CijenaSmjera = automobil.CijenaSmjera;
                automobilBaza.vaucer = automobil.vaucer;
                automobilBaza.IzvodiSeOd = automobil.IzvodiSeOd;

                _context.Automobili.Update(automobilBaza);
                _context.SaveChanges();
                return Ok(automobilBaza);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var automobil = _context.Automobil.Find(sifra);
                if (automobil == null)
                {
                    return NotFound(new { poruka = $"Automobil s šifrom {sifra} ne postoji" });
                }
                _context.Automobili.Remove(automobil);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }




    }
}
