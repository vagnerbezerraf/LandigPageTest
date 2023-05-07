using LandingPage.API.Models;
namespace LandingPage.API.Models
{
    public class NetPromoterScoreModel
    {
        public int? Id { get; set; }
        public int ParticipantId { get; set; }
        public ParticipantModel Participant { get; set; }
        public int Score { get; set; } 
        public int Recommendation { get; set; }
        public DateTime Date { get; set; }


    }
}
