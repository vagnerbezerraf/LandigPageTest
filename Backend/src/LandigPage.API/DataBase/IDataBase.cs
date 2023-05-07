using LandingPage.API.Models;

namespace LandingPage.API.DataBase
{
    public interface IDataBase
    {
        IEnumerable<FeedModel> GetFeeds();
        IEnumerable<NetPromoterScoreModel> GetNps();
        IEnumerable<ParticipantModel> GetParticipants();
    }
}
