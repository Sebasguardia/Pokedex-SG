// ─────────────────────────────────────────────────────────────────
// GENERACIONES — Constantes completas
// Mantiene el array original + agrega paleta, mascots, años, etc.
// ─────────────────────────────────────────────────────────────────

// Array base (mantiene forma original)
export const GENERATIONS = [
    { id: 1, name: "generation-i", label: "Gen I", region: "Kanto", games: ["Red", "Blue", "Yellow"], range: [1, 151] },
    { id: 2, name: "generation-ii", label: "Gen II", region: "Johto", games: ["Gold", "Silver", "Crystal"], range: [152, 251] },
    { id: 3, name: "generation-iii", label: "Gen III", region: "Hoenn", games: ["Ruby", "Sapphire", "Emerald"], range: [252, 386] },
    { id: 4, name: "generation-iv", label: "Gen IV", region: "Sinnoh", games: ["Diamond", "Pearl", "Platinum"], range: [387, 493] },
    { id: 5, name: "generation-v", label: "Gen V", region: "Unova", games: ["Black", "White"], range: [494, 649] },
    { id: 6, name: "generation-vi", label: "Gen VI", region: "Kalos", games: ["X", "Y"], range: [650, 721] },
    { id: 7, name: "generation-vii", label: "Gen VII", region: "Alola", games: ["Sun", "Moon"], range: [722, 809] },
    { id: 8, name: "generation-viii", label: "Gen VIII", region: "Galar", games: ["Sword", "Shield"], range: [810, 905] },
    { id: 9, name: "generation-ix", label: "Gen IX", region: "Paldea", games: ["Scarlet", "Violet"], range: [906, 1025] },
] as const;

export type GenerationName = typeof GENERATIONS[number]["name"];
export const GENERATION_ORDER = GENERATIONS.map((g) => g.name);

// ── Color único por generación — se usa en sombras y acentos
export const GENERATION_COLORS: Record<string, string> = {
    "generation-i": "#CC0000",
    "generation-ii": "#B8860B",
    "generation-iii": "#1B5E20",
    "generation-iv": "#1565C0",
    "generation-v": "#212121",
    "generation-vi": "#6A1B9A",
    "generation-vii": "#E65100",
    "generation-viii": "#00695C",
    "generation-ix": "#880E4F",
};

// ── Números romanos
export const GENERATION_ROMAN: Record<string, string> = {
    "generation-i": "I", "generation-ii": "II",
    "generation-iii": "III", "generation-iv": "IV",
    "generation-v": "V", "generation-vi": "VI",
    "generation-vii": "VII", "generation-viii": "VIII",
    "generation-ix": "IX",
};

// ── Nombre en español
export const GENERATION_NAMES_ES: Record<string, string> = {
    "generation-i": "Generación I", "generation-ii": "Generación II",
    "generation-iii": "Generación III", "generation-iv": "Generación IV",
    "generation-v": "Generación V", "generation-vi": "Generación VI",
    "generation-vii": "Generación VII", "generation-viii": "Generación VIII",
    "generation-ix": "Generación IX",
};

// ── Año de lanzamiento (Japón)
export const GENERATION_YEARS: Record<string, string> = {
    "generation-i": "1996", "generation-ii": "1999",
    "generation-iii": "2002", "generation-iv": "2006",
    "generation-v": "2010", "generation-vi": "2013",
    "generation-vii": "2016", "generation-viii": "2019",
    "generation-ix": "2022",
};

// ── Juegos en español
export const GENERATION_GAMES_ES: Record<string, string[]> = {
    "generation-i": ["Rojo", "Azul", "Amarillo"],
    "generation-ii": ["Oro", "Plata", "Cristal"],
    "generation-iii": ["Rubí", "Zafiro", "Esmeralda", "FR/HV"],
    "generation-iv": ["Diamante", "Perla", "Platino", "HG/SS"],
    "generation-v": ["Negro", "Blanco", "Negro 2", "Blanco 2"],
    "generation-vi": ["X", "Y", "Rubí Omega", "Zafiro Alfa"],
    "generation-vii": ["Sol", "Luna", "Sol Ultra", "Luna Ultra"],
    "generation-viii": ["Espada", "Escudo", "BD/PR", "Leyendas: Arceus"],
    "generation-ix": ["Escarlata", "Violeta"],
};

// ── Artwork o Covers (Placeholder para insertar la url de la imagen después)
export const GENERATION_GAMES_ARTWORK: Record<string, { name: string, coverUrl: string, platform?: string }[]> = {
    "generation-i": [
        { name: "Edición Roja", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/d/db/latest/20160715095430/Car%C3%A1tula_de_Pok%C3%A9mon_Rojo.jpg", platform: "Game Boy" },
        { name: "Edición Azul", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/9/9d/latest/20160715095744/Car%C3%A1tula_de_Pok%C3%A9mon_Azul.jpg", platform: "Game Boy" },
        { name: "Edición Verde (JP)", coverUrl: "https://static.wikia.nocookie.net/espokemon/images/b/b8/Car%C3%A1tula_Pok%C3%A9mon_Verde_%28Jap%C3%B3n%29.png/revision/latest/scale-to-width/360?cb=20151013125323", platform: "Game Boy" },
        { name: "Edición Amarilla", coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRET3XsJyyK6XS1M7ukbzkWsTK--exdpbfpLw&s", platform: "GB Color" }
    ],
    "generation-ii": [
        { name: "Edición Oro", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/6b/latest/20160715092932/Pokemon_Edici%C3%B3n_Oro.jpg/250px-Pokemon_Edici%C3%B3n_Oro.jpg", platform: "GB Color" },
        { name: "Edición Plata", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/7/73/latest/20160715093037/Pokemon_Edici%C3%B3n_Plata.jpg/250px-Pokemon_Edici%C3%B3n_Plata.jpg", platform: "GB Color" },
        { name: "Edición Cristal", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/3b/latest/20160715093139/Pokemon_Edici%C3%B3n_Cristal.jpg/800px-Pokemon_Edici%C3%B3n_Cristal.jpg", platform: "GB Color" }
    ],
    "generation-iii": [
        { name: "Edición Rubí", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/03/latest/20211204124626/Car%C3%A1tula_de_Rub%C3%AD.png/200px-Car%C3%A1tula_de_Rub%C3%AD.png", platform: "GBA" },
        { name: "Edición Zafiro", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d3/latest/20211204124644/Car%C3%A1tula_de_Zafiro.png/200px-Car%C3%A1tula_de_Zafiro.png", platform: "GBA" },
        { name: "Edición Esmeralda", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/02/latest/20211108123052/Caratula_Esmeralda.jpg/800px-Caratula_Esmeralda.jpg", platform: "GBA" },
        { name: "Rojo Fuego", coverUrl: "https://static.wikia.nocookie.net/espokemon/images/a/ac/Car%C3%A1tula_de_Rojo_Fuego.png/revision/latest/scale-to-width-down/1200?cb=20190313061006", platform: "GBA" },
        { name: "Verde Hoja", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/31/latest/20211108122911/Car%C3%A1tula_de_Verde_Hoja.png/210px-Car%C3%A1tula_de_Verde_Hoja.png", platform: "GBA" }
    ],
    "generation-iv": [
        { name: "Diamante", coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThh3FOzsPrc3N0_GFxEM0DYQnDP8B7mQQ41w&s", platform: "Nintendo DS" },
        { name: "Perla", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/64/latest/20211108123252/Pok%C3%A9mon_Perla.png/220px-Pok%C3%A9mon_Perla.png", platform: "Nintendo DS" },
        { name: "Platino", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/f/f4/latest/20211108120853/Car%C3%A1tula_Pok%C3%A9mon_Platino_%28ESP%29.png/800px-Car%C3%A1tula_Pok%C3%A9mon_Platino_%28ESP%29.png", platform: "Nintendo DS" },
        { name: "HeartGold", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/17/latest/20241023140413/Pok%C3%A9mon_Edici%C3%B3n_Oro_HeartGold_car%C3%A1tula_ES.png/250px-Pok%C3%A9mon_Edici%C3%B3n_Oro_HeartGold_car%C3%A1tula_ES.png", platform: "Nintendo DS" },
        { name: "SoulSilver", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d0/latest/20241023140611/Pok%C3%A9mon_Edici%C3%B3n_Plata_SoulSilver_car%C3%A1tula_ES.png/250px-Pok%C3%A9mon_Edici%C3%B3n_Plata_SoulSilver_car%C3%A1tula_ES.png", platform: "Nintendo DS" }
    ],
    "generation-v": [
        { name: "Blanco", coverUrl: "https://static.wikia.nocookie.net/espokemon/images/9/95/Pkmnwhitesp.jpg/revision/latest?cb=20210615204455", platform: "Nintendo DS" },
        { name: "Negro", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/94/latest/20260102105725/Pok%C3%A9mon_Edici%C3%B3n_Negra.png/800px-Pok%C3%A9mon_Edici%C3%B3n_Negra.png", platform: "Nintendo DS" },
        { name: "Blanco 2", coverUrl: "https://static.wikia.nocookie.net/espokemon/images/1/17/Box_Pok%C3%A9mon_Blanco_2.png/revision/latest/scale-to-width/360?cb=20140218002530", platform: "Nintendo DS" },
        { name: "Negro 2", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/a4/latest/20140217225209/Box_Pok%C3%A9mon_Negro_2.png/800px-Box_Pok%C3%A9mon_Negro_2.png", platform: "Nintendo DS" }
    ],
    "generation-vi": [
        { name: "X", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/8/81/latest/20130621162341/Pok%C3%A9mon_X_Car%C3%A1tula.png/200px-Pok%C3%A9mon_X_Car%C3%A1tula.png", platform: "Nintendo 3DS" },
        { name: "Y", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/6/6f/latest/20130621162348/Pok%C3%A9mon_Y_Car%C3%A1tula.png/200px-Pok%C3%A9mon_Y_Car%C3%A1tula.png", platform: "Nintendo 3DS" },
        { name: "Rubí Omega", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/5d/latest/20150827182103/Car%C3%A1tula_Pok%C3%A9mon_Rub%C3%AD_Omega.png/250px-Car%C3%A1tula_Pok%C3%A9mon_Rub%C3%AD_Omega.png", platform: "Nintendo 3DS" },
        { name: "Zafiro Alfa", coverUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNNTG1bV_D74Nf3CNpX4doT5FrbSUIiWnA3w&s", platform: "Nintendo 3DS" }
    ],
    "generation-vii": [
        { name: "Sol", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/9/9b/latest/20160906014708/Car%C3%A1tula_Pok%C3%A9mon_Sol.png", platform: "Nintendo 3DS" },
        { name: "Luna", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/7/73/latest/20160906014824/Car%C3%A1tula_Pok%C3%A9mon_Luna.png/260px-Car%C3%A1tula_Pok%C3%A9mon_Luna.png", platform: "Nintendo 3DS" },
        { name: "Ultrasol", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/7/71/latest/20170823154238/Car%C3%A1tula_Pok%C3%A9mon_Ultrasol.png/800px-Car%C3%A1tula_Pok%C3%A9mon_Ultrasol.png", platform: "Nintendo 3DS" },
        { name: "Ultraluna", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/f/fb/latest/20170823154054/Car%C3%A1tula_Pok%C3%A9mon_Ultraluna.png/260px-Car%C3%A1tula_Pok%C3%A9mon_Ultraluna.png", platform: "Nintendo 3DS" },
        { name: "Let's Go, Pikachu!", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/b/b3/latest/20180530021112/Car%C3%A1tula_Pok%C3%A9mon_Let%27s_Go_Pikachu.png/800px-Car%C3%A1tula_Pok%C3%A9mon_Let%27s_Go_Pikachu.png", platform: "Nintendo Switch" },
        { name: "Let's Go, Eevee!", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d4/latest/20180530021237/Car%C3%A1tula_Pok%C3%A9mon_Let%27s_Go_Eevee.png/260px-Car%C3%A1tula_Pok%C3%A9mon_Let%27s_Go_Eevee.png", platform: "Nintendo Switch" }
    ],
    "generation-viii": [
        { name: "Espada", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/2/21/latest/20190605134318/Car%C3%A1tula_Pok%C3%A9mon_Espada.png", platform: "Nintendo Switch" },
        { name: "Escudo", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/08/latest/20190605134155/Car%C3%A1tula_Pok%C3%A9mon_Escudo.png/260px-Car%C3%A1tula_Pok%C3%A9mon_Escudo.png", platform: "Nintendo Switch" },
        { name: "Diamante Brillante", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/12/latest/20210526132424/Car%C3%A1tula_Pok%C3%A9mon_Diamante_Brillante.png/800px-Car%C3%A1tula_Pok%C3%A9mon_Diamante_Brillante.png", platform: "Nintendo Switch" },
        { name: "Perla Reluciente", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/1/13/latest/20210526132407/Car%C3%A1tula_Pok%C3%A9mon_Perla_Reluciente.png/260px-Car%C3%A1tula_Pok%C3%A9mon_Perla_Reluciente.png", platform: "Nintendo Switch" },
        { name: "Leyendas: Arceus", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d7/latest/20210526132431/Car%C3%A1tula_Leyendas_Pok%C3%A9mon_Arceus.png/800px-Car%C3%A1tula_Leyendas_Pok%C3%A9mon_Arceus.png", platform: "Nintendo Switch" }
    ],
    "generation-ix": [
        { name: "Escarlata", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d5/latest/20220601144723/Car%C3%A1tula_Pok%C3%A9mon_Escarlata.png/800px-Car%C3%A1tula_Pok%C3%A9mon_Escarlata.png", platform: "Nintendo Switch" },
        { name: "Púrpura", coverUrl: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/31/latest/20220601144858/Car%C3%A1tula_Pok%C3%A9mon_P%C3%BArpura.png/260px-Car%C3%A1tula_Pok%C3%A9mon_P%C3%BArpura.png", platform: "Nintendo Switch" }
    ],
};

// ── Mascota (official artwork)
export const GENERATION_MASCOTS: Record<string, { name: string; id: number }> = {
    "generation-i": { name: "Charizard", id: 6 },
    "generation-ii": { name: "Lugia", id: 249 },
    "generation-iii": { name: "Rayquaza", id: 384 },
    "generation-iv": { name: "Giratina", id: 487 },
    "generation-v": { name: "Zekrom", id: 644 },
    "generation-vi": { name: "Xerneas", id: 716 },
    "generation-vii": { name: "Lunala", id: 792 },
    "generation-viii": { name: "Eternatus", id: 890 },
    "generation-ix": { name: "Miraidon", id: 1007 },
};

// ── Descripciones Generales (Lore y Contexto de la Generación)
export const GENERATION_DESCRIPTIONS: Record<string, string> = {
    "generation-i": "La primera generación sentó las bases del mundo Pokémon. Presentada en 1996, introdujo a los primeros 151 Pokémon en la región de Kanto, liderado por el profesor Oak y la eterna rivalidad entre Rojo y Azul. La meta: completar la Pokédex y derrotar al Alto Mando.",
    "generation-ii": "Una secuela revolucionaria que nos llevó a la región de Johto. Innovó con el ciclo de día y noche en tiempo real, eventos basados en días de la semana, y añadió dos nuevos tipos (Siniestro y Acero). Permitió una aventura legendaria al visitar Kanto al final del juego.",
    "generation-iii": "Ambientada en la tropical región de Hoenn, destacó por su vibrante colorido en Game Boy Advance. Implementó los Combates Dobles, un complejo sistema de naturalezas y habilidades que alteró para siempre el panorama competitivo de Pokémon.",
    "generation-iv": "Ubicada en la mítica región de Sinnoh. Trajo consigo la ansiada 'División físico/especial', la cual redefinió cómo funcionaba cada movimiento en las batallas, además de presentar a los dioses absolutos de la creación del universo Pokémon.",
    "generation-v": "Considerada por muchos como la de mejor narrativa, Unova fue concebida como un reinicio. Con 156 nuevos Pokémon exclusivos (sin especies antiguas hasta el post-game), introdujo sprites completamente animados en batalla y Combates Triples.",
    "generation-vi": "Marcó el salto a los modelos en 3D en la región de Kalos (inspirada en Francia). Transformó el metajuego al presentar la Megaevolución y el Tipo Hada, además de poder personalizar la ropa del entrenador por primera vez.",
    "generation-vii": "Alola eliminó los clásicos Gimnasios por un sistema de 'Recorrido Insular'. Destacó las Formas Regionales, dando una nueva vida (y tipo) a antiguos Pokémon, e introdujo los colosales Movimientos Z.",
    "generation-viii": "Centrada en Galar, una región basada en Reino Unido, apostó por combates como eventos deportivos masivos usando la mecánica Dinamax y Gigamax. Abrió paso a zonas semi-abiertas conocidas como el Área Silvestre.",
    "generation-ix": "Paldea introdujo por fin un mundo completamente abierto sin rutas predefinidas. Trajo a los Pokémon Paradoja del pasado y el futuro, y la deslumbrante mecánica de la Teracristalización."
};

// ── Novedades y Mecánicas
export const GENERATION_MECHANICS: Record<string, { title: string, desc: string }[]> = {
    "generation-i": [
        { title: "Stat Especial Unificado", desc: "Ataque Especial y Defensa Especial funcionaban combinados en la estadística 'Especial'." },
        { title: "Tabla de Tipos Básica", desc: "Se introdujeron 15 tipos elementales iniciales con multiplicadores de daño fijos." },
        { title: "Cajas del PC", desc: "Sistema de almacenamiento informático administrado por Bill, obligatorio que guardar manualmente." },
        { title: "Evolución por Objetos", desc: "Evoluciones forzadas utilizando Piedras Elementales ocultas por Kanto." },
        { title: "Bicicleta", desc: "Medio de transporte acelerado que se convertiría en un elemento básico en entregas futuras." }
    ],
    "generation-ii": [
        { title: "Día y Noche en Tiempo Real", desc: "El reloj interno cambió encuentros salvajes y resolvió eventos según el día de la semana." },
        { title: "Crianza Pokémon (Huevos)", desc: "Permitió heredar Movimientos Huevo en la Guardería." },
        { title: "Equipamiento de Objetos", desc: "Las criaturas ganaron la capacidad de sujetar Bayas y restos que se activan automáticamente." },
        { title: "Sexos y Shiny", desc: "Separación clara entre géneros y la rarísima aparición de variaciones variocolor (1/8192)." },
        { title: "Tipos Siniestro y Acero", desc: "Añadidos quirúrgicamente para mermar el reinado absoluto del tipo Psíquico." }
    ],
    "generation-iii": [
        { title: "Habilidades Pasivas", desc: "Otorgó a cada especie atributos únicos e influyentes que se activan bajo condiciones." },
        { title: "Naturalezas", desc: "Personalidad que otorga +10% a una stat y -10% a otra, clave para el metajuego competitivo." },
        { title: "Combates Dobles", desc: "Revolucionario sistema de 2v2 introduciendo sinergias con movimientos de área como Terremoto." },
        { title: "Climas Permanentes", desc: "Lluvia, Día Soleado, Granizo y Tormenta de Arena con efectos persistentes sobre ataques y salud." },
        { title: "Puntos de Esfuerzo (EVs)", desc: "Sistema invisible y renovado para la distribución óptima de las estadísticas bases post-combate." }
    ],
    "generation-iv": [
        { title: "División Físico/Especial", desc: "Categorizó cada movimiento ofensivo de forma independiente a la naturaleza de su Tipo." },
        { title: "Conexión Wi-Fi Funcional (GTS)", desc: "Contectó por primera vez y sin cables a todos los entrenadores del mundo para Intercambios Globales." },
        { title: "Subsuelo de Sinnoh", desc: "Mini-juego inmersivo multijugador para minar fósiles, gemas y construir Bases Secretas." },
        { title: "Evolución Cross-Gen", desc: "Introducción de métodos evolutivos complejos para Pokémon de Gen 1 y Gen 2 estancados." }
    ],
    "generation-v": [
        { title: "Sprites Vivos Animados", desc: "Animación de combate ininterrumpida y cámara dinámica zoom-in para mayor inmersión en DS." },
        { title: "Combates Triples y Rotatorios", desc: "Modalidades de combate asimétrico de posicionamiento y predicción extrema de 3v3 simultáneos." },
        { title: "Estaciones del Año", desc: "Rotación mensual en el mundo real, alterando paisajes, banda sonora y encuentros biológicos." },
        { title: "Inclusión de Tipos Híbridos", desc: "La historia fue protagonizada solo por nuevos diseños con dobles tipados rarísimos." }
    ],
    "generation-vi": [
        { title: "Fílum 3D", desc: "Modelos tridimensionales renderizados, abandonando el tradicional pixel-art cenital." },
        { title: "Megaevolución", desc: "Boost estadístico brutal y cambio temporal de forma/tipo durante el combate mediante una Mega Piedra." },
        { title: "Contrarrestando a los Dragones: Hada", desc: "Inclusión de nueva tipología inmune al tipo Dragón para balancear el panorama competitivo." },
        { title: "SuperEntrenamiento", desc: "Mini-juegos diseñados para facilitar la crianza haciendo transparentes los IV/EV." },
        { title: "PSSI (GTS Evolucionado)", desc: "El Player Search System facilitó la iteracción P2P constante con amigos en todo internet." }
    ],
    "generation-vii": [
        { title: "Movimientos Z", desc: "Remates definitivos nucleares de un único uso desatados con Cristales tipo y poses sincronizadas." },
        { title: "Adiós Gimnasios (Recorrido Insular)", desc: "Progreso basado en Pruebas tribales y enfrentamientos con Pokémon Dominantes potenciados artificialmente." },
        { title: "Formas Regionales (Alola)", desc: "Radiaciones adaptativas que alteraron el Tipo clásico (ej: Vulpix de Fuego a Hielo) de forma permanente." },
        { title: "Ultraentes", desc: "Extraterrestres ultra-dimensionales con la habilidad 'Ultraimpulso' y diseños lovecraftianos." }
    ],
    "generation-viii": [
        { title: "Mecánicas Gigamax & Dinamax", desc: "Escala masiva simulando Kaijus en estadios; aumentó PS y empoderó habilidades 3 turnos." },
        { title: "Zona Abierta (Área Silvestre)", desc: "Cámaras libres y aparición sobrevolada/caminando en amplias praderas co-op multijugador." },
        { title: "Incursiones Dinamax (Raids)", desc: "Agrupación online estilo MMO de 4 jugadores reales contra un jefe final colosal para su captura." },
        { title: "Mentas de Naturaleza", desc: "Eliminación absoluta del farmeo de crianza pudiendo modificar naturalezas comprando suplementos." }
    ],
    "generation-ix": [
        { title: "Corona Teracristal", desc: "Metamorfosis defensivo/ofensiva estelar que permite cambiar o potenciar de un Tipo en media batalla." },
        { title: "Mundo Totalmente Abierto", desc: "La fórmula RPG convertida al Sandbox con libertad real de ruta sobre la montura legendaria." },
        { title: "Let's Go (Auto Battles)", desc: "Mandar a tu pokémon fuera de su pokéball a que defienda y someta enemigos per se." },
        { title: "El Linaje Paradoja", desc: "Criaturas crípticas sin ramas evolutivas rescatadas por una 'Máquina del Tiempo' desde eras jurásicas y ciborgs." }
    ]
};

// ── Formas de Evolución y Ejemplos (ID anterior, ID nuevo, Texto)
export const GENERATION_EVOLUTIONS: Record<string, { method: string, desc: string, beforeId: number, afterId: number }[]> = {
    "generation-i": [
        { method: "Piedras Evolutivas", desc: "El Pokémon se expone a la radiación de una piedra elemental (Trueno, Agua, Fuego, etc.), forzando su cuerpo a evolucionar inmediatamente sea cual sea su nivel.", beforeId: 25, afterId: 26 },
        { method: "Intercambio", desc: "La energía producida al transferir el Pokémon de un entrenador a otro mediante el Cable Link o conexión inalámbrica desencadena una mutación genética.", beforeId: 64, afterId: 65 },
        { method: "Por Nivel", desc: "El método tradicional: tras ganar suficiente experiencia en batalla y alcanzar un nivel específico, la biología del Pokémon madura de forma natural.", beforeId: 1, afterId: 2 }
    ],
    "generation-ii": [
        { method: "Intercambio con Objeto Equipado", desc: "Al ser transferido a otro entrenador mientras sostiene un objeto específico (Revestimiento Metálico, Escama Dragón, etc.), la máquina fusiona el objeto con el Pokémon.", beforeId: 123, afterId: 212 },
        { method: "Amistad o Felicidad Alta", desc: "Al alcanzar el máximo de puntos un vínculo de confianza (Amistad) con su entrenador y subir de nivel, el Pokémon se siente listo para evolucionar.", beforeId: 172, afterId: 25 },
        { method: "Bifurcación por Estadísticas", desc: "Al alcanzar cierto nivel, la evolución varía dependiendo matemáticamente de si la estadística de Ataque es mayor, menor o igual a la de Defensa.", beforeId: 236, afterId: 237 }
    ],
    "generation-iii": [
        { method: "Evolución por Condición Máxima", desc: "Hay que alimentar al Pokémon con Pokécubos o Pokochos especiales para incrementar atributos de concurso (ej: 'Belleza') al máximo antes de subir de nivel.", beforeId: 349, afterId: 350 },
        { method: "Evolución Doble Simultánea", desc: "Al evolucionar, el Pokémon abandona su caparazón hueco. Si tienes una Pokéball extra y espacio libre en el equipo, ese caparazón cobra vida propia.", beforeId: 290, afterId: 292 },
        { method: "Valor de Personalidad (RNG)", desc: "Ciertos Pokémon se ramifican de forma impredecible dependiendo de un número invisible generado en el código interno al momento de su captura o incubación.", beforeId: 265, afterId: 266 }
    ],
    "generation-iv": [
        { method: "Evolución Magnética / Por Zona", desc: "El Pokémon solo mutará si sube de nivel en ubicaciones geográficas específicas del juego afectadas por fuertes campos geomagnéticos o rocas cubiertas de musgo/hielo.", beforeId: 82, afterId: 462 },
        { method: "Conocer Movimiento Específico", desc: "El mero conocimiento práctico lleva a mutar. Solo evaluciona al subir de nivel teniendo activamente aprendido en su memoria un movimiento exacto.", beforeId: 190, afterId: 424 },
        { method: "Piedra + Restricción de Sexo", desc: "Algunas piedras u objetos evolutivos modernos solo funcionan si la criatura es estrictamente Macho (o Hembra) en su código biológico.", beforeId: 281, afterId: 475 },
        { method: "Objeto durante horario", desc: "El Pokémon debe subir de nivel mientras sostiene un objeto específico, condicionado además a que en el reloj real de la consola sea exclusivamente de Noche (o de Día).", beforeId: 207, afterId: 472 }
    ],
    "generation-v": [
        { method: "Intercambio por Especie", desc: "Solo se activa si el intercambio se realiza cruzando una especie de Pokémon muy particular con otra totalmente diferente que sea su contraparte biológica de forma simultánea.", beforeId: 588, afterId: 589 },
    ],
    "generation-vi": [
        { method: "Manipulación de Consola", desc: "Con un método que rompe la cuarta pared interactuando con el giroscopio, el jugador debe sostener la Nintendo 3DS (o Switch) físicamente boca abajo al subir de nivel.", beforeId: 686, afterId: 687 },
        { method: "Clima en el Entorno Real", desc: "La evolución solo ocurre si se cumplen ciertas condiciones climáticas en la geografía natural del overworld (ejemplo: lluvia real fuera del combate).", beforeId: 704, afterId: 706 },
        { method: "Presencia en el Equipo", desc: "Para que la evolución tenga éxito al subir de nivel, debes tener obligatoriamente en tu equipo a un Pokémon de un Tipo Elemental específico.", beforeId: 674, afterId: 675 }
    ],
    "generation-vii": [
        { method: "Versión de Juego Exclusiva", desc: "Su bifurcación legendaria depende única y exclusivamente de la versión física o digital del título generacional en el que te encuentras jugando.", beforeId: 789, afterId: 791 },
        { method: "Evolución por Horario Estricto", desc: "Dependiendo de si se subió el nivel a plena luz del día, tarde o a altas horas de la noche, obtiene diferentes formas temporales permanentes.", beforeId: 744, afterId: 745 }
    ],
    "generation-viii": [
        { method: "Umbral de Daño Sostenido", desc: "Una prueba de resistencia donde el Pokémon debe acumular una cantidad exacta y elevada de daño durante combates sin debilitarse ni usar pociones.", beforeId: 862, afterId: 863 },
        { method: "Acumular Críticos", desc: "Se requiere la proeza de asestar varios golpes críticos contra oponentes en el transcurso orgánico de una única batalla sin cambiar de Pokémon.", beforeId: 83, afterId: 865 },
        { method: "Interactuar con el Joystick", desc: "Una mecánica interactiva donde se solicita al jugador manipular prolongada y rápidamente los joysticks (dar vueltas) mientras lleva equipado un adorno dulce.", beforeId: 868, afterId: 869 }
    ],
    "generation-ix": [
        { method: "Pasos en Modo Compañero", desc: "Usando mecánicas semi-abiertas, debes hacer que tu Pokémon camine miles de pasos fuera de la Pokéball siguiéndote en el mapa antes de subir el nivel.", beforeId: 1009, afterId: 1010 },
        { method: "Recolección de Objetos", desc: "Exige acumular forzosamente ciertos coleccionables dispersos por el mundo abierto sumando cantidades de recolección muy altas.", beforeId: 999, afterId: 1000 },
        { method: "Multijugador Activo", desc: "Es necesario estar actualmente interactuando y jugando con otra persona en tiempo real vía multijugador cooperativo (Círculo Unión) al momento de subir nivel.", beforeId: 963, afterId: 964 }
    ],
};

// ── Pokémon Iniciales (Para mostrarlos con sprites y tipos)
export const GENERATION_STARTERS: Record<string, number[]> = {
    "generation-i": [1, 4, 7], // Bulbasaur, Charmander, Squirtle
    "generation-ii": [152, 155, 158], // Chikorita, Cyndaquil, Totodile
    "generation-iii": [252, 255, 258], // Treecko, Torchic, Mudkip
    "generation-iv": [387, 390, 393], // Turtwig, Chimchar, Piplup
    "generation-v": [495, 498, 501], // Snivy, Tepig, Oshawott
    "generation-vi": [650, 653, 656], // Chespin, Fennekin, Froakie
    "generation-vii": [722, 725, 728], // Rowlet, Litten, Popplio
    "generation-viii": [810, 813, 816], // Grookey, Scorbunny, Sobble
    "generation-ix": [906, 909, 912], // Sprigatito, Fuecoco, Quaxly
};

// ── Pokémon Legendarios y Singulares de Portada (ID's a mostrar)
export const GENERATION_LEGENDARIES: Record<string, number[]> = {
    "generation-i": [144, 145, 146, 150, 151], // Aves + Mewtwo + Mew
    "generation-ii": [243, 244, 245, 249, 250, 251], // Perros + Lugia + Ho-Oh + Celebi
    "generation-iii": [377, 378, 379, 380, 381, 382, 383, 384, 385, 386], // Regis + Lati@s + Kyoto + Jirachi + Deoxys
    "generation-iv": [480, 481, 482, 483, 484, 487, 493], // Lago + Dialga/Palkia + Giratina + Arceus (Simplified list)
    "generation-v": [638, 639, 640, 641, 642, 643, 644, 646], // Espadas + Genios + Reshiram/Zekrom + Kyurem (Simplified)
    "generation-vi": [716, 717, 718, 719, 720, 721], // Xerneas, Yveltal, Zygarde, Diancie, Hoopa, Volcanion
    "generation-vii": [785, 786, 787, 788, 791, 792, 800], // Tapus + Solgaleo/Lunala + Necrozma (Simplified)
    "generation-viii": [888, 889, 890, 891, 892, 893, 898], // Zacian, Zamazenta, Eternatus, Urshifu, Zarude, Calyrex
    "generation-ix": [1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017], // Ruin + Miraidon/Koraidon + Loyal 3 (Simplified)
};

// ── Tipos nuevos por generación
export const GENERATION_TYPES_INTRODUCED: Record<string, string[]> = {
    "generation-i": ["normal", "fire", "water", "electric", "grass", "ice", "fighting",
        "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon"],
    "generation-ii": ["dark", "steel"],
    "generation-iii": [],
    "generation-iv": [],
    "generation-v": [],
    "generation-vi": ["fairy"],
    "generation-vii": [],
    "generation-viii": [],
    "generation-ix": [],
};

// ── Lore Individual de Legendarios y Singulares
export const GENERATION_LEGENDARIES_LORE: Record<number, { title: string, lore: string, category: "Legendario" | "Singular" }> = {
    // Gen 1
    144: { title: "Pájaro Legendario del Hielo", lore: "Criatura de millones de años de antigüedad que mora en las cumbres congeladas del Monte Avan. Su temperatura corporal desciende cientos de grados bajo cero; se cree que fue el origen de las primeras tormentas de nieve en el mundo.", category: "Legendario" },
    145: { title: "Pájaro Legendario del Relámpago", lore: "Habita en las nubes de tormenta que coronan el Monte Rayo. Cada aleteo suyo desencadena tormentas eléctricas que azotan regiones enteras. Los marinos lo temen como el augurio de los naufragios.", category: "Legendario" },
    146: { title: "Pájaro Legendario del Fuego", lore: "Cuando Moltres mueve sus alas refulge una llama dorada que lo envuelve por completo. Según el folclore de Kanto, si sufre una herida grave, se sumerge en un volcán en erupción para renacer regenerando cada pluma intacta.", category: "Legendario" },
    150: { title: "El Pokémon Genético", lore: "Creado por el Dr. Fuji mediante ingeniería genética a partir del ADN fosilizado de Mew, Mewtwo es el único Pokémon cuya existencia fue un acto consciente y premeditado de la humanidad. Posee tal poder mental que destruyó el laboratorio donde nació.", category: "Legendario" },
    151: { title: "El Ancestro Original", lore: "Considerado el primer Pokémon del universo, Mew contiene en su ADN el código genético de todas las especies conocidas. Su apariencia infantil contrasta con un poder telequinético absoluto; los científicos argumentan que de él evolucionaron todos los Pokémon.", category: "Singular" },
    // Gen 2
    243: { title: "Bestia Eléctrica", lore: "Una de las tres bestias legendarias resucitadas por Ho-Oh tras el incendio de la Torre Quemada. La leyenda local de Johto afirma que Raikou encarna al relámpago que cayó esa noche fatal, y su cuerpo almacena nubes eléctricas en su lomo cual nimbostratos vivos.", category: "Legendario" },
    244: { title: "Bestia de Fuego", lore: "Resucitado de las cenizas del incendio de Ecruteak City, Entei exhala un calor tan intenso que cada rugido suyo hace erupcionar un volcán en algún lugar del mundo. Nómada eterno, jamás se detiene ni descansa.", category: "Legendario" },
    245: { title: "Bestia de Agua", lore: "La tercera bestia mítica, nacida de la lluvia que intentó apagar el incendio de la Torre Quemada. Suicune viaja siempre hacia el norte y es capaz de purificar instantáneamente mares de agua contaminada cada vez que galopa sobre su superficie.", category: "Legendario" },
    249: { title: "Guardián de los Mares", lore: "Lugia mora en las profundidades oceánicas porque es consciente del daño que causaría si viviera en la superficie. Un solo aleteo suyo desata tormentas que perduran cuarenta días; por eso se autoexilia en abismos donde ningún entrenador puede encontrarlo.", category: "Legendario" },
    250: { title: "Guardián de los Cielos", lore: "Ho-Oh lleva siglos sobrevolando el mundo en busca de un ser humano de corazón puro. La leyenda promete que quien contemple su cola arcoíris tendrá garantizada la felicidad eterna. Sus plumas tienen el color del arcoíris y no se pierden jamás.", category: "Legendario" },
    251: { title: "Guardián del Tiempo", lore: "Pokémon del bosque mágico de Ilex, Celebi viaja libremente entre pasado, presente y futuro. Florece en épocas de paz y su presencia transforma el bosque en un vergel exuberante; cuando aparece, es señal de que una era dorada se avecina.", category: "Singular" },
    // Gen 3
    377: { title: "Gólem de Roca Prehistoric", lore: "Regirock fue esculpido por una civilización extinta hace miles de años. Su cuerpo está hecho enteramente de roca de distintas épocas geológicas; cuando se daña, busca nuevas piedras en cualquier región para repararse a sí mismo.", category: "Legendario" },
    378: { title: "Gólem de Hielo Prehistoric", lore: "Creado en la Edad de Hielo, el cuerpo de Regice está a -200 °C en su núcleo. Aunque el mundo a su alrededor se calentó, esta criatura mantiene en su interior una pequeña porción del clima glacial original.", category: "Legendario" },
    379: { title: "Gólem de Acero Prehistoric", lore: "A diferencia de sus hermanos construidos con tierra, Registeel fue forjado con un metal desconocido en la actualidad, más duro que cualquier aleación moderna. Su caverna de sellado está marcada con braille indescifrable.", category: "Legendario" },
    380: { title: "Eon Pokémon Femenino", lore: "Latias puede entender el lenguaje humano y envolver su cuerpo con plumas especiales para hacerse invisible. Est comunicación empática le permite sincronizarse emocionalmente con personas de confianza, revelándoles visiones de lo que sus ojos ven.", category: "Legendario" },
    381: { title: "Eon Pokémon Masculino", lore: "Latios puede volar a velocidades superiores a las de un jet y proyectar imágenes directamente en la mente de quienes lo rodean. Muestra su interior solo a humanos con un corazón generoso.", category: "Legendario" },
    382: { title: "Titán de los Mares", lore: "Kyogre es el creador legendario de los océanos. Antes de que existieran los mares tal como los conocemos, Kyogre expandió el territorio marino expandiendo el agua pluvial hasta inundar continentes. Las olas que genera pueden alcanzar cualquier tierra firme.", category: "Legendario" },
    383: { title: "Titán de la Tierra", lore: "Groudon esculpió continentes y volcanes con sus propias garras. Su poder sobre la tierra y el sol seca mares y convierte tierras áridas en desérticas extensiones ardientes. Ha estado dormido durante millones de años bajo la corteza terrestre.", category: "Legendario" },
    384: { title: "Cielo Dragon", lore: "Rayquaza habitó la capa superior de la atmósfera durante incontables eones, mucho antes de que la humanidad levantara la vista al cielo. Es el árbitro eterno entre Kyogre y Groudon, el único capaz de detener sus batallas míticas.", category: "Legendario" },
    385: { title: "Guardian de los Deseos", lore: "Jirachi despierta solo siete días cada mil años. Durante ese breve período, se dice que cualquier deseo escrito en una de sus notas mágicas puede hacerse realidad. Fuera de ese tiempo, duerme el sueño eterno envuelto en una coraza cristalina.", category: "Singular" },
    386: { title: "Forma de Vida ADN", lore: "Deoxys nació del ADN de un virus espacial que fue irradiado por un rayo láser en el espacio exterior, mutando para adquirir conciencia propia. Tiene cuatro formas físicas distintas según el ambiente planetario al que se adapte.", category: "Singular" },
    // Gen 4
    480: { title: "Ser del Conocimiento", lore: "Uxie fue el primero de los seres del lago en nacer, aportando el conocimiento al universo vacío. Tiene los ojos permanentemente cerrados; cualquiera que los vea abiertos perderá toda memoria de forma instantánea e irreversible.", category: "Legendario" },
    481: { title: "Ser de la Emoción", lore: "Mesprit otorgó a los humanos la capacidad de sentir alegría y dolor. Cuando abandona su cuerpo físico, la persona a quien se le acerque pierde toda experiencia emocional durante siete días, quedando en un estado de apatía total.", category: "Legendario" },
    482: { title: "Ser de la Voluntad", lore: "Azelf infundió en los seres vivos la fuerza de voluntad necesaria para actuar. Sin su existencia, los seres conscientes habrían permanecido inertes. Se dice que si alguien lo dañara, la voluntad desaparecería del universo.", category: "Legendario" },
    483: { title: "Dios del Tiempo", lore: "Dialga controla el flujo temporal con cada latido de su corazón. Fue el primero en nacer del huevo del universo y su mero surgimiento dio inicio al tiempo como concepto físico. Puede viajar a cualquier era pasada o futura a voluntad.", category: "Legendario" },
    484: { title: "Dios del Espacio", lore: "Palkia domina el espacio tridimensional y puede crear dimensiones alternas con un solo movimiento. Habita en una realidad paralela a la nuestra y su presencia hace que toda la materia circundante vibre inestablemente.", category: "Legendario" },
    487: { title: "Dios de la Antimateria", lore: "Giratina fue desterrado al Mundo Distorsión por Arceus por sus actos violentos en los albores del universo. Habita ese reino invertido donde las leyes físicas no aplican, y se dice que es el origen de todos los fantasmas y fenómenos paranormales.", category: "Legendario" },
    493: { title: "El Creador", lore: "Arceus emergió de un huevo primordial en un vacío absoluto antes de que existiera nada. Con sus mil brazos (representados por sus placas elementales) creó el tiempo, el espacio y la antimateria, y luego conformó el universo Pokémon tal como lo conocemos.", category: "Singular" },
    // Gen 5
    638: { title: "Espada de la Justicia", lore: "Cobalion lidera al trío de espadas sagradas con una voluntad de hierro. Su mirada de acero es capaz de dominar hasta los humanos más poderosos, pues encarna la justicia absoluta que protege a los Pokémon de la crueldad humana.", category: "Legendario" },
    639: { title: "Escudo de la Justicia", lore: "Terrakion posee una fuerza colosal que puede derrumbar murallas de castillos de una sola embestida. Según la leyenda, una vez se enfrentó a cientos de guerreros humanos peleando solo para proteger a los Pokémon que vivían tras esas murallas.", category: "Legendario" },
    640: { title: "Florete de la Justicia", lore: "Virizion es el más ágil dei las espadas sagradas. Su cuerpo se mueve como el viento y sus cortes son tan veloces que los rivales caen antes de darse cuenta de que han sido golpeados. Protege a Pokémon de bosques devastados por conflictos humanos.", category: "Legendario" },
    641: { title: "Torbellino Ciclónico", lore: "Tornadus es la personificación del viento destructivo. Viaja a máxima velocidad sembrando tornados devastadores a su paso. En las aldeas suele ser considerado un mal presagio; su llegada anuncia ciclones y catástrofes naturales.", category: "Legendario" },
    642: { title: "Furia del Relámpago", lore: "Thundurus surcsa los cielos disparando rayos zigzagueantes que incendian bosques y destruyen cosechas. La rivalidad entre él y Tornadus genera tormentas legendarias que los cuentos de Unova narran hace generaciones.", category: "Legendario" },
    643: { title: "Héroe Ideal", lore: "Reshiram representa la búsqueda de la Verdad absoluta. Su cola emite un fuego tan puro que puede alterar la atmósfera del planeta. En la historia de Unova, estuvo ligado al héroe que buscaba la verdad del mundo.", category: "Legendario" },
    644: { title: "Héroe Real", lore: "Zekrom encarna los Ideales de transformar el mundo por acción directa. Genera un campo electromagnético devastador en su cola y puede apagar redes eléctricas de ciudades enteras. Formó pareja con el héroe que creía en ideales firmes.", category: "Legendario" },
    646: { title: "Límite del Frío", lore: "Kyurem es la carcasa fría y vacía de donde emergieron Reshiram y Zekrom. Originalmente contenía toda la energía de ambos dragones. Ahora, incompleto, congela todo a su alrededor con temperaturas absolutas mientras aguarda reunificación.", category: "Legendario" },
    // Gen 6
    716: { title: "Deidad de la Vida", lore: "Xerneas fue la fuerza que originó la vida en el mundo. Cuando comparte su energía eterna, las flores brotan y la vida florece en lugares áridos. Tras miles de años activo, descansa transformándose en árbol inmortal para reponer su eternidad.", category: "Legendario" },
    717: { title: "Deidad de la Destrucción", lore: "Yveltal absorbe la energía vital de todos los seres vivos que lo rodean cuando despliega sus alas. Al final de su vida, drena toda la vida a su alrededor y se convierte en un capullo oscuro del que renacerá milenios más tarde.", category: "Legendario" },
    718: { title: "Orden del Mundo", lore: "Zygarde es el árbitro entre la Vida y la Destrucción. Existe en múltiples formas según el porcentaje de sus células activas: desde una simple serpiente hasta una colosal entidad que protege el ecosistema planetario completo.", category: "Legendario" },
    719: { title: "Joya del Caos", lore: "Diancie nació de la mutación espontánea de una colonia de Carbink. Puede crear diamantes comprimiendo el carbono del aire con sus manos. Es venerada como la joya más preciosa del mundo subterráneo.", category: "Singular" },
    720: { title: "Espíritu Confinado", lore: "Hoopa fue una vez un ser sin igual capaz de transportar objetos de cualquier tamaño por sus aros dimensionales. Tras destruir una ciudad entera con su poder sin control, su fuerza fue sellada en una vasija diminuta hace 100 años.", category: "Singular" },
    721: { title: "Vapor Primordial", lore: "Volcanion nació en las entrañas de una montaña de vapor volcánico y posee brazos en forma de cañón que evaporan el agua al instante. Nunca ha interactuado con humanos voluntariamente; odia su presencia con una memoria instintiva.", category: "Singular" },
    // Gen 7
    785: { title: "Espíritu Tribal del Rayo", lore: "Tapu Koko es el guardián de Melemele y el más activo de los cuatro Tapus. Aunque protege a los isleños con fiereza, su carácter es caprichoso: ayuda cuando él lo decide, no cuando se lo piden. Su poder genera campos eléctricos instantáneos.", category: "Legendario" },
    786: { title: "Espíritu Tribal de la Bruma", lore: "Tapu Lele protege Akala con pétalos que sanan cualquier herida pero también causan adicción. Es descrita como cruel e indiferente, disfrutando de los combates de los demás sin remordimiento alguno.", category: "Legendario" },
    787: { title: "Espíritu Tribal del Oleaje", lore: "Tapu Bulu, guardián de Ula'ula, puede mover árboles colosos como si fueran marionetas. Es tan perezoso que prefiere que los demás peleen por él, pero cuando actúa lo hace con una devastación arrolladora.", category: "Legendario" },
    788: { title: "Espíritu Tribal de las Aguas", lore: "Tapu Fini protege Poni con neblinas marinas que confunden a los intrusos hasta hacerlos caer al océano. Su verdadera forma nunca ha sido vista; siempre se mantiene oculta en la espuma de las olas.", category: "Legendario" },
    791: { title: "Portador del Sol", lore: "Solgaleo es la criatura en que se convierte Cosmog al madurar bajo el sol. Devora la luz solar para cargar su cuerpo estelar y puede abrir Ultra Umbrales a otras dimensiones. Los Acolans lo llaman 'el que devora el sol'.", category: "Legendario" },
    792: { title: "Portadora de la Luna", lore: "Lunala se nutre de la luz de las estrellas y sus alas proyectan una oscuridad total a su alrededor. Puede volar entre dimensiones a través de Ultra Umbrales y los Acolans la veneran llamándola 'la que sella el cielo nocturno'.", category: "Legendario" },
    800: { title: "La Luz Primordial Fragmentada", lore: "Necrozma es un ser que una vez iluminó el universo entero, pero fue fragmentado en una guerra cósmica antigua. Ahora absorbe la luz frenéticamente de su entorno, intentando recuperar la brillantez que le fue arrancada, convirtiéndose en una amenaza letal.", category: "Legendario" },
    // Gen 8
    888: { title: "Guerrera de la Espada Férica", lore: "Zacian empuña con su boca una espada ancestral que corta cualquier material conocido. Se dice que en el pasado salvó a la región de Galar de una amenaza cosmalethal, y ahora duerme en el tiempo esperando que el peligro regrese.", category: "Legendario" },
    889: { title: "Guerrero del Escudo Férico", lore: "Zamazenta tiene en su cuerpo una armadura natural forjada durante una batalla antigua. Cada golpe que absorbe lo hace más fuerte. Él y su hermana Zacian pelearon juntos en la gran crisis que dio forma a la historia de Galar.", category: "Legendario" },
    890: { title: "El Infinito Inmortal", lore: "Eternatus es un ser cósmico que llegó a la Tierra dentro de un meteorito hace 20,000 años. Es la fuente de energía detrás del fenómeno Dinamax y Gigamax. Tiene el potencial de destruir Galar al liberar el Eternamax.", category: "Legendario" },
    891: { title: "El Oso Maestro Único", lore: "Urshifu sigue una filosofía marcial estricta que requiere un largo y duro entrenamiento en la Isla de la Armadura. Su estilo de un solo golpe derrota cualquier guardia, y nunca lanza un ataque sin comprometerse completamente.", category: "Legendario" },
    892: { title: "Primate Salvaje Rebelde", lore: "Zarude vive en manadas hostiles que atacan cualquier intruso que invada su jungla. Aunque feroz por naturaleza, fue el único de su especie capaz de cuidar a un niño humano abandonado, revelando un lado inesperadamente tierno.", category: "Singular" },
    893: { title: "Chamán del Viento", lore: "Calyrex gobernó antaño toda la región de Corona con sabiduría y poderes psíquicos que controlaban las cosechas. Ahora debilitado y olvidado, intenta reunirse con su corcel legendario para recuperar su grandeza perdida.", category: "Legendario" },
    898: { title: "Señor de las Formas de Vida", lore: "Enamorus es una deidad feérica que llega con la primavera tras Tornadus, Thundurus y Landorus. Tiene el poder de hacer florecer cualquier vida en la tierra, pero también puede desatar tormentas furiosas cuando se la provoca.", category: "Legendario" },
    // Gen 9
    1001: { title: "Ruina del Roble", lore: "Wo-Chien es una de las cuatro Ruinas de Paldea, atrapadas en tablillas de escritura. Esta criatura fue la forma física que tomó el rencor de un sabio cuyos escritos fueron destruidos por un rey tiránico.", category: "Legendario" },
    1002: { title: "Ruina de las Cuentas", lore: "Chien-Pao adoptó la forma del resentimiento de quienes murieron enterrados por el tesoro del mismo rey tiránico. Viajó desde China con una aura helada de venganza que hiela instantáneamente el suelo.", category: "Legendario" },
    1003: { title: "Ruina de la Serpiente", lore: "Ting-Lu emergió del rencor de quienes cargaron pesadas urnas forzosamente para el rey. Su cuerpo enorme y pesado destila la amargura acumulada durante generaciones, y puede hundir el terreno con su masa.", category: "Legendario" },
    1004: { title: "Ruina del Chi", lore: "Chi-Yu es la forma material de la vena que sintieron quienes vieron quemados sus bienes más preciados. Sus ojos son brasas puras que todo lo devoran, y su presencia hace que el agua hierva instantáneamente.", category: "Legendario" },
    1007: { title: "Guerrero del Pasado", lore: "Koraidon es el legendario del pasado profundo de Paldea: un dragón ancestral cuya biología mecánica no es tecnológica, sino una expresión orgánica pura. Se convierte en vehículo para su entrenador, revelando un vínculo único.", category: "Legendario" },
    1008: { title: "Máquina del Futuro", lore: "Miraidon pertenece a un futuro distante donde la tecnología y la biología se fusionaron. Sus partes mecánicas son órganos reales evolucionados, no artefactos. Viajó al pasado y ahora necesita a su entrenador para regresar.", category: "Legendario" },
    1014: { title: "Leal a la Corona", lore: "Okidogi fue uno de los tres vasallos leales que siguieron a la Reina Pecharunt hasta la muerte. Su devoción ciega lo llevó a luchar contra sus propios impulsos naturales, transformando su lealtad en veneno literal.", category: "Legendario" },
    1015: { title: "Fuerza de la Lealtad", lore: "Munkidori fue el más inteligente de los tres vasallos de Pecharunt. Su mente brillante fue corrompida por las cadenas venenosas de su ama, convirtiéndose en un estratega oscuro al servicio de la dominación total.", category: "Legendario" },
    1016: { title: "Sombra de la Lealtad", lore: "Fezandipiti es la sombra letal de Pecharunt. Con su plumaje venenoso hipnotiza a sus víctimas antes de someterlas. Sus danzas rituales, que parecen hermosas, son en realidad la preparación de un campo de combate invisible.", category: "Legendario" },
    1017: { title: "La Ama Encadenada", lore: "Pecharunt atrapó a sus tres siervos con cadenas de veneno que se inyectaron en sus cuerpos. Este pequeño y aparentemente inofensivo Pokémon esconde un dominio absoluto sobre la voluntad ajena: sus mochicadenas son un control mental definitivo.", category: "Singular" },
};

// ── Nota de contexto sobre tipos
export const GENERATION_TYPE_NOTES: Record<string, string> = {
    "generation-ii": "Siniestro y Acero fueron añadidos para contrarrestar la dominancia del tipo Psíquico.",
    "generation-vi": "Hada fue introducido para frenar al tipo Dragón, que era casi imparable en combate.",
};

// ── Version groups que son remakes
export const REMAKE_VERSION_GROUPS = new Set([
    "firered-leafgreen", "heartgold-soulsilver", "omegaruby-alphasapphire",
    "brilliant-diamond-and-shining-pearl", "lets-go-pikachu-lets-go-eevee",
]);

// ── Helper: todos los metadatos de una generación en un objeto
export function getGenMeta(name: string) {
    return {
        color: GENERATION_COLORS[name] ?? "#CC0000",
        roman: GENERATION_ROMAN[name] ?? "?",
        nameEs: GENERATION_NAMES_ES[name] ?? name,
        year: GENERATION_YEARS[name] ?? "????",
        games: GENERATION_GAMES_ES[name] ?? [],
        mascot: GENERATION_MASCOTS[name] ?? { name: "Pikachu", id: 25 },
        description: GENERATION_DESCRIPTIONS[name] ?? "",
        mechanics: GENERATION_MECHANICS[name] ?? [],
        gamesArtwork: GENERATION_GAMES_ARTWORK[name] ?? [],
        evolutions: GENERATION_EVOLUTIONS[name] ?? [],
        starters: GENERATION_STARTERS[name] ?? [],
        legendaries: GENERATION_LEGENDARIES[name] ?? [],
    };
}