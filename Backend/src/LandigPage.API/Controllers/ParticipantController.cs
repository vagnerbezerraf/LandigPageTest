using Microsoft.AspNetCore.Mvc;
using LandingPage.API.DataBase;
using LandingPage.API.Models;

namespace LandingPage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        public IDataBase DataBase { get; }

        public ParticipantController(IDataBase database)
        {
            DataBase = database;
        }

        [HttpGet]
        public IEnumerable<ParticipantModel> Get()
        {
            return DataBase.GetParticipants();
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
