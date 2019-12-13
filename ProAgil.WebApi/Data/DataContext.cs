using Microsoft.EntityFrameworkCore;
using ProAgil.WebApi.Controllers;

namespace ProAgil.WebApi.Data
{
    public class DataContext : DbContext   
    {
         public DataContext(DbContextOptions<DataContext> options): base (options){}

         public DbSet<Evento> Eventos { get; set; }    
    } 
}