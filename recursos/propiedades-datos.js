/*
  Propiedades que aparecen en el catálogo y en el mapa.

  SON DE EJEMPLO: reemplácelas por las reales. Cada propiedad lleva:
    clave        texto corto único (aparece en la ficha y en el mensaje de WhatsApp)
    operacion    "venta" o "renta"
    tipo         "Casa", "Departamento", "Terreno" o "Local"
    precio       en pesos; en renta es el precio por mes
    colonia, municipio
    lat, lng     ubicación (en Google Maps: clic derecho sobre el punto y copiar los números)
    recamaras, banos, estacionamientos   (0 si no aplica)
    construccion, terreno               metros cuadrados (0 si no aplica)
    descripcion
    foto         opcional: ruta de una foto, por ejemplo "img/propiedades/cf-101.jpg".
                 Si no hay foto se dibuja una ilustración de la fachada.
    publicada    fecha en formato AAAA-MM-DD (para ordenar por "más recientes")
*/
window.PROPIEDADES = [
  {clave:"CF-101", operacion:"venta", tipo:"Casa", precio:3450000, colonia:"Cumbres Elite", municipio:"Monterrey", lat:25.7318, lng:-100.4062,
   recamaras:3, banos:2.5, estacionamientos:2, construccion:185, terreno:144, publicada:"2026-11-10",
   descripcion:"Casa de dos pisos en privada con vigilancia. Cochera techada para dos autos, patio trasero y cuarto de servicio. Cerca de escuelas y de Paseo de los Leones."},
  {clave:"CF-102", operacion:"venta", tipo:"Casa", precio:12800000, colonia:"Del Valle", municipio:"San Pedro Garza García", lat:25.6556, lng:-100.3694,
   recamaras:4, banos:4.5, estacionamientos:3, construccion:420, terreno:390, publicada:"2026-11-08",
   descripcion:"Residencia en calle cerrada a unos pasos de Calzada del Valle. Estudio, sala de TV, jardín con asador y vista a la Sierra Madre."},
  {clave:"CF-103", operacion:"renta", tipo:"Departamento", precio:24000, colonia:"Valle Oriente", municipio:"San Pedro Garza García", lat:25.6418, lng:-100.3152,
   recamaras:2, banos:2, estacionamientos:2, construccion:110, terreno:0, publicada:"2026-11-12",
   descripcion:"Departamento amueblado en piso 14 con balcón. Edificio con gimnasio, alberca y seguridad las 24 horas. Mantenimiento incluido."},
  {clave:"CF-104", operacion:"venta", tipo:"Casa", precio:2150000, colonia:"Linda Vista", municipio:"Guadalupe", lat:25.6872, lng:-100.2408,
   recamaras:3, banos:2, estacionamientos:1, construccion:140, terreno:160, publicada:"2026-10-28",
   descripcion:"Casa de un piso lista para habitarse, con escrituras al corriente. A dos cuadras de la avenida Miguel Alemán y del metro."},
  {clave:"CF-105", operacion:"renta", tipo:"Casa", precio:16500, colonia:"Anáhuac", municipio:"San Nicolás de los Garza", lat:25.7441, lng:-100.3058,
   recamaras:3, banos:2, estacionamientos:2, construccion:170, terreno:200, publicada:"2026-11-05",
   descripcion:"Casa amplia en zona tranquila, cerca de la UANL. Patio con árboles frutales y cuarto de lavado."},
  {clave:"CF-106", operacion:"venta", tipo:"Terreno", precio:4900000, colonia:"La Rioja", municipio:"Monterrey", lat:25.5612, lng:-100.2491,
   recamaras:0, banos:0, estacionamientos:0, construccion:0, terreno:620, publicada:"2026-10-20",
   descripcion:"Terreno plano sobre Carretera Nacional, ideal para residencia. Con servicios al pie del lote y uso de suelo habitacional."},
  {clave:"CF-107", operacion:"venta", tipo:"Departamento", precio:2780000, colonia:"Obispado", municipio:"Monterrey", lat:25.6762, lng:-100.3442,
   recamaras:2, banos:1, estacionamientos:1, construccion:78, terreno:0, publicada:"2026-11-01",
   descripcion:"Departamento remodelado con vista al Cerro del Obispado. Cocina integral, elevador y cajón de estacionamiento techado."},
  {clave:"CF-108", operacion:"renta", tipo:"Local", precio:32000, colonia:"Tecnológico", municipio:"Monterrey", lat:25.6496, lng:-100.2897,
   recamaras:0, banos:1, estacionamientos:4, construccion:95, terreno:0, publicada:"2026-11-09",
   descripcion:"Local comercial a pie de calle sobre avenida Garza Sada, frente a mucho paso de estudiantes. Cortina eléctrica y medio baño."},
  {clave:"CF-109", operacion:"venta", tipo:"Casa", precio:1650000, colonia:"Praderas de San Francisco", municipio:"Apodaca", lat:25.7812, lng:-100.1886,
   recamaras:2, banos:1.5, estacionamientos:1, construccion:92, terreno:105, publicada:"2026-10-15",
   descripcion:"Casa de dos pisos en fraccionamiento con parque. Acepta crédito Infonavit y bancario."},
  {clave:"CF-110", operacion:"renta", tipo:"Departamento", precio:11500, colonia:"Centro", municipio:"Monterrey", lat:25.6709, lng:-100.3101,
   recamaras:1, banos:1, estacionamientos:0, construccion:55, terreno:0, publicada:"2026-11-11",
   descripcion:"Departamento tipo loft a unas cuadras de la Macroplaza y del Barrio Antiguo. Ideal para una o dos personas."},
  {clave:"CF-111", operacion:"venta", tipo:"Casa", precio:6350000, colonia:"Contry", municipio:"Monterrey", lat:25.6262, lng:-100.2823,
   recamaras:4, banos:3, estacionamientos:2, construccion:290, terreno:300, publicada:"2026-10-30",
   descripcion:"Casa familiar con estudio en planta baja, recámara principal con vestidor y terraza techada. Calles arboladas y cerca de colegios."},
  {clave:"CF-112", operacion:"venta", tipo:"Casa", precio:1950000, colonia:"Valle del Canadá", municipio:"General Escobedo", lat:25.7948, lng:-100.3214,
   recamaras:3, banos:2, estacionamientos:2, construccion:120, terreno:128, publicada:"2026-10-25",
   descripcion:"Casa con fachada recién pintada, minisplit en recámaras y patio con techo de lámina. Cerca de la avenida Sendero."},
  {clave:"CF-113", operacion:"renta", tipo:"Casa", precio:42000, colonia:"Olinalá", municipio:"San Pedro Garza García", lat:25.6421, lng:-100.3948,
   recamaras:4, banos:4, estacionamientos:3, construccion:380, terreno:450, publicada:"2026-11-03",
   descripcion:"Casa con vista panorámica a la ciudad, en las faldas de Chipinque. Alberca, jardín y cuarto de servicio con baño."},
  {clave:"CF-114", operacion:"venta", tipo:"Departamento", precio:4200000, colonia:"Mitras Centro", municipio:"Monterrey", lat:25.6934, lng:-100.3478,
   recamaras:3, banos:2, estacionamientos:2, construccion:124, terreno:0, publicada:"2026-11-07",
   descripcion:"Departamento nuevo en torre con roof garden y área de juegos. Entrega inmediata, a unos minutos del Hospital Universitario."},
  {clave:"CF-115", operacion:"venta", tipo:"Terreno", precio:1300000, colonia:"Puerta del Sol", municipio:"Santa Catarina", lat:25.6741, lng:-100.4577,
   recamaras:0, banos:0, estacionamientos:0, construccion:0, terreno:240, publicada:"2026-10-18",
   descripcion:"Lote habitacional en esquina, bardeado y con escrituras. Cerca de la carretera a Saltillo."},
  {clave:"CF-116", operacion:"renta", tipo:"Local", precio:19000, colonia:"Centrito Valle", municipio:"San Pedro Garza García", lat:25.6532, lng:-100.3581,
   recamaras:0, banos:1, estacionamientos:2, construccion:60, terreno:0, publicada:"2026-11-13",
   descripcion:"Local en plaza comercial con estacionamiento para clientes. Buen lugar para consultorio, oficina o tienda pequeña."}
];
