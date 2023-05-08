using LandingPage.API.Models;

namespace LandingPage.API.DataBase.Interfaces
{
    public interface INetPromoterScoreRepository
    {
        bool AddNps(NetPromoterScoreModel nps);
        IEnumerable<NetPromoterScoreModel> GetNps();
    }
}
