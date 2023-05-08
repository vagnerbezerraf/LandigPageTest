# Landing Page Test

## Abordagem
Foi feita uma abordagem simplificada para entrega da solução, a idéia inicial é ter um design de projeto e de arquitetura enxuta, focando na entrega de uma solução voltada para o desempenho, por isso foi criado uma camada de acesso a dados usando Dapper, um micro ORM que fornece ótima capacidade de parsing, e facilita a implementação de código além de excelente desepenho.

o Projeto de API é padrão, sem a necessidade de autorização neste cenário de teste, e temos como ponto de destaque o uso do mecanismo de cache IMemory nativo do da framework usada.
O Objetivo do uso de cache foi para otimizar uma consulta estática com dados que aparentemente não tem mudanças que exijam entrega de tempo real.

A base dados é estruturada para comportar o modelo simplificado de Participante, Pesquisa NPS e Feed de notícias.

Abaixo temos o DER do banco:

![alt text](https://github.com/vagnerbezerraf/LandigPageTest/blob/662d588ff4489be120ed87eea66d7f09a0251c48/Docs/LandingPage%20-%20LandingPage%20-%20dbo.png)


A solução praticada para o desafio de otimizar a resposta no endpoint do Feed:
No entendimento feito, a abordagem de colocar em cache a saída dos dados, criaria uma melhora significante na consulta a serviço uma vez que não teriamos a cada request uma consulta de todos os dados no banco.

Como é uma abordagem inicial, colocamos um tempo de vida de 10 segundos, mas que podemos ter uma implementação que busca uma inversão do controle do tempo de vida baseado na entrada do registro do feed.

Para tanto então, foi adicionado um recurso de Cache de tempo de vida de aplicação usando injeção de depdência com Singleton, para garantir a criação de um único cache por aplicação ativa, abaixo o refactoring do método Feed dentro da abordagem do projeto:

```c#
    public class CachedFeedRepository : BaseRepository, ICachedFeedRepository
    {
        public CachedFeedRepository(IMemoryCache cache) : base(cache)
        {
        }

        public IEnumerable<FeedModel> GetFeeds()
        {
            //Consulta no banco de dados e converte para um objeto list.
            //Adiciona uma camada de cache responder de forma imediata,
            //com o objetivo de prover dados que não tenham mudanças constantes,
            //como um feed de notícias
            //ou um feed de rede social, 
            var feeds = _memoryCache.GetOrCreate("FeedKey", entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(10);
                entry.SetPriority(CacheItemPriority.High);
                return GetDataBaseFeeds().OrderBy(a => a.Date).ToList();
            });

            return feeds;
        }
        private IEnumerable<FeedModel> GetDataBaseFeeds()
        {
            var sql = "select * from Feed";
            using (var connection = new SqlConnection(_connString))
            {
                connection.Open();
                return connection.Query<FeedModel>(sql);
            }
        }
    }
```

Com relação ao front end foi escolhido o uso do React com uma biblioteca componentes Prime react, com o objetivo de abstrair do desafio a criação do zero de componentes e dar mais agilidade a implementação de recursos como gréficos e datatables.

Dashboard
![alt text](https://github.com/vagnerbezerraf/LandigPageTest/blob/349d94c3dd1dbd42cb1ae4c3dfe61c26f8077500/Docs/Screeshot_dashboard.png)

Cadastro Participante
![alt text](https://github.com/vagnerbezerraf/LandigPageTest/blob/349d94c3dd1dbd42cb1ae4c3dfe61c26f8077500/Docs/Screeshot_participante.png)

Pesquisa NPS
![alt text](https://github.com/vagnerbezerraf/LandigPageTest/blob/349d94c3dd1dbd42cb1ae4c3dfe61c26f8077500/Docs/Screeshot_nps.png)
