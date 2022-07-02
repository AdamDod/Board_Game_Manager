using Api.handlers;
using classes;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class GroupController : ControllerBase
{
    
    private GroupHandler _GroupHandler = new GroupHandler();

    [HttpGet]
    [Route("/group")]
    public IEnumerable<Group> GetGroups()
    {
        return _GroupHandler.GetGroups();
    }

    /// <param name="group_id"></param>
    [HttpGet]
    [Route("/group/{group_id}")]
    public Group GetSingleGroup(string group_id)
    {
        return _GroupHandler.GetSingleGroup(group_id);
    }

    [HttpPost]
    [Route("/group")]
    public string AddGroup([FromBody] Group group)
    {
        return _GroupHandler.AddGroup(group);
    }
}
