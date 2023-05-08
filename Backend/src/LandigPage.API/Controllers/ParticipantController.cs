using Microsoft.AspNetCore.Mvc;
using LandingPage.API.DataBase;
using LandingPage.API.Models;
using LandingPage.API.DataBase.Interfaces;

namespace LandingPage.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        public IParticipantRepository _dataBase { get; }

        public ParticipantController(IParticipantRepository database)
        {
            _dataBase = database;
        }

        [HttpGet]
        public IEnumerable<ParticipantModel> Get([FromQuery] ParticipantFilterModel modelFilter)
        {
            return _dataBase.GetParticipants(modelFilter);
        }

        [HttpPost]
        public ParticipantModel Post(ParticipantModel model)
        {
            return _dataBase.AddParticipant(model);
        }

    }
}
