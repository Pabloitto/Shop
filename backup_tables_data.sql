/****** Object:  Table [dbo].[Category]    Script Date: 04/21/2016 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](30) NOT NULL,
	[Description] [varchar](250) NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Category] ON
INSERT [dbo].[Category] ([CategoryId], [Name], [Description]) VALUES (1, N'Video', NULL)
INSERT [dbo].[Category] ([CategoryId], [Name], [Description]) VALUES (2, N'USB', NULL)
INSERT [dbo].[Category] ([CategoryId], [Name], [Description]) VALUES (3, N'HD', NULL)
INSERT [dbo].[Category] ([CategoryId], [Name], [Description]) VALUES (4, N'Mother Board', NULL)
SET IDENTITY_INSERT [dbo].[Category] OFF
/****** Object:  Table [dbo].[UserType]    Script Date: 04/21/2016 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserType](
	[UserType] [int] NOT NULL,
	[Text] [varchar](30) NOT NULL,
	[Description] [varchar](250) NULL,
 CONSTRAINT [PK_UserType] PRIMARY KEY CLUSTERED 
(
	[UserType] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
INSERT [dbo].[UserType] ([UserType], [Text], [Description]) VALUES (1, N'Unregistered', N'They can only see the content and add products to their shopping cart, but')
INSERT [dbo].[UserType] ([UserType], [Text], [Description]) VALUES (2, N'Registered', N'They can see the content, add products to their shopping cart and pay for')
INSERT [dbo].[UserType] ([UserType], [Text], [Description]) VALUES (3, N'Admin', N'They can do all the things that a registered user can do, but they can also create, delete')
/****** Object:  Table [dbo].[Product]    Script Date: 04/21/2016 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](30) NOT NULL,
	[Description] [varchar](250) NULL,
	[Photo] [varchar](50) NULL,
	[CompanyPhoto] [varchar](50) NULL,
	[CategoryId] [int] NOT NULL,
	[Code] [bigint] NOT NULL,
	[Price] [decimal](18, 4) NULL,
	[Stock] [int] NOT NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON
INSERT [dbo].[Product] ([ProductId], [Name], [Description], [Photo], [CompanyPhoto], [CategoryId], [Code], [Price], [Stock]) VALUES (2, N'Video card RADEON', N'Video card Radeon HD Model 234, 2GB', N'images/radeon.jpg', N'images/amdlogo.gif', 1, 1, CAST(1000.0000 AS Decimal(18, 4)), 10)
INSERT [dbo].[Product] ([ProductId], [Name], [Description], [Photo], [CompanyPhoto], [CategoryId], [Code], [Price], [Stock]) VALUES (3, N'USB Kingston', N'USB Kingston 2.0 16 GB', N'images/usbkingstone.jpg', N'images/kingstonlogo.gif', 2, 2, CAST(150.0000 AS Decimal(18, 4)), 100)
INSERT [dbo].[Product] ([ProductId], [Name], [Description], [Photo], [CompanyPhoto], [CategoryId], [Code], [Price], [Stock]) VALUES (4, N'HD Wester Digital 1TB', N'Hard Disk Wester Digital 1TB 7200 rpm', N'images/westerdigitalhdd.jpg', N'images/westerndigitallogonew.gif', 3, 3, CAST(200.0000 AS Decimal(18, 4)), 30)
INSERT [dbo].[Product] ([ProductId], [Name], [Description], [Photo], [CompanyPhoto], [CategoryId], [Code], [Price], [Stock]) VALUES (5, N'Motherboard Asus', N'3 USB Ports 3.0, Ram  limit 3.1416 GB.', N'images/asusmotherboard.jpg', N'images/asuslogo.gif', 4, 4, CAST(2000.0000 AS Decimal(18, 4)), 5)
SET IDENTITY_INSERT [dbo].[Product] OFF
/****** Object:  Table [dbo].[Account]    Script Date: 04/21/2016 21:07:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Account](
	[AccountId] [int] IDENTITY(1,1) NOT NULL,
	[AccountName] [varchar](50) NOT NULL,
	[UserType] [int] NOT NULL,
	[Password] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[AccountId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Account] ON
INSERT [dbo].[Account] ([AccountId], [AccountName], [UserType], [Password]) VALUES (1, N'admin', 3, N'f0Piqvy60LRoar8B00qlPw==')
SET IDENTITY_INSERT [dbo].[Account] OFF
/****** Object:  ForeignKey [FK_Account_UserType]    Script Date: 04/21/2016 21:07:35 ******/
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_UserType] FOREIGN KEY([UserType])
REFERENCES [dbo].[UserType] ([UserType])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_UserType]
GO
/****** Object:  ForeignKey [FK_Product_Category]    Script Date: 04/21/2016 21:07:35 ******/
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([CategoryId])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_Category]
GO
