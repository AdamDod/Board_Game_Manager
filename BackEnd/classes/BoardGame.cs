namespace classes;
public class BoardGame
{
    public string boardgame_id { get; set; }    
    public string boardgame_name { get; set; }
    public string boardgame_author { get; set; }
    public int max_players { get; set; }
    public int min_players { get; set; }
    public int playtime { get; set; }
    public int star_rating {get; set;}
}
