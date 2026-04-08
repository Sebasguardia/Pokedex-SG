// ─────────────────────────────────────────────────────────────────
// REGION LORE — Gym Leaders, Champions, Geography, Cities
// ─────────────────────────────────────────────────────────────────

// ── Total de Pokémon en la Dex Regional (estáticos) ──────────────
export const REGION_POKEMON_COUNT: Record<string, number> = {
    kanto: 151, johto: 100, hoenn: 135, sinnoh: 150,
    unova: 156, kalos: 72, alola: 100, galar: 400, paldea: 400,
};

// ── Pokémon Populares por Región (Starters, Legendarios, Iconos) ─
export const REGION_POPULAR_POKEMON: Record<string, number[]> = {
    kanto: [1, 4, 7, 25, 133, 143, 150, 151],
    johto: [152, 155, 158, 175, 248, 249, 250, 251],
    hoenn: [252, 255, 258, 282, 382, 383, 384, 385],
    sinnoh: [387, 390, 393, 448, 483, 484, 487, 493],
    unova: [495, 498, 501, 571, 638, 643, 644, 646],
    kalos: [650, 653, 656, 658, 700, 716, 717, 718],
    alola: [722, 725, 728, 744, 778, 791, 792, 800],
    galar: [810, 813, 816, 823, 849, 888, 889, 890],
    paldea: [906, 909, 912, 1000, 1011, 1017, 1007, 1008],
};
// ── Geography info ────────────────────────────────────────────────
export type RegionGeography = {
    description: string;
    mainMapKey?: string;
    inGameMapKey?: string;
};

export const REGION_GEOGRAPHY: Record<string, RegionGeography> = {
    kanto: {
        description: "Kanto es una región diversa ubicada al este de Johto. Su paisaje combina densos bosques frondosos como el Bosque Verde, extensas llanuras y desafiantes cordilleras con intrincadas redes de cuevas como el Monte Moon. A diferencia de otras regiones, el corazón de Kanto late con el avance tecnológico y la industrialización, destacando sus enormes metrópolis y grandes laboratorios de investigación. Sus rutas marítimas conectan islas volcánicas y glaciares misteriosos.",
        mainMapKey: "kanto_main",
        inGameMapKey: "kanto_ingame"
    },
    johto: {
        description: "Al oeste de Kanto, Johto es una mezcla de aldeas tradicionales y templos ancestrales, custodiada por dos grandes lagos y la imponente Torre Tin junto al Campanario de Bronce. Sus Rutas 29–48 atraviesan valles y pasos de montaña, donde la historia y la mitología se entrelazan en cada rincón. Es una región que valora el equilibrio entre el mundo de los humanos y los Pokémon, manteniendo vivas costumbres de hace cientos de años en sus paisajes.",
        mainMapKey: "johto_main",
        inGameMapKey: "johto_ingame"
    },
    hoenn: {
        description: "Hoenn es un gran archipiélago subtropical rodeado por el inmenso océano. Su superficie está dividida casi a partes iguales entre la tierra fértil y el mar profundo, creando un ecosistema único en el mundo Pokémon. Contiene el Mt. Chimney, un volcán activo que domina el horizonte, la mística Cueva Mágica y la enorme metrópolis de Ciudad Mossdeep. Sus variadas rutas invitan a la aventura, conectando exuberantes selvas tropicales con desiertos áridos.",
        mainMapKey: "hoenn_main",
        inGameMapKey: "hoenn_ingame"
    },
    sinnoh: {
        description: "Región montañosa basada en Hokkaido, donde el imponente Mt. Coronet divide el mapa por la mitad, influyendo fuertemente en su clima y sus ecosistemas. Contiene tres grandes lagos con una conexión mitológica inquebrantable que da forma a sus leyendas más antiguas. Desde las nieves eternas del norte hasta las zonas pantanosas del sur, Sinnoh es una tierra de contrastes geográficos, donde el pasado de la creación del mundo parece aún presente.",
        mainMapKey: "sinnoh_main",
        inGameMapKey: "sinnoh_ingame"
    },
    unova: {
        description: "Ubicada muy lejos de las cuatro primeras regiones, Unova presenta un alto nivel de urbanización e infraestructura moderna orientada en hexágonos y puentes característicos. Su geografía incluye un gran desierto central, parques tecnológicos futuristas y puertos comerciales que nunca duermen ante la marea. Es un crisol de culturas y avances científicos, donde la armonía entre el cemento y la naturaleza se pone a prueba en sus diversos entornos.",
        mainMapKey: "unova_main",
        inGameMapKey: "unova_ingame"
    },
    kalos: {
        description: "Región con forma de estrella que destaca por su riqueza cultural, moda y la majestuosa Ciudad Luminalia en su núcleo. Sus diversos climas incluyen zonas montañosas áridas, exuberantes costas mediterráneas y bosques encantados que esconden secretos. Es conocida por su elegancia arquitectónica y sus amplios bulevares, donde el arte y la historia se despliegan en palacios históricos junto a la sofisticada tecnología de las Megapiedras.",
        mainMapKey: "kalos_main",
        inGameMapKey: "kalos_ingame"
    },
    alola: {
        description: "Un archipiélago tropical paradisíaco compuesto por cuatro islas naturales y una isla artificial. Rica en tradiciones milenarias y custodiada por deidades guardianas, cada isla posee microclimas únicos que van desde playas soleadas hasta picos nevados. En Alola, el vínculo entre humanos y Pokémon es más profundo que en cualquier otro lugar, celebrándose mediante los Recorridos Insulares en lugar de las tradicionales ligas de gimnasios regionales.",
        mainMapKey: "alola_main",
        inGameMapKey: "alola_ingame"
    },
    galar: {
        description: "Gran isla vertical fuertemente influenciada por la Revolución Industrial y la apasionada cultura del deporte. Destaca su vasta Área Silvestre central, donde los Pokémon habitan libremente en un entorno salvaje, y los estadios masivos donde se llevan a cabo los combates de liga. Desde las colinas verdes del sur hasta las vibrantes ciudades metálicas del norte, Galar es una región que respira competitividad y energía en sus paisajes tradicionales.",
        mainMapKey: "galar_main",
        inGameMapKey: "galar_ingame"
    },
    paldea: {
        description: "Extenso mapa de mundo abierto con tres rutas principales. La Meseta de las Fortalezas al centro, la gran Ciudad Mesalona, los Picos Cubiertos de nieve al norte y la basta Zona Cero en el corazón del mapa.",
        mainMapKey: "paldea_main",
        inGameMapKey: "paldea_ingame"
    },
};

// ── Ciudades y pueblos principales ────────────────────────────────
export type CityInfo = {
    name: string;
    nameEn?: string;
    type: "gym" | "city" | "town" | "village" | "route" | "landmark";
    population?: number;
    connections?: string[];
    description?: string;
    placesOfInterest?: string[];
    imageKey?: string;
};

export const REGION_CITIES: Record<string, CityInfo[]> = {
    kanto: [
        { name: "Pueblo Paleta", nameEn: "Pallet Town", type: "town", population: 8, connections: ["Ruta 1 (Norte)", "Ruta 21 (Sur)"], description: "Un tranquilo pueblo rural en el suroeste de Kanto.", placesOfInterest: ["Laboratorio del Prof. Oak", "Casa del Protagonista", "Casa de Azul"], imageKey: "kanto_pallet_town" },
        { name: "Ciudad Verde", nameEn: "Viridian City", type: "gym", population: 8, connections: ["Ruta 2 (Norte)", "Ruta 1 (Sur)", "Ruta 22 (Oeste)"], description: "La ciudad de la vegetación que nunca se marchita.", placesOfInterest: ["Gimnasio de Ciudad Verde", "Casa de Entrenadores", "Escuela Pokémon"], imageKey: "kanto_viridian_city" },
        { name: "Ciudad Plateada", nameEn: "Pewter City", type: "gym", population: 29, connections: ["Ruta 3 (Este)", "Ruta 2 (Sur)"], description: "Una ciudad construida a los pies de las imponentes montañas.", placesOfInterest: ["Gimnasio de Ciudad Plateada", "Museo de la Ciencia"], imageKey: "kanto_pewter_city" },
        { name: "Ciudad Celeste", nameEn: "Cerulean City", type: "gym", population: 27, connections: ["Ruta 24 (Norte)", "Ruta 5 (Sur)", "Ruta 4 (Oeste)", "Ruta 9 (Este)"], description: "Una ciudad mística envuelta en agua azulada.", placesOfInterest: ["Gimnasio de Ciudad Celeste", "Tienda de Bicis", "Cueva Celeste"], imageKey: "kanto_cerulean_city" },
        { name: "Ciudad Carmín", nameEn: "Vermilion City", type: "gym", population: 24, connections: ["Ruta 6 (Norte)", "Ruta 11 (Este)"], description: "El puerto de atardeceres dorados.", placesOfInterest: ["Gimnasio de Ciudad Carmín", "Muelle S.S. Anne", "Club de Fans", "Casa del Gurú"], imageKey: "kanto_vermilion_city" },
        { name: "Pueblo Lavanda", nameEn: "Lavender Town", type: "village", population: 8, connections: ["Ruta 10 (Norte)", "Ruta 12 (Sur)", "Ruta 8 (Oeste)"], description: "El noble pueblo de las tumbas Pokémon. Es conocido por su actividad espectral.", placesOfInterest: ["Torre Pokémon", "Casa del Sr. Fuji", "Torre de Radio"], imageKey: "kanto_lavender_town" },
        { name: "Ciudad Azulona", nameEn: "Celadon City", type: "gym", population: 70, connections: ["Ruta 7 (Este)", "Ruta 16 (Oeste)"], description: "La ciudad de los sueños de todos los colores.", placesOfInterest: ["Gimnasio de Ciudad Azulona", "Centro Comercial Azulona", "Casino Rocket", "Mansión Azulona"], imageKey: "kanto_celadon_city" },
        { name: "Ciudad Fucsia", nameEn: "Fuchsia City", type: "gym", population: 33, connections: ["Ruta 18 (Oeste)", "Ruta 15 (Este)", "Ruta 19 (Sur)"], description: "Una ciudad apasionada envuelta en color fucsia salvaje.", placesOfInterest: ["Gimnasio de Ciudad Fucsia", "Zona Safari", "Parque Compi"], imageKey: "kanto_fuchsia_city" },
        { name: "Ciudad Azafrán", nameEn: "Saffron City", type: "gym", population: 65, connections: ["Ruta 5 (Norte)", "Ruta 6 (Sur)", "Ruta 7 (Oeste)", "Ruta 8 (Este)"], description: "La ciudad dorada brillantemente iluminada, es la ciudad más grande de Kanto.", placesOfInterest: ["Gimnasio de Ciudad Azafrán", "Dojo Kárate", "Silph S.A.", "Estación Magnetotrén"], imageKey: "kanto_saffron_city" },
        { name: "Ciudad Canela", nameEn: "Cinnabar Island", type: "gym", population: 24, connections: ["Ruta 21 (Norte)", "Ruta 20 (Este)"], description: "Un pequeño pueblo asentado sobre un volcán extinto.", placesOfInterest: ["Gimnasio de Isla Canela", "Laboratorio Pokémon", "Mansión Pokémon"], imageKey: "kanto_cinnabar_island" },
        { name: "Isla Espuma", type: "landmark", description: "Un par de islas gemelas heladas donde habitan poderosos Pokémon de tipo Hielo.", placesOfInterest: [], imageKey: "kanto_seafoam_islands" },
        { name: "Meseta Añil", nameEn: "Indigo Plateau", type: "landmark", description: "La cima de la Liga Pokémon que todo entrenador aspira conquistar.", placesOfInterest: ["Alto Mando", "Salón de la Fama"], imageKey: "kanto_indigo_plateau" },
    ],
    johto: [
        { name: "Pueblo Primavera", nameEn: "New Bark Town", type: "town", population: 11, connections: ["Ruta 29 (Oeste)", "Ruta 27 (Este)"], description: "El pequeño pueblo donde el viento de los nuevos comienzos sopla suavemente.", placesOfInterest: ["Lab. Prof. Elm", "Casa del Protagonista"], imageKey: "johto_new_bark" },
        { name: "Ciudad Cerezo", nameEn: "Cherrygrove City", type: "city", population: 22, connections: ["Ruta 29 (Este)", "Ruta 30 (Norte)"], description: "Un pueblo costero rodeado de flores de cerezo, conocido como la ciudad de la fragancia floral.", placesOfInterest: ["Centro Pokémon", "Guía de Ciudad Cerezo"], imageKey: "johto_cherrygrove" },
        { name: "Ciudad Malva", nameEn: "Violet City", type: "gym", population: 52, connections: ["Ruta 31 (Este)", "Ruta 32 (Sur)", "Ruta 36 (Noroeste)"], description: "Una ciudad histórica rodeada de árboles y antiguos templos donde el tiempo parece detenerse.", placesOfInterest: ["Gimnasio Malva", "Torre Bellsprout", "Academia Pokémon"], imageKey: "johto_violet" },
        { name: "Pueblo Azalea", nameEn: "Azalea Town", type: "gym", population: 31, connections: ["Ruta 33 (Este)", "Encinar (Oeste)"], description: "Famosa por sus artesanos de Poké Balls y su conexión con el místico Pozo Slowpoke.", placesOfInterest: ["Gimnasio Azalea", "Casa de César", "Pozo Slowpoke"], imageKey: "johto_azalea" },
        { name: "Ciudad Trigal", nameEn: "Goldenrod City", type: "gym", population: 126, connections: ["Ruta 34 (Sur)", "Ruta 35 (Norte)"], description: "La metrópolis más grande de Johto, rebosante de comercio, entretenimiento y modernidad.", placesOfInterest: ["Gimnasio Trigal", "Torre Radio", "Centro Comercial", "Casino", "Estación del Magnetotrén", "Floristería Trigal"], imageKey: "johto_goldenrod" },
        { name: "Ciudad Iris", nameEn: "Ecruteak City", type: "gym", population: 46, connections: ["Ruta 37 (Sur)", "Ruta 38 (Oeste)", "Ruta 42 (Este)"], description: "Ciudad empapada de folklore donde las leyendas de los perros legendarios siguen vivas.", placesOfInterest: ["Gimnasio Iris", "Torre Hojalata", "Torre Quemada", "Teatro de Danza"], imageKey: "johto_ecruteak" },
        { name: "Ciudad Olivo", nameEn: "Olivine City", type: "gym", population: 47, connections: ["Ruta 39 (Norte)", "Ruta 40 (Sur)"], description: "Un puerto vital con un faro icónico que guía a los marineros a través de las tormentas.", placesOfInterest: ["Faro Olivo", "Gimnasio Olivo", "Puerto de Viaje"], imageKey: "johto_olivine" },
        { name: "Ciudad Orquídea", nameEn: "Cianwood City", type: "gym", population: 27, connections: ["Ruta 41 (Este)"], description: "Ubicada en una isla remota, es conocida por sus aguas cristalinas y su gran entrenamiento físico.", placesOfInterest: ["Gimnasio Orquídea", "Farmacia", "Pokévidente"], imageKey: "johto_cianwood" },
        { name: "Pueblo Caoba", nameEn: "Mahogany Town", type: "gym", population: 26, connections: ["Ruta 42 (Oeste)", "Ruta 43 (Norte)", "Ruta 44 (Oeste)"], description: "Un pueblo cubierto por la niebla con una atmósfera misteriosa, cerca del Lago de la Furia.", placesOfInterest: ["Gimnasio Caoba", "Tienda Escondite Team Rocket"], imageKey: "johto_mahogany" },
        { name: "Ciudad Endrino", nameEn: "Blackthorn City", type: "gym", population: 40, connections: ["Ruta Helada (Noreste)", "Ruta 45 (Sur)", "Guarida Dragón (Norte)"], description: "Retiro de domadragones en las montañas, hogar de los mejores entrenadores de este legendario tipo.", placesOfInterest: ["Gimnasio Endrino", "Guarida Dragón", "Quita-movimientos"], imageKey: "johto_blackthorn" },
    ],
    hoenn: [
        { name: "Villa Raíz", nameEn: "Littleroot Town", type: "town", population: 10, connections: ["Ruta 101 (Norte)"], description: "Un pequeño pueblo costero donde el aroma de la hierba fresca te da la bienvenida.", placesOfInterest: ["Casa de Bruno/Aura", "Laboratorio del Prof. Abedul"], imageKey: "hoenn_littleroot" },
        { name: "Pueblo Escaso", nameEn: "Oldale Town", type: "town", population: 16, connections: ["Ruta 101 (Sur)", "Ruta 102 (Oeste)", "Ruta 103 (Norte)"], description: "Un cruce de caminos tranquilo que conecta la ciudad costera con el interior de la región.", placesOfInterest: ["Centro Pokémon", "Tienda Pokémon", "Casa del Cronista"], imageKey: "hoenn_oldale" },
        { name: "Ciudad Petalia", nameEn: "Petalburg City", type: "gym", population: 31, connections: ["Ruta 104 (Oeste)", "Ruta 102 (Este)"], description: "Hogar de Norman. El primer gran desafío para cualquier entrenador en Hoenn.", placesOfInterest: ["Gimnasio Petalia", "Casa de los Padres de Blasco"], imageKey: "hoenn_petalburg" },
        { name: "Ciudad Férrica", nameEn: "Rustboro City", type: "gym", population: 37, connections: ["Ruta 104 (Sur)", "Ruta 115 (Norte)", "Ruta 116 (Noreste)"], description: "Una metrópolis industrial y académica que destaca por su gran escuela de entrenadores.", placesOfInterest: ["Gimnasio Férrica", "Devon S.A.", "Escuela de Entrenadores", "Casa del Cortador"], imageKey: "hoenn_rustboro" },
        { name: "Pueblo Azuliza", nameEn: "Dewford Town", type: "gym", population: 17, connections: ["Ruta 106 (Norte)", "Ruta 107 (Oeste)"], description: "Un pueblo en una isla remota, refugio de surfistas y exploradores de la Cueva Granito.", placesOfInterest: ["Gimnasio Azuliza", "Cueva Granito", "Club Azuliza"], imageKey: "hoenn_dewford" },
        { name: "Ciudad Portual", nameEn: "Slateport City", type: "city", population: 61, connections: ["Ruta 109 (Sur)", "Ruta 110 (Norte)"], description: "Una bulliciosa ciudad portuaria conocida por su animado mercado y su museo oceánico.", placesOfInterest: ["Mercado", "Museo Oceánico", "Puerto", "Club de Fans Pokémon", "Casa del Inspector de Motes", "Tienda Batalla"], imageKey: "hoenn_slateport" },
        { name: "Ciudad Malvalona", nameEn: "Mauville City", type: "gym", population: 29, connections: ["Ruta 110 (Sur)", "Ruta 111 (Norte)", "Ruta 117 (Oeste)", "Ruta 118 (Este)"], description: "El nexo central de Hoenn, una ciudad tecnológica que nunca deja de expandirse.", placesOfInterest: ["Gimnasio Malvalona", "Tienda de Bicis", "Malvalona TV", "Casino", "Academia Pokémon", "Malvalonia"], imageKey: "hoenn_mauville" },
        { name: "Pueblo Verdegal", nameEn: "Verdanturf Town", type: "town", population: 27, connections: ["Ruta 117 (Oeste)", "Túnel Fervergal (Norte)"], description: "Un pueblo tranquilo de aire puro. Hogar del gran Túnel Fervergal.", placesOfInterest: ["Casa de Clara", "Túnel Fervergal", "Edificio de Concursos"], imageKey: "hoenn_verdanturf" },
        { name: "Pueblo Lavacalda", nameEn: "Lavaridge Town", type: "gym", population: 27, connections: ["Ruta 112 (Este)", "Desfiladero (Noreste)"], description: "Famoso por sus aguas termales curativas situadas a los pies del volcán Mt. Chimney.", placesOfInterest: ["Gimnasio Lavaridge", "Aguas Termales", "Teleférico"], imageKey: "hoenn_lavaridge" },
        { name: "Pueblo Pardal", nameEn: "Fallarbor Town", type: "town", population: 20, connections: ["Ruta 114 (Oeste)", "Ruta 113 (Este)"], description: "Pueblo agrícola cercano a las cenizas del volcán y hogar del Profesor Cozmo.", placesOfInterest: ["Casa del Prof. Cozmo", "Edificio de Concursos", "Tutor de Movimientos"], imageKey: "hoenn_fallarbor" },
        { name: "Ciudad Arborada", nameEn: "Fortree City", type: "gym", population: 19, connections: ["Ruta 119 (Oeste)", "Ruta 120 (Este)"], description: "Una ciudad única donde las casas están construidas sobre los árboles en mitad de la selva.", placesOfInterest: ["Gimnasio Arborada", "Tienda de Sillas y Mesas", "Gremio de Bases Secretas"], imageKey: "hoenn_fortree" },
        { name: "Ciudad Calagua", nameEn: "Lilycove City", type: "city", population: 123, connections: ["Ruta 122 (Oeste)", "Ruta 121 (Este)"], description: "Una gran ciudad costera conocida por sus concursos y su enorme centro comercial.", placesOfInterest: ["Centro Comercial", "Museo de Arte", "Puerto", "Gran Edificio de Concursos", "Motel Aguacala", "Guarida Team Magma/Aqua"], imageKey: "hoenn_lilycove" },
        { name: "Ciudad Algaria", nameEn: "Mossdeep City", type: "gym", population: 29, connections: ["Ruta 124 (Oeste)", "Ruta 127 (Sur)", "Ruta 125 (Norte)"], description: "Ubicada en una isla soleada, es el centro de la exploración espacial de la región.", placesOfInterest: ["Gimnasio Algaria", "Centro Espacial", "Casa de Máximo Peñas", "Casa del Pescador"], imageKey: "hoenn_mossdeep" },
        { name: "Arrecípolis", nameEn: "Sootopolis City", type: "gym", population: 33, connections: ["Ruta 126 (Sur)"], description: "Una ciudad mística construida dentro del cráter de un antiguo volcán submarino.", placesOfInterest: ["Gimnasio Arrecípolis", "Cueva Ancestral"], imageKey: "hoenn_sootopolis" },
        { name: "Pueblo Oromar", nameEn: "Pacifidlog Town", type: "town", population: 22, connections: ["Ruta 131 (Este)", "Ruta 132 (Oeste)"], description: "Un pequeño pueblo construido sobre troncos flotantes en medio del océano.", placesOfInterest: ["Casas flotantes", "Casa del Cuentacuentos"], imageKey: "hoenn_pacifidlog" },
        { name: "Ciudad Colosalia", nameEn: "Ever Grande City", type: "city", population: 0, connections: ["Ruta 128 (Este)"], description: "La última parada antes de la gloria, hogar de la Liga Pokémon de Hoenn.", placesOfInterest: ["Calle Victoria", "Liga Pokémon de Hoenn"], imageKey: "hoenn_ever_grande" },
    ],
    sinnoh: [
        { name: "Pueblo Hojaverde", nameEn: "Twinleaf Town", type: "town", population: 10, connections: ["Ruta 201 (Norte)"], description: "Un pequeño pueblo tranquilo donde comienza el viaje, conocido por su aire fresco y proximidad al Lago Veraz.", placesOfInterest: ["Casa de Maya/León", "Casa de Israel"], imageKey: "sinnoh_twinleaf" },
        { name: "Pueblo Arena", nameEn: "Sandgem Town", type: "town", population: 19, connections: ["Ruta 201 (Oeste)", "Ruta 202 (Norte)", "Ruta 219 (Sur)"], description: "Un pueblo costero arenoso donde el Profesor Serbal realiza sus investigaciones sobre la evolución Pokémon.", placesOfInterest: ["Laboratorio del Prof. Serbal"], imageKey: "sinnoh_sandgem" },
        { name: "Ciudad Jubileo", nameEn: "Jubilife City", type: "city", population: 68, connections: ["Ruta 202 (Sur)", "Ruta 218 (Oeste)", "Ruta 203 (Este)", "Ruta 204 (Norte)"], description: "La ciudad más moderna de Sinnoh, rebosante de tecnología y medios de comunicación.", placesOfInterest: ["Estación de Intercambio Global", "Dojo Pokémon", "Jubileo TV", "Poké-reloj S.A."], imageKey: "sinnoh_jubilife" },
        { name: "Ciudad Pirita", nameEn: "Oreburgh City", type: "gym", population: 42, connections: ["Puerta Pirita (Oeste)", "Ruta 207 (Norte)", "Mina Pirita (Sur)"], description: "Una ciudad minera próspera rodeada de canteras de carbón, con un ambiente rústico e industrial.", placesOfInterest: ["Gimnasio Pirita", "Mina Pirita", "Museo Minero"], imageKey: "sinnoh_oreburgh" },
        { name: "Pueblo Aromaflor", nameEn: "Floaroma Town", type: "town", population: 20, connections: ["Ruta 204 (Sur)", "Prado Aromaflor (Norte)", "Ruta 205 (Oeste)", "Valle Eólico (Este)"], description: "Un prado eternamente floreado que se llena del dulce aroma del néctar.", placesOfInterest: ["Floristería Arco iris", "Prado Aromaflor", "Valle Eólico"], imageKey: "sinnoh_floaroma" },
        { name: "Ciudad Vetusta", nameEn: "Eterna City", type: "gym", population: 31, connections: ["Ruta 205 (Este)", "Ruta 206 (Sur)", "Ruta 211 (Oeste)"], description: "Una ciudad antigua que guarda los secretos del pasado de Sinnoh y estatuas de Pokémon legendarios.", placesOfInterest: ["Gimnasio Vetusta", "Edificio Galaxia", "Tienda de bicis", "Herbolario"], imageKey: "sinnoh_eterna" },
        { name: "Ciudad Corazón", nameEn: "Hearthome City", type: "gym", population: 55, connections: ["Ruta 208 (Oeste)", "Ruta 212 (Sur)", "Ruta 209 (Este)", "Plaza Amistad (Norte)"], description: "Elegida como la ciudad más acogedora, es el centro de la moda, los concursos y la amabilidad.", placesOfInterest: ["Gimnasio Corazón", "Auditorio Pokémon", "Club de Fans", "Plaza Amistad", "Pokochería"], imageKey: "sinnoh_hearthome" },
        { name: "Pueblo Sosiego", nameEn: "Solaceon Town", type: "town", population: 28, connections: ["Ruta 209 (Sur)", "Ruta 210 (Norte)", "Ruinas Sosiego (Oeste)"], description: "Es un lugar de descanso campestre lleno de granjas y ruinas antiguas.", placesOfInterest: ["Ruinas Sosiego", "Periódico Local Pokémon", "Guardería Pokémon"], imageKey: "sinnoh_solaceon" },
        { name: "Ciudad Rocavelo", nameEn: "Veilstone City", type: "gym", population: 54, connections: ["Ruta 215 (Este)", "Ruta 214 (Sur)"], description: "Ciudad excavada en la roca con un gran centro comercial y una atmósfera algo sombría debido a los meteoritos.", placesOfInterest: ["Gimnasio Rocavelo", "Almacén/Edificio Galaxia", "Centro Comercial", "Casino"], imageKey: "sinnoh_veilstone" },
        { name: "Ciudad Pradera", nameEn: "Pastoria City", type: "gym", population: 41, connections: ["Ruta 212 (Oeste)", "Ruta 213 (Este)", "Gran Pantano (Norte)"], description: "Ubicada junto a un Gran Pantano, esta ciudad tiene una fuerte conexión con el agua y la naturaleza salvaje.", placesOfInterest: ["Gimnasio Pradera", "Gran Pantano (Safari)", "Recordador de movimientos"], imageKey: "sinnoh_pastoria" },
        { name: "Pueblo Caelestis", nameEn: "Celestic Town", type: "town", population: 13, connections: ["Ruta 211 (Oeste)", "Ruta 210 (Este)", "Ruinas Caelestis (Norte)"], description: "Una minúscula aldea que guarda murales milenarios narrando la historia del trío de la creación.", placesOfInterest: ["Ruinas Caelestis", "Casas Clásicas"], imageKey: "sinnoh_celestic" },
        { name: "Ciudad Canal", nameEn: "Canalave City", type: "gym", population: 20, connections: ["Ruta 218 (Oeste)"], description: "Una ciudad portuaria con una biblioteca famosa que alberga los mitos y leyendas más profundos de la región.", placesOfInterest: ["Gimnasio Canal", "Biblioteca Canal", "Muelle Canal", "Quita-movimientos"], imageKey: "sinnoh_canalave" },
        { name: "Ciudad Puntaneva", nameEn: "Snowpoint City", type: "gym", population: 14, connections: ["Orilla Agudeza (Este)"], description: "Una ciudad gélida en el extremo norte, siempre cubierta de nieve y con un templo antiguo misterioso.", placesOfInterest: ["Gimnasio Puntaneva", "Templo Puntaneva", "Puerto"], imageKey: "sinnoh_snowpoint" },
        { name: "Ciudad Marina", nameEn: "Sunyshore City", type: "gym", population: 14, connections: ["Ruta 222 (Este)", "Ruta 223 (Norte)"], description: "Una ciudad costera moderna alimentada por paneles solares elevados, hogar del faro más brillante.", placesOfInterest: ["Gimnasio Marina", "Faro Visión", "Mercado Marino"], imageKey: "sinnoh_sunyshore" },
    ],
    unova: [
        { name: "Pueblo Arcilla", nameEn: "Nuvema Town", type: "town", connections: ["Ruta 1 (Norte)"], description: "Un tranquilo pueblo costero donde comienza la aventura y se encuentran las raíces de los ideales.", placesOfInterest: ["Lab. Profesora Encina", "Casa de Bel", "Casa de Cheren"], imageKey: "unova_nuvema" },
        { name: "Pueblo Terracota", nameEn: "Accumula Town", type: "town", connections: ["Ruta 2 (Oeste)", "Ruta 1 (Sur)"], description: "Un pintoresco pueblo construido sobre una colina, famoso por sus músicos callejeros.", placesOfInterest: ["Casa de la música", "Plaza principal"], imageKey: "unova_accumula" },
        { name: "Ciudad Gres", nameEn: "Striaton City", type: "gym", connections: ["Ruta 2 (Sur)", "Ruta 3 (Oeste)", "Solar de los Sueños (Este)"], description: "Una ciudad elegante que alberga un restaurante que también funciona como gimnasio múltiple.", placesOfInterest: ["Gimnasio Gres", "Escuela Pokémon", "Solar de los Sueños"], imageKey: "unova_striaton" },
        { name: "Ciudad Esmalte", nameEn: "Nacrene City", type: "gym", connections: ["Ruta 3 (Este)", "Bosque Azulejo (Oeste)"], description: "Una ciudad artística construida dentro de antiguos almacenes ferroviarios restaurados.", placesOfInterest: ["Gimnasio Esmalte", "Museo Esmalte", "Café Alma"], imageKey: "unova_nacrene" },
        { name: "Ciudad Porcelana", nameEn: "Castelia City", type: "gym", connections: ["Puente Saeta (Este)", "Ruta 4 (Norte)", "Isla Libertad (Barco)"], description: "La gran metrópolis de Unova, un centro de negocios, rascacielos turísticos y corporativos.", placesOfInterest: ["Gimnasio Porcelana", "Edificio Game Freak", "Calle de la Moda", "Muelles Unidad/Libertad"], imageKey: "unova_castelia" },
        { name: "Ciudad Mayólica", nameEn: "Nimbasa City", type: "gym", connections: ["Ruta 4 (Sur)", "Ruta 5 (Oeste)", "Ruta 16 (Este)"], description: "El brillante centro del entretenimiento, con parques de atracciones, estadios deportivos y norias.", placesOfInterest: ["Gimnasio Mayólica", "Musical/Grand Estadio", "Rueda de la fortuna"], imageKey: "unova_nimbasa" },
        { name: "Ciudad Fayenza", nameEn: "Driftveil City", type: "gym", connections: ["Almacenes Frigoríficos (Sur)", "Ruta 6 (Oeste)", "Pokémon World Tournament (N2B2)"], description: "Una ciudad portuaria industrial conocida por su mercado, minería y ricas vetas minerales.", placesOfInterest: ["Gimnasio Fayenza", "Mercado de Fayenza", "Pokémon World Tournament", "Túnel Yakón"], imageKey: "unova_driftveil" },
        { name: "Ciudad Loza", nameEn: "Mistralton City", type: "gym", connections: ["Ruta 6 (Sur)", "Ruta 7 (Norte)"], description: "Una ciudad construida alrededor de un aeropuerto, donde los aviones de carga agrícola prosperan.", placesOfInterest: ["Gimnasio Loza", "Aeropuerto", "Viveros", "Quita-movimientos"], imageKey: "unova_mistralton" },
        { name: "Ciudad Teja", nameEn: "Icirrus City", type: "gym", connections: ["Monte Tuerca (Oeste)", "Torre Duodraco (Norte)", "Ruta 8 (Este)"], description: "Una ciudad tranquila rodeada de humedales que se congelan y cubren de nieve en invierno.", placesOfInterest: ["Gimnasio Teja", "Molinos", "Torre Duodraco"], imageKey: "unova_icirrus" },
        { name: "Ciudad Caolín", nameEn: "Opelucid City", type: "gym", connections: ["Ruta 9 (Oeste)", "Ruta 10 (Norte)", "Ruta 11 (Este)"], description: "Una ciudad que cambia drásticamente, representando el pasado rudimentario o el futuro tecnológico.", placesOfInterest: ["Gimnasio Caolín", "Casa de Lirio e Iris"], imageKey: "unova_opelucid" },
        { name: "Pueblo Biscuit", nameEn: "Anville Town", type: "town", connections: ["Ciudad Mayólica (Metro)"], description: "Un pequeño pueblo accesible en metro, conocido por su estación ferroviaria.", placesOfInterest: ["Estación ferroviaria", "Casas (3x)"], imageKey: "unova_anville" },
        { name: "Pueblo Lacunosa", nameEn: "Lacunosa Town", type: "town", connections: ["Ruta 12 (Oeste)", "Ruta 13 (Este)"], description: "Un pueblo tranquilo entre lagos.", placesOfInterest: ["Casas (8x)"], imageKey: "unova_lacunosa" },
        { name: "Pueblo Arenisca", nameEn: "Undella Town", type: "city", connections: ["Ruta 13 (Norte)", "Ruta 14 (Sur)", "Ruta 21 (Noreste)", "Bahía Arenisca (Este)"], description: "Una lujosa ciudad de vacaciones ideal para el verano con la famosa Bahía Arenisca.", placesOfInterest: ["Villa de Cintia", "Mansión Finolis", "Villas (3x)", "Chiringuitos"], imageKey: "unova_undella" },
        { name: "Bosque Blanco", nameEn: "White Forest", type: "route", connections: ["Ruta 14 (Norte)", "Ruta 15 (Oeste)"], description: "Un bosque misterioso con un aspecto único en comparación con otros ecosistemas de Unova.", placesOfInterest: ["Cavernogal Blanco"], imageKey: "unova_white_forest" },
        { name: "Ciudad Negra", nameEn: "Black City", type: "city", connections: ["Ruta 14 (Norte)", "Ruta 15 (Oeste)"], description: "Una ciudad urbana con rascacielos y un mercado exclusivo.", placesOfInterest: ["Mercado Negro", "Rascacielos Negro"], imageKey: "unova_black_city" },
        { name: "Ciudad Engobe", nameEn: "Aspertia City", type: "gym", connections: ["Ruta 19 (Norte)"], description: "Un lugar cívico que sirve de punto de partida para una nueva aventura dos años después.", placesOfInterest: ["Gimnasio Engobe", "Casa de Matís", "Escuela de Entrenadores", "Mirador"], imageKey: "unova_aspertia" },
        { name: "Pueblo Ocre", nameEn: "Floccesy Town", type: "town", connections: ["Ruta 19 (Oeste)", "Ruta 20 (Este)", "Arboleda Promesa (Norte)"], description: "Un sitio ancestral dedicado a los juramentos honorables con la mítica Arboleda Promesa.", placesOfInterest: ["Casa de Mirto", "Torre del reloj"], imageKey: "unova_floccesy" },
        { name: "Ciudad Hormigón", nameEn: "Virbank City", type: "gym", connections: ["Ruta 20 (Oeste)", "Polígono Hormigón (Sur)", "Pokéwood (Norte)", "Ciudad Porcelana (Barco)"], description: "Una ruda locación de estética punk llena de fábricas de polígonos industriales y rodajes.", placesOfInterest: ["Gimnasio Hormigón", "Puerto", "Casas (3x)", "Garajes (3x)"], imageKey: "unova_virbank" },
        { name: "Ciudad Marga", nameEn: "Humilau City", type: "gym", connections: ["Ruta 21 (Sur)", "Ruta 22 (Oeste)", "Acuatúnel"], description: "Centro vacacional tropical rodeado por un apacible acuatúnel y playas.", placesOfInterest: ["Gimnasio Marga", "Playa", "Chalé Mienfoo", "Casas (8x)"], imageKey: "unova_humilau" },
        { name: "Pueblo Chamota", nameEn: "Lentimas Town", type: "town", connections: ["Ciudad Loza (Avión)", "Montaña Reversia (Este)"], description: "Un pueblo accesible en avión desde Ciudad Loza.", placesOfInterest: ["Aeropuerto", "Casas (3x)"], imageKey: "unova_lentimas" },
    ],
    kalos: [
        { name: "Pueblo Boceto", nameEn: "Vaniville Town", type: "town", population: 9, connections: ["Ruta 1 (Norte)"], description: "Un pequeño y pintoresco pueblo con pétalos de flores revoloteando y un aire de nuevos comienzos.", placesOfInterest: ["Casa del Protagonista", "Casa de Kalm/Serena", "Casa de Benigno"], imageKey: "kalos_vaniville" },
        { name: "Pueblo Acuarela", nameEn: "Aquacorde Town", type: "town", population: 9, connections: ["Ruta 2 (Norte)", "Ruta 1 (Sur)"], description: "Un pueblo de paso encantador con una gran fuente central y muchas tiendas locales.", placesOfInterest: ["Tienda de Pociones", "Centro de recuperación"], imageKey: "kalos_aquacorde" },
        { name: "Ciudad Novarte", nameEn: "Santalune City", type: "gym", population: 34, connections: ["Ruta 4 (Norte)", "Ruta 3 (Sur)", "Ruta 22 (Este)"], description: "Una ciudad clásica con calles empedradas y arquitectura enfocada en la fotografía.", placesOfInterest: ["Gimnasio Novarte", "Escuela de entrenadores", "Boutique"], imageKey: "kalos_santalune" },
        { name: "Ciudad Luminalia", nameEn: "Lumiose City", type: "gym", population: 170, connections: ["Ruta 14 (Norte)", "Ruta 5 (Suroeste)", "Ruta 13 (Oeste)", "Ruta 16 (Este)"], description: "La gigantesca joya de Kalos, una metrópolis inspirada en París dividida en opulentos bulevares.", placesOfInterest: ["Gimnasio Luminalia", "Laboratorio del Prof. Ciprés", "Museo de Luminalia", "Looker & Cía"], imageKey: "kalos_lumiose" },
        { name: "Pueblo Vánitas", nameEn: "Camphrier Town", type: "town", population: 18, connections: ["Ruta 5 (Este)", "Ruta 7 (Oeste)"], description: "Un pueblo muy antiguo donde se encuentra preservado el emblemático Castillo Caduco.", placesOfInterest: ["Castillo Caduco", "Hotel Vánitas"], imageKey: "kalos_camphrier" },
        { name: "Pueblo Petroglifo", nameEn: "Ambrette Town", type: "town", population: 27, connections: ["Ruta 8 (Norte)", "Ruta 9 (Este)"], description: "Base científica a la orilla del mar dedicada enteramente al estudio de vida fósil.", placesOfInterest: ["Instituto Paleontológico", "Acuario de Petroglifo"], imageKey: "kalos_ambrette" },
        { name: "Ciudad Relieve", nameEn: "Cyllage City", type: "gym", population: 50, connections: ["Ruta 10 (Noroeste)", "Ruta 8 (Sur)", "Gruta Tierraunida (Este)"], description: "Una ciudad costera construida en los acantilados, famosa por su hotel de lujo y los carriles bici.", placesOfInterest: ["Gimnasio Relieve", "Tienda de bicis", "Gruta Tierraunida", "Hotel Relieve"], imageKey: "kalos_cyllage" },
        { name: "Pueblo Crómlech", nameEn: "Geosenge Town", type: "town", population: 17, connections: ["Ruta 11 (Noreste)", "Ruta 10 (Sureste)"], description: "Rodeado de monumentos pétreos cuya historia está enraizada con el arma definitiva.", placesOfInterest: ["Laboratorio del Team Flare", "Megalitos de piedra"], imageKey: "kalos_geosenge" },
        { name: "Ciudad Yantra", nameEn: "Shalour City", type: "gym", population: 40, connections: ["Cueva Reflejos (Sur)", "Ruta 12 (Este)"], description: "Hogar de la mística Torre Maestra donde descansa el secreto heroico de la Megaevolución.", placesOfInterest: ["Gimnasio Yantra", "Torre de la Destreza"], imageKey: "kalos_shalour" },
        { name: "Ciudad Témpera", nameEn: "Coumarine City", type: "gym", population: 43, connections: ["Ruta 12 (Oeste)", "Ruta 13 (Sureste)"], description: "Una ciudad costera dividida en dos elevaciones colina y litoral, conectada por un monorraíl.", placesOfInterest: ["Gimnasio Témpera", "Estación Litoral / Colina", "Vendedor de incienso"], imageKey: "kalos_coumarine" },
        { name: "Ciudad Romantis", nameEn: "Laverre City", type: "gym", population: 43, connections: ["Fábrica de Poké Balls (Norte)", "Ruta 15 (Sureste)", "Ruta 14 (Sur)"], description: "Una ciudad de aspecto místico y otoñal construida alrededor de un árbol milenario.", placesOfInterest: ["Gimnasio Romantis", "Fábrica de Poké Balls", "Club de Fans"], imageKey: "kalos_laverre" },
        { name: "Pueblo Fresco", nameEn: "Dendemille Town", type: "town", population: 21, connections: ["Gruta Helada (Norte)", "Ruta 15 (Noroeste)", "Ruta 17 (Sureste)"], description: "Ubicado junto al área fría, resguarda el recordador de movimientos y los molinos.", placesOfInterest: ["Recordadora de movimientos", "Molino"], imageKey: "kalos_dendemille" },
        { name: "Ciudad Fluxus", nameEn: "Anistar City", type: "gym", population: 37, connections: ["Ruta 17 (Noroeste)", "Ruta 18 (Sureste)"], description: "Conocida por su gran reloj de sol de cristal que brilla con una luz misteriosa.", placesOfInterest: ["Gimnasio Fluxus", "Reloj de sol", "Boutique"], imageKey: "kalos_anistar" },
        { name: "Pueblo Mosaico", nameEn: "Couriway Town", type: "town", population: 17, connections: ["Ruta 18 (Noroeste)", "Ruta 19 (Suroeste)"], description: "Pequeña estación que cruza el agua donde los trenes locales hacen su parada.", placesOfInterest: ["Estación de Mosaico", "Hotel Mosaico"], imageKey: "kalos_couriway" },
        { name: "Ciudad Fractal", nameEn: "Snowbelle City", type: "gym", population: 39, connections: ["Ruta 19 (Noreste)", "Ruta 20 (Sur)", "Ruta 21 (Oeste)"], description: "Una ciudad gélida donde la nieve nunca se derrite rodeada por densos bosques sombríos.", placesOfInterest: ["Gimnasio Fractal", "Tutor de movimientos"], imageKey: "kalos_snowbelle" },
        { name: "Ciudad Batik", nameEn: "Kiloude City", type: "city", population: 34, connections: ["Tren de Alta Velocidad"], description: "Un exclusivo destino tropical sin igual, accesible únicamente a los campeones entrenadores.", placesOfInterest: ["Safari Amistad", "Mansión Batalla"], imageKey: "kalos_kiloude" },
    ],
    alola: [
        { name: "Pueblo Lilii", nameEn: "Iki Town", type: "village", population: 18, connections: ["Ruta 1 (sur)"], description: "Un pueblo tradicional en la isla Melemele donde se celebran magnánimos festivales en honor a Tapu Koko.", placesOfInterest: ["Casa de Kaudan", "Casas (x3)"], imageKey: "alola_iki" },
        { name: "Ciudad Hauoli", nameEn: "Hau'oli City", type: "city", population: 107, connections: ["Afueras de Hauoli (este)", "Ruta 2 (norte)"], description: "La ciudad costera y soleada más grande de Alola, centro neurálgico del comercio del archipiélago.", placesOfInterest: ["Centro Comercial Hauoli", "Casa de Liam", "Ayuntamiento", "Peluquería", "Boutique", "Embarcadero", "Tienda de malasadas", "Centro Pokémon", "Fotoclub de Alola", "Comisaría de Policía", "Oficina de Turismo"], imageKey: "alola_hauoli" },
        { name: "Ciudad Kantai", nameEn: "Heahea City", type: "city", population: 72, connections: ["Túnel Diglett (sur)", "Ruta 6 (noreste)", "Ruta 4 (norte)", "Resort Hanohano (este)", "Playa de Kantai"], description: "Lugar vacacional y laboratorios de investigación dimensional donde atraca la Fundación Æther.", placesOfInterest: ["Hotel Arrullo del Mar", "Centro de Investigaciones Dimensionales", "Oficinas de Game Freak", "Boutique", "Embarcadero", "Oficina de Turismo", "Centro Pokémon", "Centro de la Fundación Æther", "Club de Surfistas de Alola"], imageKey: "alola_heahea" },
        { name: "Pueblo Ohana", nameEn: "Paniola Town", type: "village", population: 28, connections: ["Rancho Ohana (norte)", "Ruta 4 (sur)", "Ruta 6 (este)"], description: "Un enclave de ambiente rural y wéstern, dedicado a la crianza de Tauros y pastos pacíficos.", placesOfInterest: ["Casa de Kiawe", "Centro Pokémon", "Evaluadora de Poder oculto", "Rancho Ohana", "Cuidados Pokémon"], imageKey: "alola_paniola" },
        { name: "Avenida Royale", nameEn: "Royal Avenue", type: "city", population: 40, connections: ["Ruta 6 (oeste)", "Ruta 7 (noreste)"], description: "Polo de espectáculos y combates efervescentes gracias a los enfrentamientos Battle Royale.", placesOfInterest: ["Supermercado Ultraganga", "Centro Pokémon", "Estadio Royale", "Tienda de malasadas", "Club de fans Pokémon"], imageKey: "alola_royal" },
        { name: "Resort Hanohano", nameEn: "Hano Grand Resort", type: "city", population: 26, connections: ["Ciudad Kantai (noroeste)", "Playa de Hanohano (este)"], description: "Un exclusivo hotel de lujo en la isla de Akala.", placesOfInterest: ["Hotel Hanohano", "Tutor de Movimientos", "Playa de Hanohano", "Embarcadero"], imageKey: "alola_hano_grand_resort" },
        { name: "Ciudad Konikoni", nameEn: "Konikoni City", type: "city", population: 52, connections: ["Túnel Diglett (norte)", "Ruta 9 (sur)"], description: "Una urbe costera rica en farolillos, altares y un enorme foco en la herbolaria y tiendas de lujo.", placesOfInterest: ["Centro Pokémon", "Casa de Nereida", "Herbolario", "Restaurante familiar de Lulú", "Tienda de accesorios y piedras de Mayla", "Tienda de MT", "Tienda de incienso", "Masajes Lomilomi", "Peluquería", "Boutique", "Fotoclub de Alola"], imageKey: "alola_konikoni" },
        { name: "Ciudad Malíe", nameEn: "Malie City", type: "city", population: 82, connections: ["Ruta 11 (sur)", "Ruta 10 (oeste)", "Cabo de las Afueras (noroeste)", "Parque de Malíe (norte)"], description: "Inspirada fuertemente en Johto, está envuelta por amplios parques japoneses y librerías asiáticas.", placesOfInterest: ["Embarcadero", "Parque de Malíe", "Biblioteca de Malíe", "Centro Cultural de Malíe", "Gimnasio de Kanto", "Sushi Tres Delicias", "Tienda de Malasadas", "Boutique", "Peluquería", "Centro Pokémon"], imageKey: "alola_malie" },
        { name: "Pico Hokulani", nameEn: "Mount Hokulani", type: "landmark", population: 30, connections: ["Ruta 10 (sur)"], description: "Una montaña donde se encuentra el observatorio astronómico.", placesOfInterest: ["Observatorio de Hokulani", "Centro Pokémon", "Exeggutobús"], imageKey: "alola_hokulani" },
        { name: "Aldea Tapu", nameEn: "Tapu Village", type: "village", population: 13, connections: ["Ruta 15 (norte)", "Monte Lanakila (norte)", "Ruta 14 (sur)", "Ruta 13 (este)"], description: "Restos de un viejo territorio destrozado cerca del Monte Lanakila.", placesOfInterest: ["Centro Pokémon", "Edificaciones en Ruinas"], imageKey: "alola_tapu" },
        { name: "Pueblo Po", nameEn: "Po Town", type: "village", population: 23, connections: ["Ruta 17 (sur)", "Mansión Misteriosa (norte)"], description: "Un sitio lluvioso y sombrío completamente invadido y amurallado por el escandaloso Team Skull.", placesOfInterest: ["Centro Pokémon", "Mansión Misteriosa"], imageKey: "alola_po" },
        { name: "Aldea Marina", nameEn: "Seafolk Village", type: "village", population: 30, connections: ["Prado de Poni (norte)", "Isla Exeggutor (barco)"], description: "Una comunidad pacífica a flote con viviendas hechas dentro de las barcazas con forma de Steelix.", placesOfInterest: ["Embarcadero", "Centro Pokémon", "Casa-barco de Rika", "Restaurante flotante", "Barco a Isla Exeggutor", "Casa-barco Steelix", "Tutores de movimiento"], imageKey: "alola_seafolk" },
    ],
    galar: [
        { name: "Pueblo Yarda", nameEn: "Postwick", type: "town", population: 8, connections: ["Ruta 1 (norte)", "Bosque Oniria (oeste)"], description: "Un pueblo rural pintoresco y hogareño al extremo sur, adornado con colinas verdes y la lana de rebaños de Wooloo.", placesOfInterest: ["Casa del Protagonista", "Casa de Paul", "Bosque Oniria"], imageKey: "galar_postwick" },
        { name: "Pueblo Par", nameEn: "Wedgehurst", type: "town", population: 31, connections: ["Ruta 1 (sur)", "Ruta 2 (norte)"], description: "Un apacible cruce de caminos rústico donde se sitúa la base científica que investiga el fenómeno Dinamax.", placesOfInterest: ["Lab. Profesora Magnolia", "Tienda de bayas", "Estación de Par"], imageKey: "galar_wedgehurst" },
        { name: "Ciudad Pistón", nameEn: "Motostoke", type: "gym", population: 120, connections: ["Área Silvestre (sur)", "Ruta 3 (oeste)", "Mina de Galar (este)"], description: "Una metrópolis industrial propulsada por el poder de la ingeniería de vapor, con imponentes engranajes.", placesOfInterest: ["Estadio de Pistón", "Boutique", "Hotel Budew", "Café Combate"], imageKey: "galar_motostoke" },
        { name: "Pueblo Hoyuelo", nameEn: "Turffield", type: "gym", population: 36, connections: ["Ruta 4 (suroeste)", "Ruta 5 (este)"], description: "Localización pastoral famosa por el enorme y espiral Geoglifo antiguo tallado en sus colinas.", placesOfInterest: ["Estadio de Hoyuelo", "Geoglifo", "Floristería"], imageKey: "galar_turffield" },
        { name: "Pueblo Amura", nameEn: "Hulbury", type: "gym", population: 54, connections: ["Ruta 5 (oeste)", "Mina de Galar n.° 2 (sur)"], description: "Animada ciudad naviera de fuertes vientos marinos, donde sus residentes gozan del mercado marinero.", placesOfInterest: ["Estadio de Amura", "El Espigón", "Estación de Amura"], imageKey: "galar_hulbury" },
        { name: "Ciudad Artejo", nameEn: "Hammerlocke", type: "gym", population: 102, connections: ["Área Silvestre (sur)", "Ruta 7 (este)", "Ruta 6 (oeste)"], description: "La antigua capital medieval fortificada; su inmenso castillo gótico en el centro custodia la cámara de la energía.", placesOfInterest: ["Estadio de Artejo", "Planta Eléctrica", "Cámara heptagonal"], imageKey: "galar_hammerlocke" },
        { name: "Pueblo Ladera", nameEn: "Stow-on-Side", type: "gym", population: 44, connections: ["Ruta 6 (sur)", "Bosque Lumirinto (norte)"], description: "Un poblado incrustado en el desierto montañoso con un patrimonio que abarca reliquias y antiguos murales.", placesOfInterest: ["Estadio de Ladera", "Mural Ladera", "Mercadillo/Yacimiento"], imageKey: "galar_stowonside" },
        { name: "Pueblo Plié", nameEn: "Ballonlea", type: "gym", population: 26, connections: ["Bosque Lumirinto (sur)"], description: "Escondida como en un cuento de hadas; brilla tenue en la oscuridad gracias a los hongos fosforescentes.", placesOfInterest: ["Estadio de Plié", "Bosque Lumirinto"], imageKey: "galar_ballonlea" },
        { name: "Pueblo Auriga", nameEn: "Circhester", type: "gym", population: 92, connections: ["Ruta 8 (sur)", "Ruta 9 (sur)"], description: "Un gélido bastión histórico con arquitectura clásica de piedra dominado por un mítico balneario termal.", placesOfInterest: ["Estadio de Auriga", "Termas heroicas", "Hotel Jonia"], imageKey: "galar_circhester" },
        { name: "Pueblo Crampón", nameEn: "Spikemuth", type: "gym", population: 29, connections: ["Ruta 9 (norte)", "Túnel de la Ruta 9 (oeste)"], description: "Ubicación cerrada herméticamente y saturada de carteles de neón; hogar indiscutible del caótico Team Yell.", placesOfInterest: ["Gimnasio Crampón", "Escenario callejero"], imageKey: "galar_spikemuth" },
        { name: "Ciudad Puntera", nameEn: "Wyndon", type: "city", population: 157, connections: ["Ruta 10 (sur)"], description: "La reluciente urbe magna, la gloria londinense de la región en la que se consagra el honorífico Liga de Campeones.", placesOfInterest: ["Gran Estadio de Puntera", "Torre Batalla", "El Acua Aro", "Gran Hotel Rosalón"], imageKey: "galar_wyndon" },
    ],
    paldea: [
        { name: "Pueblo Cahíz", nameEn: "Cabo Poco", type: "town", connections: ["Sendero de Cahíz (norte)", "Mar Meridional de Paldea (sur)"], description: "Un pequeño pueblo costero donde comienza tu aventura, la búsqueda del tesoro y tu paso por la Academia.", placesOfInterest: ["Casa del protagonista", "Casa de Mencía"], imageKey: "paldea_cabo_poco" },
        { name: "Pueblo Ataifor", nameEn: "Los Platos", type: "town", connections: ["Ciudad Meseta (norte)", "Área 1 del sur (alrededor)"], description: "Un pueblo pintoresco famoso por su rica cultura agraria rodeado de campos.", placesOfInterest: ["Dulcinante", "Centro Pokémon"], imageKey: "paldea_los_platos" },
        { name: "Ciudad Meseta", nameEn: "Mesagoza", type: "city", connections: ["Liga Pokémon (norte)", "Área 3 del sur (este)", "Área 2 del sur (oeste)", "Área 1 del sur (sur)"], description: "La imponente y monumental capital del centro de Paldea, sede de la prestigiosa y enorme Academia.", placesOfInterest: ["Academia Naranja/Uva", "Salón de Belleza Reviva", "Tiendas", "Tahona Paldeana", "Botica Chansey"], imageKey: "paldea_mesagoza" },
        { name: "Pueblo Pirotín", nameEn: "Cortondo", type: "gym", connections: ["Área 2 del sur (este)", "Área 1 del oeste (noroeste)"], description: "Un sitio agrícola conocido por sus fragantes campos de olivos y elaborada repostería tradicional.", placesOfInterest: ["Gimnasio Pirotín", "Confitería Pastelarañas", "Pantástico"], imageKey: "paldea_cortondo" },
        { name: "Pueblo Altamía", nameEn: "Artazon", type: "gym", connections: ["Área 3 del sur (este)", "Área 1 del este (norte, sur, este)"], description: "Una soleada urbe creativa rebosante de esculturas de Sunflora y flores multicolores.", placesOfInterest: ["Gimnasio Altamía", "Esculturas de Sunflora", "Laberinto"], imageKey: "paldea_artazon" },
        { name: "Ciudad Leudal", nameEn: "Levincia", type: "gym", connections: ["Área 2 del este (suroeste)", "Área 3 del este (norte)", "Mar Oriental de Paldea (este)"], description: "Una metrópolis costera tecnológica que resplandece gracias a sus abundantes luces de neón comerciales.", placesOfInterest: ["Gimnasio Leudal", "Maison Gourmet", "Mercaplétora", "Paseo Marítimo"], imageKey: "paldea_levincia" },
        { name: "Pueblo Veta", nameEn: "Zapapico", type: "gym", connections: ["Área 3 del este (norte, sur y este)", "Gruta Vestura (oeste)"], description: "Pueblo de mineros trabajadores envueltos en roca y formaciones geológicas escarpadas de tono rojizo.", placesOfInterest: ["Canteras Veta", "Tiendas locales"], imageKey: "paldea_zapapico" },
        { name: "Ciudad Cántara", nameEn: "Cascarrafa", type: "gym", connections: ["Desierto Rostiz (oeste)", "Área 1 del oeste (alrededor)"], description: "Elegante ciudad de tres niveles de elevación conectada por ascensores urbanos y surcada de caídas de agua.", placesOfInterest: ["Gimnasio Cántara", "El Palacio de Fuco", "Puestos del Mercado", "Ascensores de agua"], imageKey: "paldea_cascarrafa" },
        { name: "Pueblo Marinada", nameEn: "Porto Marinada", type: "city", connections: ["Área 2 del oeste (norte, este)", "Desierto Rostiz (sur)", "Mar Occidental (oeste)"], description: "Dinámico pueblo astillero del litoral afamado por sus energéticas e intensas subastas diarias.", placesOfInterest: ["Mercado de Pueblo Marinada", "Puestos de Subasta"], imageKey: "paldea_porto_marinada" },
        { name: "Pueblo Mestura", nameEn: "Medali", type: "gym", connections: ["Gruta Vestura (este)", "Área 3 del oeste (norte, sur, oeste)"], description: "Epicentro gastronómico que atesora las recetas más apetecibles y prestigiosos chefs de la región.", placesOfInterest: ["Gimnasio Mestura", "Mesón El Tesoro", "Anfiteatro urbano"], imageKey: "paldea_medali" },
        { name: "Pueblo Hozkailu", nameEn: "Montenevera", type: "gym", connections: ["Sierra Napada (alrededor)"], description: "Asentamiento recóndito escondido entre las heladas montañas y rodeado de coníferas cubiertas de nieve.", placesOfInterest: ["Gimnasio Hozkailu", "Escenario Espectral"], imageKey: "paldea_montenevera" },
        { name: "Pueblo Alforno", nameEn: "Alfornada", type: "gym", connections: ["Sima de Alforno (suroeste)", "Área 6 del sur (alrededor)"], description: "Sitio artesano conocido por la deslumbrante porcelana cerámica con colores brillantes expuesta en todos lados.", placesOfInterest: ["Gimnasio Alforno", "Observatorio Astronómico", "Mosaicos decorativos"], imageKey: "paldea_alfornada" },
    ],
};

export type PaldeaZoneArea = {
    name: string;
    imageKey?: string;
};

export type PaldeaZone = {
    name: string;
    description: string;
    areas: PaldeaZoneArea[];
};

export const PALDEA_ZONES: Record<string, PaldeaZone> = {
    sur: {
        name: "Zona Sur",
        description: "El clima templado baña la región inicial. Aquí yacen planicies amables y pueblos tranquilos.",
        areas: [
            { name: "Sendero de Cahíz (Pueblo Cahíz, Gruta Caleta, Faro)", imageKey: "paldea_area_sendero_cahiz" },
            { name: "Área 1 del Sur (Pueblo Ataifor, Santuario Mustiarbor)", imageKey: "paldea_area_1_sur" },
            { name: "Ciudad Meseta (Academia Naranja/Uva)", imageKey: "paldea_area_meseta" },
            { name: "Área 2 del Sur (Gran Olivar, Pueblo Pirotín)", imageKey: "paldea_area_2_sur" },
            { name: "Área 3 del Sur", imageKey: "paldea_area_3_sur" },
            { name: "Área 4 del Sur", imageKey: "paldea_area_4_sur" },
            { name: "Área 5 del Sur (Cala Sosegada)", imageKey: "paldea_area_5_sur" },
            { name: "Área 6 del Sur (Pueblo Alforno, Sima de Alforno)", imageKey: "paldea_area_6_sur" }
        ]
    },
    este: {
        name: "Zona Este",
        description: "Reúne la influencia industrial y de los trabajadores. Ciudades comerciales brillantes y excavaciones.",
        areas: [
            { name: "Área 1 del Este (Pueblo Altamía, Base Schedar)", imageKey: "paldea_area_1_este" },
            { name: "Área 2 del Este (Ciudad Leudal, Faro)", imageKey: "paldea_area_2_este" },
            { name: "Área 3 del Este (Pueblo Veta, Gran Luminaria Nocturna)", imageKey: "paldea_area_3_este" },
            { name: "Bosquejada (Base Tsih)", imageKey: "paldea_area_bosquejada" }
        ]
    },
    oeste: {
        name: "Zona Oeste",
        description: "El terreno se torna hostil gracias a desiertos inmensos y corrientes de viento que labran la roca.",
        areas: [
            { name: "Área 1 del Oeste (Santuario Glaceratio, Base Segin)", imageKey: "paldea_area_1_oeste" },
            { name: "Área 2 del Oeste (Pueblo Marinada, Cueva Columnata)", imageKey: "paldea_area_2_oeste" },
            { name: "Área 3 del Oeste (Pueblo Mestura)", imageKey: "paldea_area_3_oeste" },
            { name: "Desierto Rostiz (Ciudad Cántara)", imageKey: "paldea_area_desierto_rostiz" }
        ]
    },
    norte: {
        name: "Zona Norte",
        description: "Las cumbres alcanzan el cielo cubiertas enteramente bajo cero formidables y vastos lagos escarpados.",
        areas: [
            { name: "Gruta Vestura", imageKey: "paldea_area_gruta_vestura" },
            { name: "Área 1 del Norte", imageKey: "paldea_area_1_norte" },
            { name: "Área 2 del Norte (Cascadas de la Ira, Santuario Devastigneus, Base Caph)", imageKey: "paldea_area_2_norte" },
            { name: "Área 3 del Norte (Base Ruchbah)", imageKey: "paldea_area_3_norte" },
            { name: "Sierra Napada (Gimnasio, Pueblo Hozkailu, Cumbre)", imageKey: "paldea_area_sierra_napada" },
            { name: "Lago Cazola (Cataratas de Cazola, Islas)", imageKey: "paldea_area_lago_cazola" },
            { name: "Alameda Socarrada (Santuario Detriterra)", imageKey: "paldea_area_alameda_socarrada" }
        ]
    },
    centro: {
        name: "Foso de Paldea",
        description: "El inmenso e insondable cráter en el centro exacto de la región que alberga misterios y especies erráticas.",
        areas: [
            { name: "Foso de Paldea (Puerta Cero)", imageKey: "paldea_area_foso" },
            { name: "Área Cero (Laboratorio Cero)", imageKey: "paldea_area_cero" },
            { name: "Caverna Abisal Cero", imageKey: "paldea_area_caverna_abisal" }
        ]
    },
    liga: {
        name: "Liga Pokémon",
        description: "Lugar de reunión para todos aquellos dispuestos a alcanzar el Grado de Campeón.",
        areas: [
            { name: "Edificio de la Liga Pokémon", imageKey: "paldea_area_liga" }
        ]
    }
};


// ── Gym Leaders (por entrega principal) ──────────────────────────
export type PokemonTeamEntry = {
    id: number;        // National Pokédex ID (para sprites de PokeAPI)
    name: string;
    level: number;
};

export type GymLeader = {
    name: string;
    spriteKey?: string;
    badge: string;
    badgeKey?: string;
    type: string;
    typeColor: string;
    city?: string;
    description?: string;
    specialty?: string;
    team?: PokemonTeamEntry[];
    strategy?: string;
};

export type EliteMember = {
    name: string;
    spriteKey?: string;
    type: string;
    typeColor: string;
    role: "elite" | "champion";
    specialty?: string;
    team?: PokemonTeamEntry[];
    description?: string;
    strategy?: string;
};

export const REGION_GYM_LEADERS: Record<string, { game: string; leaders: GymLeader[] }[]> = {
    kanto: [
        {
            game: "R/B/A (Gen I)",
            leaders: [
                {
                    name: "Brock", spriteKey: "brock", badge: "Roca", badgeKey: "kanto_boulder", type: "Roca", typeColor: "#B8A038", city: "Ciudad Plateada",
                    description: "El Entrenador de Pokémon de Roca superfuerte. Conocido por su gran resistencia.", strategy: "Se especializa en tácticas defensivas y ataques físicos contundentes como Atadura y Venganza.",
                    team: [{ id: 74, name: "Geodude", level: 12 }, { id: 95, name: "Onix", level: 14 }]
                },
                {
                    name: "Misty", spriteKey: "misty", badge: "Cascada", badgeKey: "kanto_cascade", type: "Agua", typeColor: "#6890F0", city: "Ciudad Celeste",
                    description: "La sirena temperamental. Experta nadadora e ídolo local.", strategy: "Ataca rápidamente aprovechando la alta Velocidad de Starmie y movimientos evasivos.",
                    team: [{ id: 120, name: "Staryu", level: 18 }, { id: 121, name: "Starmie", level: 21 }]
                },
                {
                    name: "Lt. Surge", spriteKey: "lt-surge", badge: "Trueno", badgeKey: "kanto_thunder", type: "Eléctrico", typeColor: "#F8D030", city: "Ciudad Carmín",
                    description: "El relámpago americano. Veterano de guerra que usaba Pokémon eléctricos para cargar radares.", strategy: "Aprovecha la parálisis y la evasión mediante Doble Equipo y Rayo.",
                    team: [{ id: 100, name: "Voltorb", level: 21 }, { id: 25, name: "Pikachu", level: 18 }, { id: 26, name: "Raichu", level: 24 }]
                },
                {
                    name: "Erika", spriteKey: "erika", badge: "Arcoíris", badgeKey: "kanto_rainbow", type: "Planta", typeColor: "#78C850", city: "Ciudad Azulona",
                    description: "La princesa amante de la naturaleza. Experta en arreglos florales y perfumes.", strategy: "Efectos de estado (Drenadoras, Somnífero) y recuperación de energía con Megaagotar.",
                    team: [{ id: 71, name: "Victreebel", level: 29 }, { id: 114, name: "Tangela", level: 24 }, { id: 45, name: "Vileplume", level: 29 }]
                },
                {
                    name: "Koga", spriteKey: "koga", badge: "Alma", badgeKey: "kanto_soul", type: "Veneno", typeColor: "#A040A0", city: "Ciudad Fucsia",
                    description: "El maestro ninja venenoso. Sus técnicas se basan en el engaño y el letargo.", strategy: "Usa Tóxico para desgastar al rival progresivamente y luego ataca con furia o auto-destrucción.",
                    team: [{ id: 109, name: "Koffing", level: 37 }, { id: 89, name: "Muk", level: 39 }, { id: 109, name: "Koffing", level: 37 }, { id: 110, name: "Weezing", level: 43 }]
                },
                {
                    name: "Sabrina", spriteKey: "sabrina", badge: "Marcha", badgeKey: "kanto_marsh", type: "Psíquico", typeColor: "#F85888", city: "Ciudad Azafrán",
                    description: "La maestra de los poderes psíquicos. Tiene visiones del futuro y gran influencia mental.", strategy: "Aprovecha el poder puro de Recuperación, Reflejo y el imparable ataque Psíquico de Gen I.",
                    team: [{ id: 64, name: "Kadabra", level: 38 }, { id: 122, name: "Mr. Mime", level: 37 }, { id: 49, name: "Venomoth", level: 38 }, { id: 65, name: "Alakazam", level: 43 }]
                },
                {
                    name: "Blaine", spriteKey: "blaine", badge: "Volcán", badgeKey: "kanto_volcano", type: "Fuego", typeColor: "#F08030", city: "Isla Canela",
                    description: "El genio del fuego. Reside junto al volcán y es amante de los acertijos matemáticos.", strategy: "Confía en movimientos destructivos y de quemadura como Llamarada combinada con pociones.",
                    team: [{ id: 58, name: "Growlithe", level: 42 }, { id: 77, name: "Ponyta", level: 40 }, { id: 78, name: "Rapidash", level: 42 }, { id: 59, name: "Arcanine", level: 47 }]
                },
                {
                    name: "Giovanni", spriteKey: "giovanni", badge: "Tierra", badgeKey: "kanto_earth", type: "Tierra", typeColor: "#E0C068", city: "Ciudad Verde",
                    description: "Líder en las sombras y jefe del Team Rocket. Frío, calculador y experto en negocios turbios.", strategy: "Uso de ataques Físicos contundentes de tipo Tierra y Normal (Perforador, Fisura) para instakill.",
                    team: [{ id: 111, name: "Rhyhorn", level: 45 }, { id: 51, name: "Dugtrio", level: 42 }, { id: 31, name: "Nidoqueen", level: 44 }, { id: 34, name: "Nidoking", level: 45 }, { id: 112, name: "Rhydon", level: 50 }]
                },
            ],
        },
        {
            game: "FR/HV (Gen III)",
            leaders: [
                {
                    name: "Brock", spriteKey: "brock", badge: "Roca", badgeKey: "kanto_boulder", type: "Roca", typeColor: "#B8A038", city: "Ciudad Plateada",
                    description: "El Entrenador de Pokémon de Roca superfuerte. Conocido por su gran resistencia.", strategy: "Su táctica principal es Tumba Rocas para ralentizar a sus adversarios.",
                    team: [{ id: 74, name: "Geodude", level: 12 }, { id: 95, name: "Onix", level: 14 }]
                },
                {
                    name: "Misty", spriteKey: "misty", badge: "Cascada", badgeKey: "kanto_cascade", type: "Agua", typeColor: "#6890F0", city: "Ciudad Celeste",
                    description: "La sirena temperamental. Experta nadadora e ídolo local.", strategy: "Hidropulso puede confundir mientras causa gran daño gracias al STAB.",
                    team: [{ id: 120, name: "Staryu", level: 18 }, { id: 121, name: "Starmie", level: 21 }]
                },
                {
                    name: "Lt. Surge", spriteKey: "lt-surge", badge: "Trueno", badgeKey: "kanto_thunder", type: "Eléctrico", typeColor: "#F8D030", city: "Ciudad Carmín",
                    description: "El relámpago americano. Veterano de guerra experto en trampas.", strategy: "Usa Onda Choque, un movimiento eléctrico que jamás falla su objetivo.",
                    team: [{ id: 100, name: "Voltorb", level: 21 }, { id: 25, name: "Pikachu", level: 18 }, { id: 26, name: "Raichu", level: 24 }]
                },
                {
                    name: "Erika", spriteKey: "erika", badge: "Arcoíris", badgeKey: "kanto_rainbow", type: "Planta", typeColor: "#78C850", city: "Ciudad Azulona",
                    description: "La princesa amante de la naturaleza. Experta en arreglos florales.", strategy: "Restauración incesante gracias a Gigadrenado y estado con Paralizador.",
                    team: [{ id: 71, name: "Victreebel", level: 29 }, { id: 114, name: "Tangela", level: 24 }, { id: 45, name: "Vileplume", level: 29 }]
                },
                {
                    name: "Koga", spriteKey: "koga", badge: "Alma", badgeKey: "kanto_soul", type: "Veneno", typeColor: "#A040A0", city: "Ciudad Fucsia",
                    description: "Maestro ninja letal. Promueve tácticas de desgaste progresivo.", strategy: "Tóxico constante combinado con Protección y evasión masiva.",
                    team: [{ id: 109, name: "Koffing", level: 37 }, { id: 89, name: "Muk", level: 39 }, { id: 109, name: "Koffing", level: 37 }, { id: 110, name: "Weezing", level: 43 }]
                },
                {
                    name: "Sabrina", spriteKey: "sabrina", badge: "Marcha", badgeKey: "kanto_marsh", type: "Psíquico", typeColor: "#F85888", city: "Ciudad Azafrán",
                    description: "Maestra psíquica temida por su falta de expresión emocional visible.", strategy: "Paz Mental para boostear sus defensas y ataques rápidos demoledores.",
                    team: [{ id: 64, name: "Kadabra", level: 38 }, { id: 122, name: "Mr. Mime", level: 37 }, { id: 49, name: "Venomoth", level: 38 }, { id: 65, name: "Alakazam", level: 43 }]
                },
                {
                    name: "Blaine", spriteKey: "blaine", badge: "Volcán", badgeKey: "kanto_volcano", type: "Fuego", typeColor: "#F08030", city: "Isla Canela",
                    description: "El genio del fuego. Perdió su gimnasio pero no su intelecto hirviente.", strategy: "Llamarada destructiva luego de resistir impactos.",
                    team: [{ id: 58, name: "Growlithe", level: 42 }, { id: 77, name: "Ponyta", level: 40 }, { id: 78, name: "Rapidash", level: 42 }, { id: 59, name: "Arcanine", level: 47 }]
                },
                {
                    name: "Giovanni", spriteKey: "giovanni", badge: "Tierra", badgeKey: "kanto_earth", type: "Tierra", typeColor: "#E0C068", city: "Ciudad Verde",
                    description: "El ex líder del Team Rocket se despide de su carrera malvada tras este combate.", strategy: "Usa Terremoto, el movimiento Físico más amenazante de TIPO Tierra.",
                    team: [{ id: 111, name: "Rhyhorn", level: 45 }, { id: 51, name: "Dugtrio", level: 42 }, { id: 31, name: "Nidoqueen", level: 44 }, { id: 34, name: "Nidoking", level: 45 }, { id: 112, name: "Rhydon", level: 50 }]
                },
            ],
        },
    ],
    johto: [
        {
            game: "O/P/C (Gen II) · HG/SS (Gen IV)",
            leaders: [
                {
                    name: "Falkner", spriteKey: "falkner", badge: "Pluma", badgeKey: "johto_zephyr", type: "Volador", typeColor: "#A890F0", city: "Ciudad Violeta",
                    description: "El joven que vuela con elegancia. Heredó el gimnasio de su padre y utiliza aves majestuosas.", strategy: "Usa movimientos que bajan la precisión como Ataque Arena para frustrar al oponente antes de atacar.",
                    team: [{ id: 16, name: "Pidgey", level: 9 }, { id: 17, name: "Pidgeotto", level: 13 }]
                },
                {
                    name: "Bugsy", spriteKey: "bugsy", badge: "Colmena", badgeKey: "johto_hive", type: "Bicho", typeColor: "#A8B820", city: "Pueblo Azalea",
                    description: "La enciclopedia andante de los bichos. Su conocimiento sobre entomología pokémon no tiene igual.", strategy: "Su Scyther usa Ida y Vuelta para infligir daño crítico y retirarse estratégicamente.",
                    team: [{ id: 11, name: "Metapod", level: 14 }, { id: 14, name: "Kakuna", level: 14 }, { id: 123, name: "Scyther", level: 17 }]
                },
                {
                    name: "Whitney", spriteKey: "whitney", badge: "Liso", badgeKey: "johto_plain", type: "Normal", typeColor: "#A8A878", city: "Ciudad Trigal",
                    description: "La chica increíblemente popular. Su simpatía es tan grande como su tenacidad en combate.", strategy: "Prepárate para Desenrollar de Miltank; si no lo detienes rápido, su daño aumentará exponencialmente.",
                    team: [{ id: 35, name: "Clefairy", level: 17 }, { id: 241, name: "Miltank", level: 19 }]
                },
                {
                    name: "Morty", spriteKey: "morty", badge: "Niebla", badgeKey: "johto_fog", type: "Fantasma", typeColor: "#705898", city: "Ciudad Iris",
                    description: "El místico que ve el futuro. Busca a los Pokémon legendarios que sobrevolaron su ciudad.", strategy: "Combina Hipnosis y Tinieblas con movimientos que impiden al rival huir del combate.",
                    team: [{ id: 92, name: "Gastly", level: 21 }, { id: 93, name: "Haunter", level: 21 }, { id: 93, name: "Haunter", level: 23 }, { id: 94, name: "Gengar", level: 25 }]
                },
                {
                    name: "Chuck", spriteKey: "chuck", badge: "Tormenta", badgeKey: "johto_storm", type: "Lucha", typeColor: "#C03028", city: "Ciudad Orquídea",
                    description: "Sus rugidos sacuden las montañas. Entrena su cuerpo junto a sus Pokémon bajo cascadas heladas.", strategy: "Confía en movimientos de alta potencia como Puño Dinámico, aunque su precisión sea baja.",
                    team: [{ id: 57, name: "Primeape", level: 29 }, { id: 62, name: "Poliwrath", level: 31 }]
                },
                {
                    name: "Jasmine", spriteKey: "jasmine", badge: "Mineral", badgeKey: "johto_mineral", type: "Acero", typeColor: "#B8B8D0", city: "Ciudad Olivo",
                    description: "La chica de la defensa de hierro. Es tímida pero posee un espíritu de batalla inquebrantable.", strategy: "Su Steelix tiene una defensa física masiva; usa ataques especiales o de tipo fuego/agua para vencerlo.",
                    team: [{ id: 81, name: "Magnemite", level: 30 }, { id: 81, name: "Magnemite", level: 30 }, { id: 208, name: "Steelix", level: 35 }]
                },
                {
                    name: "Pryce", spriteKey: "pryce", badge: "Glaciar", badgeKey: "johto_glacier", type: "Hielo", typeColor: "#98D8D8", city: "Pueblo Caoba",
                    description: "El maestro del invierno eterno. Con décadas de experiencia, su sabiduría es tan fría como el hielo.", strategy: "Usa granizo para dañar gradualmente y ataques que pueden congelar al oponente al instante.",
                    team: [{ id: 86, name: "Seel", level: 30 }, { id: 87, name: "Dewgong", level: 32 }, { id: 221, name: "Piloswine", level: 34 }]
                },
                {
                    name: "Clair", spriteKey: "clair", badge: "Ascenso", badgeKey: "johto_rising", type: "Dragón", typeColor: "#7038F8", city: "Ciudad Endrino",
                    description: "La bendecida por el clan de los dragones. Su orgullo solo es superado por su destreza táctica.", strategy: "Maneja la increíble combinación de Kingdra; solo el tipo Dragón (o Hada) puede golpearlo fuerte.",
                    team: [{ id: 148, name: "Dragonair", level: 38 }, { id: 148, name: "Dragonair", level: 38 }, { id: 142, name: "Aerodactyl", level: 38 }, { id: 230, name: "Kingdra", level: 41 }]
                },
            ],
        },
    ],
    hoenn: [
        {
            game: "R/Z/E (Gen III) · Ω/α (Gen VI)",
            leaders: [
                {
                    name: "Roxanne", spriteKey: "roxanne", badge: "Piedra", badgeKey: "hoenn_stone", type: "Roca", typeColor: "#B8A038", city: "Ciudad Férrica",
                    description: "La joven prodigio de la escuela de entrenadores. Es una académica experta en geología.", strategy: "Usa Tumba Rocas para reducir tu velocidad. Un tipo agua o planta es esencial aquí.",
                    team: [{ id: 74, name: "Geodude", level: 12 }, { id: 299, name: "Nosepass", level: 15 }]
                },
                {
                    name: "Brawly", spriteKey: "brawly", badge: "Nudillo", badgeKey: "hoenn_knuckle", type: "Lucha", typeColor: "#C03028", city: "Pueblo Azuliza",
                    description: "Un surfista que ha entrenado sus Pokémon en las bravas olas y cuevas de su isla.", strategy: "Su Makuhita aguanta muchos golpes. Usa ataques especiales o de tipo volador/psíquico.",
                    team: [{ id: 66, name: "Machop", level: 17 }, { id: 296, name: "Makuhita", level: 18 }]
                },
                {
                    name: "Wattson", spriteKey: "wattson", badge: "Voltio", badgeKey: "hoenn_dynamo", type: "Eléctrico", typeColor: "#F8D030", city: "Ciudad Malvalona",
                    description: "El alegre fundador de Malvalona. Siempre tiene una broma lista y una descarga eléctrica.", strategy: "Onda Voltio nunca falla. Los tipos Tierra son inmunes y tu mejor opción defensiva.",
                    team: [{ id: 100, name: "Voltorb", level: 20 }, { id: 81, name: "Magnemite", level: 20 }, { id: 82, name: "Magneton", level: 22 }, { id: 310, name: "Manectric", level: 24 }]
                },
                {
                    name: "Flannery", spriteKey: "flannery", badge: "Calor", badgeKey: "hoenn_heat", type: "Fuego", typeColor: "#F08030", city: "Pueblo Lavacalda",
                    description: "Acaba de ser nombrada líder y está decidida a demostrar su valía con una pasión ardiente.", strategy: "Sofoco es devastador. Intenta vencer a su Torkoal rápido antes de que use Gran Sol.",
                    team: [{ id: 218, name: "Slugma", level: 24 }, { id: 218, name: "Slugma", level: 24 }, { id: 322, name: "Numel", level: 26 }, { id: 324, name: "Torkoal", level: 29 }]
                },
                {
                    name: "Norman", spriteKey: "norman", badge: "Balance", badgeKey: "hoenn_balance", type: "Normal", typeColor: "#A8A878", city: "Ciudad Petalia",
                    description: "Tu propio padre. Un entrenador disciplinado que busca el equilibrio perfecto en el combate.", strategy: "Slaking tiene stats de legendario pero descansa cada dos turnos. ¡Aprovecha esa brecha!",
                    team: [{ id: 327, name: "Spinda", level: 27 }, { id: 264, name: "Linoone", level: 29 }, { id: 288, name: "Vigoroth", level: 27 }, { id: 289, name: "Slaking", level: 31 }]
                },
                {
                    name: "Winona", spriteKey: "winona", badge: "Pluma", badgeKey: "hoenn_feather", type: "Volador", typeColor: "#A890F0", city: "Ciudad Arborada",
                    description: "Se siente en comunión con el cielo. Vive en las alturas y vuela junto a sus Pokémon.", strategy: "Su Altaria usa Danza Dragón para aumentar su ataque y velocidad. No dejes que se cargue.",
                    team: [{ id: 277, name: "Swellow", level: 31 }, { id: 279, name: "Pelipper", level: 30 }, { id: 227, name: "Skarmory", level: 32 }, { id: 334, name: "Altaria", level: 33 }]
                },
                {
                    name: "Tate & Liza", spriteKey: "tate-liza", badge: "Cosmos", badgeKey: "hoenn_mind", type: "Psíquico", typeColor: "#F85888", city: "Ciudad Algaria",
                    description: "Gemelos que comparten un vínculo telepático, permitiéndoles una coordinación perfecta en combates dobles.", strategy: "Es un Combate Doble. Enfócate en uno primero para romper su estrategia combinada de Sol y Luna.",
                    team: [{ id: 337, name: "Lunatone", level: 41 }, { id: 338, name: "Solrock", level: 41 }]
                },
                {
                    name: "Juan", spriteKey: "juan", badge: "Lluvia", badgeKey: "hoenn_rising", type: "Agua", typeColor: "#6890F0", city: "Ciudad Arrecípolis",
                    description: "El mentor de Plubio. Un artista de los combates acuáticos que valora la elegancia sobre todo.", strategy: "Kingdra usa Doble Equipo y Descanso. Necesitas un ataque que no falle o acabará contigo por desgaste.",
                    team: [{ id: 370, name: "Luvdisc", level: 41 }, { id: 340, name: "Whiscash", level: 41 }, { id: 364, name: "Sealeo", level: 43 }, { id: 342, name: "Crawdaunt", level: 43 }, { id: 230, name: "Kingdra", level: 46 }]
                },
            ],
        },
    ],
    sinnoh: [
        {
            game: "D/P/Pt (Gen IV) · BD/PR (Gen VIII)",
            leaders: [
                {
                    name: "Roark", spriteKey: "roark", badge: "Carbón", badgeKey: "sinnoh_coal", type: "Roca", typeColor: "#B8A038", city: "Ciudad Pirita",
                    description: "Hijo de Acerón. Es un joven apasionado por la minería y los fósiles que lidera con energía.", strategy: "Su Cranidos ataca con una fuerza física demoledora. ¡Ten cuidado con su Movimiento Sísmico!",
                    team: [{ id: 74, name: "Geodude", level: 12 }, { id: 95, name: "Onix", level: 12 }, { id: 408, name: "Cranidos", level: 14 }]
                },
                {
                    name: "Gardenia", spriteKey: "gardenia", badge: "Foresta", badgeKey: "sinnoh_forest", type: "Planta", typeColor: "#78C850", city: "Ciudad Eterna",
                    description: "Una entrenadora que ama los bosques tanto que teme a los fantasmas que habitan en ellos.", strategy: "Roserade es rápida y peligrosa. Usa ataques de fuego o volador para neutralizarla antes de que use Hierba Lazo.",
                    team: [{ id: 387, name: "Turtwig", level: 19 }, { id: 420, name: "Cherubi", level: 19 }, { id: 407, name: "Roserade", level: 22 }]
                },
                {
                    name: "Maylene", spriteKey: "maylene", badge: "Combate", badgeKey: "sinnoh_cobble", type: "Lucha", typeColor: "#C03028", city: "Ciudad Rocavelo",
                    description: "Entrena descalza en la nieve. Su disciplina física y mental la convierte en una rival formidable a pesar de su juventud.", strategy: "Lucario combina ataques físicos y especiales. Puño Incremento puede hacer que se vuelva imparable si el combate se alarga.",
                    team: [{ id: 307, name: "Meditite", level: 27 }, { id: 448, name: "Lucario", level: 30 }, { id: 67, name: "Machoke", level: 27 }]
                },
                {
                    name: "Crasher Wake", spriteKey: "crasher-wake", badge: "Charca", badgeKey: "sinnoh_fen", type: "Agua", typeColor: "#6890F0", city: "Ciudad Pradera",
                    description: "Un luchador enmascarado que combate tanto en el ring como en el gimnasio con una energía desbordante.", strategy: "Su Floatzel es increíblemente rápido. Un tipo planta o eléctrico con buena defensa es tu mejor baza.",
                    team: [{ id: 130, name: "Gyarados", level: 27 }, { id: 195, name: "Quagsire", level: 27 }, { id: 419, name: "Floatzel", level: 30 }]
                },
                {
                    name: "Fantina", spriteKey: "fantina", badge: "Relicario", badgeKey: "sinnoh_relic", type: "Fantasma", typeColor: "#705898", city: "Ciudad Corazón",
                    description: "Una coordinadora de fama mundial que mezcla el arte del baile con la mística de los fantasmas.", strategy: "Mismagius usa Rayo Confuso y Bola Sombra. ¡No dejes que confunda a todo tu equipo!",
                    team: [{ id: 426, name: "Drifblim", level: 32 }, { id: 429, name: "Mismagius", level: 36 }, { id: 93, name: "Haunter", level: 34 }]
                },
                {
                    name: "Byron", spriteKey: "byron", badge: "Mina", badgeKey: "sinnoh_mine", type: "Acero", typeColor: "#B8B8D0", city: "Ciudad Canal",
                    description: "Padre de Rocío. Es un hombre de acero con una fe inquebrantable en la dureza de sus Pokémon.", strategy: "Bastiodon tiene una defensa colosal. Usa Terremoto o movimientos de tipo lucha/agua para perforar su armadura.",
                    team: [{ id: 82, name: "Magneton", level: 37 }, { id: 208, name: "Steelix", level: 38 }, { id: 411, name: "Bastiodon", level: 41 }]
                },
                {
                    name: "Candice", spriteKey: "candice", badge: "Témpano", badgeKey: "sinnoh_icicle", type: "Hielo", typeColor: "#98D8D8", city: "Ciudad Puntaneva",
                    description: "Una joven con una voluntad de hierro y un corazón cálido a pesar de vivir en el frío extremo del norte.", strategy: "Su Abomasnow planta Granizo, lo que permite que Ventisca nunca falle. Quita el clima lo antes posible.",
                    team: [{ id: 215, name: "Sneasel", level: 40 }, { id: 460, name: "Abomasnow", level: 42 }, { id: 308, name: "Medicham", level: 40 }, { id: 429, name: "Froslass", level: 44 }]
                },
                {
                    name: "Volkner", spriteKey: "volkner", badge: "Baliza", badgeKey: "sinnoh_beacon", type: "Eléctrico", typeColor: "#F8D030", city: "Ciudad Marina",
                    description: "El mejor líder de Sinnoh, aunque ha perdido el interés por los combates hasta que llegues tú.", strategy: "Su Luxray usa Colmillo Rayo y es muy equilibrado. No subestimes su cobertura de tipos.",
                    team: [{ id: 197, name: "Jolteon", level: 46 }, { id: 405, name: "Luxray", level: 49 }, { id: 26, name: "Raichu", level: 46 }, { id: 466, name: "Electivire", level: 48 }]
                },
            ],
        },
    ],
    unova: [
        {
            game: "Negro/Blanco (Gen V)",
            leaders: [
                {
                    name: "Cilan/Chili/Cress", spriteKey: "cilan", badge: "Trifuerza", badgeKey: "unova_trio", type: "Planta/Fuego/Agua", typeColor: "#78C850", city: "Ciudad Gres",
                    description: "Tres hermanos camareros. El que combatas dependerá del Pokémon inicial que hayas elegido.", strategy: "Usarán el tipo que tenga ventaja sobre el tuyo. ¡Busca un Pokémon que cubra esa debilidad!",
                    team: [{ id: 511, name: "Pansage", level: 14 }, { id: 506, name: "Lillipup", level: 12 }]
                },
                {
                    name: "Lenora", spriteKey: "lenora", badge: "Básica", badgeKey: "unova_basic", type: "Normal", typeColor: "#A8A878", city: "Ciudad Esmalte",
                    description: "Directora del museo y experta en arqueología. Sus ataques son tan sólidos como los fósiles que estudia.", strategy: "Su Watchog usa Represalia. Si vences a su primer Pokémon, el siguiente golpe será letal.",
                    team: [{ id: 507, name: "Herdier", level: 18 }, { id: 505, name: "Watchog", level: 20 }]
                },
                {
                    name: "Burgh", spriteKey: "burgh", badge: "Insecto", badgeKey: "unova_insect", type: "Bicho", typeColor: "#A8B820", city: "Ciudad Porcelana",
                    description: "Un artista y escultor que ve la belleza en los intrincados diseños de los Pokémon bicho.", strategy: "Leavanny es muy rápido. Los ataques de Fuego o Volador son tu mejor opción para quemar su estrategia.",
                    team: [{ id: 557, name: "Dwebble", level: 21 }, { id: 544, name: "Whirlipede", level: 21 }, { id: 542, name: "Leavanny", level: 23 }]
                },
                {
                    name: "Elesa", spriteKey: "elesa", badge: "Voltio", badgeKey: "unova_bolt", type: "Eléctrico", typeColor: "#F8D030", city: "Ciudad Mayólica",
                    description: "Modelo de pasarela y maestra de la electricidad. Su estilo es tan brillante como sus ataques.", strategy: "Sus Emolga usan Voltiocambio constantemente. Necesitas ataques de tipo Roca o Hielo para bajarlos.",
                    team: [{ id: 587, name: "Emolga", level: 25 }, { id: 587, name: "Emolga", level: 25 }, { id: 523, name: "Zebstrika", level: 27 }]
                },
                {
                    name: "Clay", spriteKey: "clay", badge: "Quake", badgeKey: "unova_quake", type: "Tierra", typeColor: "#E0C068", city: "Ciudad Fayenza",
                    description: "Un empresario minero hecho a sí mismo con un carácter tan duro como la roca subterránea.", strategy: "Excadrill es una potencia física. Evita los ataques eléctricos y usa Agua, Planta o Lucha.",
                    team: [{ id: 552, name: "Krokorok", level: 29 }, { id: 536, name: "Palpitoad", level: 29 }, { id: 530, name: "Excadrill", level: 31 }]
                },
                {
                    name: "Skyla", spriteKey: "skyla", badge: "Jet", badgeKey: "unova_jet", type: "Volador", typeColor: "#A890F0", city: "Ciudad Loza",
                    description: "Una piloto entusiasta que vuela libre por los cielos de Teselia con sus amigos alados.", strategy: "Su Swanna combina Agua y Volador. El tipo Eléctrico le hace un daño masivo (x4).",
                    team: [{ id: 528, name: "Swoobat", level: 33 }, { id: 549, name: "Unfezant", level: 33 }, { id: 581, name: "Swanna", level: 35 }]
                },
                {
                    name: "Brycen", spriteKey: "brycen", badge: "Glacial", badgeKey: "unova_freeze", type: "Hielo", typeColor: "#98D8D8", city: "Ciudad Teja",
                    description: "Un antiguo actor de cine que encontró en el frío de la montaña la paz y la fuerza para combatir.", strategy: "Usa ataques de tipo Fuego, Lucha o Acero. Su Beartic golpea muy fuerte físicamente.",
                    team: [{ id: 583, name: "Vanillish", level: 37 }, { id: 614, name: "Beartic", level: 39 }, { id: 615, name: "Cryogonal", level: 37 }]
                },
                {
                    name: "Drayden", spriteKey: "drayden", badge: "Leyenda", badgeKey: "unova_legend", type: "Dragón", typeColor: "#7038F8", city: "Ciudad Caolín",
                    description: "El alcalde de Ciudad Caolín y un veterano respetado que ha entrenado dragones por generaciones.", strategy: "Haxorus tiene un Ataque altísimo. Derrótalo antes de que use Danza Dragón.",
                    team: [{ id: 611, name: "Fraxure", level: 41 }, { id: 621, name: "Druddigon", level: 41 }, { id: 612, name: "Haxorus", level: 43 }]
                },
            ],
        },
    ],
    kalos: [
        {
            game: "X/Y (Gen VI)",
            leaders: [
                {
                    name: "Viola", spriteKey: "viola", badge: "Insecto", badgeKey: "kalos_bug", type: "Bicho", typeColor: "#A8B820", city: "Ciudad Novarte",
                    description: "Fotógrafa profesional de Pokémon. Siempre está buscando la toma perfecta, incluso en mitad del combate.", strategy: "Su Vivillon usa Acoso para atrapar y dañar por turnos. Un tipo fuego o roca la neutralizará rápido.",
                    team: [{ id: 283, name: "Surskit", level: 10 }, { id: 666, name: "Vivillon", level: 12 }]
                },
                {
                    name: "Grant", spriteKey: "grant", badge: "Acantilado", badgeKey: "kalos_cliff", type: "Roca", typeColor: "#B8A038", city: "Ciudad Relieve",
                    description: "Un deportista extremo que escala paredes de roca tanto por deporte como por entrenamiento.", strategy: "Tyrunt tiene Mandíbula Fuerte. Usa Pokémon de tipo Lucha o Agua para resistir sus ataques contundentes.",
                    team: [{ id: 696, name: "Tyrunt", level: 25 }, { id: 698, name: "Amaura", level: 25 }]
                },
                {
                    name: "Korrina", spriteKey: "korrina", badge: "Garra", badgeKey: "kalos_rumble", type: "Lucha", typeColor: "#C03028", city: "Ciudad Yantara",
                    description: "Heredera de los secretos de la Megaevolución. Es enérgica y siempre va en patines.", strategy: "Lucario es su estrella. Aunque aquí no megaevoluciona aún, es muy rápido y golpea fuerte.",
                    team: [{ id: 701, name: "Hawlucha", level: 28 }, { id: 66, name: "Machoke", level: 28 }, { id: 448, name: "Lucario", level: 32 }]
                },
                {
                    name: "Ramos", spriteKey: "ramos", badge: "Trébol", badgeKey: "kalos_plant", type: "Planta", typeColor: "#78C850", city: "Ciudad Fukus",
                    description: "Un jardinero veterano que cuida de sus plantas con la misma paciencia con la que entrena a sus Pokémon.", strategy: "Gogoat es muy resistente. Usa ataques de tipo Fuego o Volador para recortar su vida antes de que use Síntesis.",
                    team: [{ id: 187, name: "Jumpluff", level: 30 }, { id: 70, name: "Weepinbell", level: 30 }, { id: 673, name: "Gogoat", level: 34 }]
                },
                {
                    name: "Clemont", spriteKey: "clemont", badge: "Voltio", badgeKey: "kalos_voltage", type: "Eléctrico", typeColor: "#F8D030", city: "Ciudad Luminalia",
                    description: "Un joven inventor genial que cree que la ciencia puede mejorar el vínculo entre humanos y Pokémon.", strategy: "Heliolisk es muy rápido. Los ataques de tipo Tierra lo neutralizan por completo, ¡no olvides llevar uno!",
                    team: [{ id: 587, name: "Emolga", level: 35 }, { id: 82, name: "Magneton", level: 35 }, { id: 695, name: "Heliolisk", level: 37 }]
                },
                {
                    name: "Valerie", spriteKey: "valerie", badge: "Hada", badgeKey: "kalos_fairy", type: "Hada", typeColor: "#EE99AC", city: "Ciudad Romantis",
                    description: "Diseñadora de moda que sueña con convertirse en un Pokémon. Su estilo es etéreo y misterioso.", strategy: "El tipo Hada es resistente. Usa Pokémon de tipo Acero o Veneno para golpear sus debilidades.",
                    team: [{ id: 303, name: "Mawile", level: 38 }, { id: 122, name: "Mr. Mime", level: 39 }, { id: 700, name: "Sylveon", level: 42 }]
                },
                {
                    name: "Olympia", spriteKey: "olympia", badge: "Psique", badgeKey: "kalos_psychic", type: "Psíquico", typeColor: "#F85888", city: "Ciudad Fluxus",
                    description: "Una mujer majestuosa que tiene visiones del futuro y se comunica con las estrellas.", strategy: "Usa ataques de tipo Siniestro o Bicho. Meowstic usa Pantalla Luz y Reflejo para proteger al equipo.",
                    team: [{ id: 606, name: "Sigilyph", level: 44 }, { id: 199, name: "Slowking", level: 44 }, { id: 437, name: "Meowstic", level: 48 }]
                },
                {
                    name: "Wulfric", spriteKey: "wulfric", badge: "Avalancha", badgeKey: "kalos_iceberg", type: "Hielo", typeColor: "#98D8D8", city: "Ciudad Fractal",
                    description: "Tan sólido como un témpano pero amable como el deshielo primaveral. Es el pilar de su comunidad.", strategy: "Avalugg tiene una defensa física astronómica. Atácalo por el lado Especial con Fuego o Acero.",
                    team: [{ id: 459, name: "Abomasnow", level: 56 }, { id: 615, name: "Cryogonal", level: 55 }, { id: 713, name: "Avalugg", level: 59 }]
                },
            ],
        },
    ],
    alola: [
        {
            game: "Sol/Luna · Sol Ultra/Luna Ultra (Gen VII)",
            leaders: [
                {
                    name: "Hala", spriteKey: "hala", badge: "Aro Z Lucha", badgeKey: "alola_fight", type: "Lucha", typeColor: "#C03028", city: "Isla Melemele",
                    description: "El Kahuna de Melemele. Es un hombre de gran corazón y fuerza física que supervisa el rito de iniciación.", strategy: "Su Crabominable golpea muy fuerte. Usa ataques de tipo Psíquico o Volador para superar su defensa física.",
                    team: [{ id: 66, name: "Machop", level: 14 }, { id: 296, name: "Makuhita", level: 14 }, { id: 739, name: "Crabrawler", level: 15 }]
                },
                {
                    name: "Olivia", spriteKey: "olivia", badge: "Aro Z Roca", badgeKey: "alola_rock", type: "Roca", typeColor: "#B8A038", city: "Isla Akala",
                    description: "La Kahuna de Akala. Es una mujer apasionada y fuerte que valora la conexión emocional con sus Pokémon.", strategy: "Lycanroc es muy veloz y tiene un ataque alto. Usa ataques de tipo Agua o Planta para derrotarlo antes de que use su Movimiento Z.",
                    team: [{ id: 347, name: "Anorith", level: 26 }, { id: 345, name: "Lileep", level: 26 }, { id: 745, name: "Lycanroc", level: 27 }]
                },
                {
                    name: "Nanu", spriteKey: "nanu", badge: "Aro Z Siniestro", badgeKey: "alola_dark", type: "Siniestro", typeColor: "#705848", city: "Isla Ula'ula",
                    description: "Un oficial de policía cansado de la vida que esconde un inmenso poder como Kahuna de Ula'ula.", strategy: "Usa ataques de tipo Hada o Lucha. Su Persian de Alola es muy astuto y usará Maquinación para aumentar su ataque especial.",
                    team: [{ id: 552, name: "Krokorok", level: 43 }, { id: 302, name: "Sableye", level: 43 }, { id: 53, name: "Persian-Alola", level: 44 }]
                },
                {
                    name: "Hapu", spriteKey: "hapu", badge: "Aro Z Tierra", badgeKey: "alola_ground", type: "Tierra", typeColor: "#E0C068", city: "Isla Poni",
                    description: "Una joven con una fuerte voluntad que acaba de ser nombrada Kahuna de Poni tras la muerte de su abuelo.", strategy: "Mudsdale tiene la habilidad Firmeza, que aumenta su defensa cada vez que recibe un golpe físico. Usa ataques especiales de tipo Agua o Planta.",
                    team: [{ id: 423, name: "Gastrodon", level: 47 }, { id: 444, name: "Gabite", level: 47 }, { id: 530, name: "Excadrill", level: 47 }, { id: 750, name: "Mudsdale", level: 48 }]
                },
            ],
        },
    ],
    galar: [
        {
            game: "Espada/Escudo (Gen VIII)",
            leaders: [
                {
                    name: "Milo", spriteKey: "milo", badge: "Hierba", badgeKey: "galar_grass", type: "Planta", typeColor: "#78C850", city: "Pueblo Turffield",
                    description: "Un granjero bonachón con una fuerza física impresionante que valora el esfuerzo y la constancia.", strategy: "Su Eldegoss usa Dinamax. Usa ataques de tipo Fuego o Volador para marchitar su defensa antes de que cure a su equipo.",
                    team: [{ id: 829, name: "Gossifleur", level: 19 }, { id: 830, name: "Eldegoss", level: 20 }]
                },
                {
                    name: "Nessa", spriteKey: "nessa", badge: "Marina", badgeKey: "galar_water", type: "Agua", typeColor: "#6890F0", city: "Pueblo Hulbury",
                    description: "Modelo profesional y maestra del tipo agua. Su estilo de combate es tan fluido como las olas del mar.", strategy: "Drednaw es su as y usará Gigamax. El tipo Planta con daño x4 es tu mejor opción absoluta.",
                    team: [{ id: 833, name: "Chewtle", level: 23 }, { id: 119, name: "Seaking", level: 23 }, { id: 834, name: "Drednaw", level: 24 }]
                },
                {
                    name: "Kabu", spriteKey: "kabu", badge: "Llama", badgeKey: "galar_fire", type: "Fuego", typeColor: "#F08030", city: "Ciudad Motostoke",
                    description: "Un veterano que nunca se rinde. Su pasión por el combate es una llama que nunca se apaga.", strategy: "Centiskorch usa Gigamax y puede atrapar a tus Pokémon con fuego. Usa Roca o Agua para apagar su ofensiva rápidamente.",
                    team: [{ id: 324, name: "Torkoal", level: 25 }, { id: 554, name: "Darumaka", level: 24 }, { id: 851, name: "Centiskorch", level: 27 }]
                },
                {
                    name: "Bea/Allister", spriteKey: "bea", badge: "Choque", badgeKey: "galar_fighting", type: "Lucha/Fantasma", typeColor: "#C03028", city: "Pueblo Stow-on-Side",
                    description: "Bea es una experta en karate frío y disciplinado. Allister es un joven tímido que habla con los espíritus.", strategy: "Bea usa Gigamax Machamp; Allister usa Gigamax Gengar. Prepárate para una potencia física o especial extrema.",
                    team: [{ id: 107, name: "Hitmonlee", level: 34 }, { id: 106, name: "Hitmonchan", level: 34 }, { id: 68, name: "Machamp", level: 36 }]
                },
                {
                    name: "Opal", spriteKey: "opal", badge: "Hada", badgeKey: "galar_fairy", type: "Hada", typeColor: "#EE99AC", city: "Pueblo Ballonlea",
                    description: "La líder más veterana de Galar. Busca un sucesor que tenga el 'rosa' adecuado en su corazón.", strategy: "Te hará preguntas durante el combate. Si fallas, tus stats bajarán. ¡Conoce tu lore pokémon!",
                    team: [{ id: 110, name: "Weezing-Galar", level: 36 }, { id: 303, name: "Mawile", level: 36 }, { id: 700, name: "Sylveon", level: 37 }, { id: 869, name: "Alcremie", level: 38 }]
                },
                {
                    name: "Gordie/Melony", spriteKey: "gordie", badge: "Mineral", badgeKey: "galar_rock", type: "Roca/Hielo", typeColor: "#B8A038", city: "Pueblo Circhester",
                    description: "Gordie es un ídolo de masas; Melony es su madre, una entrenadora estricta de las nieves.", strategy: "Gigamax Coalossal o Lapras. Necesitas ataques de tipo Agua/Tierra para Gordie y Fuego/Acero para Melony.",
                    team: [{ id: 838, name: "Carkol", level: 40 }, { id: 839, name: "Coalossal", level: 42 }, { id: 558, name: "Crustle", level: 40 }]
                },
                {
                    name: "Piers", spriteKey: "piers", badge: "Sombra", badgeKey: "galar_dark", type: "Siniestro", typeColor: "#705848", city: "Pueblo Spikemuth",
                    description: "Un músico punk que se niega a usar el Dinamax, confiando únicamente en la fuerza pura de sus Pokémon.", strategy: "Su Obstagoon usa Obstrucción para bajar tu defensa. Usa Pokémon de tipo Lucha para ignorar su estrategia.",
                    team: [{ id: 264, name: "Linoone-Galar", level: 44 }, { id: 687, name: "Malamar", level: 45 }, { id: 560, name: "Scrafty", level: 44 }, { id: 862, name: "Obstagoon", level: 46 }]
                },
                {
                    name: "Raihan", spriteKey: "raihan", badge: "Dragón", badgeKey: "galar_dragon", type: "Dragón", typeColor: "#7038F8", city: "Ciudad Hammerlocke",
                    description: "El eterno rival del campeón. Utiliza el clima de arena para potenciar sus tácticas de combate doble.", strategy: "Es un Combate Doble. Usa el clima a tu favor o Pokémon resistentes a la Arena como el tipo Acero o Roca.",
                    team: [{ id: 832, name: "Dubwool", level: 47 }, { id: 844, name: "Sandaconda", level: 47 }, { id: 330, name: "Flygon", level: 47 }, { id: 884, name: "Duraludon", level: 48 }]
                },
            ],
        },
    ],
    paldea: [
        {
            game: "Escarlata/Violeta (Gen IX)",
            leaders: [
                {
                    name: "Katy", spriteKey: "katy", badge: "Bicho", badgeKey: "paldea_bug", type: "Bicho", typeColor: "#A8B820", city: "Pueblo Cortondo",
                    description: "Repostera jefa de la pastelería Dolce Mucca. Combina el arte del azúcar con la fuerza de los insectos.", strategy: "Su Teddiursa se teracristaliza al tipo Bicho. Usa ataques de tipo Fuego o Volador para quemar su estrategia dulce.",
                    team: [{ id: 10, name: "Nymble", level: 14 }, { id: 247, name: "Tarountula", level: 14 }, { id: 216, name: "Teddiursa", level: 15 }]
                },
                {
                    name: "Brassius", spriteKey: "brassius", badge: "Planta", badgeKey: "paldea_grass", type: "Planta", typeColor: "#78C850", city: "Pueblo Altamía",
                    description: "Un artista atormentado que busca la belleza en la 'rendición' y la naturaleza. Sus combates son su mejor obra.", strategy: "Sudowoodo se teracristaliza al tipo Planta. Ten cuidado con su Tumba Rocas si llevas Pokémon voladores.",
                    team: [{ id: 911, name: "Petilil", level: 16 }, { id: 912, name: "Smoliv", level: 16 }, { id: 185, name: "Sudowoodo", level: 17 }]
                },
                {
                    name: "Iono", spriteKey: "iono", badge: "Eléctrico", badgeKey: "paldea_electric", type: "Eléctrico", typeColor: "#F8D030", city: "Ciudad Levicía",
                    description: "Influencer y streamer súper popular. Sus combates son retransmitidos en directo para millones de fans.", strategy: "Mismagius tiene Levitación y Tera Eléctrico, eliminando su única debilidad a Tierra. ¡Prepárate para un combate difícil!",
                    team: [{ id: 906, name: "Wattrel", level: 23 }, { id: 907, name: "Bellibolt", level: 23 }, { id: 200, name: "Luxio", level: 23 }, { id: 429, name: "Mismagius", level: 24 }]
                },
                {
                    name: "Kofu", spriteKey: "kofu", badge: "Agua", badgeKey: "paldea_water", type: "Agua", typeColor: "#6890F0", city: "Ciudad Cántara",
                    description: "Un chef de alta cocina con un carácter tan impetuoso como una cascada. ¡A cocinar se ha dicho!", strategy: "Crabominable tiene una gran fuerza física. Usa ataques especiales de tipo Eléctrico o Planta para vencerlo.",
                    team: [{ id: 370, name: "Veluza", level: 29 }, { id: 340, name: "Wugtrio", level: 29 }, { id: 740, name: "Crabominable", level: 30 }]
                },
                {
                    name: "Larry", spriteKey: "larry", badge: "Normal", badgeKey: "paldea_normal", type: "Normal", typeColor: "#A8A878", city: "Pueblo Mezcla",
                    description: "Un oficinista promedio que trabaja para la Liga. Su estilo es directo, eficiente y sin adornos innecesarios.", strategy: "Staraptor es muy rápido y tiene un Imagen devastador si tiene problemas de estado. El tipo Roca o Acero es vital.",
                    team: [{ id: 915, name: "Komala", level: 35 }, { id: 916, name: "Dudunsparce", level: 35 }, { id: 398, name: "Staraptor", level: 36 }]
                },
                {
                    name: "Ryme", spriteKey: "ryme", badge: "Fantasma", badgeKey: "paldea_ghost", type: "Fantasma", typeColor: "#705898", city: "Pueblo Hozclada",
                    description: "La rapera fantasmagórica. Sus rimas y sus Pokémon invocarán una tormenta de espíritus sobre el escenario.", strategy: "Es un Combate Doble. Usa Pokémon rápidos de tipo Siniestro o Fantasma para neutralizar su ritmo.",
                    team: [{ id: 905, name: "Banette", level: 41 }, { id: 906, name: "Mimikyu", level: 41 }, { id: 713, name: "Greavard", level: 41 }, { id: 971, name: "Houndstone", level: 42 }]
                },
                {
                    name: "Tulip", spriteKey: "tulip", badge: "Psíquico", badgeKey: "paldea_psychic", type: "Psíquico", typeColor: "#F85888", city: "Pueblo Veta",
                    description: "Maquilladora y experta en belleza. Ve el combate Pokémon como un desfile de perfección mental.", strategy: "Florges se teracristaliza al tipo Psíquico. Usa veneno o acero contra el cuerpo de hada antes de que cambie su tipo.",
                    team: [{ id: 620, name: "Farigiraf", level: 44 }, { id: 122, name: "Gardevoir", level: 44 }, { id: 437, name: "Espathra", level: 44 }, { id: 671, name: "Florges", level: 45 }]
                },
                {
                    name: "Grusha", spriteKey: "grusha", badge: "Hielo", badgeKey: "paldea_ice", type: "Hielo", typeColor: "#98D8D8", city: "Sierra Napada",
                    description: "Antiguo snowboarder profesional. Tras su accidente, se volvió tan frío y tranquilo como la nieve de la montaña.", strategy: "Cetitan tiene una vitalidad inmensa. Usa ataques de tipo Fuego o Lucha para derretir su defensa glacial.",
                    team: [{ id: 901, name: "Frosmoth", level: 47 }, { id: 308, name: "Beartic", level: 47 }, { id: 429, name: "Cetitan", level: 47 }, { id: 975, name: "Altaria", level: 48 }]
                },
            ],
        },
    ],
};

// ── Elite Four + Campeones por región ───────────────────────────

export const REGION_ELITE: Record<string, { game: string; members: EliteMember[] }[]> = {
    kanto: [
        {
            game: "R/B/A — FR/HV",
            members: [
                {
                    name: "Lorelei", spriteKey: "lorelei", type: "Hielo", typeColor: "#98D8D8", role: "elite",
                    description: "Maestra de los combates bajo cero. Su mente lógica congela a sus adversarios.", strategy: "Usa Ventisca y Rayo Hielo junto y la combinación defensiva tipo Agua/Hielo.",
                    team: [{ id: 87, name: "Dewgong", level: 54 }, { id: 91, name: "Cloyster", level: 53 }, { id: 80, name: "Slowbro", level: 54 }, { id: 124, name: "Jynx", level: 56 }, { id: 131, name: "Lapras", level: 56 }]
                },
                {
                    name: "Bruno", spriteKey: "bruno", type: "Lucha", typeColor: "#C03028", role: "elite",
                    description: "Luchador implacable que entrena montañas para fortalecerse junto a sus Pokémon.", strategy: "Golpes de estado puro con Sumisión, Tajo Cruzado y resistencia elevada a las rocas.",
                    team: [{ id: 95, name: "Onix", level: 53 }, { id: 107, name: "Hitmonchan", level: 55 }, { id: 106, name: "Hitmonlee", level: 55 }, { id: 95, name: "Onix", level: 56 }, { id: 68, name: "Machamp", level: 58 }]
                },
                {
                    name: "Agatha", spriteKey: "agatha", type: "Fantasma", typeColor: "#705898", role: "elite",
                    description: "Ex amiga y eterna rival del Prof. Oak. Usa espíritus y toxinas para paralizar al enemigo.", strategy: "Combina Hipnosis y Come Sueños con el envenenamiento veloz de Gengar.",
                    team: [{ id: 94, name: "Gengar", level: 56 }, { id: 42, name: "Golbat", level: 56 }, { id: 93, name: "Haunter", level: 55 }, { id: 24, name: "Arbok", level: 58 }, { id: 94, name: "Gengar", level: 60 }]
                },
                {
                    name: "Lance", spriteKey: "lance", type: "Dragón", typeColor: "#7038F8", role: "elite",
                    description: "Maestro domadragones de Ciudad Endrino. Es honorable y su fama lo precede.", strategy: "Fuerza abrumadora de Hiperrayo garantizada asombrosa barrera elemental.",
                    team: [{ id: 130, name: "Gyarados", level: 58 }, { id: 148, name: "Dragonair", level: 56 }, { id: 148, name: "Dragonair", level: 56 }, { id: 142, name: "Aerodactyl", level: 60 }, { id: 149, name: "Dragonite", level: 62 }]
                },
                {
                    name: "Gary/Blue", spriteKey: "blue", type: "Mixto", typeColor: "#111111", role: "champion",
                    description: "Tu arrogante vecino de Pueblo Paleta, quien logró conquistar la cima un paso antes que tú, reuniendo al equipo más balanceado posible.", strategy: "Su equipo cubre casi todas las debilidades elementales posibles y atacará sin piedad al punto ciego de sus rivales.",
                    team: [{ id: 18, name: "Pidgeot", level: 61 }, { id: 65, name: "Alakazam", level: 59 }, { id: 112, name: "Rhydon", level: 61 }, { id: 103, name: "Exeggutor", level: 61 }, { id: 130, name: "Gyarados", level: 61 }, { id: 6, name: "Charizard", level: 65 }]
                },
            ],
        },
    ],
    johto: [
        {
            game: "O/P/C — HG/SS",
            members: [
                {
                    name: "Will", spriteKey: "will", type: "Psíquico", typeColor: "#F85888", role: "elite",
                    description: "El maestro de la mente. Su elegante máscara oculta una mirada que predice cada movimiento del rival.", strategy: "Usa Psíquico y Confusión mientras mantiene a sus Xatu listos para ataques aéreos rápidos.",
                    team: [{ id: 178, name: "Xatu", level: 40 }, { id: 124, name: "Jynx", level: 41 }, { id: 103, name: "Exeggutor", level: 41 }, { id: 80, name: "Slowbro", level: 41 }, { id: 178, name: "Xatu", level: 42 }]
                },
                {
                    name: "Koga", spriteKey: "koga", type: "Veneno", typeColor: "#A040A0", role: "elite",
                    description: "Ascendido a la élite tras años como líder, Koga ha perfeccionado sus artes ninja de envenenamiento.", strategy: "Tóxico es su arma principal. Te desgastará mientras sus Pokémon esquivan tus ataques.",
                    team: [{ id: 168, name: "Ariados", level: 40 }, { id: 205, name: "Forretress", level: 43 }, { id: 89, name: "Muk", level: 42 }, { id: 110, name: "Weezing", level: 43 }, { id: 169, name: "Crobat", level: 44 }]
                },
                {
                    name: "Bruno", spriteKey: "bruno", type: "Lucha", typeColor: "#C03028", role: "elite",
                    description: "Continúa su entrenamiento físico extremo. Ha viajado desde Kanto para probar la fuerza de Johto.", strategy: "Ataques de fuerza bruta. Su Machamp es capaz de derribar murallas con sus cuatro brazos de un solo golpe.",
                    team: [{ id: 107, name: "Hitmontop", level: 42 }, { id: 107, name: "Hitmonlee", level: 42 }, { id: 106, name: "Hitmonchan", level: 42 }, { id: 95, name: "Onix", level: 43 }, { id: 68, name: "Machamp", level: 46 }]
                },
                {
                    name: "Karen", spriteKey: "karen", type: "Siniestro", typeColor: "#705848", role: "elite",
                    description: "Cree que los entrenadores verdaderos deben ganar con sus favoritos. Es una experta en la astucia del tipo siniestro.", strategy: "Usa la oscuridad para confundir. Su Houndoom combina fuego y maldad de manera letal.",
                    team: [{ id: 197, name: "Umbreon", level: 42 }, { id: 45, name: "Vileplume", level: 42 }, { id: 198, name: "Murkrow", level: 44 }, { id: 91, name: "Gengar", level: 45 }, { id: 229, name: "Houndoom", level: 47 }]
                },
                {
                    name: "Lance", spriteKey: "lance", type: "Dragón", typeColor: "#7038F8", role: "champion",
                    description: "El Domador de Dragones definitivo. Ahora ocupa el trono de la liga tras la marcha de Red, esperando al siguiente retador.", strategy: "Hiperrayo y ataques elementales masivos. Sus Dragonite no tienen piedad alguna.",
                    team: [{ id: 130, name: "Gyarados", level: 44 }, { id: 142, name: "Aerodactyl", level: 46 }, { id: 6, name: "Charizard", level: 46 }, { id: 148, name: "Dragonite", level: 47 }, { id: 149, name: "Dragonite", level: 50 }]
                },
            ],
        },
    ],
    hoenn: [
        {
            game: "R/Z/E — Ω/α",
            members: [
                {
                    name: "Sidney", spriteKey: "sidney", type: "Siniestro", typeColor: "#705848", role: "elite",
                    description: "Un punk sofisticado que disfruta del combate. Cree que la diversión es el elemento clave de la liga.", strategy: "Usa ataques de tipo Bicho o Hada para superar sus Pokémon de oscuridad.",
                    team: [{ id: 275, name: "Shiftry", level: 46 }, { id: 332, name: "Cacturne", level: 46 }, { id: 319, name: "Sharpedo", level: 48 }, { id: 359, name: "Absol", level: 49 }, { id: 302, name: "Sableye", level: 46 }]
                },
                {
                    name: "Phoebe", spriteKey: "phoebe", type: "Fantasma", typeColor: "#705898", role: "elite",
                    description: "Entrena en el Monte Pírico y tiene una conexión espiritual con los difuntos y lo oculto.", strategy: "Muchos de sus fantasmas tienen Presión. Cuidado con tus PP en este combate largo.",
                    team: [{ id: 354, name: "Banette", level: 49 }, { id: 354, name: "Banette", level: 49 }, { id: 356, name: "Dusclops", level: 48 }, { id: 356, name: "Dusclops", level: 51 }, { id: 302, name: "Sableye", level: 50 }]
                },
                {
                    name: "Glacia", spriteKey: "glacia", type: "Hielo", typeColor: "#98D8D8", role: "elite",
                    description: "Vino de una tierra lejana buscando mejorar sus habilidades en el clima cálido de Hoenn.", strategy: "Usa ataques de tipo Fuego o Eléctrico para sus Pokémon de Hielo y Agua.",
                    team: [{ id: 364, name: "Sealeo", level: 50 }, { id: 364, name: "Sealeo", level: 50 }, { id: 362, name: "Glalie", level: 50 }, { id: 362, name: "Glalie", level: 52 }, { id: 365, name: "Walrein", level: 53 }]
                },
                {
                    name: "Drake", spriteKey: "drake", type: "Dragón", typeColor: "#7038F8", role: "elite",
                    description: "Un veterano lobo de mar. Para él, solo los entrenadores con un corazón puro pueden mandar a los dragones.", strategy: "El tipo Hielo es su mayor debilidad. Rayo Hielo puede barrer a casi todo su equipo fácilmente.",
                    team: [{ id: 330, name: "Flygon", level: 51 }, { id: 330, name: "Flygon", level: 51 }, { id: 372, name: "Shelgon", level: 52 }, { id: 334, name: "Altaria", level: 52 }, { id: 373, name: "Salamence", level: 55 }]
                },
                {
                    name: "Steven Stone", spriteKey: "steven", type: "Acero", typeColor: "#B8B8D0", role: "champion",
                    description: "Hijo del presidente de Devon Corp y coleccionista de piedras raras. Es el maestro de la defensa férrea.", strategy: "Su Metagross es una bestia defensiva y ofensiva. Usa Terremoto o Llamarada para romper su muralla.",
                    team: [{ id: 227, name: "Skarmory", level: 52 }, { id: 344, name: "Claydol", level: 53 }, { id: 306, name: "Aggron", level: 54 }, { id: 348, name: "Armaldo", level: 54 }, { id: 346, name: "Cradily", level: 54 }, { id: 376, name: "Metagross", level: 58 }]
                },
            ],
        },
    ],
    sinnoh: [
        {
            game: "D/P/Pt — BD/PR",
            members: [
                {
                    name: "Aaron", spriteKey: "aaron", type: "Bicho", typeColor: "#A8B820", role: "elite",
                    description: "Entrenó en el bosque para entender el lenguaje de los bichos. Cree firmemente que su tipo es el más fuerte.", strategy: "Usa ataques de tipo Fuego o Volador, pero cuidado con su Drapion, que solo es débil a Tierra.",
                    team: [{ id: 402, name: "Kricketune", level: 53 }, { id: 212, name: "Scizor", level: 55 }, { id: 214, name: "Heracross", level: 54 }, { id: 269, name: "Dustox", level: 53 }, { id: 452, name: "Drapion", level: 57 }]
                },
                {
                    name: "Bertha", spriteKey: "bertha", type: "Tierra", typeColor: "#E0C068", role: "elite",
                    description: "Una anciana sabia que domina el terreno. Sus Pokémon son tan sólidos como la roca misma.", strategy: "El tipo Agua y Planta son cruciales, pero ten cuidado con su Quagsire que es inmune a Eléctrico.",
                    team: [{ id: 195, name: "Quagsire", level: 55 }, { id: 450, name: "Hippowdon", level: 59 }, { id: 185, name: "Sudowoodo", level: 56 }, { id: 112, name: "Rhydon", level: 55 }, { id: 464, name: "Rhyperior", level: 61 }]
                },
                {
                    name: "Flint", spriteKey: "flint", type: "Fuego", typeColor: "#F08030", role: "elite",
                    description: "Un espíritu ardiente que busca combates apasionados. Es el mejor amigo de Lectro.", strategy: "En Diamante/Perla su equipo es mixto, pero en Platino es un infierno de fuego. Usa ataques de tipo Agua o Tierra.",
                    team: [{ id: 78, name: "Rapidash", level: 58 }, { id: 126, name: "Magmar", level: 57 }, { id: 392, name: "Infernape", level: 61 }, { id: 428, name: "Lopunny", level: 57 }, { id: 467, name: "Magmortar", level: 63 }]
                },
                {
                    name: "Lucian", spriteKey: "lucian", type: "Psíquico", typeColor: "#F85888", role: "elite",
                    description: "Un lector empedernido que utiliza el conocimiento y la estrategia mental para desarmar a sus oponentes.", strategy: "Usa ataques de tipo Siniestro o Bicho. Su Alakazam es increíblemente rápido y potente, ¡no te confíes!",
                    team: [{ id: 122, name: "Mr. Mime", level: 59 }, { id: 65, name: "Alakazam", level: 60 }, { id: 196, name: "Espeon", level: 59 }, { id: 203, name: "Girafarig", level: 59 }, { id: 437, name: "Bronzong", level: 63 }]
                },
                {
                    name: "Cynthia", spriteKey: "cynthia", type: "Mixto", typeColor: "#111111", role: "champion",
                    description: "Investigadora de mitos y posiblemente la campeona más temida de todas las regiones. Su equipo no tiene fisuras.", strategy: "Su Garchomp es legendario por una razón. Debes tener un tipo Hielo muy rápido o un hada potente para sobrevivir.",
                    team: [{ id: 442, name: "Spiritomb", level: 61 }, { id: 407, name: "Roserade", level: 60 }, { id: 395, name: "Empoleon", level: 63 }, { id: 448, name: "Lucario", level: 63 }, { id: 350, name: "Milotic", level: 63 }, { id: 445, name: "Garchomp", level: 66 }]
                },
            ],
        },
    ],
    unova: [
        {
            game: "Negro/Blanco — B2/B2",
            members: [
                {
                    name: "Shauntal", spriteKey: "shauntal", type: "Fantasma", typeColor: "#705898", role: "elite",
                    description: "Una novelista que escribe historias basadas en los combates que presencia. Su prosa es tan oscura como sus Pokémon.", strategy: "Su Chandelure tiene un Ataque Especial masivo. Protégete con Pokémon resistentes al Fuego y Fantasma.",
                    team: [{ id: 563, name: "Cofagrigus", level: 48 }, { id: 609, name: "Chandelure", level: 50 }, { id: 593, name: "Jellicent", level: 48 }, { id: 622, name: "Golurk", level: 48 }]
                },
                {
                    name: "Marshal", spriteKey: "marshal", type: "Lucha", typeColor: "#C03028", role: "elite",
                    description: "El aprendiz número uno de Mirto. Busca la fuerza definitiva a través del entrenamiento físico riguroso.", strategy: "Muchos de sus Pokémon tienen la habilidad Robustez o aguantan mucho. Usa ataques de tipo Volador o Psíquico.",
                    team: [{ id: 539, name: "Sawk", level: 48 }, { id: 538, name: "Throh", level: 48 }, { id: 534, name: "Conkeldurr", level: 50 }, { id: 620, name: "Mienshao", level: 48 }]
                },
                {
                    name: "Grimsley", spriteKey: "grimsley", type: "Siniestro", typeColor: "#705848", role: "elite",
                    description: "Hijo de una familia noble caída en desgracia, Grimsley ve la vida como un juego de azar donde siempre apuesta al máximo.", strategy: "Su Bisharp es débil x4 al tipo Lucha. Aprovecha esa debilidad para terminar rápido.",
                    team: [{ id: 510, name: "Liepard", level: 48 }, { id: 553, name: "Krookodile", level: 48 }, { id: 560, name: "Scrafty", level: 48 }, { id: 625, name: "Bisharp", level: 50 }]
                },
                {
                    name: "Caitlin", spriteKey: "caitlin", type: "Psíquico", typeColor: "#F85888", role: "elite",
                    description: "Antiguamente una dama del Frente de Batalla en Sinnoh, ahora controla su inmenso poder psíquico en Teselia.", strategy: "Reulon y Gothitelle tienen defensas especiales altas. Usa ataques físicos de tipo Siniestro o Bicho.",
                    team: [{ id: 518, name: "Musharna", level: 48 }, { id: 565, name: "Sigilyph", level: 48 }, { id: 576, name: "Gothitelle", level: 48 }, { id: 579, name: "Reuniclus", level: 50 }]
                },
                {
                    name: "Iris", spriteKey: "iris", type: "Dragón", typeColor: "#7038F8", role: "champion",
                    description: "La joven prodigio que ascendió al trono en Blanco 2/Negro 2. Su conexión con los dragones es legendaria.", strategy: "Haxorus tiene la Banda Focus. Prepárate para un ataque desesperado si no lo vences de un golpe con daño indirecto.",
                    team: [{ id: 635, name: "Hydreigon", level: 57 }, { id: 621, name: "Druddigon", level: 57 }, { id: 131, name: "Lapras", level: 57 }, { id: 567, name: "Archeops", level: 57 }, { id: 606, name: "Beheeyem", level: 57 }, { id: 612, name: "Haxorus", level: 59 }]
                },
            ],
        },
    ],
    kalos: [
        {
            game: "X/Y",
            members: [
                {
                    name: "Malva", spriteKey: "malva", type: "Fuego", typeColor: "#F08030", role: "elite",
                    description: "Miembro del Team Flare y presentadora de noticias. Su fuego interno arde con una amargura elegante.", strategy: "Usa ataques de tipo Agua o Roca. Su Talonflame es muy veloz, ¡prepárate para recibir el primer golpe!",
                    team: [{ id: 324, name: "Torkoal", level: 63 }, { id: 609, name: "Chandelure", level: 63 }, { id: 668, name: "Pyroar", level: 63 }, { id: 663, name: "Talonflame", level: 65 }]
                },
                {
                    name: "Siebold", spriteKey: "siebold", type: "Agua", typeColor: "#6890F0", role: "elite",
                    description: "Un chef de renombre mundial que ve el arte en la preparación y en el fragor de la batalla.", strategy: "Barbaracle tiene una combinación única. Los ataques de tipo Eléctrico o Planta son esenciales aquí.",
                    team: [{ id: 121, name: "Starmie", level: 63 }, { id: 130, name: "Gyarados", level: 63 }, { id: 593, name: "Jellicent", level: 63 }, { id: 689, name: "Barbaracle", level: 65 }]
                },
                {
                    name: "Wikstrom", spriteKey: "wikstrom", type: "Acero", typeColor: "#B8B8D0", role: "elite",
                    description: "Un caballero de brillante armadura que sigue un estricto código de honor en cada duelo.", strategy: "Aegislash cambia de forma Escudo a Filo. Atácalo cuando esté en forma Filo para hacerle daño masivo.",
                    team: [{ id: 227, name: "Skarmory", level: 63 }, { id: 476, name: "Probopass", level: 63 }, { id: 212, name: "Scizor", level: 63 }, { id: 681, name: "Aegislash", level: 65 }]
                },
                {
                    name: "Drasna", spriteKey: "drasna", type: "Dragón", typeColor: "#7038F8", role: "elite",
                    description: "Viene de una familia mística de Sinnoh. Su amabilidad esconde el poder devastador de los dragones.", strategy: "Noivern usa ataques de sonido muy potentes. El tipo Hielo o Hada es tu mejor aliado en este combate.",
                    team: [{ id: 169, name: "Dragalge", level: 63 }, { id: 635, name: "Altaria", level: 63 }, { id: 621, name: "Druddigon", level: 63 }, { id: 715, name: "Noivern", level: 65 }]
                },
                {
                    name: "Diantha", spriteKey: "diantha", type: "Hada", typeColor: "#EE99AC", role: "champion",
                    description: "La actriz más famosa de Kalos. Su brillo en el escenario solo es igualado por su destreza táctica.", strategy: "Mega-Gardevoir es su as. Necesitas ataques físicos de tipo Acero o Veneno para atravesar su barrera.",
                    team: [{ id: 701, name: "Hawlucha", level: 64 }, { id: 697, name: "Tyrantrum", level: 65 }, { id: 699, name: "Aurorus", level: 65 }, { id: 706, name: "Goodra", level: 66 }, { id: 711, name: "Gourgeist", level: 65 }, { id: 282, name: "Gardevoir", level: 68 }]
                },
            ],
        },
    ],
    alola: [
        {
            game: "Sol/Luna · USUM (Gen VII)",
            members: [
                {
                    name: "Hala", spriteKey: "hala", type: "Lucha", typeColor: "#C03028", role: "elite",
                    description: "Tras abdicar de su puesto como Kahuna principal, Hala se unió al Alto Mando para probar la valía de los aspirantes.", strategy: "Crabominable de nivel alto es una fuerza demoledora. El tipo Psíquico o Hada es tu mejor aliado.",
                    team: [{ id: 297, name: "Hariyama", level: 54 }, { id: 62, name: "Poliwrath", level: 54 }, { id: 57, name: "Primeape", level: 54 }, { id: 107, name: "Hitmonlee", level: 54 }, { id: 740, name: "Crabominable", level: 55 }]
                },
                {
                    name: "Olivia", spriteKey: "olivia", type: "Roca", typeColor: "#B8A038", role: "elite",
                    description: "Representa a la isla Akala en la liga. Sus Pokémon de pura roca son un desafío de resistencia.", strategy: "Usa ataques de tipo Agua, Planta o Acero. Su Lycanroc forma Diurna es extremadamente rápido.",
                    team: [{ id: 348, name: "Armaldo", level: 54 }, { id: 346, name: "Cradily", level: 54 }, { id: 565, name: "Carracosta", level: 54 }, { id: 476, name: "Probopass", level: 54 }, { id: 745, name: "Lycanroc", level: 55 }]
                },
                {
                    name: "Acerola", spriteKey: "acerola", type: "Fantasma", typeColor: "#705898", role: "elite",
                    description: "Una joven descendiente de la antigua realeza de Alola. Sus amigos fantasmales son juguetones pero peligrosos.", strategy: "Mimikyu tiene la habilidad Disfraz, que absorbe el primer golpe. Usa ataques que golpeen varias veces o movimientos de estado.",
                    team: [{ id: 426, name: "Drifblim", level: 54 }, { id: 469, name: "Yanmega", level: 54 }, { id: 711, name: "Gourgeist", level: 54 }, { id: 781, name: "Dhelmise", level: 54 }, { id: 778, name: "Mimikyu", level: 55 }]
                },
                {
                    name: "Kahili", spriteKey: "kahili", type: "Volador", typeColor: "#98D8D8", role: "elite",
                    description: "Una golfista profesional que recorrió el mundo y regresó a Alola para ser la maestra de los cielos.", strategy: "Usa ataques de tipo Eléctrico o Hielo. Su Toucannon puede quemar con su pico ardiente, ¡ten cuidado!",
                    team: [{ id: 227, name: "Skarmory", level: 54 }, { id: 130, name: "Gyarados", level: 54 }, { id: 628, name: "Braviary", level: 54 }, { id: 701, name: "Hawlucha", level: 54 }, { id: 733, name: "Toucannon", level: 55 }]
                },
                {
                    name: "Kukui", spriteKey: "kukui", type: "Mixto", typeColor: "#111111", role: "champion",
                    description: "El Profesor Pokémon de la región y fundador de la Liga Alola. Él es el desafío final para cualquier aspirante.", strategy: "Su equipo es muy equilibrado. Usará al inicial que sea fuerte contra el tuyo. Prepárate para una batalla total.",
                    team: [{ id: 745, name: "Lycanroc", level: 57 }, { id: 530, name: "Excadrill", level: 56 }, { id: 128, name: "Tauros", level: 56 }, { id: 628, name: "Braviary", level: 56 }, { id: 91, name: "Cloyster", level: 56 }, { id: 727, name: "Incineroar", level: 58 }]
                },
            ],
        },
    ],
    galar: [
        {
            game: "Espada/Escudo (Gen VIII)",
            members: [
                {
                    name: "Marnie", spriteKey: "marnie", type: "Siniestro", typeColor: "#705848", role: "elite",
                    description: "Líder de Pueblo Pique y rival competitiva. Su estilo gótico y su determinación la llevaron al torneo final.", strategy: "Grimmsnarl con Gigamax usará Gigasopor para confundirte. ¡Derrótalo con ataques de tipo Acero o Hada!",
                    team: [{ id: 510, name: "Liepard", level: 58 }, { id: 454, name: "Toxicroak", level: 58 }, { id: 560, name: "Scrafty", level: 59 }, { id: 806, name: "Morpeko", level: 59 }, { id: 861, name: "Grimmsnarl", level: 60 }]
                },
                {
                    name: "Bede", spriteKey: "bede", type: "Hada", typeColor: "#EE99AC", role: "elite",
                    description: "Antiguamente arrogante, ahora es el sucesor de Opal. Ha encontrado su lugar como maestro del tipo hada.", strategy: "Su equipo es exclusivamente de tipo Hada ahora. El tipo Veneno o Acero es vital aquí.",
                    team: [{ id: 842, name: "Sandaconda", level: 50 }, { id: 858, name: "Hatterene", level: 50 }, { id: 700, name: "Sylveon", level: 50 }, { id: 869, name: "Alcremie", level: 50 }]
                },
                {
                    name: "Hop", spriteKey: "hop", type: "Mixto", typeColor: "#111111", role: "elite",
                    description: "Tu mejor amigo y eterno rival. Ha superado sus dudas para convertirse en un entrenador increíblemente versátil.", strategy: "Su equipo es muy equilibrado. Zamazenta o Zacian pueden aparecer dependiendo de la versión; ¡ten cuidado!",
                    team: [{ id: 823, name: "Corviknight", level: 59 }, { id: 826, name: "Orbeetle", level: 59 }, { id: 832, name: "Dubwool", level: 58 }, { id: 870, name: "Falinks", level: 59 }, { id: 815, name: "Cinderace", level: 61 }]
                },
                {
                    name: "Leon", spriteKey: "leon", type: "Mixto", typeColor: "#CC0000", role: "champion",
                    description: "El campeón imbatible de Galar. Su pose de victoria 'L' es icónica, al igual que su Charizard Gigamax.", strategy: "Charizard Gigamax lanzará Gigallamarada. Necesitas un tipo Agua extremadamente potente o un tipo Roca para apagarlo.",
                    team: [{ id: 865, name: "Sirfetch'd", level: 62 }, { id: 866, name: "Mr. Rime", level: 62 }, { id: 884, name: "Duraludon", level: 62 }, { id: 887, name: "Dragapult", level: 62 }, { id: 812, name: "Rillaboom", level: 64 }, { id: 6, name: "Charizard", level: 65 }]
                },
            ],
        },
    ],
    paldea: [
        {
            game: "Escarlata/Violeta (Gen IX)",
            members: [
                {
                    name: "Rika", spriteKey: "rika", type: "Tierra", typeColor: "#E0C068", role: "elite",
                    description: "La primera examinadora. Con su aire despreocupado y su Clodsire, te pondrá los pies en la tierra.", strategy: "Su Clodsire tiene la habilidad Absorb. Agua, ¡lo que significa que la curarás con ataques de agua!",
                    team: [{ id: 340, name: "Whiscash", level: 57 }, { id: 232, name: "Donphan", level: 57 }, { id: 323, name: "Camerupt", level: 57 }, { id: 450, name: "Dugtrio", level: 57 }, { id: 980, name: "Clodsire", level: 58 }]
                },
                {
                    name: "Poppy", spriteKey: "poppy", type: "Acero", typeColor: "#B8B8D0", role: "elite",
                    description: "Una niña prodigio que domina el tipo acero. Su mazo de Tinkaton es tan grande como su potencial.", strategy: "Tinkaton usará Martillo Colosal. El tipo Fuego o Tierra es esencial para derretir su acero.",
                    team: [{ id: 823, name: "Copperajah", level: 58 }, { id: 462, name: "Magnezone", level: 58 }, { id: 437, name: "Bronzong", level: 58 }, { id: 227, name: "Corviknight", level: 58 }, { id: 959, name: "Tinkaton", level: 59 }]
                },
                {
                    name: "Larry", spriteKey: "larry-elite", type: "Volador", typeColor: "#98D8D8", role: "elite",
                    description: "El pluriempleado de la liga. Ahora cambia su traje gris por el cielo infinito del tipo volador.", strategy: "Flamigo con Tera Volador es muy peligroso. El tipo Eléctrico o Hielo te dará la victoria rápidamente.",
                    team: [{ id: 823, name: "Tropius", level: 59 }, { id: 398, name: "Staraptor", level: 59 }, { id: 956, name: "Oricorio", level: 59 }, { id: 959, name: "Altaria", level: 59 }, { id: 973, name: "Flamigo", level: 60 }]
                },
                {
                    name: "Hassel", spriteKey: "hassel", type: "Dragón", typeColor: "#7038F8", role: "elite",
                    description: "Profesor de arte en la academia y maestro de dragones. Sus combates son expresiones de emoción pura.", strategy: "Baxcalibur usará Asalto Espadón. Si sobrevives a su ataque, ¡es el momento de golpear con Hada o Hielo!",
                    team: [{ id: 611, name: "Noivern", level: 60 }, { id: 621, name: "Haxorus", level: 60 }, { id: 635, name: "Dragalge", level: 60 }, { id: 372, name: "Flapple", level: 60 }, { id: 998, name: "Baxcalibur", level: 61 }]
                },
                {
                    name: "Geeta", spriteKey: "geeta", type: "Mixto", typeColor: "#111111", role: "champion",
                    description: "La Presidenta de la Liga Pokémon y la Campeona de rango Supremo de Paldea. Posee una elegancia inigualable.", strategy: "Su Glimmora plantará Púas Tóxicas si la golpeas físicamente. ¡Ten mucho cuidado con el veneno!",
                    team: [{ id: 823, name: "Espathra", level: 61 }, { id: 978, name: "Gogoat", level: 61 }, { id: 979, name: "Veluza", level: 61 }, { id: 980, name: "Avalugg", level: 61 }, { id: 981, name: "Kingambit", level: 61 }, { id: 970, name: "Glimmora", level: 62 }]
                },
            ],
        },
    ],
};



// ── Villanos por región ───────────────────────────────────────────
export type VillainInfo = {
    team: string;
    goal: string;
    boss: string;
    imageKey?: string;
};

export const REGION_VILLAINS: Record<string, VillainInfo> = {
    kanto: { team: "Team Rocket", boss: "Giovanni", goal: "Dominar el mundo usando Pokémon para fines delictivos y lucrativos.", imageKey: "team_rocket" },
    johto: { team: "Team Rocket", boss: "Giovanni / Archer", goal: "Revivir al líder desaparecido y retomar el control del hampa.", imageKey: "team_rocket" },
    hoenn: { team: "Magma / Aqua", boss: "Máxie / Archie", goal: "Expandir tierra o agua a nivel global para rediseñar el mundo a su imagen.", imageKey: "magma_aqua" },
    sinnoh: { team: "Team Galaxia", boss: "Cyrus", goal: "Destruir el universo y crear uno nuevo sin emociones ni espíritu.", imageKey: "galaxy" },
    unova: { team: "Team Plasma", boss: "N / Ghetsis", goal: "Liberar a todos los Pokémon... o usar esa excusa para dominar el mundo.", imageKey: "plasma" },
    kalos: { team: "Team Flare", boss: "Lysandre", goal: "Usar la Arma Definitiva para destruir a todos excepto a los elegidos.", imageKey: "flare" },
    alola: { team: "Team Skull / Aether", boss: "Guzma / Lusamine", goal: "Explotar Pokémon Ultra para abrir portales a Ultra Espacios.", imageKey: "skull_aether" },
    galar: { team: "Macro Cosmos", boss: "Rose", goal: "Despertar a Eternatus para solucionar la crisis energética... sin importar el costo.", imageKey: "macro_cosmos" },
    paldea: { team: "Team Star", boss: "Cassiopeia", goal: "Rebelión estudiantil convertida en organización pandillera tras años de bullying escolar.", imageKey: "star" },
};
