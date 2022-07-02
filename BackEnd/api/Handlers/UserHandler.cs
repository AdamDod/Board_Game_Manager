using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using classes;

namespace Api.handlers
{
    public class UserHandler : DatabaseHandler
    {
        public IEnumerable<User> GetUsers()
        {
            List<User> users = new List<User>();
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand("SELECT * FROM [User]", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {                              
                            users.Add(new User(){
                                user_id= reader.GetString(0),
                                user_name = reader.GetString(1),
                                user_description = reader.GetString(2)
                            });  
                        }
                        conn.Close();
                        if (users.Count ==0)
                        {   
                            return null;
                        }else{
                            return users;
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