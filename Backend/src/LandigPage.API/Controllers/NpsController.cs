using Microsoft.AspNetCore.Mvc;
using LandingPage.API.DataBase;
using LandingPage.API.Models;
using LandingPage.API.DataBase.Interfaces;

namespace LandingPage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NpsController : ControllerBase
    {
        public INetPromoterScoreRepository _dataBase { get; }

        public NpsController(INetPromoterScoreRepository database)
        {
            _dataBase = database;
        }

        [HttpGet]
        public IEnumerable<NetPromoterScoreModel> Get()
        {
            return _dataBase.GetNps();
        }

        [HttpPost]
        public bool Post(NetPromoterScoreModel nps)
        {
            return _dataBase.AddNps(nps);
        }
    }
}
