USE [LandingPage]
GO
/****** Object:  StoredProcedure [dbo].[InsertParticipant]    Script Date: 07/05/2023 02:50:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Alter PROCEDURE [dbo].[InsertParticipant] 
	@Name AS VARCHAR(150),
	@Email AS VARCHAR(150),
	@City AS VARCHAR(150),
	@State AS VARCHAR(150),
	@BrithDate AS DATETIME,
	@WhoNominated AS VARCHAR(150),
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
