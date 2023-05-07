using Dapper;
using Microsoft.Data.SqlClient;
using LandingPage.API.Models;
using System.Data;

namespace LandingPage.API.DataBase
{
    public class DataBase : IDataBase
    {
        private int _limit = 200000;

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

        public ParticipantModel AddParticipant(ParticipantModel participant)
        {
            using (var connection = new SqlConnection(connString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("id", participant.Name);
                parameters.Add("id", participant.State);
                parameters.Add("id", participant.City);
                parameters.Add("id", participant.BirthDate);
                parameters.Add("id", participant.Email);
                parameters.Add("id", participant.WhoNominated);
                parameters.Add("id", _limit); 
                return connection.QuerySingleOrDefault<ParticipantModel>("InsertParticipant", parameters, commandType: CommandType.StoredProcedure);
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
