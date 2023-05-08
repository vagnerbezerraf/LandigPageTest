using LandingPage.API.Models;

namespace LandingPage.API.DataBase.Interfaces
{
    public interface IFeedRepository
    {
        IEnumerable<FeedModel> GetFeeds();
    }
}
