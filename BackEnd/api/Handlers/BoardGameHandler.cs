using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using classes;

namespace Api.handlers
{
    public class BoardGameHandler : DatabaseHandler
    {
        public IEnumerable<BoardGame> GetBoardGames()
        {
            List<BoardGame> boardgames = new List<BoardGame>();
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand("SELECT * FROM [BoardGame]", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {                              
                            boardgames.Add(new BoardGame(){
                                boardgame_id= reader.GetString(0),
                                boardgame_name = reader.GetString(1),
                                boardgame_author = reader.GetString(2),
                                max_players = reader.GetInt32(3),
                                min_players = reader.GetInt32(4),
                                playtime = reader.GetInt32(5),
                                star_rating = reader.GetInt32(6),
                            });  
                        }
                        conn.Close();
                        if (boardgames.Count ==0)
                        {   
                            return null;
                        }else{
                            return boardgames;
                        }
                        
                    }
                }
            }
        }

        
    }
}


// public string AddTeamAllocation(int TeamID, int PlayerID, int Year)
//         {
//             using (SqlConnection conn = new SqlConnection(GetConnectionString()))
//             {
//                 conn.Open();

//                 using (SqlCommand command = new SqlCommand("ADD_TEAM_ALLOCATION", conn))

//                 {
//                     command.CommandType = System.Data.CommandType.StoredProcedure;
//                     command.Parameters.AddWithValue("@pTeamID", 0);
//                     command.Parameters.AddWithValue("@pYear", 0);
//                     command.Parameters.AddWithValue("@pPlayerID", 0);
//                     command.Parameters["@pTeamID"].Value = TeamID;
//                     command.Parameters["@pYear"].Value = Year;
//                     command.Parameters["@pPlayerID"].Value = PlayerID;
//                     int rowsAffected = command.ExecuteNonQuery();
//                     conn.Close();

//                     if (rowsAffected >= 1)
//                     {
//                         return "Added Team Allocation";
//                     }
//                     else
//                     {
//                         return "Team Allocation could not be added";
//                     }
//                 }
//             }
//         }