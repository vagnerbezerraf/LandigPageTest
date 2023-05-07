using Microsoft.AspNetCore.Mvc;
using LandingPage.API.DataBase;
using LandingPage.API.Models;

namespace LandingPage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        private IDataBase _database;
        private ICacheFeedRepository _cache;

        public FeedController(IDataBase database, ICacheFeedRepository cache)
        {
            _database = database;
            _cache = cache;
        }

        [HttpGet]
        public IEnumerable<FeedModel> Get()
        {
            return _cache.GetFeeds();
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
