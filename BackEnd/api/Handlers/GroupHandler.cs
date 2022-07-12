using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using classes;

namespace Api.handlers
{
    public class GroupHandler : DatabaseHandler
    {
        public IEnumerable<Group> GetGroups()
        {
            List<Group> groups = new List<Group>();
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand("SELECT * FROM [Group] Left JOIN [GroupAllocation] ON [Group].group_id = [GroupAllocation].group_id LEFT JOIN [User] ON [GroupAllocation].[user_id] = [User].[user_id]", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {                              
                            var new_group = new Group(){
                                group_id= reader.GetString(0),
                                group_name = reader.GetString(1),
                                create_date = reader.GetDateTime(2),
                                users = new List<User>(),
                                admins = new List<User>()
                            };
                            
                            if (!groups.Any(group => group.group_id == new_group.group_id))
                            {
                                groups.Add(new_group);
                            }
                            if (!reader.IsDBNull(3))
                            {
                                User new_user = new User(){
                                    user_id = reader.GetString(6),
                                    user_name = reader.GetString(7),
                                    user_description = reader.GetString(8)                                
                                };

                                foreach (var group in groups)
                                {
                                    if (group.group_id == new_group.group_id)
                                    {
                                        group.users.Add(new_user);
                                    if (reader.GetBoolean(5))
                                    {
                                        group.admins.Add(new_user);
                                    }
                                    }                                    
                                }
                            }                           
                            
                        }
                        conn.Close();
                        if (groups.Count ==0)
                        {   
                            return null;
                        }else{
                            return groups;
                        }
                        
                    }
                }
            }
        }

        public Group GetSingleGroup(string group_id)
        {
            List<Group> groups = new List<Group>();
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand($"SELECT * FROM [Group] Left JOIN [GroupAllocation] ON [Group].group_id = [GroupAllocation].group_id LEFT JOIN [User] ON [GroupAllocation].[user_id] = [User].[user_id] WHERE [Group].group_id = '{group_id}'", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {                              
                            var new_group = new Group(){
                                group_id= reader.GetString(0),
                                group_name = reader.GetString(1),
                                create_date = reader.GetDateTime(2),
                                users = new List<User>(),
                                admins = new List<User>()
                            };
                            
                            if (!groups.Any(group => group.group_id == new_group.group_id))
                            {
                                groups.Add(new_group);
                            }
                            if (!reader.IsDBNull(3))
                            {
                                User new_user = new User(){
                                    user_id = reader.GetString(6),
                                    user_name = reader.GetString(7),
                                    user_description = reader.GetString(8)                                
                                };

                                foreach (var group in groups)
                                {
                                    if (group.group_id == new_group.group_id)
                                    {
                                        group.users.Add(new_user);
                                    if (reader.GetBoolean(5))
                                    {
                                        group.admins.Add(new_user);
                                    }
                                    }                                    
                                }
                            }                           
                            
                        }
                        conn.Close();
                        if (groups.Count ==0)
                        {   
                            return null;
                        }else{
                            return groups[0];
                        }
                        
                    }
                }
            }
        }

        public string AddGroup(Group group){

            var group_id = -1;

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand("ADD_GROUP", conn))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@pGroup_Name", group.group_name);
                    command.Parameters.AddWithValue("@pCreated_Date", group.create_date);

                    command.Parameters.Add("@group_id", System.Data.SqlDbType.NVarChar).Direction = ParameterDirection.ReturnValue;

                    command.ExecuteNonQuery();
                    group_id = (int)command.Parameters["@group_id"].Value;
                    conn.Close();
                }
            }
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                
                
                    foreach (var user in group.users)
                    {
                        conn.Open();
                        Boolean contains = false;
                        using (SqlCommand command = new SqlCommand("ADD_GROUPALLOCATION", conn))
                        {
                            Console.WriteLine(group.group_id);
                            foreach (var admin in group.admins)
                            {
                                if (admin.user_id == user.user_id)
                                {
                                    contains = true;
                                }else{
                                    contains = false;
                                }
                            }
                            command.CommandType = System.Data.CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@pUser_ID", user.user_id.ToString());
                            command.Parameters.AddWithValue("@pGroup_ID", group_id.ToString());
                            command.Parameters.AddWithValue("@pAdmin", contains);

                            command.ExecuteNonQuery();
                        }
                        conn.Close();
                }
            }
            return "done";
        }

        public string DeletePlayerAllocation(string group_id, string user_id){

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand($"DELETE FROM [GroupAllocation] WHERE [user_id] = '{user_id}' AND group_id = '{group_id}'", conn))
                {

                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand($"DELETE [Played] FROM [Played] Left Join [Game] ON [Played].game_id = [Game].game_id WHERE [Played].user_id = '{user_id}'", conn))
                {

                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }
            return "done";
        }

        public string AddPlayerAllocation(string group_id, string user_id){

            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand($"INSERT INTO [GroupAllocation] ([user_id], group_id,[admin]) VALUES ('{user_id}','{group_id}',0)", conn))
                {

                    command.ExecuteNonQuery();
                    conn.Close();
                }
            }
            return "done";
        }

        public IEnumerable<Group> GetGroupsForUser(string user_id)
        {
            List<Group> groups = new List<Group>();
            using (SqlConnection conn = new SqlConnection(GetConnectionString()))
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand($"SELECT * FROM [Group] Left JOIN [GroupAllocation] ON [Group].group_id = [GroupAllocation].group_id LEFT JOIN [User] ON [GroupAllocation].[user_id] = [User].[user_id] WHERE [User].[user_id] = '{user_id}'", conn))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {                              
                            var new_group = new Group(){
                                group_id= reader.GetString(0),
                                group_name = reader.GetString(1),
                                create_date = reader.GetDateTime(2),
                                users = new List<User>(),
                                admins = new List<User>()
                            };
                            
                            if (!groups.Any(group => group.group_id == new_group.group_id))
                            {
                                groups.Add(new_group);
                            }
                            if (!reader.IsDBNull(3))
                            {
                                User new_user = new User(){
                                    user_id = reader.GetString(6),
                                    user_name = reader.GetString(7),
                                    user_description = reader.GetString(8)                                
                                };

                                foreach (var group in groups)
                                {
                                    if (group.group_id == new_group.group_id)
                                    {
                                        group.users.Add(new_user);
                                    if (reader.GetBoolean(5))
                                    {
                                        group.admins.Add(new_user);
                                    }
                                    }                                    
                                }
                            }                           
                            
                        }
                        conn.Close();
                        if (groups.Count ==0)
                        {   
                            return null;
                        }else{
                            return groups;
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