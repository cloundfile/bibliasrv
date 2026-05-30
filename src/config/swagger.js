const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bíblia API',
      version: '1.0.0',
      description:
        'API REST da Bíblia Sagrada — Tradução ARC (Revisada e Corrigida).\n\n'
        + 'Base de dados Oracle Autonomous Database com todos os livros, capítulos e versículos.',
    },
    servers: [
      { url: '/api', description: 'API Bíblia' },
    ],
    paths: {
      '/livros': {
        get: {
          tags: ['Livros'],
          summary: 'Lista todos os livros',
          responses: {
            200: {
              description: 'Lista de livros',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Livro' },
                      },
                    },
                  },
                  example: {
                    success: true,
                    data: [
                      { id: 1, nome: 'Gênesis', sigla: 'gn', testamento: 'AT', ordem: 1 },
                    ],
                  },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/livros/{sigla}': {
        get: {
          tags: ['Livros'],
          summary: 'Detalhes de um livro e seus capítulos',
          parameters: [
            {
              name: 'sigla',
              in: 'path',
              required: true,
              schema: { type: 'string', example: 'gn' },
              description: 'Sigla do livro',
            },
          ],
          responses: {
            200: {
              description: 'Livro com capítulos',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/LivroComCapitulos' },
                    },
                  },
                  example: {
                    success: true,
                    data: {
                      id: 1,
                      nome: 'Gênesis',
                      sigla: 'gn',
                      testamento: 'AT',
                      ordem: 1,
                      capitulos: [
                        { id: 1, livro_id: 1, numero: 1 },
                        { id: 2, livro_id: 1, numero: 2 },
                      ],
                    },
                  },
                },
              },
            },
            404: {
              description: 'Livro não encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { success: false, error: 'Livro não encontrado' },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/livros/{sigla}/{capitulo}': {
        get: {
          tags: ['Versículos'],
          summary: 'Versículos de um capítulo específico',
          parameters: [
            { name: 'sigla', in: 'path', required: true, schema: { type: 'string', example: 'gn' } },
            { name: 'capitulo', in: 'path', required: true, schema: { type: 'integer', example: 1 } },
          ],
          responses: {
            200: {
              description: 'Versículos do capítulo',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/CapituloComVersiculos' },
                    },
                  },
                  example: {
                    success: true,
                    data: {
                      livro: 'Gênesis',
                      sigla: 'gn',
                      testamento: 'AT',
                      capitulo: 1,
                      versiculos: [
                        { numero: 1, texto: 'No princípio...' },
                        { numero: 2, texto: 'E a terra...' },
                      ],
                    },
                  },
                },
              },
            },
            404: {
              description: 'Livro ou capítulo não encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { success: false, error: 'Capítulo não encontrado' },
                },
              },
            },
            400: {
              description: 'Capítulo inválido',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { success: false, error: 'Capítulo deve ser um número válido' },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/livros/{sigla}/{capitulo}/{versiculo}': {
        get: {
          tags: ['Versículos'],
          summary: 'Versículo específico por referência',
          parameters: [
            { name: 'sigla', in: 'path', required: true, schema: { type: 'string', example: 'gn' } },
            { name: 'capitulo', in: 'path', required: true, schema: { type: 'integer', example: 1 } },
            { name: 'versiculo', in: 'path', required: true, schema: { type: 'integer', example: 1 } },
          ],
          responses: {
            200: {
              description: 'Versículo encontrado',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/Referencia' },
                    },
                  },
                  example: {
                    success: true,
                    data: {
                      livro: 'Gênesis',
                      sigla: 'gn',
                      testamento: 'AT',
                      capitulo: 1,
                      versiculo: 1,
                      texto: 'No princípio, criou Deus os céus e a terra.',
                    },
                  },
                },
              },
            },
            404: {
              description: 'Versículo não encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { success: false, error: 'Versículo não encontrado' },
                },
              },
            },
            400: {
              description: 'Parâmetros inválidos',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { success: false, error: 'Capítulo e versículo devem ser números válidos' },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/busca': {
        get: {
          tags: ['Busca'],
          summary: 'Busca textual em toda a Bíblia',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string', example: 'amor' },
              description: 'Termo de busca',
            },
          ],
          responses: {
            200: {
              description: 'Resultados da busca',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/ResultadoBusca' },
                      },
                    },
                  },
                  example: {
                    success: true,
                    data: [
                      {
                        versiculo_numero: 1,
                        versiculo_texto: 'Ainda que eu falasse as línguas dos homens e dos anjos, e não tivesse amor...',
                        capitulo_numero: 13,
                        livro_nome: '1 Coríntios',
                        livro_sigla: '1co',
                      },
                    ],
                  },
                },
              },
            },
            400: {
              description: 'Termo de busca não informado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { success: false, error: 'O termo de busca ?q= é obrigatório' },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/versiculo-do-dia': {
        get: {
          tags: ['Versículos'],
          summary: 'Versículo aleatório de toda a Bíblia',
          responses: {
            200: {
              description: 'Versículo aleatório',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/Referencia' },
                    },
                  },
                  example: {
                    success: true,
                    data: {
                      livro: 'João',
                      sigla: 'jo',
                      testamento: 'NT',
                      capitulo: 3,
                      versiculo: 16,
                      texto: 'Porque Deus amou o mundo de tal maneira...',
                    },
                  },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/status': {
        get: {
          tags: ['Status'],
          summary: 'Estatísticas do banco de dados',
          responses: {
            200: {
              description: 'Estatísticas',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      data: { $ref: '#/components/schemas/Stats' },
                    },
                  },
                  example: {
                    success: true,
                    data: {
                      total_livros: 66,
                      total_capitulos: 1189,
                      total_versiculos: 31102,
                    },
                  },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
      '/export/{sigla}': {
        get: {
          tags: ['Export'],
          summary: 'Exporta um livro completo',
          parameters: [
            { name: 'sigla', in: 'path', required: true, schema: { type: 'string', example: 'gn' } },
            {
              name: 'format',
              in: 'query',
              schema: { type: 'string', enum: ['json', 'csv'], default: 'json' },
              description: 'Formato do arquivo exportado',
            },
          ],
          responses: {
            200: {
              description: 'Arquivo exportado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Exportacao' },
                  example: {
                    livro: 'Gênesis',
                    sigla: 'gn',
                    testamento: 'AT',
                    conteudo: [
                      {
                        capitulo: 1,
                        versiculos: [
                          { numero: 1, texto: 'No princípio...' },
                        ],
                      },
                    ],
                  },
                },
                'text/csv': {
                  schema: {
                    type: 'string',
                    description: 'Arquivo CSV com BOM (UTF-8)',
                  },
                  example: '\uFEFFLivro,Capítulo,Versículo,Texto\n"Gênesis",1,1,"No princípio..."\n',
                },
              },
            },
            404: {
              description: 'Livro não encontrado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                  example: { success: false, error: 'Livro não encontrado' },
                },
              },
            },
            500: {
              description: 'Erro interno',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Error' },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Livro: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Gênesis' },
            sigla: { type: 'string', example: 'gn' },
            testamento: { type: 'string', enum: ['AT', 'NT'], example: 'AT' },
            ordem: { type: 'integer', example: 1 },
          },
        },
        Capitulo: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            livro_id: { type: 'integer', example: 1 },
            numero: { type: 'integer', example: 1 },
          },
        },
        Versiculo: {
          type: 'object',
          properties: {
            numero: { type: 'integer', example: 1 },
            texto: { type: 'string', example: 'No princípio...' },
          },
        },
        LivroComCapitulos: {
          type: 'object',
          allOf: [
            { $ref: '#/components/schemas/Livro' },
            {
              type: 'object',
              properties: {
                capitulos: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Capitulo' },
                },
              },
            },
          ],
        },
        CapituloComVersiculos: {
          type: 'object',
          properties: {
            livro: { type: 'string', example: 'Gênesis' },
            sigla: { type: 'string', example: 'gn' },
            testamento: { type: 'string', enum: ['AT', 'NT'], example: 'AT' },
            capitulo: { type: 'integer', example: 1 },
            versiculos: {
              type: 'array',
              items: { $ref: '#/components/schemas/Versiculo' },
            },
          },
        },
        Referencia: {
          type: 'object',
          properties: {
            livro: { type: 'string', example: 'Gênesis' },
            sigla: { type: 'string', example: 'gn' },
            testamento: { type: 'string', enum: ['AT', 'NT'], example: 'AT' },
            capitulo: { type: 'integer', example: 1 },
            versiculo: { type: 'integer', example: 1 },
            texto: { type: 'string', example: 'No princípio...' },
          },
        },
        ResultadoBusca: {
          type: 'object',
          properties: {
            versiculo_numero: { type: 'integer', example: 1 },
            versiculo_texto: { type: 'string', example: 'Ainda que eu falasse...' },
            capitulo_numero: { type: 'integer', example: 13 },
            livro_nome: { type: 'string', example: '1 Coríntios' },
            livro_sigla: { type: 'string', example: '1co' },
          },
        },
        Stats: {
          type: 'object',
          properties: {
            total_livros: { type: 'integer', example: 66 },
            total_capitulos: { type: 'integer', example: 1189 },
            total_versiculos: { type: 'integer', example: 31102 },
          },
        },
        Exportacao: {
          type: 'object',
          properties: {
            livro: { type: 'string', example: 'Gênesis' },
            sigla: { type: 'string', example: 'gn' },
            testamento: { type: 'string', enum: ['AT', 'NT'], example: 'AT' },
            conteudo: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  capitulo: { type: 'integer', example: 1 },
                  versiculos: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Versiculo' },
                  },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Recurso não encontrado' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
