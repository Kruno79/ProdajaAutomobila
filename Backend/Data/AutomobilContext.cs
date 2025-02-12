using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AutomobilContext : DbContext
    {

        public AutomobilContext(DbContextOptions<AutomobilContext> opcije) : base(opcije)
        {
            
        }


        public DbSet<Automobil> Automobili { get; set; } 

    }
}
