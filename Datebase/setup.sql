IF OBJECT_ID('[Played]') IS NOT NULL
DROP TABLE [Played]
GO
IF OBJECT_ID('[Game]') IS NOT NULL
DROP TABLE [Game]
GO
IF OBJECT_ID('[BoardGame]') IS NOT NULL
DROP TABLE [BoardGame]
GO
IF OBJECT_ID('[GroupAllocation]') IS NOT NULL
DROP TABLE [GroupAllocation]
GO
IF OBJECT_ID('[User]') IS NOT NULL
DROP TABLE [User]
GO
IF OBJECT_ID('[Group]') IS NOT NULL
DROP TABLE [Group]
GO






Create Table [User]
(
    [user_id] [NVARCHAR] (50) PRIMARY KEY,
    [user_name] [NVARCHAR] (50),
    user_description [NVARCHAR] (500)

);
GO

Create Table [Group]
(
    group_id [NVARCHAR] (50) PRIMARY KEY,
    group_name [NVARCHAR] (50),
    created_date Date

);
GO

Create Table [BoardGame]
(
    boardgame_id [NVARCHAR] (50) PRIMARY KEY,
    boardgame_name [NVARCHAR] (50),
    boardgame_author [NVARCHAR] (50),
    max_players int,
    min_players int,
    playtime int,
    star_rating int,

);
GO

Create Table [GroupAllocation]
(
    [user_id] [NVARCHAR] (50),
    group_id [NVARCHAR] (50),
    [admin] BIT,
    FOREIGN KEY ([user_id]) REFERENCES [User] ([user_id]),
    FOREIGN KEY ([group_id]) REFERENCES [Group] ([group_id]),
    CONSTRAINT PK_GroupAllocation PRIMARY KEY ([user_id], group_id)
);
GO

Create Table [Game]
(
    game_id [NVARCHAR] (50) PRIMARY KEY,
    group_id [NVARCHAR] (50),
    boardgame_id [NVARCHAR] (50),
    date_played Date,
    FOREIGN KEY ([boardgame_id]) REFERENCES [BoardGame] ([boardgame_id]),
    FOREIGN KEY ([group_id]) REFERENCES [Group] ([group_id]),
);
GO

Create Table [Played]
(
    [user_id] [NVARCHAR] (50),
    game_id [NVARCHAR] (50),
    [win] BIT,
    FOREIGN KEY ([user_id]) REFERENCES [User] ([user_id]),
    FOREIGN KEY (game_id) REFERENCES [Game](game_id),
    CONSTRAINT PK_Played PRIMARY KEY ([user_id], game_id)
);
GO




INSERT INTO [User] ([user_id], [user_name], user_description)
VALUES
    (1, 'Adam', 'First Test User')
--     (2, 'Bob', 'Second Test User'),
--     (3, 'Sam', 'Third Test User')

INSERT INTO [Group] (group_id, group_name, created_date)
VALUES
    (1, 'Game Night', '01/01/2022')

INSERT INTO [BoardGame] (boardgame_id,boardgame_name ,boardgame_author, max_players, min_players, playtime, star_rating)
VALUES
    (1, 'Chess', 'Old Guy',2,2, 20, 4.7 ),
    (2, 'Monoploy', 'Hasbro',2,6, 60, 3)

-- INSERT INTO [GroupAllocation] ([user_id], group_id, [admin])
-- VALUES
--     (1, 1, 1),
--     (1, 2, 0),
--     (2,2,0)

-- INSERT INTO [Game] (game_id, group_id, boardgame_id, date_played)
-- VALUES
--     (1, 1, 1,'01/07/2022'),
--     (2, 2, 2,'01/01/2022')

-- INSERT INTO [Played] ([user_id], game_id, [win])
-- VALUES
--     (1, 1, 0),
--     (2, 2, 1),
--     (2,1,1)

-- SELECT * FROM [Group] Left JOIN [GroupAllocation] ON [Group].group_id = [GroupAllocation].group_id LEFT JOIN [User] ON [GroupAllocation].[user_id] = [User].[user_id]
-- SELECT * FROM [Played]
SELECT * FROM [User] 
-- LEFT JOIN [Played] ON [Game].game_id = [Played].game_id 
-- LEFT JOIN [BoardGame] ON [Game].boardgame_id = [BoardGame].boardgame_id 
-- LEFT JOIN [User] ON [User].[user_id] = [Played].[user_id] 
-- WHERE [Game].game_id = '{group_id}'


-- SELECT * FROM [Game] LEFT JOIN [Played] ON [Game].game_id = [Played].game_id LEFT JOIN [BoardGame] ON [Game].boardgame_id = [BoardGame].boardgame_id LEFT JOIN [User] ON [User].[user_id] = [Played].[user_id] WHERE [Game].group_id = '2'