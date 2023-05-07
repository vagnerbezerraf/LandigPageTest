using LandingPage.API.Models;

namespace LandingPage.API.DataBase
{
    public interface ICacheFeedRepository
    {
        IEnumerable<FeedModel> GetFeeds();
    }
}