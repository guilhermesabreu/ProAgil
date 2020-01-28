using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebApi.Dtos
{
    public class RedeSocialDto
    {
        public string Id { get; set; }
        
        [Required(ErrorMessage="O campo {0} é obrigatório")]
        public string Nome { get; set; }
        [Required(ErrorMessage="O campo {0} é obrigatório")]
        public string URL { get; set; }
    }
}