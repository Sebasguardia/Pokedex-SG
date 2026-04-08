// ─────────────────────────────────────────────────────────────────
// REGION ASSETS — Aquí van los sprites/imágenes de entrenadores,
//                 medallas y mapas. Llena los URLs tú mismo.
//
// Fuentes recomendadas donde encontrar los sprites:
//
//   🎮 Líderes de Gimnasio y Alto Mando:
//      - Pokémon Showdown (gratis, sin registro):
//        https://play.pokemonshowdown.com/sprites/trainers/{nombre}.png
//        Ejemplos: brock.png · misty.png · lt-surge.png · erika.png
//        sabrina.png · koga.png · blaine.png · giovanni.png
//        Listado completo: https://play.pokemonshowdown.com/sprites/trainers/
//
//      - Archivos de Spriters (mayor calidad):
//        https://www.spriters-resource.com/ds_dsi/pokemonheartgoldsoulsilver/
//
//      - Imágenes oficiales (alta resolución):
//        https://archives.bulbagarden.net/wiki/Category:Gym_Leader_artwork
//
//   🗺️ Mapas de Regiones:
//      - Bulbapedia (mapas de cada juego):
//        https://bulbapedia.bulbagarden.net/wiki/Kanto (sección de mapas)
//      - The-Spriters-Resource tiene maps oficiales de cada juego
//
//   🏅 Medallas (Badges):
//      - GitHub badges sprites:
//        https://archives.bulbagarden.net/wiki/Category:Kanto_Badges
//
// ─────────────────────────────────────────────────────────────────

// ── Sprites de Líderes de Gimnasio ───────────────────────────────
// Clave: nombre del líder en minúsculas sin espacios (ej: "brock", "lt-surge")
// Valor: URL de la imagen
export const GYM_LEADER_SPRITES: Record<string, string> = {
    // KANTO
    "brock": "https://play.pokemonshowdown.com/sprites/trainers/brock.png",  // https://play.pokemonshowdown.com/sprites/trainers/brock.png
    "misty": "https://play.pokemonshowdown.com/sprites/trainers/misty.png",  // https://play.pokemonshowdown.com/sprites/trainers/misty.png
    "lt-surge": "https://play.pokemonshowdown.com/sprites/trainers/lt-surge.png",  // https://play.pokemonshowdown.com/sprites/trainers/lt-surge.png
    "erika": "https://play.pokemonshowdown.com/sprites/trainers/erika.png",  // https://play.pokemonshowdown.com/sprites/trainers/erika.png
    "koga": "https://play.pokemonshowdown.com/sprites/trainers/koga.png",  // https://play.pokemonshowdown.com/sprites/trainers/koga.png
    "sabrina": "https://play.pokemonshowdown.com/sprites/trainers/sabrina.png",  // https://play.pokemonshowdown.com/sprites/trainers/sabrina.png
    "blaine": "https://play.pokemonshowdown.com/sprites/trainers/blaine.png",  // https://play.pokemonshowdown.com/sprites/trainers/blaine.png
    "giovanni": "https://play.pokemonshowdown.com/sprites/trainers/giovanni.png",  // https://play.pokemonshowdown.com/sprites/trainers/giovanni.png
    // JOHTO
    "falkner": "https://play.pokemonshowdown.com/sprites/trainers/falkner.png",
    "bugsy": "https://play.pokemonshowdown.com/sprites/trainers/bugsy.png",
    "whitney": "https://play.pokemonshowdown.com/sprites/trainers/whitney.png",
    "morty": "https://play.pokemonshowdown.com/sprites/trainers/morty.png",
    "chuck": "https://play.pokemonshowdown.com/sprites/trainers/chuck.png",
    "jasmine": "https://play.pokemonshowdown.com/sprites/trainers/jasmine.png",
    "pryce": "https://play.pokemonshowdown.com/sprites/trainers/pryce.png",
    "clair": "https://play.pokemonshowdown.com/sprites/trainers/clair.png",
    // HOENN
    "roxanne": "https://play.pokemonshowdown.com/sprites/trainers/roxanne.png",
    "brawly": "https://play.pokemonshowdown.com/sprites/trainers/brawly.png",
    "wattson": "https://play.pokemonshowdown.com/sprites/trainers/wattson.png",
    "flannery": "https://play.pokemonshowdown.com/sprites/trainers/flannery.png",
    "norman": "https://play.pokemonshowdown.com/sprites/trainers/norman.png",
    "winona": "https://play.pokemonshowdown.com/sprites/trainers/winona.png",
    "tate": "https://play.pokemonshowdown.com/sprites/trainers/tate.png",
    "liza": "https://play.pokemonshowdown.com/sprites/trainers/liza.png",
    "juan": "https://play.pokemonshowdown.com/sprites/trainers/juan.png",
    "wallace": "https://play.pokemonshowdown.com/sprites/trainers/wallace.png",
    // SINNOH
    "roark": "https://play.pokemonshowdown.com/sprites/trainers/roark.png",
    "gardenia": "https://play.pokemonshowdown.com/sprites/trainers/gardenia.png",
    "maylene": "https://play.pokemonshowdown.com/sprites/trainers/maylene.png",
    "crasher-wake": "https://play.pokemonshowdown.com/sprites/trainers/crasher-wake.png",
    "fantina": "https://play.pokemonshowdown.com/sprites/trainers/fantina.png",
    "byron": "https://play.pokemonshowdown.com/sprites/trainers/byron.png",
    "candice": "https://play.pokemonshowdown.com/sprites/trainers/candice.png",
    "volkner": "https://play.pokemonshowdown.com/sprites/trainers/volkner.png",
    // UNOVA
    "cilan": "https://play.pokemonshowdown.com/sprites/trainers/cilan.png",
    "chili": "https://play.pokemonshowdown.com/sprites/trainers/chili.png",
    "cress": "https://play.pokemonshowdown.com/sprites/trainers/cress.png",
    "lenora": "https://play.pokemonshowdown.com/sprites/trainers/lenora.png",
    "burgh": "https://play.pokemonshowdown.com/sprites/trainers/burgh.png",
    "elesa": "https://play.pokemonshowdown.com/sprites/trainers/elesa.png",
    "clay": "https://play.pokemonshowdown.com/sprites/trainers/clay.png",
    "skyla": "https://play.pokemonshowdown.com/sprites/trainers/skyla.png",
    "brycen": "https://play.pokemonshowdown.com/sprites/trainers/brycen.png",
    "drayden": "https://play.pokemonshowdown.com/sprites/trainers/drayden.png",
    "iris": "https://play.pokemonshowdown.com/sprites/trainers/iris.png",
    "cheren": "https://play.pokemonshowdown.com/sprites/trainers/cheren.png",
    "roxie": "https://play.pokemonshowdown.com/sprites/trainers/roxie.png",
    "marlon": "https://play.pokemonshowdown.com/sprites/trainers/marlon.png",
    // KALOS
    "viola": "https://play.pokemonshowdown.com/sprites/trainers/viola.png",
    "grant": "https://play.pokemonshowdown.com/sprites/trainers/grant.png",
    "korrina": "https://play.pokemonshowdown.com/sprites/trainers/korrina.png",
    "ramos": "https://play.pokemonshowdown.com/sprites/trainers/ramos.png",
    "clemont": "https://play.pokemonshowdown.com/sprites/trainers/clemont.png",
    "valerie": "https://play.pokemonshowdown.com/sprites/trainers/valerie.png",
    "olympia": "https://play.pokemonshowdown.com/sprites/trainers/olympia.png",
    "wulfric": "https://play.pokemonshowdown.com/sprites/trainers/wulfric.png",
    // ALOLA (Kahuna, no gimnasio)
    "hala": "https://play.pokemonshowdown.com/sprites/trainers/hala.png",
    "olivia": "https://play.pokemonshowdown.com/sprites/trainers/olivia.png",
    "nanu": "https://play.pokemonshowdown.com/sprites/trainers/nanu.png",
    "hapu": "https://play.pokemonshowdown.com/sprites/trainers/hapu.png",
    // GALAR
    "milo": "https://play.pokemonshowdown.com/sprites/trainers/milo.png",
    "nessa": "https://play.pokemonshowdown.com/sprites/trainers/nessa.png",
    "kabu": "https://play.pokemonshowdown.com/sprites/trainers/kabu.png",
    "bea": "https://play.pokemonshowdown.com/sprites/trainers/bea.png",
    "allister": "https://play.pokemonshowdown.com/sprites/trainers/allister.png",
    "opal": "https://play.pokemonshowdown.com/sprites/trainers/opal.png",
    "gordie": "https://play.pokemonshowdown.com/sprites/trainers/gordie.png",
    "melony": "https://play.pokemonshowdown.com/sprites/trainers/melony.png",
    "piers": "https://play.pokemonshowdown.com/sprites/trainers/piers.png",
    "raihan": "https://play.pokemonshowdown.com/sprites/trainers/raihan.png",
    // PALDEA
    "katy": "https://play.pokemonshowdown.com/sprites/trainers/katy.png",
    "brassius": "https://play.pokemonshowdown.com/sprites/trainers/brassius.png",
    "iono": "https://play.pokemonshowdown.com/sprites/trainers/iono.png",
    "kofu": "https://play.pokemonshowdown.com/sprites/trainers/kofu.png",
    "larry": "https://play.pokemonshowdown.com/sprites/trainers/larry.png",
    "ryme": "https://play.pokemonshowdown.com/sprites/trainers/ryme.png",
    "tulip": "https://play.pokemonshowdown.com/sprites/trainers/tulip.png",
    "grusha": "https://play.pokemonshowdown.com/sprites/trainers/grusha.png",
};

// ── Sprites del Alto Mando y Campeones ───────────────────────────
export const ELITE_SPRITES: Record<string, string> = {
    // KANTO
    "lorelei": "https://play.pokemonshowdown.com/sprites/trainers/lorelei.png",
    "bruno": "https://play.pokemonshowdown.com/sprites/trainers/bruno.png",
    "agatha": "https://play.pokemonshowdown.com/sprites/trainers/agatha.png",
    "lance": "https://play.pokemonshowdown.com/sprites/trainers/lance.png",
    "blue": "https://play.pokemonshowdown.com/sprites/trainers/blue.png",
    // JOHTO
    "will": "https://play.pokemonshowdown.com/sprites/trainers/will.png",
    "karen": "https://play.pokemonshowdown.com/sprites/trainers/karen.png",
    // HOENN
    "sidney": "https://play.pokemonshowdown.com/sprites/trainers/sidney.png",
    "phoebe": "https://play.pokemonshowdown.com/sprites/trainers/phoebe.png",
    "glacia": "https://play.pokemonshowdown.com/sprites/trainers/glacia.png",
    "drake": "https://play.pokemonshowdown.com/sprites/trainers/drake.png",
    "steven": "https://play.pokemonshowdown.com/sprites/trainers/steven.png",
    // SINNOH
    "aaron": "https://play.pokemonshowdown.com/sprites/trainers/aaron.png",
    "bertha": "https://play.pokemonshowdown.com/sprites/trainers/bertha.png",
    "flint": "https://play.pokemonshowdown.com/sprites/trainers/flint.png",
    "lucian": "https://play.pokemonshowdown.com/sprites/trainers/lucian.png",
    "cynthia": "https://play.pokemonshowdown.com/sprites/trainers/cynthia.png",
    // UNOVA
    "shauntal": "https://play.pokemonshowdown.com/sprites/trainers/shauntal.png",
    "marshal": "https://play.pokemonshowdown.com/sprites/trainers/marshal.png",
    "grimsley": "https://play.pokemonshowdown.com/sprites/trainers/grimsley.png",
    "caitlin": "https://play.pokemonshowdown.com/sprites/trainers/caitlin.png",
    "alder": "https://play.pokemonshowdown.com/sprites/trainers/alder.png",
    // KALOS
    "malva": "https://play.pokemonshowdown.com/sprites/trainers/malva.png",
    "siebold": "https://play.pokemonshowdown.com/sprites/trainers/siebold.png",
    "wikstrom": "https://play.pokemonshowdown.com/sprites/trainers/wikstrom.png",
    "drasna": "https://play.pokemonshowdown.com/sprites/trainers/drasna.png",
    "diantha": "https://play.pokemonshowdown.com/sprites/trainers/diantha.png",
    // ALOLA
    "acerola": "https://play.pokemonshowdown.com/sprites/trainers/acerola.png",
    "kahili": "https://play.pokemonshowdown.com/sprites/trainers/kahili.png",
    // GALAR
    "leon": "https://play.pokemonshowdown.com/sprites/trainers/leon.png",
    // PALDEA
    "rika": "https://play.pokemonshowdown.com/sprites/trainers/rika.png",
    "poppy": "https://play.pokemonshowdown.com/sprites/trainers/poppy.png",
    "hassel": "https://play.pokemonshowdown.com/sprites/trainers/hassel.png",
    "geeta": "https://play.pokemonshowdown.com/sprites/trainers/geeta.png",
};

// ── Imágenes de Medallas ─────────────────────────────────────────
// Clave: "{region}_{nombre-medalla}" en minúsculas con guiones
// Busca en: https://archives.bulbagarden.net/wiki/Category:Badges
export const BADGE_IMAGES: Record<string, string> = {
    // KANTO
    "kanto_boulder": "",  // Medalla Roca (Brock)
    "kanto_cascade": "",  // Medalla Cascada (Misty)
    "kanto_thunder": "",  // Medalla Trueno (Lt. Surge)
    "kanto_rainbow": "",  // Medalla Arcoíris (Erika)
    "kanto_soul": "",  // Medalla Alma (Koga)
    "kanto_marsh": "",  // Medalla Marcha (Sabrina)
    "kanto_volcano": "",  // Medalla Volcán (Blaine)
    "kanto_earth": "",  // Medalla Tierra (Giovanni)
    // JOHTO
    "johto_zephyr": "",
    "johto_hive": "",
    "johto_plain": "",
    "johto_fog": "",
    "johto_storm": "",
    "johto_mineral": "",
    "johto_glacier": "",
    "johto_rising": "",
    // HOENN
    "hoenn_stone": "",
    "hoenn_knuckle": "",
    "hoenn_dynamo": "",
    "hoenn_heat": "",
    "hoenn_balance": "",
    "hoenn_feather": "",
    "hoenn_mind": "",
    "hoenn_rain": "",
    // SINNOH
    "sinnoh_coal": "",
    "sinnoh_forest": "",
    "sinnoh_cobble": "",
    "sinnoh_fen": "",
    "sinnoh_relic": "",
    "sinnoh_mine": "",
    "sinnoh_icicle": "",
    "sinnoh_beacon": "",
    // UNOVA
    "unova_trio": "",
    "unova_basic": "",
    "unova_insect": "",
    "unova_bolt": "",
    "unova_quake": "",
    "unova_jet": "",
    "unova_freeze": "",
    "unova_legend": "",
    // KALOS
    "kalos_bug": "",
    "kalos_cliff": "",
    "kalos_rumble": "",
    "kalos_plant": "",
    "kalos_voltage": "",
    "kalos_fairy": "",
    "kalos_psychic": "",
    "kalos_iceberg": "",
    // GALAR
    "galar_grass": "",
    "galar_water": "",
    "galar_fire": "",
    "galar_fighting": "",
    "galar_fairy": "",
    "galar_rock": "",
    "galar_dark": "",
    "galar_dragon": "",
};

// ── Mapas Regionales ──────────────────────────────────────────────────
// Se recomiendan dos mapas por región:
// 1. mainMapKey: El arte oficial de la región (vista general).
// 2. inGameMapKey: Una captura o recreación del mapa en el juego (pixel art o menú).
export const REGION_MAPS: Record<string, string> = {
    "kanto_main": "https://images.wikidexcdn.net/mwuploads/wikidex/5/5b/latest/20180712231931/Mapa_de_Kanto_LGPE.png",
    "kanto_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/6/60/latest/20230918180133/Kanto_mapa_juegos_RA.png",
    "johto_main": "https://images.wikidexcdn.net/mwuploads/wikidex/f/fe/latest/20180203062443/Johto_HGSS.png",
    "johto_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/4/43/latest/20090920215330/Johto_mapa_juegos.png",
    "hoenn_main": "https://images.wikidexcdn.net/mwuploads/wikidex/a/af/latest/20150228012617/Mapa_de_Hoenn_ROZA.png",
    "hoenn_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/9/99/latest/20081229021010/Hoenn_mapa_juegos.png",
    "sinnoh_main": "https://images.wikidexcdn.net/mwuploads/wikidex/d/d2/latest/20210825190744/Sinnoh_DBPR.png",
    "sinnoh_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c7/latest/20211208122552/Mapa_Sinnoh_DBPR.png",
    "unova_main": "https://images.wikidexcdn.net/mwuploads/wikidex/2/29/latest/20160818015101/Teselia_N2B2.png",
    "unova_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/d/dd/latest/20120710141029/Teselia2_mapa_juegos.png",
    "kalos_main": "https://images.wikidexcdn.net/mwuploads/wikidex/0/05/latest/20160917035956/Mapa_Kalos.png",
    "kalos_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/8/8d/latest/20131018190652/Mapa_Kalos_juegos.png",
    "alola_main": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e5/latest/20170819025541/Alola_USUL.png",
    "alola_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/d/d6/latest/20221114184549/Mapa_Alola_USUL.png",
    "galar_main": "https://images.wikidexcdn.net/mwuploads/wikidex/4/41/latest/20190227161647/Galar.png",
    "galar_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/8/82/latest/20201109111018/Mapa_Galar_completo.png",
    "paldea_main": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a1/latest/20220803152242/Paldea.jpg",
    "paldea_ingame": "https://images.wikidexcdn.net/mwuploads/wikidex/0/07/latest/20221125100620/Mapa_de_Paldea.png",
};

// ── Imágenes de Ciudades/Lugares ──────────────────────────────────────
// Imágenes para embellecer las tarjetas de los lugares de la región.
export const CITY_IMAGES: Record<string, string> = {
    // Kanto
    "kanto_pallet_town": "https://images.wikidexcdn.net/mwuploads/wikidex/6/62/latest/20230920213458/Pueblo_Paleta_LGPE.png",
    "kanto_viridian_city": "https://images.wikidexcdn.net/mwuploads/wikidex/3/3c/latest/20230920213521/Ciudad_Verde_LGPE.png",
    "kanto_pewter_city": "https://images.wikidexcdn.net/mwuploads/wikidex/9/99/latest/20230920213549/Ciudad_Plateada_LGPE.png",
    "kanto_cerulean_city": "https://images.wikidexcdn.net/mwuploads/wikidex/0/0a/latest/20230920213618/Ciudad_Celeste_LGPE.png",
    "kanto_vermilion_city": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c4/latest/20230920213648/Ciudad_Carm%C3%ADn_LGPE.png",
    "kanto_lavender_town": "https://images.wikidexcdn.net/mwuploads/wikidex/6/60/latest/20230920213710/Pueblo_Lavanda_LGPE.png",
    "kanto_celadon_city": "https://images.wikidexcdn.net/mwuploads/wikidex/8/82/latest/20230920213740/Ciudad_Azulona_LGPE.png",
    "kanto_fuchsia_city": "https://images.wikidexcdn.net/mwuploads/wikidex/a/ad/latest/20230920213831/Ciudad_Fucsia_LGPE.png",
    "kanto_saffron_city": "https://images.wikidexcdn.net/mwuploads/wikidex/1/1b/latest/20230920213804/Ciudad_Azafr%C3%A1n_LGPE.png",
    "kanto_cinnabar_island": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e2/Isla_Canela_LGPE.png",
    "kanto_seafoam_islands": "https://images.wikidexcdn.net/mwuploads/wikidex/f/f5/latest/20230921140509/Islas_Espuma_LGPE.png",
    "kanto_indigo_plateau": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c4/latest/20230920214025/Meseta_A%C3%B1il_LGPE.png",
    // Johto
    "johto_new_bark": "https://images.wikidexcdn.net/mwuploads/wikidex/1/13/latest/20200726021431/Pueblo_Primavera_HGSS.png",
    "johto_cherrygrove": "https://images.wikidexcdn.net/mwuploads/wikidex/5/55/Ciudad_Cerezo_HGSS.png",
    "johto_violet": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6b/latest/20100207124937/Ciudad_Malva_HGSS.png",
    "johto_azalea": "https://images.wikidexcdn.net/mwuploads/wikidex/5/5c/latest/20100126015427/Pueblo_Azalea_HGSS.png",
    "johto_ecruteak": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e2/latest/20200726023848/Ciudad_Iris_HGSS.png",
    "johto_goldenrod": "https://images.wikidexcdn.net/mwuploads/wikidex/9/96/latest/20100402233311/Ciudad_Trigal_HGSS.png",
    "johto_olivine": "https://images.wikidexcdn.net/mwuploads/wikidex/8/88/latest/20200726024201/Ciudad_Olivo_HGSS.png",
    "johto_cianwood": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b8/latest/20100126015427/Ciudad_Orqu%C3%ADdea_HGSS.png",
    "johto_mahogany": "https://images.wikidexcdn.net/mwuploads/wikidex/4/4b/latest/20100126015427/Pueblo_Caoba_HGSS.png",
    "johto_blackthorn": "https://images.wikidexcdn.net/mwuploads/wikidex/d/da/latest/20200726021849/Ciudad_Endrino_HGSS.png",
    "johto_indigo_plateau": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c4/latest/20230920214025/Meseta_A%C3%B1il_LGPE.png",
    // Hoenn
    "hoenn_littleroot": "https://images.wikidexcdn.net/mwuploads/wikidex/4/4d/latest/20141203154809/Villa_Ra%C3%ADz_ROZA.jpg",
    "hoenn_oldale": "https://images.wikidexcdn.net/mwuploads/wikidex/1/14/latest/20150526210550/Pueblo_Escaso_ROZA.png",
    "hoenn_petalburg": "https://images.wikidexcdn.net/mwuploads/wikidex/5/5f/latest/20150227235639/Ciudad_Petalia_ROZA.png",
    "hoenn_rustboro": "https://images.wikidexcdn.net/mwuploads/wikidex/4/4e/latest/20170516023201/Ciudad_F%C3%A9rrica_ROZA.png",
    "hoenn_dewford": "https://images.wikidexcdn.net/mwuploads/wikidex/2/23/latest/20151013222841/Pueblo_Azuliza_ROZA.png",
    "hoenn_slateport": "https://images.wikidexcdn.net/mwuploads/wikidex/b/ba/latest/20150729123655/Ciudad_Portual_ROZA.png",
    "hoenn_mauville": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b0/latest/20240404041537/Artwork_Ciudad_Malvalona_ROZA.png",
    "hoenn_verdanturf": "https://images.wikidexcdn.net/mwuploads/wikidex/7/74/latest/20170711002903/Pueblo_Verdegal_ROZA.png",
    "hoenn_lavaridge": "https://images.wikidexcdn.net/mwuploads/wikidex/4/4b/latest/20150602125933/Pueblo_Lavacalda_ROZA.png",
    "hoenn_fallarbor": "https://images.wikidexcdn.net/mwuploads/wikidex/2/2d/latest/20150930204922/Pueblo_Pardal_ROZA.png",
    "hoenn_fortree": "https://images.wikidexcdn.net/mwuploads/wikidex/9/9e/latest/20140610185307/Ciudad_Arborada_ROZA.png",
    "hoenn_lilycove": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a4/latest/20170215222258/Ciudad_Calagua_ROZA.png",
    "hoenn_mossdeep": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e9/latest/20150603020208/Ciudad_Algaria_ROZA.png",
    "hoenn_sootopolis": "https://images.wikidexcdn.net/mwuploads/wikidex/4/4a/latest/20200605155600/Arrec%C3%ADpolis_ROZA.png",
    "hoenn_pacifidlog": "https://images.wikidexcdn.net/mwuploads/wikidex/3/37/latest/20150930163505/Pueblo_Oromar_ROZA.png",
    "hoenn_ever_grande": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e8/latest/20171112201733/Acceso_a_Ciudad_Colosalia_en_ROZA.png",
    // Sinnoh
    "sinnoh_twinleaf": "https://images.wikidexcdn.net/mwuploads/wikidex/b/bd/latest/20210226224813/Pueblo_Hojaverde_DBPR.jpg",
    "sinnoh_sandgem": "https://images.wikidexcdn.net/mwuploads/wikidex/8/86/latest/20221108052602/Pueblo_Arena_DBPR.jpg",
    "sinnoh_jubilife": "https://images.wikidexcdn.net/mwuploads/wikidex/0/0c/latest/20221109041428/Ciudad_Jubileo_DBPR.jpg",
    "sinnoh_oreburgh": "https://images.wikidexcdn.net/mwuploads/wikidex/1/12/latest/20181023010442/Ciudad_Pirita.png",
    "sinnoh_floaroma": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e6/latest/20221111052749/Pueblo_Aromaflor_DBPR.jpg",
    "sinnoh_eterna": "https://images.wikidexcdn.net/mwuploads/wikidex/9/94/latest/20221110031132/Ciudad_Vetusta_DBPR.jpg",
    "sinnoh_hearthome": "https://images.wikidexcdn.net/mwuploads/wikidex/1/1e/latest/20221110031301/Ciudad_Coraz%C3%B3n_DBPR.jpg",
    "sinnoh_solaceon": "https://images.wikidexcdn.net/mwuploads/wikidex/e/ee/latest/20221110034934/Pueblo_Sosiego_DBPR.jpg",
    "sinnoh_veilstone": "https://images.wikidexcdn.net/mwuploads/wikidex/7/72/latest/20211205055614/Ciudad_Rocavelo_DBPR.png",
    "sinnoh_pastoria": "https://images.wikidexcdn.net/mwuploads/wikidex/4/49/latest/20211205054530/Ciudad_Pradera_DBPR.png",
    "sinnoh_celestic": "https://images.wikidexcdn.net/mwuploads/wikidex/1/11/Pueblo_CAelestis_DBPR.jpg",
    "sinnoh_canalave": "https://images.wikidexcdn.net/mwuploads/wikidex/3/3d/latest/20221110041745/Ciudad_Canal_DBPR.jpg",
    "sinnoh_snowpoint": "https://images.wikidexcdn.net/mwuploads/wikidex/3/38/latest/20211216061550/Ciudad_Puntaneva_DBPR.jpg",
    "sinnoh_sunyshore": "https://images.wikidexcdn.net/mwuploads/wikidex/4/4c/latest/20211221234117/Ciudad_Marina_DBPR.jpg",
    // Unova
    "unova_nuvema": "https://images.wikidexcdn.net/mwuploads/wikidex/8/84/latest/20170510031922/Pueblo_Arcilla.png",
    "unova_accumula": "https://images.wikidexcdn.net/mwuploads/wikidex/f/f7/latest/20131029161811/Pueblo_Terracota.jpg",
    "unova_striaton": "https://images.wikidexcdn.net/mwuploads/wikidex/9/94/latest/20170925014758/Ciudad_Gres.png",
    "unova_nacrene": "https://images.wikidexcdn.net/mwuploads/wikidex/0/01/Ciudad_Esmalte_N2B2.png",
    "unova_castelia": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6b/latest/20160310215528/Ciudad_Porcelana.png",
    "unova_nimbasa": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a3/Ciudad_May%C3%B3lica_N2B2.png",
    "unova_driftveil": "https://images.wikidexcdn.net/mwuploads/wikidex/7/75/latest/20170127022501/Ciudad_Fayenza_N2B2.png",
    "unova_mistralton": "https://images.wikidexcdn.net/mwuploads/wikidex/d/d5/latest/20170412232546/Ciudad_Loza_%282%29.png",
    "unova_icirrus": "https://images.wikidexcdn.net/mwuploads/wikidex/0/04/latest/20170510030921/Ciudad_Teja.png",
    "unova_anville": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e5/latest/20170724035005/Pueblo_Biscuit.jpg",
    "unova_opelucid": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b9/Ciudad_Caol%C3%ADn_N2.png",
    "unova_lacunosa": "https://images.wikidexcdn.net/mwuploads/wikidex/0/07/latest/20160706230258/Pueblo_Ladrillo_N2B2.png",
    "unova_undella": "https://images.wikidexcdn.net/mwuploads/wikidex/f/f7/latest/20180817022810/Pueblo_Arenisca_N2B2.png",
    "unova_white_forest": "https://images.wikidexcdn.net/mwuploads/wikidex/2/2a/latest/20110624210509/Bosque_Blanco.png",
    "unova_black_city": "https://images.wikidexcdn.net/mwuploads/wikidex/0/0d/latest/20110624210811/Ciudad_Negra.png",
    "unova_aspertia": "https://images.wikidexcdn.net/mwuploads/wikidex/6/68/latest/20160626025511/Ciudad_Engobe.png",
    "unova_floccesy": "https://images.wikidexcdn.net/mwuploads/wikidex/f/f2/latest/20160626024451/Pueblo_Ocre.png",
    "unova_virbank": "https://images.wikidexcdn.net/mwuploads/wikidex/9/90/latest/20160626023851/Ciudad_Hormig%C3%B3n.png",
    "unova_humilau": "https://images.wikidexcdn.net/mwuploads/wikidex/0/0f/latest/20160626022609/Ciudad_Marga.png",
    "unova_lentimas": "https://images.wikidexcdn.net/mwuploads/wikidex/7/7f/latest/20160626012017/Pueblo_Chamota.png",
    // Kalos
    "kalos_vaniville": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c8/latest/20131027045857/Pueblo_Boceto.png",
    "kalos_aquacorde": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a1/latest/20140217225809/Pueblo_Acuarela_XY.png",
    "kalos_santalune": "https://images.wikidexcdn.net/mwuploads/wikidex/2/27/latest/20140217224140/Ciudad_Novarte.png",
    "kalos_lumiose": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c4/latest/20130614175838/Ciudad_Luminalia.png",
    "kalos_camphrier": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a6/latest/20140222003832/Pueblo_V%C3%A1nitas.png",
    "kalos_ambrette": "https://images.wikidexcdn.net/mwuploads/wikidex/5/50/latest/20131030001409/Pueblo_Petroglifo_XY.png",
    "kalos_kiloude": "https://images.wikidexcdn.net/mwuploads/wikidex/8/8a/latest/20131225192915/Mapa_Ciudad_Batik.png",
    "kalos_cyllage": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e8/latest/20131030002106/Ciudad_relieve.png",
    "kalos_geosenge": "https://images.wikidexcdn.net/mwuploads/wikidex/9/97/latest/20131109131825/Pueblo_Cr%C3%B3mlech_XY.jpg",
    "kalos_coumarine": "https://images.wikidexcdn.net/mwuploads/wikidex/1/13/latest/20131109132734/Ciudad_T%C3%A9mpera_full.jpg",
    "kalos_shalour": "https://images.wikidexcdn.net/mwuploads/wikidex/9/9c/latest/20131109132158/Ciudad_Yantra_full.jpg",
    "kalos_laverre": "https://images.wikidexcdn.net/mwuploads/wikidex/9/9d/latest/20131109132925/Ciudad_Romantis_Full.jpg",
    "kalos_dendemille": "https://images.wikidexcdn.net/mwuploads/wikidex/b/bb/latest/20131109133745/Pueblo_Fresco_Full.jpg",
    "kalos_anistar": "https://images.wikidexcdn.net/mwuploads/wikidex/0/07/latest/20131109134645/Ciudad_Fluxus_XY.jpg",
    "kalos_couriway": "https://images.wikidexcdn.net/mwuploads/wikidex/6/65/latest/20131109135046/Pueblo_Mosaico_full.jpg",
    "kalos_snowbelle": "https://images.wikidexcdn.net/mwuploads/wikidex/5/5c/latest/20131109135414/Ciudad_Fractal_XY.jpg",
    // Alola
    "alola_iki": "https://images.wikidexcdn.net/mwuploads/wikidex/7/75/latest/20161218201633/Artwork_Pueblo_Lilii.png",
    "alola_hauoli": "https://images.wikidexcdn.net/mwuploads/wikidex/4/42/latest/20161218202235/Artwork_Ciudad_Hauoli.png ",
    "alola_heahea": "https://images.wikidexcdn.net/mwuploads/wikidex/3/30/latest/20190418005817/Ciudad_Kantai_USUL.png",
    "alola_paniola": "https://images.wikidexcdn.net/mwuploads/wikidex/d/dc/latest/20200928175706/Pueblo_Ohana_USUL.png",
    "alola_royal": "https://images.wikidexcdn.net/mwuploads/wikidex/3/34/latest/20200926230635/Avenida_Royale_USUL.png",
    "alola_hano_grand_resort": "https://images.wikidexcdn.net/mwuploads/wikidex/3/3b/latest/20180526165120/Rosa_de_hanohano.png",
    "alola_konikoni": " https://images.wikidexcdn.net/mwuploads/wikidex/8/82/latest/20200926235405/Ciudad_Konikoni_USUL.png",
    "alola_malie": "https://images.wikidexcdn.net/mwuploads/wikidex/f/ff/latest/20200929135505/Ciudad_Mal%C3%ADe_USUL.png",
    "alola_hokulani": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c6/latest/20180730034723/Pico_Hokulani.png ",
    "alola_tapu": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e8/latest/20170117022319/Ruta_14_%28Alola%29.png",
    "alola_po": "https://images.wikidexcdn.net/mwuploads/wikidex/9/95/latest/20180224220631/Bocetos_Pueblo_Po_interior.png",
    "alola_seafolk": "https://images.wikidexcdn.net/mwuploads/wikidex/1/13/latest/20180331014731/Aldea_marina_Flashback.png",
    // Galar
    "galar_postwick": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6c/latest/20191229002318/Casa_del_protagonista_EpEc.png",
    "galar_wedgehurst": "https://images.wikidexcdn.net/mwuploads/wikidex/3/37/latest/20191116213325/Pueblo_Par_EpEc.png",
    "galar_turffield": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a0/latest/20191116043639/Pueblo_Hoyuelo_EpEc.png",
    "galar_hulbury": "https://images.wikidexcdn.net/mwuploads/wikidex/b/bc/latest/20191229035808/Pueblo_Amura_EpEc.png",
    "galar_motostoke": "https://images.wikidexcdn.net/mwuploads/wikidex/6/69/latest/20191217023218/Ciudad_Pist%C3%B3n_EpEc.png",
    "galar_hammerlocke": "https://images.wikidexcdn.net/mwuploads/wikidex/c/c8/latest/20200828213531/Ciudad_artejo_casas_EpEc.jpg",
    "galar_stowonside": "https://images.wikidexcdn.net/mwuploads/wikidex/8/88/latest/20191122233332/Pueblo_Ladera_EpEc.png",
    "galar_ballonlea": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b1/latest/20191119030220/Pueblo_Pli%C3%A9_EpEc.png",
    "galar_circhester": "https://images.wikidexcdn.net/mwuploads/wikidex/9/91/latest/20191120032925/Pueblo_Auriga_EpEc.png",
    "galar_spikemuth": "https://images.wikidexcdn.net/mwuploads/wikidex/6/62/latest/20191123222739/Calle_de_Cramp%C3%B3n_EpEc.png",
    "galar_wyndon": "https://images.wikidexcdn.net/mwuploads/wikidex/d/dc/latest/20191130001822/Calle_de_Ciudad_Puntera_EpEc.png",
    // Paldea
    "paldea_cabo_poco": "https://images.wikidexcdn.net/mwuploads/wikidex/1/1f/latest/20230626135815/Pueblo_Cah%C3%ADz_EP.jpg",
    "paldea_los_platos": "https://images.wikidexcdn.net/mwuploads/wikidex/8/8e/latest/20230625130808/Pueblo_Ataifor_EP.jpg",
    "paldea_mesagoza": "https://images.wikidexcdn.net/mwuploads/wikidex/4/49/latest/20220805020732/Academia_y_plaza_de_Meseta_EP.jpg",
    "paldea_artazon": "https://images.wikidexcdn.net/mwuploads/wikidex/0/02/latest/20220910014110/Esculturas_de_Sunflora_en_Pueblo_Altam%C3%ADa_EP.jpg",
    "paldea_cortondo": "https://images.wikidexcdn.net/mwuploads/wikidex/e/eb/latest/20230625134629/Pueblo_Pirot%C3%ADn_EP.jpg",
    "paldea_levincia": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b3/latest/20230113202142/Ciudad_Leudal_EP.png",
    "paldea_zapapico": "https://images.wikidexcdn.net/mwuploads/wikidex/8/8b/latest/20230625134639/Pueblo_Veta_EP.jpg",
    "paldea_cascarrafa": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e5/latest/20230625130941/Ciudad_C%C3%A1ntara_EP.jpg",
    "paldea_porto_marinada": "https://images.wikidexcdn.net/mwuploads/wikidex/9/99/latest/20230625131100/Pueblo_Marinada_EP.jpg",
    "paldea_medali": "https://images.wikidexcdn.net/mwuploads/wikidex/3/3f/latest/20230113204746/Pueblo_Mestura_vista_a%C3%A9rea_EP.png",
    "paldea_montenevera": "https://images.wikidexcdn.net/mwuploads/wikidex/0/05/latest/20221209052543/Pueblo_Hozkailu_EP.jpg",
    "paldea_alfornada": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6f/latest/20221207140739/Pueblo_Alforno.jpg",
    // Paldea Zonas y Áreas
    "paldea_area_sendero_cahiz": "https://images.wikidexcdn.net/mwuploads/wikidex/6/60/latest/20230626134229/Sendero_de_Cah%C3%ADz_EP.jpg",
    "paldea_area_1_sur": "https://images.wikidexcdn.net/mwuploads/wikidex/f/fa/latest/20230627134450/%C3%81rea_1_del_Sur_EP.jpg",
    "paldea_area_meseta": "https://images.wikidexcdn.net/mwuploads/wikidex/2/2b/latest/20230626230101/Emplazamiento_de_Ciudad_Meseta_EP.jpg",
    "paldea_area_2_sur": "https://images.wikidexcdn.net/mwuploads/wikidex/a/a4/latest/20230625131724/%C3%81rea_2_%28Sur%29_EP.jpg",
    "paldea_area_3_sur": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b4/latest/20230625131617/%C3%81rea_3_del_Sur_EP.jpg",
    "paldea_area_4_sur": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6a/latest/20230625131756/%C3%81rea_4_%28Sur%29_EP.jpg",
    "paldea_area_5_sur": "https://images.wikidexcdn.net/mwuploads/wikidex/3/31/latest/20230625132451/%C3%81rea_5_%28Sur%29_EP.jpg",
    "paldea_area_6_sur": "https://images.wikidexcdn.net/mwuploads/wikidex/0/0a/latest/20230625132704/%C3%81rea_6_%28Sur%29_EP.jpg",
    "paldea_area_1_este": "https://images.wikidexcdn.net/mwuploads/wikidex/a/ab/latest/20230626135607/%C3%81rea_1_del_este_EP.jpg",
    "paldea_area_2_este": "https://images.wikidexcdn.net/mwuploads/wikidex/9/9d/latest/20230626135625/%C3%81rea_2_del_este_EP.jpg",
    "paldea_area_3_este": "https://images.wikidexcdn.net/mwuploads/wikidex/2/27/latest/20230626135642/%C3%81rea_3_del_este_EP.jpg",
    "paldea_area_bosquejada": "https://images.wikidexcdn.net/mwuploads/wikidex/2/2b/latest/20230626135731/Bosquejada_EP.jpg",
    "paldea_area_1_oeste": "https://images.wikidexcdn.net/mwuploads/wikidex/d/dc/latest/20230626135616/%C3%81rea_1_del_oeste_EP.jpg",
    "paldea_area_2_oeste": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6a/latest/20230626135632/%C3%81rea_2_del_oeste_EP.jpg",
    "paldea_area_3_oeste": "https://images.wikidexcdn.net/mwuploads/wikidex/b/b2/latest/20230626135649/%C3%81rea_3_del_oeste_EP.jpg",
    "paldea_area_desierto_rostiz": "https://images.wikidexcdn.net/mwuploads/wikidex/8/82/latest/20230626135747/Desierto_Rostiz_EP.jpg",
    "paldea_area_gruta_vestura": "https://images.wikidexcdn.net/mwuploads/wikidex/e/ee/latest/20230626202128/Gruta_Vestura_EP.jpg",
    "paldea_area_1_norte": "https://images.wikidexcdn.net/mwuploads/wikidex/8/87/latest/20230625131307/%C3%81rea_1_%28Norte%29_EP.jpg",
    "paldea_area_2_norte": "https://images.wikidexcdn.net/mwuploads/wikidex/6/62/latest/20230316003956/%C3%81rea_2_del_norte_EP.jpg",
    "paldea_area_3_norte": "https://images.wikidexcdn.net/mwuploads/wikidex/6/64/latest/20230625131336/%C3%81rea_3_EP.jpg",
    "paldea_area_sierra_napada": "https://images.wikidexcdn.net/mwuploads/wikidex/b/bd/latest/20230404221549/Sierra_Napada_EP.jpg",
    "paldea_area_lago_cazola": "https://images.wikidexcdn.net/mwuploads/wikidex/8/81/latest/20230404220319/Lago_Cazola_EP.jpg",
    "paldea_area_alameda_socarrada": "https://images.wikidexcdn.net/mwuploads/wikidex/d/d0/latest/20230404220441/Alameda_Socarrada_EP.jpg",
    "paldea_area_foso": "https://images.wikidexcdn.net/mwuploads/wikidex/8/80/latest/20230626135757/Foso_de_Paldea_EP.jpg",
    "paldea_area_cero": "https://images.wikidexcdn.net/mwuploads/wikidex/5/52/latest/20231225230247/%C3%81rea_Cero_EP.jpg",
    "paldea_area_caverna_abisal": "https://images.wikidexcdn.net/mwuploads/wikidex/9/92/latest/20231219182240/Caverna_Abisal_Cero_EP.jpg",
    "paldea_area_liga": "https://images.wikidexcdn.net/mwuploads/wikidex/6/6d/latest/20230626230055/Emplazamiento_de_la_Liga_Pok%C3%A9mon_EP.jpg",
};

// ── Imágenes de Organizaciones Villanas ───────────────────────────────
// Logo o imagen del líder/equipo villano
export const VILLAIN_IMAGES: Record<string, string> = {
    "team_rocket": "https://ih1.redbubble.net/image.952740886.2093/st,small,507x507-pad,600x600,f8f8f8.jpg",
    "magma_aqua": "https://images.wikidexcdn.net/mwuploads/wikidex/e/ea/latest/20211230002336/Equipo_Magma_ROZA.png",
    "galaxy": "https://images.wikidexcdn.net/mwuploads/wikidex/f/f5/latest/20211105101050/Equipo_Galaxia_Logo.png",
    "plasma": "https://images.wikidexcdn.net/mwuploads/wikidex/e/e4/latest/20121012035004/Equipo_Plasma_Logo.png",
    "flare": "https://images.wikidexcdn.net/mwuploads/wikidex/9/92/latest/20230624102131/Logo_Team_Flare.png",
    "skull_aether": "https://images.wikidexcdn.net/mwuploads/wikidex/9/9f/latest/20161203191900/Team_Skull.png",
    "macro_cosmos": "https://images.wikidexcdn.net/mwuploads/wikidex/5/5e/latest/20191202183307/Macrocosmos.png",
    "star": "https://images.wikidexcdn.net/mwuploads/wikidex/1/18/latest/20221006153617/Team_Star.png",
};
