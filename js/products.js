/* =========================================================
   LOS 12 MUNDOS · Catálogo de productos
   ---------------------------------------------------------
   ✏️  Para cambiar un precio, edita el campo `price` (en euros).
   ✏️  `months` usa números de mes (1 = enero … 12 = diciembre).
       Una lista vacía [] significa "para todo el curso".
   ✏️  `badge` es opcional ("Novedad", "Más vendida", …).
   ========================================================= */

window.L12M_CONFIG = {
  currency: "EUR",
  // ✏️ Datos de contacto: cámbialos por los reales antes de publicar
  email: "hola@los12mundos.es",
  whatsapp: "34600000000", // con prefijo de país, sin "+" ni espacios
  phoneLabel: "600 000 000",
  instagram: "https://instagram.com/",
  location: "España",
  // Descuento automático por volumen (pon 0 para desactivar)
  bulkDiscount: { minBoxes: 5, percent: 10 },
  freeShippingFrom: 120, // € (pon 0 para ocultar el aviso)
};

window.L12M_CATEGORIES = [
  { id: "estaciones", short: "Estaciones", label: "Estaciones", emoji: "🍂", color: "#F5A524" },
  { id: "fiestas", short: "Fiestas", label: "Fiestas y tradiciones", emoji: "🎉", color: "#EF6F8C" },
  { id: "valores", short: "Valores", label: "Valores y días especiales", emoji: "💜", color: "#8E6CC2" },
  { id: "proyectos", short: "Proyectos", label: "Proyectos temáticos", emoji: "🚀", color: "#2BA79A" },
];

window.L12M_PRODUCTS = [
  /* ---------------- ESTACIONES ---------------- */
  {
    id: "otono",
    name: "Caja Otoño",
    category: "estaciones",
    price: 39.9,
    months: [9, 10, 11],
    badge: "Más vendida",
    short: "Hojas, frutos y animales del bosque para descubrir la estación más colorida.",
    description:
      "Todo lo necesario para trabajar el otoño en el aula: hojas de fieltro, frutos secos naturales, erizos y setas para la manipulación, y fichas para hablar de las estaciones del año.",
    contents: [
      "Láminas para colorear del otoño",
      "Cartel «¡Bienvenido Otoño!»",
      "Tarjetas «Los frutos del otoño» y «Las estaciones del año»",
      "Hojas de fieltro y naturales en tonos otoñales",
      "Piñas, bellotas y castañas para manipular",
      "Erizos, setas y girasoles decorativos",
      "Palitos y rotuladores de colores",
      "Fichas de clasificación de hojas",
    ],
  },
  {
    id: "invierno",
    name: "Caja Invierno",
    category: "estaciones",
    price: 39.9,
    months: [12, 1, 2],
    short: "Copos de nieve, pingüinos y ositos para un invierno lleno de juego.",
    description:
      "Una caja en blancos y azules para explorar el frío, los animales del invierno y el ciclo de la estación con material sensorial y de manualidades.",
    contents: [
      "Láminas para colorear de invierno",
      "Cartel «¡Bienvenido Invierno!»",
      "Tarjetas «El ciclo del invierno»",
      "Copos de nieve decorativos",
      "Figuras de pingüinos, ositos y muñecos de nieve",
      "Pompones blancos y azules",
      "Tarjetas «Los animales del invierno»",
      "Palitos de madera y material de manualidades",
    ],
  },
  {
    id: "primavera",
    name: "Caja Primavera",
    category: "estaciones",
    price: 39.9,
    months: [3, 4, 5],
    short: "Flores, bichitos y arcoíris para celebrar que llega el buen tiempo.",
    description:
      "Llena el aula de color con flores de fieltro, molinillos, tarjetas de insectos y actividades para cuidar la naturaleza.",
    contents: [
      "Láminas para colorear de primavera",
      "Cartel «¡Bienvenida Primavera!»",
      "Tarjetas «El ciclo de la primavera»",
      "Flores de fieltro y arcoíris decorativo",
      "Tarjetas de bichitos: mariquita, mariposa, abeja…",
      "Molinillos de viento",
      "Fichas «Las fiestas de primavera» y «Cuidamos la naturaleza»",
      "Rotuladores y limpiapipas de colores",
    ],
  },
  {
    id: "verano",
    name: "Caja Verano",
    category: "estaciones",
    price: 44.9,
    months: [6, 7],
    short: "Playa, agua y sol: la caja perfecta para terminar el curso.",
    description:
      "Material de juego de playa, arena y conchas para una actividad sensorial, y complementos veraniegos para las fiestas de fin de curso.",
    contents: [
      "Láminas para colorear de verano",
      "Toallitas estampadas",
      "Pelotas de playa",
      "Gafas de buceo y gafas de sol",
      "Chanclas decorativas",
      "Arena y conchas para bandeja sensorial",
      "Pulseras de colores",
      "Rotuladores y figuras de goma EVA",
    ],
  },

  /* ---------------- FIESTAS Y TRADICIONES ---------------- */
  {
    id: "halloween",
    name: "Caja Halloween",
    category: "fiestas",
    price: 42.9,
    months: [10],
    badge: "Más vendida",
    short: "Calabazas, gatitos y fantasmas… ¡un Halloween de risa, no de miedo!",
    description:
      "Antifaces, manualidades y juegos de calabaza para una fiesta de Halloween adaptada a los más pequeños.",
    contents: [
      "Láminas «¡Feliz Halloween!» para colorear",
      "Cuento «La casa encantada»",
      "Antifaces de gato, calabaza y monstruo",
      "Juego «¿Qué hay en la calabaza?»",
      "Tarjetas «Disfraces de Halloween»",
      "Manualidad «Mi calabaza»",
      "Pegatinas y figuras temáticas",
      "Cuentas y material de manualidades",
    ],
  },
  {
    id: "espana",
    name: "Caja Conociendo España",
    category: "fiestas",
    price: 37.9,
    months: [10, 12],
    short: "Bandera, mapa y gastronomía para el Día de la Hispanidad o de la Constitución.",
    description:
      "Una primera aproximación a España: su bandera, su mapa y sus platos más conocidos, con actividades de pintura y vocabulario.",
    contents: [
      "Banderas y banderines de España",
      "Mapa de España para colorear",
      "Tarjetas de vocabulario gastronómico (paella, tortilla…)",
      "Librito de la Constitución",
      "Pintura roja y amarilla",
      "Pinceles y globos",
    ],
  },
  {
    id: "inmaculada",
    name: "Caja Día de la Inmaculada",
    category: "fiestas",
    price: 37.9,
    months: [12],
    short: "Láminas, figuras y manualidades para celebrar el 8 de diciembre.",
    description:
      "Caja en tonos azules con figuras, láminas y una manualidad de rosario de fieltro para trabajar esta festividad.",
    contents: [
      "Láminas para colorear de la Inmaculada",
      "Cartel «Día de la Inmaculada»",
      "Figuras decorativas",
      "Rosario de fieltro para montar",
      "Bolsita de tela con lazo",
      "Pegatinas y flores decorativas",
      "Rotuladores",
    ],
  },
  {
    id: "navidad",
    name: "Caja Navidad",
    category: "fiestas",
    price: 44.9,
    months: [12],
    badge: "Más vendida",
    short: "Árbol, Reyes Magos y Papá Noel para vivir la Navidad en el aula.",
    description:
      "Todo para decorar, crear y contar la Navidad: árbol de fieltro, figuras de los Reyes Magos, luces y pegatinas.",
    contents: [
      "Láminas navideñas para colorear",
      "Árbol de Navidad de fieltro con adornos",
      "Figuras de los Reyes Magos",
      "Gorro de Papá Noel",
      "Guirnalda de luces decorativa",
      "Cartel «¡Feliz Navidad!»",
      "Pegatinas navideñas",
      "Ceras de colores",
    ],
  },
  {
    id: "carnaval",
    name: "Caja Carnaval",
    category: "fiestas",
    price: 42.9,
    months: [2],
    short: "Antifaces, plumas, confeti e instrumentos para el desfile más divertido.",
    description:
      "Disfraces, música y color: una caja pensada para preparar el desfile de Carnaval de la escuela infantil.",
    contents: [
      "Láminas de Carnaval para colorear",
      "Antifaces de goma EVA",
      "Plumas de colores",
      "Maracas y panderetas",
      "Matasuegras y confeti",
      "Pompones y figuras de payaso",
      "Cartel «¡Viva el Carnaval!»",
    ],
  },
  {
    id: "andalucia",
    name: "Caja Día de Andalucía",
    category: "fiestas",
    price: 39.9,
    months: [2],
    short: "Monumentos, banderas y tradiciones para el 28 de febrero.",
    description:
      "Descubre Andalucía con tarjetas de monumentos y provincias, juegos de asociación, abanicos y banderas verdiblancas.",
    contents: [
      "Láminas «Andalucía» para colorear",
      "Cartel «Conociendo Andalucía»",
      "Tarjetas de monumentos y provincias",
      "Juego «Elige y coloca»",
      "Tarjetas «Los colores de Andalucía»",
      "Abanicos y banderas verdiblancas",
      "Fichas de trajes típicos y fiestas",
    ],
  },
  {
    id: "fallas",
    name: "Caja Fallas",
    category: "fiestas",
    price: 42.9,
    months: [3],
    short: "Falleras, ninots y mucha música para vivir las Fallas.",
    description:
      "Figuras de madera para decorar, instrumentos y láminas para acercar la fiesta valenciana a los más pequeños.",
    contents: [
      "Láminas de Fallas para colorear",
      "Figuras de ninots y falleras",
      "Cuento «¡Viva las Fallas!»",
      "Tambor y castañuelas",
      "Flores decorativas",
      "Cuentas de colores",
      "Ceras",
    ],
  },
  {
    id: "semana-santa",
    name: "Caja Semana Santa",
    category: "fiestas",
    price: 39.9,
    months: [3, 4],
    short: "Láminas, figuras de madera y ramas de palma para la Semana Santa.",
    description:
      "Material para contar la Semana Santa con figuras de madera, laberintos, fichas y ramas de palma.",
    contents: [
      "Láminas para colorear",
      "Figuras de madera",
      "Cruces y fichas de madera",
      "Ramas de palma decorativas",
      "Laberintos y fichas de actividades",
      "Cartel «Domingo de Ramos»",
      "Ceras de colores",
    ],
  },
  {
    id: "feria",
    name: "Caja Feria",
    category: "fiestas",
    price: 42.9,
    months: [4],
    short: "Casetas, farolillos, abanicos y castañuelas para montar la feria en clase.",
    description:
      "Monta la feria en tu aula: casetas, farolillos, abanicos, flores y castañuelas para bailar.",
    contents: [
      "Láminas de feria para colorear",
      "Casetas decorativas",
      "Farolillos de colores",
      "Abanicos y flores",
      "Castañuelas",
      "Tarjetas temáticas",
      "Rotuladores",
    ],
  },
  {
    id: "cruces-de-mayo",
    name: "Caja Cruces de Mayo",
    category: "fiestas",
    price: 39.9,
    months: [5],
    short: "Claveles, mantones y lunares para celebrar el mes de mayo.",
    description:
      "Láminas, claveles y complementos de lunares para trabajar las Cruces de Mayo y las tradiciones de primavera.",
    contents: [
      "Láminas «Cruces de Mayo», «Mes de Mayo» y «Pasos»",
      "Mantón decorativo",
      "Claveles rojos",
      "Cruz decorada",
      "Abanicos y complementos de lunares",
      "Palitos y rotuladores",
    ],
  },
  {
    id: "san-fermin",
    name: "Caja San Fermín",
    category: "fiestas",
    price: 39.9,
    months: [7],
    short: "Pañuelicos rojos, muñecos sanfermineros y mucha fiesta.",
    description:
      "Celebra el 7 de julio con muñecos de tela, pañuelos rojos, banderines y láminas de San Fermín.",
    contents: [
      "Láminas de San Fermín para colorear",
      "Muñecos de tela sanfermineros",
      "Pañuelicos y fajines rojos",
      "Banderines rojos y blancos",
      "Tarjetas temáticas",
      "Figuras de toro en palito",
    ],
  },

  /* ---------------- VALORES Y DÍAS ESPECIALES ---------------- */
  {
    id: "bienvenida",
    name: "Caja Bienvenida al cole",
    category: "valores",
    price: 44.9,
    months: [9],
    badge: "Novedad",
    short: "Para empezar el curso con ilusión: carteles, mensajes bonitos y material nuevo.",
    description:
      "La caja ideal para el periodo de adaptación: carteles de bienvenida, tarjetas con mensajes positivos y material para estrenar.",
    contents: [
      "Carteles «¡Bienvenidos a una nueva aventura!»",
      "Tarjetas con mensajes motivadores",
      "Cuaderno «Mi gran aventura empieza hoy»",
      "Estrella de peluche",
      "Ceras, rotuladores y lápices de colores",
      "Pompones y gomas de colores",
      "Estuche de tela",
    ],
  },
  {
    id: "dia-de-la-paz",
    name: "Caja Día de la Paz",
    category: "valores",
    price: 37.9,
    months: [1],
    short: "Palomas, arcoíris y corazones para el 30 de enero.",
    description:
      "Valores de respeto, amistad y convivencia con láminas, pulseras, chapas y corazones con mensajes.",
    contents: [
      "Láminas «La Paz empieza en cada uno de nosotros»",
      "Carteles «Día de la Paz»",
      "Palomas y arcoíris decorativos",
      "Pulseras «PAZ»",
      "Chapas y corazones con valores",
      "Rotuladores y pompones",
    ],
  },
  {
    id: "san-valentin",
    name: "Caja Amor y Amistad",
    category: "valores",
    price: 34.9,
    months: [2],
    short: "Corazones, globos y diademas para celebrar el cariño el 14 de febrero.",
    description:
      "Manualidades de corazones, pintura y complementos para celebrar el amor y la amistad en el aula.",
    contents: [
      "Globos rojos y blancos",
      "Diademas de corazones",
      "Plantillas de corazón",
      "Pintura roja y blanca",
      "Pinceles",
      "Pegatinas de corazones",
      "Etiquetas y cordel",
    ],
  },
  {
    id: "dia-del-agua",
    name: "Caja Día del Agua",
    category: "valores",
    price: 37.9,
    months: [3],
    short: "Gotitas, mensajes y pulseras para aprender a cuidar el agua.",
    description:
      "Concienciación desde pequeños: carteles, gotitas con mensajes y actividades para el 22 de marzo.",
    contents: [
      "Carteles «Cuidemos el agua», «Cada gota cuenta»…",
      "Tarjetas «¿Cómo podemos cuidar el agua?»",
      "Gotitas decorativas",
      "Chapas y pulseras «Cuida el agua»",
      "Carteles con varilla",
      "Láminas y lápices de colores",
    ],
  },
  {
    id: "convivencia",
    name: "Caja Amigos Siempre",
    category: "valores",
    price: 37.9,
    months: [5],
    short: "Respeto, inclusión y amistad: material para prevenir el acoso escolar.",
    description:
      "Mensajes claros y positivos para trabajar el respeto y la inclusión. Ideal para el Día contra el Acoso Escolar (2 de mayo).",
    contents: [
      "Tarjetas «Respeta, Incluye, Apoya, Escucha»",
      "Cuentos y láminas «Amigos siempre»",
      "Pulseras «Stop Bullying»",
      "Chapas con mensajes",
      "Corazones de peluche",
      "Lápices de colores",
    ],
  },

  /* ---------------- PROYECTOS TEMÁTICOS ---------------- */
  {
    id: "granja",
    name: "Caja La Granja",
    category: "proyectos",
    price: 42.9,
    months: [],
    short: "Vacas, cerditos, tractor y granero para jugar a ser granjeros.",
    description:
      "Proyecto completo de la granja con animales, granero, tractor y heno para el juego simbólico y el vocabulario.",
    contents: [
      "Láminas de la granja para colorear",
      "Granero de juguete",
      "Animales de la granja",
      "Tractor",
      "Heno y vallas",
      "Cuento «¡Viva la Granja!»",
      "Ceras de colores",
    ],
  },
  {
    id: "mar",
    name: "Caja El Mar",
    category: "proyectos",
    price: 42.9,
    months: [],
    short: "Pulpos, delfines, arena y conchas para explorar el fondo marino.",
    description:
      "Sumérgete en el mar con animales marinos, una bandeja sensorial de arena y conchas, y un cuento ilustrado.",
    contents: [
      "Láminas de animales marinos",
      "Animales marinos de goma EVA y fieltro",
      "Arena y conchas",
      "Cubo y pala",
      "Cuento «¡Descubre el Mar!»",
      "Plumas y limpiapipas de colores",
    ],
  },
  {
    id: "espacio",
    name: "Caja El Espacio",
    category: "proyectos",
    price: 42.9,
    months: [],
    short: "Astronautas, cohetes y planetas para viajar a las estrellas.",
    description:
      "Un proyecto espacial con figuras, planetas, estrellas de peluche y un cuento para despegar juntos.",
    contents: [
      "Láminas del espacio para colorear",
      "Figuras de astronauta y cohete",
      "Planetas y luna",
      "Estrellas de peluche",
      "Cuento «¡Vamos al espacio!»",
      "Antifaces espaciales",
      "Rotuladores",
    ],
  },
  {
    id: "mercado",
    name: "Caja El Mercado",
    category: "proyectos",
    price: 44.9,
    months: [],
    short: "Frutas, verduras, cesta y caja registradora para jugar a hacer la compra.",
    description:
      "Juego simbólico de la compra con alimentos de juguete, cesta, caja registradora y lista de la compra.",
    contents: [
      "Láminas del mercado para colorear",
      "Frutas, verduras y alimentos de juguete",
      "Cesta de la compra",
      "Caja registradora",
      "Lista de la compra",
      "Plastilina y rotuladores",
    ],
  },
  {
    id: "transportes",
    name: "Caja Medios de Transporte",
    category: "proyectos",
    price: 42.9,
    months: [],
    short: "Coches, aviones, autobuses y señales para aprender a viajar seguros.",
    description:
      "Vehículos, señales de tráfico y semáforo para trabajar los transportes y la educación vial.",
    contents: [
      "Láminas de transportes para colorear",
      "Coches, autobús, avión y tren de juguete",
      "Señales de tráfico y semáforo",
      "Cuento «¡Vamos de viaje!»",
      "Rotuladores",
    ],
  },
  {
    id: "numeros",
    name: "Caja Contamos del 1 al 10",
    category: "proyectos",
    price: 39.9,
    months: [],
    short: "Tarjetas, números de colores y bloques para los primeros conteos.",
    description:
      "Iniciación a los números con tarjetas ilustradas, números de goma EVA, bloques de madera y material para contar.",
    contents: [
      "Tarjetas ilustradas del 1 al 10",
      "Números de goma EVA",
      "Bloques de madera numerados",
      "Palitos y cuentas para contar",
      "Cuento «¡Contamos del 1 al 10!»",
    ],
  },
];
