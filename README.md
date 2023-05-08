# Landing Page Test

## Abordagem
Foi feita uma abordagem simplificada para entrega da solução, a idéia inicial é ter um design de projeto e de arquitetura enxuta, focando na entrega de uma solução voltada para o desempenho, por isso foi criado uma camada de acesso a dados usando Dapper, um micro ORM que fornece ótima capacidade de parsing, e facilita a implementação de código além de excelente desepenho.

o Projeto de API é padrão, sem a necessidade de autorização neste cenário de teste, e temos como ponto de destaque o uso do mecanismo de cache IMemory nativo do da framework usada.
O Objetivo do uso de cache foi para otimizar uma consulta estática com dados que aparentemente não tem mudanças que exijam entrega de tempo real.

A base dados é estruturada para comportar o modelo simplificado de Participante, Pesquisa NPS e Feed de notícias.

Abaixo temos o DER do banco:


