using Dapper;
using Microsoft.Data.SqlClient;
using LandingPage.API.Models;
using LandingPage.API.DataBase.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace LandingPage.API.DataBase
{
    public class NetPromoterScoreRepository : BaseRepository, INetPromoterScoreRepository
    {
        public NetPromoterScoreRepository(IMemoryCache cache) : base(cache)
        {
        }

        public IEnumerable<NetPromoterScoreModel> GetNps()
        {
            var sql = "select * from NetPromoterScore nps LEFT JOIN Participant p ON nps.ParticipantId = p.Id";
            using (var connection = new SqlConnection(_connString))
            {
                connection.Open();
                return connection.Query<NetPromoterScoreModel, ParticipantModel, NetPromoterScoreModel>(sql, (netPromoterScore, participant) =>
                {
                    netPromoterScore.Participant = participant;
                    return netPromoterScore;
                }, splitOn: "ParticipantId");
            }
        }

        public bool AddNps(NetPromoterScoreModel nps)
        {
            var sql = @"INSERT INTO 
                            [NetPromoterScore]
                               ([ParticipantId]
                               ,[Score]
                               ,[Recommendation]
                               ,[Date])
                         VALUES
                           (@ParticipantId
                           ,@Score
                           ,@Recommendation
                           ,@Date)";

            using (var connection = new SqlConnection(_connString))
            {
                if (connection.Execute(sql, nps) > 0)
                    return true;
                return false;
            }
        }
    }
}
