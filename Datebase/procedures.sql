----------------------------Counter-------------------------
------------------------------------------------------------

IF OBJECT_ID('CountBy1') IS NOT NULL
    DROP SEQUENCE Count.CountBy1;

IF OBJECT_ID('Count') IS NOT NULL
    DROP SCHEMA Count;

Create SCHEMA Count;
GO

CREATE SEQUENCE Count.CountBy1
    Start WITH 1000
    INCREMENT BY 1;
GO

IF OBJECT_ID('CountBy12') IS NOT NULL
    DROP SEQUENCE Count.CountBy1;

IF OBJECT_ID('Count2') IS NOT NULL
    DROP SCHEMA Count;

Create SCHEMA Count2;
GO

CREATE SEQUENCE Count2.CountBy12
    Start WITH 1000
    INCREMENT BY 1;
GO

------------------------------------------------------------
----------------------ADD GROUP--------------------
------------------------------------------------------------
IF OBJECT_ID('ADD_GROUP') IS NOT NULL
    DROP PROCEDURE ADD_GROUP;
GO

CREATE PROCEDURE ADD_GROUP
    @pGroup_Name [NVARCHAR] (50),
    @pCreated_Date Date
AS
BEGIN
    DECLARE @group_id BIGINT;
    SET @group_id = NEXT VALUE FOR Count.CountBy1;
    BEGIN TRY
        INSERT INTO [Group]
        (group_id, group_name, created_date)
    VALUES
        (CAST(@group_id AS [NVARCHAR]), @pGroup_Name, @pCreated_Date)
    END TRY
    BEGIN CATCH
    END CATCH
END
    RETURN @group_id
GO

------------------------------------------------------------
----------------------ADD GROUPALLOCATION--------------------
------------------------------------------------------------
IF OBJECT_ID('ADD_GROUPALLOCATION') IS NOT NULL
    DROP PROCEDURE ADD_GROUPALLOCATION;
GO

CREATE PROCEDURE ADD_GROUPALLOCATION
    @pUser_ID [NVARCHAR] (50),
    @pGroup_ID [NVARCHAR] (50),
    @pAdmin BIT
AS
BEGIN
    BEGIN TRY
        INSERT INTO [GroupAllocation]
        ([user_id], group_id, admin)
    VALUES
        (@pUser_ID, @pGroup_ID, @pAdmin)
    END TRY
    BEGIN CATCH
    END CATCH
END
GO

------------------------------------------------------------
----------------------ADD GAME--------------------
------------------------------------------------------------
IF OBJECT_ID('ADD_GAME') IS NOT NULL
    DROP PROCEDURE ADD_GAME;
GO

CREATE PROCEDURE ADD_GAME
    @pGroup_id [NVARCHAR] (50),
    @pboardgame_id [NVARCHAR] (50),
    @pDate_Played Date
AS
BEGIN
    DECLARE @game_id BIGINT;
    SET @game_id = NEXT VALUE FOR Count2.CountBy12;
    BEGIN TRY
        INSERT INTO [Game]
        (game_id, group_id, boardgame_id, date_played)
    VALUES
        (CAST(@game_id AS [NVARCHAR]), @pGroup_id, @pboardgame_id, @pDate_Played)
    END TRY
    BEGIN CATCH
    END CATCH
END
    RETURN @game_id
GO

------------------------------------------------------------
----------------------ADD GAMEALLOCATION--------------------
------------------------------------------------------------
IF OBJECT_ID('ADD_GAMEALLOCATION') IS NOT NULL
    DROP PROCEDURE ADD_GAMEALLOCATION;
GO

CREATE PROCEDURE ADD_GAMEALLOCATION
    @pUser_ID [NVARCHAR] (50),
    @pGame_ID [NVARCHAR] (50),
    @pWin BIT
AS
BEGIN
    BEGIN TRY
        INSERT INTO [Played]
        ([user_id], game_id, [win])
    VALUES
        (@pUser_ID, @pGame_ID, @pWin)
    END TRY
    BEGIN CATCH
    END CATCH
END
GO