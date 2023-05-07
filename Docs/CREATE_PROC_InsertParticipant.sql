SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE InsertParticipant 
	@Name AS VARCHAR,
	@Email AS VARCHAR,
	@City AS VARCHAR,
	@State AS VARCHAR,
	@BrithDate AS DATETIME,
	@WhoNominated AS VARCHAR,
	@Limit AS INT
AS
BEGIN
	SET NOCOUNT ON;

    if((Select count(Id) from Participant) > @Limit)
        begin
            INSERT INTO 
				[Participant]([Name],[Email],[City],[State],[BrithDate],[WhoNominated]) 
			VALUES 
				(@Name,@Email,@City,@State,@BrithDate,@WhoNominated)
        End
    Return Select * from Participant where id = @@IDENTITY
END
GO
