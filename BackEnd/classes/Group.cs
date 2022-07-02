namespace classes;
public class Group
{
    public string group_id { get; set; }    
    public string group_name { get; set; }
    public DateTime create_date { get; set; }
    public List<User> users { get; set; }
    public List<User> admins { get; set; }
}
