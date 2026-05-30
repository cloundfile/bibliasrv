# Plano de Implementação — Frontend Bíblia Sagrada ARC

## 1. Objetivo
Criar uma interface web moderna, bonita e acessível para a Bíblia Sagrada (Tradução ARC) utilizando as APIs existentes do sistema.

## 2. Público-alvo
- Leitores da Bíblia em geral
- **Idosos e pessoas com problemas de visão** (acessibilidade prioritária)

## 3. Design System

### Paleta de Cores (Tema Bíblico)
| Cor | Uso | Hex | Contraste WCAG |
|-----|-----|-----|----------------|
| Dourado escuro | Primary / destaques | `#B8860B` | AAA |
| Bordô | Secondary / títulos | `#6B1D2A` | AAA |
| Marfim | Background principal | `#F5F0E8` | — |
| Bege escuro | Background secundário | `#EDE4D6` | — |
| Marrom escuro | Texto principal | `#2C1810` | AAA |
| Verde oliva | Detalhes / AT | `#556B2F` | AAA |
| Azul profundo | Detalhes / NT | `#1A3A5C` | AAA |
| Branco | Cards / superfícies | `#FFFFFF` | — |

### Tipografia
- **Fonte principal**: `Georgia, 'Times New Roman', serif` (clássica, legível)
- **Tamanhos** (acessíveis):
  - Corpo: `1.125rem` (18px) — mínimo
  - Leitura: `1.25rem` (20px) — versículos
  - Títulos: `1.5rem` a `2.5rem`
  - Botões/links: `1.125rem`
- **Controlador de tamanho**: 4 níveis (P, M, G, XG) salvos em localStorage

### Footer — Design Moderno
- Gradiente sutil (bordô → bordô escuro) com faixa dourada ornamental no topo
- Grid 3 colunas: Marca, Navegação, Recursos
- Logo com ✝ e descrição da tradução ARC
- Ícones SVG de redes sociais (Facebook, Instagram, YouTube, X) como placeholders prontos para implementação futura
- Hover nos links desloca 4px à direita (micro-interação)
- Ícones sociais com borda circular e efeito de elevation no hover
- Bottom bar simplificado com direitos autorais

## 7. Acessibilidade (WCAG 2.1 AA+)
- [x] Tamanho de fonte ajustável (salvo em localStorage)
- [x] Modo alto contraste (preto/branco)
- [x] Skip to content link
- [x] ARIA labels e roles
- [x] Landmarks semânticos (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [x] Foco visível em todos os elementos interativos
- [x] Alvos de toque ≥ 48px (touch-friendly)
- [x] Texto com contraste ≥ 4.5:1
- [x] Suporte a leitores de tela
- [x] Navegação por teclado
- [x] Breadcrumbs para orientação

## 4. Estrutura de Páginas

```
/                          → Home (hero moderno com versículo do dia, estatísticas, links rápidos)
/livros/gn/1               → Leitura direta de Gênesis 1
/livros                    → Lista de todos os 66 livros (AT + NT)
/livros/[sigla]            → Detalhes do livro + lista de capítulos
/livros/[sigla]/[capitulo] → Leitura do capítulo com todos os versículos
/busca?q=termo             → Resultados da busca textual
```

### Fluxo de Navegação
```
Home → Leitura (Gênesis 1)
Home → Livros → [Seleciona Livro] → Capítulos → [Seleciona Capítulo] → Leitura
Home → Busca → [Termo] → Resultados → Leitura
Home → Versículo do Dia (no hero)
```

## 5. Modo Dark — Tons Suaves

O modo dark foi projetado para ser agradável aos olhos, evitando preto puro e tons góticos:

- **Background**: `#1A1412` (marrom escuro quente) — não preto
- **Superfícies**: `#2C2420` (cards), `#231C19` (seções secundárias)
- **Texto primário**: `#F0E6DA` (creme claro) — clareado após feedback de legibilidade
- **Texto secundário**: `#C4B5A5` (bege suave)
- **Bordas**: `#3D322C` (marrom escuro sutil)
- **Dourado**: ajustado para contraste (`#D4A534` / `#E8BC4A`)
- **`--white`**: sobrescrito para `#F0E6DA` (evita branco puro)
- **Paleta preservada**: bordô, verde oliva, azul mantidos
- **Toggle único**: botão que percorre ciclo **C (Claro)** → **E (Escuro)** → **AC (Alto Contraste)** → **C**
  - `title` mostra o modo atual, `aria-label` informa o próximo modo
- **Persistência**: preferências (`biblia-font-size`, `biblia-high-contrast`, `biblia-theme`) salvas no `localStorage`

## 6. Hero — Design Moderno

O hero foi projetado como uma experiência visual imersiva:

- **Background**: Gradiente escuro (160deg) do preto ao bordô profundo
- **Cruz decorativa**: Símbolo ✝ em opacidade 3% como elemento de fundo, centralizado
- **Ornamento dourado**: Linhas com gradiente + losango central separando título do subtítulo
- **Animação de entrada**: Fade-in + translateY nos elementos (0.3s de delay entre cada um)
- **Glassmorphism**: Card do versículo com backdrop-filter blur e borda sutil
- **Botões pill**: Border-radius 50px com glow effect no hover
- **Título responsivo**: `clamp()` para escalar entre mobile e desktop

## 7. SEO e Privacidade

- **APIs bloqueadas para robôs**: Proxy (Next.js 16) adiciona header `X-Robots-Tag: noindex, nofollow` em todas as rotas `/api/*`
- **API pública removida do frontend**: Nenhum link para `/api/docs` ou `/api/status` aparece na interface
- **Meta tags**: Descrição e keywords configuradas no layout raiz
- **Favicon personalizado**: Cruz dourada sobre fundo bordô (`src/app/icon.svg`) substitui o ícone padrão do Next.js
- **Dev Tools desabilitado**: `devIndicators: false` no `next.config.mjs` remove o botão flutuante do Next.js em desenvolvimento

## 8. Componentes

### Compartilhados
| Componente | Tipo | Descrição |
|-----------|------|-----------|
| `AccessibilityProvider` | Client | Contexto para tamanho de fonte e alto contraste |
| `Header` | Client | Nav principal (Leitura, Livros, Busca) + controles de acessibilidade + busca |
| `Footer` | Server | Informações e links de navegação |
| `BookCard` | Server | Card de livro com nome e testamento |
| `VerseDisplay` | Server | Renderização de versículo numerado |
| `ChapterNav` | Client | Navegação entre capítulos (anterior/próximo) |
| `SearchBar` | Client | Input de busca com submit |

### Páginas (Server Components)
| Página | Dados da API | Funcionalidades |
|--------|-------------|-----------------|
| Home | `/api/versiculo-do-dia`, `/api/status` | Hero moderno, versículo do dia integrado, links rápidos, estatísticas |
| Livros | `/api/livros` | Grid de 66 livros divididos por AT/NT |
| Livro | `/api/livros/[sigla]` | Info do livro + grade de capítulos |
| Capítulo | `/api/livros/[sigla]/[capitulo]` | Leitura com navegação anterior/próximo |
| Busca | `/api/busca?q=termo` | Formulário + resultados |

## 9. Estados de UI

Cada página deve tratar:
- **Carregando**: Skeleton loader / spinner
- **Sucesso**: Dados renderizados
- **Vazio**: Nenhum resultado encontrado
- **Erro**: Mensagem amigável + botão de retry

## 10. Arquivos do Projeto

```
src/
├── app/
│   ├── globals.css              (Estilos globais com hero moderno, glassmorphism, animações)
│   ├── layout.js                (Layout com Header/Footer/AccessibilityProvider)
│   ├── page.js                  (Hero moderno com versículo do dia integrado)
│   ├── loading.js               (Loading global)
│   ├── not-found.js             (Página 404)
│   ├── error.js                 (Página de erro)
│   └── livros/
│       ├── page.js              (Lista de livros)
│       └── [sigla]/
│           ├── page.js          (Detalhes do livro + capítulos)
│           └── [capitulo]/
│               └── page.js      (Leitura do capítulo)
│   └── busca/
│       └── page.js              (Página de busca)
├── middleware.js                 (X-Robots-Tag: noindex para rotas /api/)
└── components/
    ├── AccessibilityProvider.js (Contexto de acessibilidade)
    ├── Header.js                (Nav: Leitura, Livros, Busca + acessibilidade)
    ├── Footer.js                (Links de navegação)
    ├── BookCard.js              (Card de livro)
    ├── VerseDisplay.js          (Versículo numerado)
    └── SearchBar.js             (Barra de busca)
```

### API Response Format
Todas as APIs retornam:
```json
{ "success": true, "data": { ... } }
```

## 11. Funcionalidades Implementadas

### 11.1 Seleção de Versículos por Clique
- **Arquivos alterados**: `VerseDisplay.js`, `BookViewer.js`, `globals.css`
- Versículos agora são clicáveis (toggle seleção)
- `BookViewer` mantém estado `selectedVerses` (Set) inicializado com o `highlightVerse` da busca
- `VerseDisplay` recebe `isSelected`, `onToggleClick`, `chapterNum` e renderiza com classe `verse-selected`
- CSS: `.verse` com `cursor: pointer`, `.verse-selected` com fundo `gold-pale`
- Acessibilidade: `role="button"`, `tabIndex`, `onKeyDown` (Enter/Space)

### 11.2 Página de Contribuir — Simplificação
- **Arquivos alterados**: `contribuir/page.js`, `globals.css`
- Removida seção `give-widget-section` com iframe do LivePix (QR code/widget embutido)
- Cards de valor transformados em `<a>` links para `https://livepix.gg/ofertacrista` (`target="_blank"`)
- CSS: `text-decoration: none` e `color: inherit` no `.give-value-card` e hover para remover sublinhado padrão

### 11.3 Limpeza de Dados
- Executado `DELETE FROM pedidos_oracao` para limpar tabela de pedidos de oração

## 12. Testes e Verificação
- `npm run build` — build de produção
- Verificar hero no mobile, tablet e desktop
- Testar contraste no modo alto contraste
- Testar redimensionamento de fonte
