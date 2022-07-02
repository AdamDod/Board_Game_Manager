namespace classes;
public class Game
{
    public string game_id { get; set; }    
    public string group_id { get; set; }
    public BoardGame boardgame { get; set; }
    public DateTime date_played { get; set; }
    public List<User> players { get; set; }
    public List<User> winners { get; set; }
}
