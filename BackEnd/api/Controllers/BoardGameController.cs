using Api.handlers;
using classes;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class BoardGameController : ControllerBase
{
    
    private BoardGameHandler _BoardGameHandler = new BoardGameHandler();

    [HttpGet]
    [Route("/boardgame")]
    public IEnumerable<BoardGame> GetBoardgames( )
    {
        return _BoardGameHandler.GetBoardGames();
    }
}
