using Dapper;
using LandingPage.API.DataBase.Interfaces;
using LandingPage.API.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Caching.Memory;

namespace LandingPage.API.DataBase
{
    public class FeedRepository : BaseRepository, IFeedRepository
    {
        public FeedRepository(IMemoryCache cache) : base(cache)
        {
        }

        public IEnumerable<FeedModel> GetFeeds()
        {
            var sql = "select * from Feed";
            using (var connection = new SqlConnection(_connString))
            {
                connection.Open();
                return connection.Query<FeedModel>(sql);
            }
        }
    }
}
