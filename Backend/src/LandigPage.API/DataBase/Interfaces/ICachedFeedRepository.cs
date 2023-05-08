﻿using LandingPage.API.Models;

namespace LandingPage.API.DataBase.Interfaces
{
    public interface ICachedFeedRepository
    {
        IEnumerable<FeedModel> GetFeeds();
    }
}