using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using classes;

namespace Api.handlers
{
    public class GameHandler : DatabaseHandler
    {
        public IEnumerable<Game> GetUsers(string group_id)
        {
            List<Game> games = new List<Game>();
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand($"SELECT * FROM [Game] LEFT JOIN [Played] ON [Game].game_id = [Played].game_id LEFT JOIN [BoardGame] ON [Game].boardgame_id = [BoardGame].boardgame_id LEFT JOIN [User] ON [User].[user_id] = [Played].[user_id] WHERE [Game].game_id = '{group_id}'", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var new_game = new Game()
                            {
                                game_id = reader.GetString(0),
                                group_id = reader.GetString(1),
                                boardgame = new BoardGame()
                                {
                                    boardgame_id = reader.GetString(7),
                                    boardgame_name = reader.GetString(8),
                                    boardgame_author = reader.GetString(9),
                                    max_players = reader.GetInt32(10),
                                    min_players = reader.GetInt32(11),
                                    playtime = reader.GetInt32(12),
                                    star_rating = reader.GetInt32(13),
                                },
                                date_played = reader.GetDateTime(3),
                                players = new List<User>(),
                                winners = new List<User>()
                            };

                            if (!games.Any(game => game.game_id == new_game.game_id))
                            {
                                games.Add(new_game);
                            }

                            User new_user = new User()
                            {
                                user_id = reader.GetString(14),
                                user_name = reader.GetString(15),
                                user_description = reader.GetString(16)
                            };

                            foreach (var game in games)
                            {
                                if (game.group_id == new_game.game_id)
                                {
                                    game.players.Add(new_user);
                                    if (reader.GetBoolean(6))
                                    {
                                        game.winners.Add(new_user);
                                    }
                                }
                            }

                        }
                        conn.Close();
                        if (games.Count == 0)
                        {
                            return null;
                        }
                        else
                        {
                            return games;
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