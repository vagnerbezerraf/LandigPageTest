using Microsoft.Extensions.Caching.Memory;

namespace LandingPage.API.DataBase
{
    public class BaseRepository
    {
        public int _participantLimit = 200000;
        public string _connString { get; set; }

        public readonly IMemoryCache _memoryCache;

        public BaseRepository(IMemoryCache cache)
        {
            this._memoryCache = cache;
            this._connString = "Data Source=localhost;Initial Catalog=LandingPage;Integrated Security=False;User ID=sa;Password=SqlServer2022!;MultipleActiveResultSets=True;Connect Timeout=600;Encrypt=False;TrustServerCertificate=False";
        }
    }
}
