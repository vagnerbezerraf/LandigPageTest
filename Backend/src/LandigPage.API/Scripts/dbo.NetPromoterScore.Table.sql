USE [LandingPage]
GO
/****** Object:  Table [dbo].[NetPromoterScore]    Script Date: 07/05/2023 02:50:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NetPromoterScore](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ParticipantId] [int] NULL,
	[Score] [int] NULL,
	[Recommendation] [bit] NULL,
	[Date] [datetime] NULL,
 CONSTRAINT [PK_NetPromoterScore] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[NetPromoterScore]  WITH CHECK ADD  CONSTRAINT [FK_NetPromoterScore_Participant] FOREIGN KEY([ParticipantId])
REFERENCES [dbo].[Participant] ([Id])
GO
ALTER TABLE [dbo].[NetPromoterScore] CHECK CONSTRAINT [FK_NetPromoterScore_Participant]
GO
