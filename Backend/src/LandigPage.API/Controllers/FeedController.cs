using Microsoft.AspNetCore.Mvc;
using LandingPage.API.DataBase;
using LandingPage.API.Models;
using LandingPage.API.DataBase.Interfaces;

namespace LandingPage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        private IFeedRepository _database;
        private ICachedFeedRepository _cacheRepository;

        public FeedController(IFeedRepository database, ICachedFeedRepository cache)
        {
            _database = database;
            _cacheRepository = cache;
        }

        [HttpGet]
        public IEnumerable<FeedModel> Get(bool isCached)
        {
            if(isCached)
                return _cacheRepository.GetFeeds();
            return _database.GetFeeds();
        }
    }
}
