using Dapper;
using Microsoft.Data.SqlClient;
using LandingPage.API.DataBase;
using LandingPage.API.Models;

namespace LandingPage.API.DataBase
{
    public class DataBase : IDataBase
    {
        public DataBase()
        {
            this.connString = "Data Source=localhost;Initial Catalog=LandingPage;Integrated Security=False;User ID=sa;Password=SqlServer2022!;MultipleActiveResultSets=True;Connect Timeout=600;Encrypt=False;TrustServerCertificate=False";
        }

        public string connString { get; set; }

        public IEnumerable<ParticipantModel> GetParticipants()
        {
            var sql = "select * from participant";
            using (var connection = new SqlConnection(connString))
            {
                connection.Open();
                return connection.Query<ParticipantModel>(sql);
            }
        }

        public bool AddParticipant(ParticipantModel participant)
        {
            var sql = @"INSERT INTO 
                        [Participant] 
                            ([Name],[Email],[City],[State],[BrithDate],[WhoNominated]) 
                        VALUES 
                            (@Name,@Email,@City,@State,@BrithDate,@WhoNominated)";

            using (var connection = new SqlConnection(connString))
            {
                if (connection.Execute(sql, participant) > 0)
                    return true;
                return false;
            }
        }

        public IEnumerable<FeedModel> GetFeeds()
        {
            var sql = "select * from Feed";
            using (var connection = new SqlConnection(connString))
            {
                connection.Open();
                return connection.Query<FeedModel>(sql);
            }
        }

        public IEnumerable<NetPromoterScoreModel> GetNps()
        {
            var sql = "select * from NetPromoterScore nps LEFT JOIN Participant p ON nps.ParticipantId = p.Id";
            using (var connection = new SqlConnection(connString))
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

            using (var connection = new SqlConnection(connString))
            {
                if (connection.Execute(sql, nps) > 0)
                    return true;
                return false;
            }
        }
    }
}
