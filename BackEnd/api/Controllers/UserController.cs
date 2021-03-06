using Api.handlers;
using classes;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    
    private UserHandler _UserHandler = new UserHandler();

    [HttpGet]
    [Route("/user")]
    public IEnumerable<User> GetUsers()
    {
        return _UserHandler.GetUsers();
    }

    [HttpPost]
    [Route("/user")]
    public string PostUser(User user)
    {
        return _UserHandler.PostUser(user);
    }

    [HttpGet]
    [Route("/test")]
    public string test()
    {
        return "test";
    }
}
