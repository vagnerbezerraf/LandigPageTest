using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using LandingPage.API.Models;
using Microsoft.Data.SqlClient;
using Dapper;
using LandingPage.API.DataBase.Interfaces;

namespace LandingPage.API.DataBase
{
    public class CachedFeedRepository : BaseRepository, ICachedFeedRepository
    {
        public CachedFeedRepository(IMemoryCache cache) : base(cache)
        {
        }

        public IEnumerable<FeedModel> GetFeeds()
        {
            //Consulta no banco de dados e converte para um objeto list.
            //Adiciona uma camada de cache responder de forma imediata,
            //com o objetivo de prover dados que não tenham mudanças constantes,
            //como um feed de notícias
            //ou um feed de rede social, 
            var feeds = _memoryCache.GetOrCreate("FeedKey", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(10);
                entry.SetPriority(CacheItemPriority.High);
                return GetDataBaseFeeds().OrderBy(a => a.Date).ToList();
            });

            return feeds;
        }
        private IEnumerable<FeedModel> GetDataBaseFeeds()
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
