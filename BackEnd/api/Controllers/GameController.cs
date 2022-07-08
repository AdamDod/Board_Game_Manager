using Api.handlers;
using classes;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    
    private GameHandler _UserHandler = new GameHandler();

    /// <param name="group_id"></param>
    [HttpGet]
    [Route("/game")]
    public IEnumerable<Game> GetGamesForGroup(string group_id)
    {
        return _UserHandler.GetGamesForGroup(group_id);
    }

    [HttpPost]
    [Route("/game")]
    public string PostGame([FromBody]Game game)
    {
        return _UserHandler.PostGame(game);
    }
}
