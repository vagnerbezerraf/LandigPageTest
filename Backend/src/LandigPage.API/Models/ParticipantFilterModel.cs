namespace LandingPage.API.Models
{
    public class ParticipantFilterModel
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? WhoNominated { get; set; }        

    }
}
