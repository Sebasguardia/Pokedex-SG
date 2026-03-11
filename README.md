# 🔴 PokéDex Web App — Arquitectura & Documentación del Sistema

> Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS ^3.4.19 · PostCSS ^8.5.6 · Radix UI · PokéAPI v2

---

## 1. VISIÓN GENERAL

Una Pokédex web completa, moderna y visualmente impresionante que consume la PokéAPI v2. El objetivo es cubrir **todos los recursos de la API** organizados en módulos independientes con una experiencia de usuario fluida, animaciones contextuales y una UI que respira el universo Pokémon.

### Filosofía de diseño
- **Tema visual**: Rojo Pokédex + negro profundo + blanco + acentos amarillo Pikachu.
- **Tipografía**: `Press Start 2P` (display/headings retro pixelado) + `Nunito` (body, legible y amigable).
- **Animaciones**: Framer Motion — transiciones de página tipo "apertura de Pokédex", hover-cards con bounce, barras de stats con fill animado, spinner de Pokéball.
- **Modo oscuro/claro**: next-themes, por defecto dark.
- **Accesibilidad**: Radix UI garantiza WAI-ARIA en todos los componentes interactivos.

---

## 2. TECH STACK COMPLETO

### Core
| Paquete | Versión | Rol |
|---|---|---|
| `next` | ^14.x | Framework fullstack, App Router |
| `typescript` | ^5.x | Tipado estático |
| `tailwindcss` | ^3.4.19 | Utility-first CSS |
| `postcss` | ^8.5.6 | Procesamiento CSS |
| `autoprefixer` | ^10.x | PostCSS plugin |

### UI & Componentes
| Paquete | Versión | Rol |
|---|---|---|
| `@radix-ui/react-dialog` | latest | Modales de detalle, confirmaciones |
| `@radix-ui/react-select` | latest | Selectores de filtro, generación, tipo |
| `@radix-ui/react-tabs` | latest | Tabs en páginas de detalle |
| `@radix-ui/react-tooltip` | latest | Tooltips en stats, type badges |
| `@radix-ui/react-popover` | latest | Filtros avanzados floating |
| `@radix-ui/react-accordion` | latest | Secciones colapsables en detalle |
| `@radix-ui/react-progress` | latest | Barras de stats base |
| `@radix-ui/react-scroll-area` | latest | Listas largas con scroll custom |
| `@radix-ui/react-separator` | latest | Divisores visuales |
| `@radix-ui/react-switch` | latest | Toggles (shiny mode, dark mode) |
| `@radix-ui/react-slider` | latest | Filtro de stats mínimos |
| `@radix-ui/react-hover-card` | latest | Preview card al hover de un Pokémon |
| `@radix-ui/react-badge` | latest | Type badges, generación badges |
| `@radix-ui/react-toast` | latest | Notificaciones (favoritos, errores) |
| `@radix-ui/react-navigation-menu` | latest | Menú de navegación principal |
| `@radix-ui/react-command` | latest | Buscador global tipo spotlight |
| `@radix-ui/react-alert-dialog` | latest | Confirmaciones |

### Iconos
| Paquete | Rol |
|---|---|
| `lucide-react` | Iconos generales (search, filter, star, heart, etc.) |
| `react-icons` | Iconos adicionales (GiPokeball, GiSwordSpade para tipos) |

### Data Fetching & Estado
| Paquete | Rol |
|---|---|
| `@tanstack/react-query` | Server state, caching, pagination, prefetch |
| `zustand` | Client state (favoritos, comparador, filtros activos) |
| `axios` | HTTP client con interceptors para PokéAPI |

### Visualización & Gráficas
| Paquete | Rol |
|---|---|
| `recharts` | Radar chart de stats base (6 stats), bar charts de type effectiveness |
| `react-force-graph-2d` | Grafo visual de cadenas de evolución complejas (opcio. avanzada) |

### Animaciones
| Paquete | Rol |
|---|---|
| `framer-motion` | Animaciones de página, cards, sprites, Pokéball loader |
| `@number-flow/react` | Números animados para stats, altura, peso |

### Audio
| Paquete | Rol |
|---|---|
| `howler` | Reproducir cries (sonidos) de Pokémon desde PokéAPI |

### Utilidades
| Paquete | Rol |
|---|---|
| `clsx` | Composición de clases |
| `class-variance-authority` | Variantes de componentes tipadas |
| `tailwind-merge` | Merge seguro de clases Tailwind |
| `next-themes` | Dark/light mode |
| `@tanstack/react-virtual` | Virtualización de listas largas (1000+ Pokémon) |
| `fuse.js` | Búsqueda fuzzy client-side |
| `date-fns` | Formateo de datos donde aplique |
| `nuqs` | URL state management para filtros y paginación |

---

## 3. ESTRUCTURA DE ARCHIVOS

```
pokedex-app/
├── public/
│   ├── pokeball.svg                  # Favicon y loader
│   ├── pokedex-bg.png                # Textura de fondo (opcional)
│   └── sounds/                       # Fallback de sonidos local
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout: fonts, providers, navbar
│   │   ├── page.tsx                  # Home: hero + stats globales + accesos rápidos
│   │   ├── loading.tsx               # Global loading (Pokéball spinner)
│   │   ├── error.tsx                 # Global error boundary
│   │   ├── not-found.tsx             # 404 con Gengar triste
│   │   │
│   │   ├── pokemon/
│   │   │   ├── page.tsx              # Pokédex: grid paginado con filtros
│   │   │   ├── loading.tsx           # Skeleton grid
│   │   │   └── [nameOrId]/
│   │   │       ├── page.tsx          # Detalle de Pokémon
│   │   │       └── loading.tsx       # Skeleton detalle
│   │   │
│   │   ├── types/
│   │   │   ├── page.tsx              # Grid de los 18 tipos
│   │   │   └── [nameOrId]/
│   │   │       └── page.tsx          # Detalle de tipo: chart, Pokémon, moves
│   │   │
│   │   ├── moves/
│   │   │   ├── page.tsx              # Catálogo de moves con filtros
│   │   │   └── [nameOrId]/
│   │   │       └── page.tsx          # Detalle de move
│   │   │
│   │   ├── abilities/
│   │   │   ├── page.tsx              # Catálogo de abilities
│   │   │   └── [nameOrId]/
│   │   │       └── page.tsx          # Detalle de ability
│   │   │
│   │   ├── items/
│   │   │   ├── page.tsx              # Catálogo de items por pocket/categoría
│   │   │   └── [nameOrId]/
│   │   │       └── page.tsx          # Detalle de item
│   │   │
│   │   ├── berries/
│   │   │   ├── page.tsx              # Catálogo de berries con stats
│   │   │   └── [nameOrId]/
│   │   │       └── page.tsx          # Detalle de berry
│   │   │
│   │   ├── locations/
│   │   │   ├── page.tsx              # Regiones del mundo Pokémon
│   │   │   └── [region]/
│   │   │       ├── page.tsx          # Detalle de región: mapa, locaciones
│   │   │       └── [location]/
│   │   │           └── page.tsx      # Detalle de locación: áreas, encuentros
│   │   │
│   │   ├── generations/
│   │   │   └── page.tsx              # Timeline de generaciones
│   │   │
│   │   ├── compare/
│   │   │   └── page.tsx              # Comparador de hasta 3 Pokémon
│   │   │
│   │   ├── favorites/
│   │   │   └── page.tsx              # Pokémon favoritos (Zustand + localStorage)
│   │   │
│   │   └── api/                      # Next.js API Routes (proxy para PokéAPI)
│   │       └── pokemon/
│   │           └── [...slug]/
│   │               └── route.ts      # Proxy con caché HTTP headers
│   │
│   ├── components/
│   │   ├── ui/                       # Componentes base reutilizables
│   │   │   ├── button.tsx            # CVA button con variantes
│   │   │   ├── card.tsx              # Card base con variantes
│   │   │   ├── badge.tsx             # Badge para tipos, generaciones
│   │   │   ├── input.tsx             # Input de búsqueda
│   │   │   ├── skeleton.tsx          # Skeleton loaders
│   │   │   ├── spinner.tsx           # Pokéball spinner animado (Framer)
│   │   │   ├── empty-state.tsx       # Estado vacío con sprite 404
│   │   │   └── section-header.tsx    # Header de sección con decoración
│   │   │
│   │   ├── layout/
│   │   │   ├── navbar.tsx            # Navegación principal (Radix NavigationMenu)
│   │   │   ├── sidebar.tsx           # Sidebar de filtros (móvil: Drawer)
│   │   │   ├── footer.tsx            # Footer con créditos PokéAPI
│   │   │   └── providers.tsx         # QueryClient, ThemeProvider, Zustand
│   │   │
│   │   ├── pokemon/
│   │   │   ├── pokemon-grid.tsx      # Grid virtualizado de cards
│   │   │   ├── pokemon-card.tsx      # Card individual con sprite y tipos
│   │   │   ├── pokemon-card-hover.tsx # HoverCard Radix con preview stats
│   │   │   ├── pokemon-filters.tsx   # Panel de filtros (tipo, gen, stats, etc.)
│   │   │   ├── pokemon-search.tsx    # Buscador con Command (Radix)
│   │   │   ├── pokemon-detail/
│   │   │   │   ├── index.tsx         # Orchestrator del detalle
│   │   │   │   ├── hero-section.tsx  # Sprite grande, nombre, tipos, generación
│   │   │   │   ├── stats-tab.tsx     # Radar chart + barras animadas
│   │   │   │   ├── abilities-tab.tsx # Abilities con efectos
│   │   │   │   ├── moves-tab.tsx     # Tabla de moves con método y nivel
│   │   │   │   ├── evolution-tab.tsx # Cadena de evolución visual
│   │   │   │   ├── locations-tab.tsx # Dónde encontrar este Pokémon
│   │   │   │   ├── forms-tab.tsx     # Formas alternativas con sprites
│   │   │   │   └── sprites-tab.tsx   # Galería de sprites (todas las generaciones)
│   │   │   ├── evolution-chain.tsx   # Componente de cadena evolutiva visual
│   │   │   ├── type-badge.tsx        # Badge con color del tipo
│   │   │   ├── stat-bar.tsx          # Barra animada de stat individual
│   │   │   └── cry-button.tsx        # Botón para reproducir cry (Howler)
│   │   │
│   │   ├── types/
│   │   │   ├── type-grid.tsx         # Grid de los 18 tipos
│   │   │   ├── type-card.tsx         # Card de tipo con ícono y color
│   │   │   └── type-chart.tsx        # Matriz de efectividad (Recharts)
│   │   │
│   │   ├── moves/
│   │   │   ├── move-table.tsx        # Tabla de moves con filtros
│   │   │   └── move-card.tsx         # Card de move con metadatos
│   │   │
│   │   ├── items/
│   │   │   ├── item-grid.tsx         # Grid de items por pocket
│   │   │   ├── item-card.tsx         # Card de item con sprite
│   │   │   └── item-pocket-tabs.tsx  # Tabs por pocket (Radix Tabs)
│   │   │
│   │   ├── berries/
│   │   │   ├── berry-grid.tsx        # Grid de berries
│   │   │   ├── berry-card.tsx        # Card con info de crecimiento
│   │   │   └── berry-flavor-chart.tsx # Radar chart de sabores (Recharts)
│   │   │
│   │   ├── compare/
│   │   │   ├── compare-panel.tsx     # Panel de selección de Pokémon
│   │   │   └── compare-stats.tsx     # Comparativa de stats (Recharts bar)
│   │   │
│   │   └── shared/
│   │       ├── pokemon-sprite.tsx    # Imagen con fallback y shiny toggle
│   │       ├── generation-badge.tsx  # Badge de generación
│   │       ├── search-command.tsx    # Búsqueda global spotlight (Radix Command)
│   │       └── favorite-button.tsx   # Botón corazón (Zustand)
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts             # Axios instance configurada
│   │   │   ├── pokemon.ts            # Funciones fetch de Pokémon
│   │   │   ├── types.ts              # Funciones fetch de Tipos
│   │   │   ├── moves.ts              # Funciones fetch de Moves
│   │   │   ├── abilities.ts          # Funciones fetch de Abilities
│   │   │   ├── items.ts              # Funciones fetch de Items
│   │   │   ├── berries.ts            # Funciones fetch de Berries
│   │   │   ├── locations.ts          # Funciones fetch de Locaciones
│   │   │   ├── evolutions.ts         # Funciones fetch de Evoluciones
│   │   │   ├── generations.ts        # Funciones fetch de Generaciones
│   │   │   └── machines.ts           # Funciones fetch de TMs/HMs
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePokemonList.ts     # Hook con React Query + paginación
│   │   │   ├── usePokemon.ts         # Hook para detalle de Pokémon
│   │   │   ├── usePokemonSpecies.ts  # Hook para species
│   │   │   ├── useEvolutionChain.ts  # Hook para cadena evolutiva
│   │   │   ├── useTypes.ts           # Hook para tipos
│   │   │   ├── useMoves.ts           # Hook para moves
│   │   │   ├── useAbilities.ts       # Hook para abilities
│   │   │   ├── useItems.ts           # Hook para items
│   │   │   ├── useBerries.ts         # Hook para berries
│   │   │   ├── useLocations.ts       # Hook para locaciones
│   │   │   ├── useGenerations.ts     # Hook para generaciones
│   │   │   ├── useFavorites.ts       # Hook Zustand para favoritos
│   │   │   ├── useCompare.ts         # Hook Zustand para comparador
│   │   │   ├── useSearch.ts          # Hook búsqueda global con Fuse.js
│   │   │   └── usePokemonCry.ts      # Hook Howler para reproducir cry
│   │   │
│   │   ├── store/
│   │   │   ├── favorites.store.ts    # Zustand: favoritos (persistido localStorage)
│   │   │   ├── compare.store.ts      # Zustand: comparador (máx 3 Pokémon)
│   │   │   └── ui.store.ts           # Zustand: estado UI (sidebar open, view mode)
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.ts                 # clsx + tailwind-merge helper
│   │   │   ├── pokemon.utils.ts      # Helpers: formateo nombre, ID con padding, etc.
│   │   │   ├── type.utils.ts         # Colores y gradientes por tipo
│   │   │   ├── stat.utils.ts         # Formateo y color de stats
│   │   │   ├── evolution.utils.ts    # Parser de árbol evolutivo
│   │   │   └── flavor-text.utils.ts  # Limpieza de flavor text (chars especiales)
│   │   │
│   │   └── constants/
│   │       ├── types.constants.ts    # 18 tipos con colores y gradientes hex
│   │       ├── generations.constants.ts # Generaciones con juegos
│   │       ├── stats.constants.ts    # Nombres cortos de stats + colores
│   │       ├── query-keys.ts         # React Query keys factory
│   │       └── api.constants.ts      # Base URLs, límites de paginación
│   │
│   └── types/
│       ├── api/
│       │   ├── pokemon.types.ts      # Interfaces Pokemon, PokemonSpecies, etc.
│       │   ├── move.types.ts         # Interfaces Move, MoveMetaData, etc.
│       │   ├── ability.types.ts      # Interfaces Ability
│       │   ├── item.types.ts         # Interfaces Item, ItemSprites, etc.
│       │   ├── berry.types.ts        # Interfaces Berry
│       │   ├── location.types.ts     # Interfaces Location, LocationArea
│       │   ├── evolution.types.ts    # Interfaces EvolutionChain, ChainLink
│       │   ├── type.types.ts         # Interfaces Type, TypeRelations
│       │   ├── generation.types.ts   # Interfaces Generation
│       │   └── common.types.ts       # NamedAPIResource, APIResource, etc.
│       └── app/
│           ├── filter.types.ts       # Tipos para filtros de la UI
│           ├── compare.types.ts      # Tipos para el comparador
│           └── store.types.ts        # Tipos para stores de Zustand
│
├── tailwind.config.ts                # Config con colores Pokémon, fuentes, plugins
├── postcss.config.js                 # PostCSS ^8.5.6
├── next.config.ts                    # Config Next.js (imágenes PokéAPI, remotePatterns)
├── tsconfig.json                     # TypeScript con paths absolutos (@/)
└── package.json
```

---

## 4. MÓDULOS / FEATURES DEL SISTEMA

### 4.1 🏠 HOME (`/`)
**Propósito**: Landing page atractiva que contextualiza la app.

**Contenido**:
- **Hero Section**: Pokéball animada (Framer) + título "PokéDex" con tipografía `Press Start 2P` + partículas pixeladas de fondo + CTA "Explorar Pokémon".
- **Stats Globales**: Tarjetas con datos de la API: total Pokémon, total Moves, total Abilities, total Items, total Berries, total Tipos — animados con `@number-flow/react`.
- **Accesos Rápidos**: Grid de 6 iconos grandes (Pokémon, Tipos, Moves, Items, Berries, Comparador).
- **Pokémon Destacados**: 6 Pokémon aleatorios con sprite animado (hover float).
- **Generaciones Timeline**: Strip horizontal scrollable con las 9 generaciones.

**API calls**: `GET /pokemon?limit=6`, `GET /generation`, counts básicos.

---

### 4.2 📖 POKÉDEX (`/pokemon`)
**Propósito**: Explorar todos los Pokémon con filtros potentes.

**Contenido**:
- **Search Bar**: Buscador con Radix Command — búsqueda por nombre e ID, resultados en tiempo real (Fuse.js client-side para lista cacheada).
- **Filtros** (Radix Popover / panel lateral):
  - Por **tipo** (1 o 2 tipos, 18 opciones con color)
  - Por **generación** (Gen I–IX)
  - Por **hábitat** (cave, forest, grassland, etc.)
  - Por **forma de huevo** (egg group)
  - Por **color** Pokédex (Radix Select)
  - Por **estadísticas mínimas** (Radix Slider para HP, Atk, Def, Sp.Atk, Sp.Def, Speed)
  - **Legendario / Mítico / Baby** (Radix Switch)
  - **Tiene formas alternativas** (Radix Switch)
  - **Ordenar por**: ID, nombre, peso, altura, stat específica
- **Vista**: Toggle Grid / Lista (Zustand ui.store).
- **Grid**: Virtualizado con `@tanstack/react-virtual` para manejar 1000+ Pokémon sin lag. Paginación o infinite scroll (configurable).
- **Pokemon Card**: 
  - Sprite del Pokémon (con toggle shiny)
  - Número (#001)
  - Nombre
  - Type badges con colores
  - Hover: HoverCard Radix mostrando stats base básicos

**API calls**: `GET /pokemon?limit=20&offset=N`, fetch completo en background.

---

### 4.3 🦎 DETALLE DE POKÉMON (`/pokemon/[nameOrId]`)
**Propósito**: Todo sobre un Pokémon específico.

**Layout**: Header con sprite grande + fondo con gradiente del tipo primario. Tabs (Radix Tabs) con contenido.

**Secciones**:

#### Hero Section
- Sprite animado (Framer: float animation) con toggle Shiny / Normal
- Número nacional (#001)
- Nombre en `Press Start 2P`
- Type badges
- Generación badge
- Altura y peso con animación numérica
- Botón cry (reproducir sonido con Howler)
- Botón favorito (Zustand)
- Botón "Añadir al comparador"
- Descripción (flavor text en inglés/español)
- Género, tasa de captura, felicidad base, pasos para huevo

#### Tab: Estadísticas
- 6 stat bars animadas (Radix Progress + Framer fill-animation)
  - HP, Attack, Defense, Sp.Atk, Sp.Def, Speed
  - Color por valor: rojo (<50), amarillo (50-80), verde (>80)
- Total de stats
- Radar Chart (Recharts) con las 6 stats
- Tabla de EV yield
- Comparativa con promedio de todos los Pokémon

#### Tab: Habilidades
- Lista de abilities con nombre, descripción y si es hidden
- Flavor text por versión
- Lista de otros Pokémon que comparten la ability (con miniaturas)

#### Tab: Moves
- Tabla completa (Radix ScrollArea):
  - Nivel de aprendizaje, nombre del move, tipo badge, clase de daño, power, accuracy, PP
  - Filtros por método de aprendizaje (level-up, TM, egg, tutor)
  - Filtros por versión/generación
  - Click en move → navegar al detalle del move

#### Tab: Evoluciones
- Cadena evolutiva visual:
  - Sprites conectados con flechas
  - Condiciones de evolución debajo de cada flecha (nivel, item, felicidad, etc.)
  - Soporte para cadenas ramificadas (Eevee, Wurmple, etc.)
  - Branching tree visual

#### Tab: Formas
- Grid de formas alternativas con sprites (mega, gmax, regional, etc.)
- Diferencias de stats entre formas
- Tipos de cada forma

#### Tab: Sprites
- Galería completa: front, back, shiny, female, shiny-female
- Por generación (todas las generaciones disponibles)
- Sprites de juegos específicos
- Estilo galería con zoom en lightbox (Radix Dialog)

#### Tab: Encuentros
- Dónde encontrar este Pokémon en la naturaleza
- Por versión del juego
- Método de encuentro
- Nivel mínimo y máximo
- Tasa de encuentro

**API calls**: `GET /pokemon/{id}`, `GET /pokemon-species/{id}`, `GET /evolution-chain/{id}`, `GET /pokemon/{id}/encounters`.

---

### 4.4 ⚡ TIPOS (`/types`)
**Propósito**: Explorar los 18 tipos y sus relaciones.

**Lista de Tipos**:
- Grid de 18 cards, cada una con:
  - Color característico del tipo
  - Ícono (react-icons `Gi*`)
  - Nombre
  - Conteo de Pokémon con ese tipo
  - Conteo de moves de ese tipo

**Detalle de Tipo** (`/types/[nameOrId]`):
- Nombre y color del tipo en hero
- **Tabla de efectividades** (TypeRelations):
  - Super efectivo contra (×2)
  - No muy efectivo contra (×0.5)
  - No afecta (×0)
  - Recibe super efectivo de
  - Resiste
  - Inmune a
- Visualización en **matriz/heatmap** con Recharts
- Generación en que fue introducido
- Clase de daño (físico/especial/status histórico)
- Lista de Pokémon con este tipo (grid virtualizado)
- Lista de Moves de este tipo (tabla)
- **Historial de cambios** entre generaciones (past_damage_relations)

**API calls**: `GET /type`, `GET /type/{id}`.

---

### 4.5 💥 MOVES (`/moves`)
**Propósito**: Catálogo completo de movimientos.

**Lista**:
- Tabla con paginación o virtualización
- Columnas: Nombre, Tipo badge, Clase (físico/especial/status), Power, Accuracy, PP, Generación
- Filtros: tipo, clase de daño, generación, ailment, categoría
- Ordenamiento por cualquier columna

**Detalle** (`/moves/[nameOrId]`):
- Nombre, tipo, clase de daño
- Stats: Power, Accuracy, PP, Priority, Effect Chance
- Descripción del efecto
- Metadata: ailment, min/max hits, drain, healing, crit rate, flinch chance
- Estadísticas de Contest (appeal, jam, tipo de contest)
- Lista de Pokémon que aprenden el move
- TMs/HMs asociados por versión
- Historial de cambios entre versiones

**API calls**: `GET /move`, `GET /move/{id}`.

---

### 4.6 ✨ ABILITIES (`/abilities`)
**Propósito**: Catálogo de habilidades pasivas.

**Lista**:
- Grid/tabla de abilities con nombre, descripción corta, si es main series, generación
- Filtros por generación, si es hidden ability

**Detalle** (`/abilities/[nameOrId]`):
- Nombre y descripción completa
- Efecto en batalla y en overworld
- Generación de introducción
- Lista de Pokémon con esta ability (con indicación de hidden/slot 1/slot 2)
- Historial de cambios de efectos entre versiones

**API calls**: `GET /ability`, `GET /ability/{id}`.

---

### 4.7 🎒 ITEMS (`/items`)
**Propósito**: Catálogo de objetos del juego.

**Lista**:
- **Tabs por Pocket** (Radix Tabs): Misc, Medicine, Pokéballs, TMs/HMs, Berries, Mail, Battle, Key Items
- Grid de cards con:
  - Sprite del item
  - Nombre
  - Categoría badge
  - Costo en tienda
- Filtros: categoría, atributo, generación

**Detalle** (`/items/[nameOrId]`):
- Sprite grande
- Nombre, categoría, pocket
- Costo en tienda
- Efecto completo
- Efecto de Fling (power y efecto)
- Atributos (holdable, consumable, etc.)
- Flavor text por versión
- Pokémon que pueden sostenerlo en encuentros salvajes (con rareza)
- Si es bag trigger para evolución
- TMs/HMs relacionados

**API calls**: `GET /item`, `GET /item/{id}`, `GET /item-pocket`, `GET /item-category`.

---

### 4.8 🍓 BERRIES (`/berries`)
**Propósito**: Información completa de bayas.

**Lista**:
- Grid de bayas con sprite (tomado de item relacionado)
- Nombre, firmeza, sabores principales, tiempo de crecimiento

**Detalle** (`/berries/[nameOrId]`):
- Nombre, firmeza
- Stats de crecimiento: growth_time, max_harvest, size, smoothness, soil_dryness
- **Radar chart de sabores** (spicy, dry, sweet, bitter, sour) con Recharts
- Potencia Natural Gift y tipo
- Referencia al Item correspondiente (link)
- Firmeza badge con descripción

**API calls**: `GET /berry`, `GET /berry/{id}`, `GET /berry-firmness`, `GET /berry-flavor`.

---

### 4.9 🗺️ LOCACIONES (`/locations`)
**Propósito**: Explorar el mundo Pokémon por regiones.

**Lista de Regiones**:
- Grid de las regiones (Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, Paldea)
- Imagen ilustrativa, nombre, generación asociada

**Detalle de Región** (`/locations/[region]`):
- Nombre y generación
- Lista de locaciones en la región (grid/lista con links)
- Pokédexes asociados
- Grupos de versiones donde aparece

**Detalle de Locación** (`/locations/[region]/[location]`):
- Nombre, región
- Áreas de la locación
- Por área: métodos de encuentro disponibles
- Pokémon encontrables por versión (tabla con nivel, tasa de encuentro, condición)

**API calls**: `GET /region`, `GET /region/{id}`, `GET /location/{id}`, `GET /location-area/{id}`.

---

### 4.10 📅 GENERACIONES (`/generations`)
**Propósito**: Timeline de la historia Pokémon.

**Contenido**:
- Timeline vertical con las 9 generaciones
- Por generación:
  - Región principal
  - Juegos incluidos
  - Pokémon introducidos (con miniaturas de algunos starters)
  - Moves introducidos (conteo)
  - Abilities introducidas (conteo)
  - Tipos introducidos

**API calls**: `GET /generation`, `GET /generation/{id}`.

---

### 4.11 ⚖️ COMPARADOR (`/compare`)
**Propósito**: Comparar hasta 3 Pokémon lado a lado.

**Contenido**:
- 3 slots de selección (Radix Command/Select para buscar Pokémon)
- Sprites comparados lado a lado
- **Bar chart comparativo de stats** (Recharts grouped bar)
- Tabla de stats con colores (verde = mayor, rojo = menor)
- Comparativa de tipos, peso, altura
- Ataques exclusivos de cada uno

**Estado**: Zustand `compare.store.ts`, persistido en URL con `nuqs`.

---

### 4.12 ❤️ FAVORITOS (`/favorites`)
**Propósito**: Pokémon marcados como favoritos.

**Contenido**:
- Grid de Pokémon favoritos (misma PokemonCard que la Pokédex)
- Botón para eliminar todos
- Estado vacío ilustrado
- Persistido en `localStorage` vía Zustand persist middleware

---

### 4.13 🔍 BÚSQUEDA GLOBAL
**Propósito**: Encontrar cualquier recurso desde cualquier página.

**Implementación**: Radix Command Dialog, trigger con `Cmd+K` / `Ctrl+K`.

**Búsqueda en**:
- Pokémon (por nombre e ID)
- Moves
- Abilities
- Items
- Berries
- Tipos

**Datos**: Lista completa cacheada en React Query, filtrada client-side con Fuse.js para búsqueda fuzzy.

---

## 5. SISTEMA DE DISEÑO (DESIGN TOKENS)

### Paleta de Colores
```typescript
// tailwind.config.ts — colores custom
colors: {
  // Pokédex Core
  'poke-red':     '#CC0000',  // Rojo Pokédex
  'poke-red-dark':'#990000',
  'poke-yellow':  '#FFD700',  // Amarillo Pikachu
  'poke-blue':    '#0075BE',  // Azul Pokédex screen
  'poke-dark':    '#1a1a2e',  // Fondo dark
  'poke-darker':  '#0d0d1a',
  'poke-surface': '#16213e',
  'poke-border':  '#0f3460',
  // Tipos (18 tipos completos)
  type: {
    normal:   '#A8A878',
    fire:     '#F08030',
    water:    '#6890F0',
    electric: '#F8D030',
    grass:    '#78C850',
    ice:      '#98D8D8',
    fighting: '#C03028',
    poison:   '#A040A0',
    ground:   '#E0C068',
    flying:   '#A890F0',
    psychic:  '#F85888',
    bug:      '#A8B820',
    rock:     '#B8A038',
    ghost:    '#705898',
    dragon:   '#7038F8',
    dark:     '#705848',
    steel:    '#B8B8D0',
    fairy:    '#EE99AC',
  }
}
```

### Tipografía
```typescript
fontFamily: {
  'pixel': ['"Press Start 2P"', 'cursive'],   // Headings, números
  'body':  ['"Nunito"', 'sans-serif'],          // Texto corrido
  'mono':  ['"JetBrains Mono"', 'monospace'],   // Datos técnicos, IDs
}
```

### Animaciones (Framer Motion)
```typescript
// Variantes reutilizables
const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, scale: 1.05 }
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, type: 'spring', stiffness: 120 }
  }),
  hover: { scale: 1.04, y: -4, transition: { type: 'spring' } }
}

const pokéballSpinVariants = {
  animate: { rotate: 360, transition: { repeat: Infinity, duration: 1, ease: 'linear' } }
}

const statFillVariants = {
  initial: { width: 0 },
  animate: (value: number) => ({
    width: `${(value / 255) * 100}%`,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 }
  })
}
```

---

## 6. CAPA DE DATOS (API LAYER)

### Cliente Axios
```typescript
// lib/api/client.ts
const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})
// Interceptor: logging en desarrollo
// Interceptor: retry automático en 429/503
```

### React Query — Configuración
```typescript
// QueryClient global
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,     // 1 hora — datos de PokéAPI son estáticos
      gcTime:    1000 * 60 * 60 * 24, // 24 horas en caché
      retry: 2,
      refetchOnWindowFocus: false,
    }
  }
})
```

### Query Keys Factory
```typescript
// lib/constants/query-keys.ts
export const pokemonKeys = {
  all:     ['pokemon'] as const,
  lists:   () => [...pokemonKeys.all, 'list'] as const,
  list:    (filters: PokemonFilters) => [...pokemonKeys.lists(), filters] as const,
  detail:  (id: string | number) => [...pokemonKeys.all, 'detail', id] as const,
  species: (id: string | number) => [...pokemonKeys.all, 'species', id] as const,
  encounters: (id: string | number) => [...pokemonKeys.all, 'encounters', id] as const,
}
// Mismo patrón para: typeKeys, moveKeys, abilityKeys, itemKeys, berryKeys, locationKeys
```

### Estrategia de Prefetching
- En `PokemonCard` hover → prefetch del detalle (`queryClient.prefetchQuery`)
- En listados → prefetch de la siguiente página
- En `generateStaticParams` de Next.js → pregenerar páginas de los primeros 151 Pokémon

---

## 7. GESTIÓN DE ESTADO (ZUSTAND)

### Favorites Store
```typescript
interface FavoritesStore {
  favorites: number[]              // IDs de Pokémon
  add: (id: number) => void
  remove: (id: number) => void
  toggle: (id: number) => void
  isFavorite: (id: number) => boolean
  clear: () => void
}
// Persisted con zustand/middleware persist → localStorage key: 'poke-favorites'
```

### Compare Store
```typescript
interface CompareStore {
  pokemonIds: (number | null)[]    // Máx 3 slots
  add: (id: number) => void
  remove: (id: number) => void
  clear: () => void
  canAdd: boolean
}
```

### UI Store
```typescript
interface UIStore {
  viewMode: 'grid' | 'list'
  sidebarOpen: boolean
  shinyMode: boolean               // Global shiny toggle
  toggleViewMode: () => void
  toggleSidebar: () => void
  toggleShinyMode: () => void
}
```

---

## 8. TIPOS TYPESCRIPT (Resumen)

### Tipos base comunes
```typescript
// types/api/common.types.ts
interface NamedAPIResource { name: string; url: string }
interface APIResource { url: string }
interface Name { name: string; language: NamedAPIResource }
interface FlavorText { flavor_text: string; language: NamedAPIResource; version: NamedAPIResource }
interface Description { description: string; language: NamedAPIResource }
interface Effect { effect: string; language: NamedAPIResource }
interface VerboseEffect { effect: string; short_effect: string; language: NamedAPIResource }
interface NamedAPIResourceList<T = NamedAPIResource> {
  count: number; next: string | null; previous: string | null; results: T[]
}
```

### Tipos Pokémon (ejemplo)
```typescript
// types/api/pokemon.types.ts
interface Pokemon {
  id: number; name: string; base_experience: number
  height: number; is_default: boolean; order: number; weight: number
  abilities: PokemonAbility[]; forms: NamedAPIResource[]
  game_indices: VersionGameIndex[]; held_items: PokemonHeldItem[]
  location_area_encounters: string; moves: PokemonMove[]
  sprites: PokemonSprites; cries: PokemonCries
  species: NamedAPIResource; stats: PokemonStat[]; types: PokemonType[]
  past_types: PokemonTypePast[]; past_abilities: PokemonAbilityPast[]
}
```
*(Todos los tipos documentados en la API v2 serán implementados con interfaces completas)*

---

## 9. ROUTING & NAVEGACIÓN

### Rutas principales
| Ruta | Descripción |
|---|---|
| `/` | Home / Landing |
| `/pokemon` | Pokédex completa con filtros |
| `/pokemon/[nameOrId]` | Detalle de Pokémon |
| `/types` | Grid de tipos |
| `/types/[nameOrId]` | Detalle de tipo |
| `/moves` | Catálogo de moves |
| `/moves/[nameOrId]` | Detalle de move |
| `/abilities` | Catálogo de abilities |
| `/abilities/[nameOrId]` | Detalle de ability |
| `/items` | Catálogo de items |
| `/items/[nameOrId]` | Detalle de item |
| `/berries` | Catálogo de berries |
| `/berries/[nameOrId]` | Detalle de berry |
| `/locations` | Regiones del mundo |
| `/locations/[region]` | Detalle de región |
| `/locations/[region]/[location]` | Locación específica |
| `/generations` | Timeline de generaciones |
| `/compare` | Comparador de Pokémon |
| `/favorites` | Pokémon favoritos |

### URL State (nuqs)
- `/pokemon?type=fire&gen=1&sort=id&order=asc&page=2`
- `/compare?p1=charizard&p2=blastoise&p3=venusaur`
- `/moves?type=water&class=special&page=1`

---

## 10. PERFORMANCE & SEO

### Next.js Optimizaciones
- `generateStaticParams` para los primeros 151 Pokémon (Gen I)
- `generateMetadata` dinámica por Pokémon (og:title, og:description, og:image con sprite)
- `next/image` con `remotePatterns` para `raw.githubusercontent.com`
- Lazy loading de tabs (solo fetch al activar el tab activo)
- Suspense boundaries en cada tab del detalle

### React Query Caching
- `staleTime: 1h` — PokéAPI es inmutable, no hay necesidad de refetch frecuente
- Prefetch en hover de cards (datos cargados antes de navegar)
- Lista completa de nombres cacheada para búsqueda global offline

### Virtualización
- `@tanstack/react-virtual` en el grid de Pokémon (1025 Pokémon)
- `@tanstack/react-virtual` en tablas de moves (900+ moves)

---

## 11. CONFIGURACIONES CLAVE

### `next.config.ts`
```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'assets.pokemon.com' },
    ]
  }
}
```

### `tailwind.config.ts`
- Colores custom (tipo, pokédex, surfaces)
- Fonts: `Press Start 2P`, `Nunito`, `JetBrains Mono`
- Animaciones: `bounce-slow`, `float`, `pokeball-spin`, `scan-line`
- Plugin: `tailwindcss-animate` para Radix UI animations

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## 12. `package.json` — Dependencias Completas

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.19",
    "postcss": "^8.5.6",
    "autoprefixer": "^10.4.20",

    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-tooltip": "^1.1.3",
    "@radix-ui/react-popover": "^1.1.2",
    "@radix-ui/react-accordion": "^1.2.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.2.0",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.1",
    "@radix-ui/react-slider": "^1.2.1",
    "@radix-ui/react-hover-card": "^1.1.2",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-navigation-menu": "^1.2.1",

    "@tanstack/react-query": "^5.59.0",
    "@tanstack/react-virtual": "^3.10.7",
    "zustand": "^5.0.0",
    "axios": "^1.7.7",
    "nuqs": "^2.1.2",

    "framer-motion": "^11.11.1",
    "@number-flow/react": "^0.5.2",
    "recharts": "^2.13.0",
    "lucide-react": "^0.462.0",
    "react-icons": "^5.3.0",
    "howler": "^2.2.4",
    "@types/howler": "^2.2.12",

    "fuse.js": "^7.0.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.0",
    "tailwind-merge": "^2.5.4",
    "next-themes": "^0.4.3",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

---

## 13. ORDEN DE IMPLEMENTACIÓN (ROADMAP)

```
FASE 1 — Fundación (setup + core)
  [x] Inicializar proyecto Next.js + TypeScript
  [x] Configurar Tailwind + PostCSS + fuentes
  [x] Configurar React Query + Zustand + Providers
  [x] Crear tipos TypeScript de PokéAPI completos
  [x] Crear API layer (client.ts + funciones por módulo)
  [x] Implementar componentes UI base (button, card, badge, skeleton, spinner)
  [x] Implementar layout (Navbar, Footer)

FASE 2 — Módulo Pokémon (core feature)
  [x] Home page con hero y stats globales
  [x] Pokédex grid con virtualización y paginación
  [x] Sistema de filtros completo
  [x] Búsqueda global (Radix Command)
  [x] Detalle de Pokémon (todas las tabs)
  [x] Cadena evolutiva visual
  [x] Comparador
  [x] Favoritos

FASE 3 — Módulos secundarios
  [x] Tipos + detalle + chart de efectividades
  [x] Moves + detalle
  [x] Abilities + detalle
  [x] Items + detalle
  [x] Berries + detalle

FASE 4 — Módulos terciarios
  [x] Locaciones + Regiones
  [x] Generaciones timeline
  [x] Machines/TMs

FASE 5 — Polish
  [x] Animaciones Framer Motion en todas las páginas
  [x] SEO + generateMetadata
  [x] generateStaticParams Gen I
  [x] Responsive móvil completo
  [x] A11y audit (Radix garantiza base, verificar custom)
  [x] Loading states + Error boundaries en todos los módulos
```

---

## 14. CONSIDERACIONES ESPECIALES

### Manejo de Flavor Text
Los flavor texts de PokéAPI contienen caracteres especiales (`\n`, `\f`, saltos raros). Implementar `flavor-text.utils.ts` que los limpie antes de mostrar.

### Evoluciones Complejas
La estructura `ChainLink` es recursiva. Implementar parser que la convierta a un árbol aplanado para renderizado visual. Casos especiales: Eevee (8 ramas), Wurmple (2 caminos dependientes de random), Tyrogue (3 ramas por stats).

### Sprites Faltantes
Muchos Pokémon post Gen V no tienen sprites de generaciones antiguas. Siempre usar fallback: si no hay sprite de gen específica, mostrar el `front_default` actual.

### Rate Limiting
PokéAPI solicita "uso razonable". Con `staleTime: 1h` y sin `refetchOnWindowFocus`, el número de requests será mínimo. Para el buscador global, cargar la lista completa una sola vez y filtrar client-side.

### Tipos Past Relations
Algunos tipos (Ghost, Dark, Steel) tuvieron relaciones de daño diferentes en generaciones pasadas. Mostrar en el detalle de tipo con indicador de "hasta Gen X".

---

