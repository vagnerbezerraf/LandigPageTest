using Microsoft.AspNetCore.Mvc;
using LandingPage.API.DataBase;
using LandingPage.API.Models;

namespace LandingPage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NpsController : ControllerBase
    {
        public IDataBase DataBase { get; }

        public NpsController(IDataBase database)
        {
            DataBase = database;
        }

        [HttpGet]
        public IEnumerable<NetPromoterScoreModel> Get()
        {
            return DataBase.GetNps();
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
