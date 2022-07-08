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

    [HttpDelete]
    [Route("/groupallocation")]
     public string DeletePlayerAllocation(string group_id, string user_id)
    {
        return _GroupHandler.DeletePlayerAllocation(group_id, user_id);
    }

    /// <param name="group_id"></param>
    /// <param name="user_id"></param>
    [HttpPost]
    [Route("/groupallocation")]
     public string AddPlayerAllocation(string group_id, string user_id)
    {
        return _GroupHandler.AddPlayerAllocation(group_id, user_id);
    }

    /// <param name="user_id"></param>
    [HttpGet]
    [Route("/group/user/{user_id}")]
    public IEnumerable<Group> GetGroupsForUser(string user_id)
    {
        return _GroupHandler.GetGroupsForUser(user_id);
    }
}
