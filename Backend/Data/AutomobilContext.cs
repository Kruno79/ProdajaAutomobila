using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AutomobilContext : DbContext
    {

        public AutomobilContext(DbContextOptions<AutomobilContext> opcije) : base(opcije)
        {
            
        }


        public DbSet<AutomobilContext> Automobili { get; set; } 

    }
}
