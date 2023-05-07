USE [LandingPage]
GO
/****** Object:  StoredProcedure [dbo].[InsertParticipant]    Script Date: 07/05/2023 02:50:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertParticipant] 
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

    if((Select count(Id) from Participant) <= @Limit)
        begin
            INSERT INTO 
				[Participant]([Name],[Email],[City],[State],[BrithDate],[WhoNominated]) 
			VALUES 
				(@Name,@Email,@City,@State,@BrithDate,@WhoNominated)
        End
    Return Select * from Participant where id = @@IDENTITY
END
GO
