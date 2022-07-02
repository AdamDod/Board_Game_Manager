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