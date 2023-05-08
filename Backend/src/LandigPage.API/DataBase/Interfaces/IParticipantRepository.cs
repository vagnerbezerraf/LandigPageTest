using LandingPage.API.Models;

namespace LandingPage.API.DataBase.Interfaces
{
    public interface IParticipantRepository
    {
        ParticipantModel AddParticipant(ParticipantModel participant);
        IEnumerable<ParticipantModel> GetParticipants(ParticipantFilterModel modelFilter);
    }
}
