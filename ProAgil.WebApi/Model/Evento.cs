using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ProAgil.WebApi.Controllers
{
   public class Evento
   {
       public int EventoId { get; set; }

       public string Local { get; set; }

       public string DataEvento { get; set; }

       public string Tema { get; set; }

       public int QtdPessoas { get; set; }

       public string Lote { get; set; }

       public string ImagemURL { get; set; }
       
   }
}