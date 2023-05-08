using Dapper;
using Microsoft.Data.SqlClient;
using LandingPage.API.Models;
using System.Data;
using LandingPage.API.DataBase.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace LandingPage.API.DataBase
{
    public class ParticipantRepository : BaseRepository, IParticipantRepository
    {
        public ParticipantRepository(IMemoryCache cache) : base(cache)
        {
        }

        public IEnumerable<ParticipantModel> GetParticipants(ParticipantFilterModel modelFilter)
        {
            var sql = "select * from participant";

            var where = " WHERE 1=1 ";
            if (modelFilter != null && modelFilter.City != null)
                where += $"AND City = '{modelFilter.City}'";

            if (modelFilter != null && modelFilter.Email != null)
                where += $"AND State = '{modelFilter.State}'";

            if (modelFilter != null && modelFilter.BirthDate != null)
                where += $"AND BirthDate = '{modelFilter.BirthDate}'";

            using (var connection = new SqlConnection(_connString))
            {
                connection.Open();
                return connection.Query<ParticipantModel>(sql+where);
            }
        }

        public ParticipantModel AddParticipant(ParticipantModel participant)
        {
            using (var connection = new SqlConnection(_connString))
            {
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("Name", participant.Name);
                parameters.Add("State", participant.State);
                parameters.Add("City", participant.City);
                parameters.Add("BrithDate", participant.BirthDate);
                parameters.Add("Email", participant.Email);
                parameters.Add("WhoNominated", participant.WhoNominated);
                parameters.Add("Limit", _participantLimit); 
                return connection
                        .QuerySingleOrDefault<ParticipantModel>
                        (   "InsertParticipant", 
                            parameters, 
                            commandType: CommandType.StoredProcedure);
            }
        }

    }
}
