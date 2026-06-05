
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.navbar__hamburger');
  const navLinks  = document.querySelector('.navbar__links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('.navbar__links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navLinks?.classList.remove('open');
    });
  });

  const pagActual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(a => {
    if (a.getAttribute('href') === pagActual) a.classList.add('active');
  });

  if (document.getElementById('personajes-container')) iniciarPersonajes();
  if (document.getElementById('temporadas-container')) iniciarTemporadas();
  if (document.getElementById('mapa'))                 iniciarMapa();
  if (document.getElementById('quiz-container'))       iniciarQuiz();
  if (document.getElementById('tvmaze-info'))          cargarTVmaze();
});

async function cargarTVmaze() {
  const el = document.getElementById('tvmaze-info');
  if (!el) return;
  try {
    const res  = await fetch('https://api.tvmaze.com/shows/2316');
    const data = await res.json();
    el.innerHTML = `
      <div class="api-badge">TVmaze API — datos en vivo</div>
      <div class="tvmaze-card">
        <img src="${data.image?.medium || ''}" alt="${data.name}" class="tvmaze-poster" onerror="this.style.display='none'">
        <div class="tvmaze-datos">
          <p><strong>Nombre oficial:</strong> ${data.name}</p>
          <p><strong>Estado:</strong> <span class="texto-rojo">${data.status}</span></p>
          <p><strong>Géneros:</strong> ${data.genres?.join(', ') || 'Animación'}</p>
          <p><strong>Idioma:</strong> ${data.language}</p>
          <p><strong>Calificación:</strong> ${data.rating?.average ?? 'N/A'} / 10</p>
          <p><strong>Red:</strong> ${data.network?.name || data.webChannel?.name || 'TF1 / Netflix'}</p>
          <p class="tvmaze-resumen">${data.summary?.replace(/<[^>]+>/g,'') || ''}</p>
        </div>
      </div>`;
  } catch {
    el.innerHTML = '<p class="texto-gris">No se pudo cargar la información en este momento.</p>';
  }
}


function iniciarMapa() {
  if (typeof L === 'undefined') return;
  const mapa = L.map('mapa', { zoomControl: true }).setView([48.8566, 2.3522], 13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB © OpenStreetMap', maxZoom: 19
  }).addTo(mapa);
  const iconoRojo = L.divIcon({
    className: '',
    html: `<div style="width:32px;height:32px;background:#e8000d;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 10px rgba(232,0,13,0.6)"></div>`,
    iconSize: [32,32], iconAnchor: [16,32]
  });
  L.marker([48.8566, 2.3522], { icon: iconoRojo }).addTo(mapa)
    .bindPopup(`<strong style="color:#e8000d">Miraculous Corp.</strong><br>París, Francia<br><small>Sede central de los Guardianes</small>`)
    .openPopup();
}

const HEROES = [
  {
    id: 'ladybug',
    nombre: 'Ladybug',
    civil: 'Marinette Dupain-Cheng',
    poder: 'Amuleto Encantado · Creación',
    kwami: 'Tikki',
    temporada: 1,
    imagen: 'img/heroes/ladybugs6.jpg',
    imagenCivil: 'img/civil/marinette.jpg',
    descripcionHeroe: 'Como alterego, Ladybug representa todo lo opuesto a la timidez y torpeza civil de Marinette. Es una superheroína segura de sí misma, astuta, valiente, analítica y una líder nata. Mientras porta la máscara, es capaz de mantener la mente fría bajo presión extrema para idear planes complejos en cuestión de segundos. Su diseño visual evoca a una mariquita: viste un traje rojo con motas negras, antifaz y su arma, el yo-yo. Es la líder oficial de los Miraculers y la Gran Guardiana de la caja de los Miraculous desde la Temporada 3.',
    poderes: [
      { nombre: 'Amuleto Encantado (Lucky Charm)', desc: 'Crea un objeto aleatorio aparentemente inútil. Ladybug usa su visión especial para combinar ese objeto con el entorno y derrotar al villano.' },
      { nombre: 'Prodigiosa Ladybug (Miraculous Ladybug)', desc: 'Al lanzar el objeto del Amuleto, una ráfaga de mariquitas mágicas repara todos los daños materiales, cura heridos y revierte el caos.' },
      { nombre: 'Purificación', desc: 'Su yo-yo atrapa Akumas y Amoks. Al capturarlos limpia la energía oscura y los libera como mariposas blancas.' }
    ],
    evolucion: [
      'T1-T3: Diseño clásico rojo y negro. Límite de 5 minutos tras usar el Lucky Charm.',
      'T3: Se convierte en Gran Guardiana de los Miraculous.',
      'T4-T5: Pierde casi todos los Miraculous ante Monarch pero los recupera. Supera el límite de tiempo.',
      'T6: Enfrenta a Chrysalis (Lila Rossi), portadora del Miraculous de la Mariposa. Carga el peso de ocultar la verdad sobre Gabriel Agreste. En el episodio 20 (Heartfixer) es akumatizada por primera vez.'
    ],
    akumatizaciones: [
      { nombre: 'Heartfixer (Corta-corazones)', temporada: 6, causa: 'Destrozada por la culpa y la desesperación de no poder ser honesta con Adrien, Chrysalis (Lila) la convierte en Heartfixer. Bajo esta forma pierde la capacidad de escuchar a quienes la rodean y asume la misión de eliminar el dolor amoroso robando los Miraculous.' }
    ],
    familia: ['Rolland Dupain (abuelo paterno)', 'Gina Dupain (abuela paterna)', 'Tom Dupain (padre)', 'Yan Cheng (abuelo materno)', 'Mei Cheng (abuela materna)', 'Wang Cheng (tío)', 'Shu Yin Cheng (tía)', 'Sabine Cheng (madre)'],
    personalidadCivil: 'Extremadamente generosa, alegre, optimista y empática. Talento innato para el diseño de modas. En las primeras temporadas era insegura y torpe, especialmente ante Adrien. A medida que asume el rol de Guardiana madura significativamente. En la T6 carga con la enorme presión de mantener el secreto sobre Monarch.',
    vidaCivil: 'Alumna en el Collège Françoise Dupont. Diseñadora de moda en ciernes que sueña con su propia marca. Mantiene una relación con Adrien Agreste. Su físico: cabello negro con reflejos azules recogido en coletas, ojos azul brillante, piel clara con pecas. Lleva las coletas en memoria de su amiga Socqueline Wang.'
  },
  {
    id: 'catnoir',
    nombre: 'Cat Noir',
    civil: 'Adrien Agreste',
    poder: 'Cataclismo · Destrucción',
    kwami: 'Plagg',
    temporada: 1,
    imagen: 'img/heroes/catnoirpersonaje.jpeg',
    imagenCivil: 'img/civil/adrien.jpg',
    descripcionHeroe: 'Como alterego, Cat Noir es la personificación de la libertad, el desparpajo y el coqueteo. Al ponerse la máscara se desinhibe por completo. Es carismático, bromista, sumamente leal y usa el humor como mecanismo de defensa. Su traje es negro con botas, garras, orejas y cola. Es el co-líder y pilar emocional del equipo. Trágicamente, nunca supo que su mayor enemigo era su propio padre.',
    poderes: [
      { nombre: 'Cataclismo (Cataclysm)', desc: 'Su mano derecha se imbuye de energía oscura. Cualquier objeto que toque se destruye, oxida o colapsa. Si toca a una persona o criatura mágica causa heridas graves y degradación física lenta.' },
      { nombre: 'Habilidades pasivas', desc: 'Visión nocturna, oído felino superdesarrollado, agilidad extrema. Su bastón es extensible, puede dividirse en dos, proyectar hologramas y servir como escudo.' }
    ],
    evolucion: [
      'T1-T4: Traje negro clásico con campana dorada. Compañero incondicional de Ladybug. Crisis de identidad en T4 al sentirse desplazado.',
      'T5: Enfrenta a Monarch sin saber que es su padre. El mundo celebra a Gabriel como héroe, una mentira que Ladybug sostiene.',
      'T6: Cat Noir maduro que domina el Cataclismo sin límite de tiempo. Lidera al equipo cuando Marinette cae como Heartfixer. La tensión con Ladybug crece por el secreto sobre Gabriel.'
    ],
    akumatizaciones: [
      { nombre: 'Chat Blanc', temporada: 3, causa: 'Línea temporal borrada. Gabriel descubre que es Cat Noir y lo manipula emocionalmente. Su poder de destrucción se sale de control a escala cósmica, destruyendo la Luna y a Ladybug.' },
      { nombre: 'Efemero (Éphémère)', temporada: 4, causa: 'Línea temporal borrada. Gabriel descubre el secreto de su hijo y le arrebata el anillo. Se transforma en un villano que acelera el tiempo.' }
    ],
    familia: ['Emilie Graham de Vanily (madre, fallecida)', 'Gabriel Agreste (padre, fallecido — era Monarch)', 'Amelie Graham de Vanily (tía)', 'Félix Fathom (primo)'],
    personalidadCivil: 'Soñador carismático, tímido, reservado e ingenuo por su desconocimiento del mundo. Siempre intenta ver lo mejor en los demás. Su paciencia con Chloé y Lila tiene límites. En la T6 vive en un profundo duelo por un padre al que cree perfecto, sin saber la verdad. Nathalie Sancoeur asume su custodia legal.',
    vidaCivil: 'Alumno en el Collège Françoise Dupont. Modelo para la marca de su difunto padre. Es un humano-sentimonstruo creado por su madre Emilie a partir del amor. Su fuerza vital está atada a los anillos de la familia Graham de Vanily. En T6 vive con Nathalie, quien se convierte en su figura materna real.'
  },
  {
    id: 'renarouge',
    nombre: 'Rena Rouge',
    civil: 'Alya Césaire',
    poder: 'Espejismo (Mirage) · Ilusión',
    kwami: 'Trixx',
    temporada: 2,
    imagen: 'img/heroes/renarouge.png',
    imagenCivil: 'img/civil/alya.jpg',
    descripcionHeroe: 'Ágil, astuta, escurridiza y sumamente juguetona como zorro. Es la mano derecha y confidente más cercana de Ladybug. En T4 cambia su traje a tonos azules como Rena Furtive para operar en secreto.',
   poderes: [
      { nombre: 'Espejismo (Mirage)', desc: 'Al tocar su flauta crea una ilusión hiperrealista de cualquier objeto, persona o situación. La ilusión desaparece si alguien la toca físicamente.' }
   ],  
    evolucion: [
      'T2: Primera heroína aliada reclutada por Ladybug en "Sapotis".',
      'T4: Descubre que Ladybug es Marinette. Se convierte en Rena Furtive (traje azul/gris) para operar en secreto.',
      'T6: Regresa con su traje naranja original. Actúa como soporte emocional principal de Marinette ante los ataques de Chrysalis.'
    ],
    akumatizaciones: [
      { nombre: 'Lady Wifi', temporada: 1, causa: 'Suspendida injustamente por Chloé. Poder: íconos de celular para congelar personas.' },
      { nombre: 'Oblivio', temporada: 3, causa: 'Akumatizada junto a Nino. Borran la memoria de toda la ciudad.' },
      { nombre: 'Rena Rabia (Rena Rage)', temporada: 3, causa: 'Corrompida brevemente con akuma mientras portaba el Miraculous.' },
      { nombre: 'Culpadora (Rocketear)', temporada: 4, causa: 'Celos e inseguridades románticas.' }
    ],
    familia: ['Marlena Césaire (madre)', 'Otis Césaire (padre)', 'Nora Césaire (hermana mayor)', 'Etta y Ella Césaire (hermanas gemelas pequeñas)'],
    personalidadCivil: 'Enérgica, apasionada, segura de sí misma y sumamente leal. Curiosidad insaciable y fuerte sentido de la justicia. Maneja el Ladyblog. En T4 madura drásticamente al conocer el secreto de Marinette.',
    vidaCivil: 'Mejor amiga de Marinette desde T1. Fundadora del Ladyblog. Novia de Nino Lahiffe. En T6 es el ancla emocional de Marinette y monitorea su salud mental ante el estrés de Chrysalis.'
  },
  {
    id: 'carapace',
    nombre: 'Carapace',
    civil: 'Nino Lahiffe',
    poder: 'Refugio (Shelter) · Protección',
    kwami: 'Wayzz',
    temporada: 2,
    imagen: 'img/heroes/carapace.png',
    imagenCivil: 'img/civil/nino.jpg',
    descripcionHeroe: 'Valiente, sumamente protector y el principal escudo del equipo. Traje verde con capucha tipo gorra y caparazón en la espalda. Su motivación siempre ha sido proteger a las personas que ama.',
    poderes: [
      { nombre: 'Refugio (Shelter)', desc: 'Al golpear su caparazón genera un gigantesco campo de fuerza esférico verde prácticamente indestructible. Solo desaparece si él lo cancela o si lo golpea el Cataclismo directo.' }
    ],
    evolucion: [
      'T2: Debut en "Anansi". Recibe el Miraculous para rescatar a Alya.',
      'T3-T4: Pilar defensivo del equipo. Organiza "La Resistencia" escolar.',
      'T6: Aprende a no dejarse cegar por los impulsos protectores en batalla.'
    ],
    akumatizaciones: [
      { nombre: 'Burbujeo (The Bubbler)', temporada: 1, causa: 'Rechazado por Gabriel al organizar una fiesta para Adrien. Encerró adultos en burbujas.' },
      { nombre: 'Oblivio', temporada: 3, causa: 'Akumatizado junto a Alya. Borró la memoria de París.' },
      { nombre: 'Llorón (Rocketear)', temporada: 4, causa: 'Celos por malinterpretar a Alya con Cat Noir. Disparaba rayos con sus lágrimas.' },
      { nombre: 'Coraza Rabiosa (Shell Shock)', temporada: 3, causa: 'Corrompido con akuma durante "La Batalla de los Miraculous".' }
    ],
    familia: ['Padre y madre no nombrados', 'Chris Lahiffe (hermano menor)'],
    personalidadCivil: 'Relajado, leal, entusiasta, urbano. Gran pasión por la música como DJ. Impulsivo y propenso a los celos cuando protege a los suyos. Fundó "La Resistencia" escolar en T4-T5.',
    vidaCivil: 'Mejor amigo de Adrien desde T1. DJ y director de cine aficionado. Novio de Alya. En T6 mantiene a Adrien distraído y enfocado, protegiéndolo del peso de la verdad.'
  },
  {
    id: 'queenbee',
    nombre: 'Queen Bee',
    civil: 'Chloé Bourgeois',
    poder: 'Veneno (Venom) · Inmovilización',
    kwami: 'Pollen',
    temporada: 2,
    imagen: 'img/heroes/queenbee.png',
    imagenCivil: 'img/civil/chloe.jpg',
    descripcionHeroe: 'Queen Bee representó el orgullo, la elegancia y la necesidad de atención. A diferencia de otros héroes, debutó revelando su identidad al mundo. Traje amarillo y negro con trompo mágico. Su historia es una de las más trágicas: el fracaso de un arco de redención. Actualmente el Miraculous pertenece a su media hermana Zoé Lee (Vesperia).',
    poderes: [
      { nombre: 'Veneno (Venom)', desc: 'La punta de su trompo se convierte en un aguijón mágico. Al picar a un enemigo queda completamente paralizado durante unos minutos.' }
    ],
    evolucion: [
      'T2: Debut accidental al encontrar el Miraculous de la Abeja.',
      'T3: Heroína recurrente. Al final traiciona al equipo aliándose con Hawk Moth.',
      'T4-T6: Prohibida permanentemente de usar el Miraculous. La joya pasa a Zoé (Vesperia).',
      'T6: Regresa a París como paria social. Chrysalis la transforma en "Queen of the Deadzone".'
    ],
    akumatizaciones: [
      { nombre: 'Antibug', temporada: 1, causa: 'Ignorada por Ladybug. Versión oscura de los poderes de Ladybug.' },
      { nombre: 'Reina Avispa (Queen Wasp)', temporada: 2, causa: 'Desobedeció a Ladybug y fue reprendida. Venom ilimitado a través de enjambre de avispas.' },
      { nombre: 'Cazadora de Corazones (Heart Hunter)', temporada: 3, causa: 'Akumatizada junto a sus padres por crisis familiar. Monstruo de dos cabezas.' },
      { nombre: 'Queen of the Deadzone', temporada: 6, causa: 'Olvidada y reemplazada por Zoé. Chrysalis la usa como arma. Puede corromper la flora, fauna y tecnología de la ciudad.' }
    ],
    familia: ['André Bourgeois (padre — exalcalde)', 'Audrey Bourgeois (madre)', 'Zoé Lee (media hermana)'],
    personalidadCivil: 'Arrogante, egoísta, manipuladora. Imita la crueldad de su madre para ganar su aprobación. Detrás hay profunda inseguridad. Arco de degradación: nunca logró redimirse.',
    vidaCivil: 'Tirana de la escuela durante T1-T4. Asumió brevemente el cargo de alcaldesa interina en T5. Exiliada a Nueva York al final de T5. En T6 regresa como paria social, objetivo de Chrysalis.'
  },
  {
    id: 'vesperia',
    nombre: 'Vesperia',
     civil: 'Zoé Lee',
    poder: 'Veneno (Venom) · Inmovilización',
    kwami: 'Pollen',
    temporada: 4,
    imagen: 'img/heroes/vesperia.png',
    imagenCivil: 'img/civil/zoe.jpg',
    descripcionHeroe: 'Media hermana de Chloé Bourgeois. Humilde, empática, valiente y con gran sentido del compañerismo. Ve su rol como una oportunidad para proteger a los demás por sus propios méritos. Traje con rayas negras y amarillas en diagonal, mechón rosa brillante. En T5 se transforma temporalmente en Scarabella.',
    poderes: [
      { nombre: 'Veneno (Venom)', desc: 'El aguijón de su trompo paraliza completamente al enemigo. Lo usa de forma más estratégica y quirúrgica que Chloé, calculando el momento exacto.' }
    ],
    evolucion: [
      'T4: Debut en "Queen Banana". Portadora permanente del Miraculous de la Abeja.',
      'T5: Miembro central del equipo. Se convierte temporalmente en Scarabella cuando Ladybug pierde sus aretes.',
      'T6: Debe enfrentarse a su propia hermana (Queen of the Deadzone). Vive el conflicto de luchar contra Chloé.'
    ],
    akumatizaciones: [
      { nombre: 'Desliz con el Veneno (T6)', temporada: 6, causa: 'Frustración acumulada por las humillaciones de Chloé. Usa el poder por venganza personal. Chrysalis busca usar esto para demostrar que ningún héroe es completamente puro.' }
    ],
    familia: ['Audrey Bourgeois (madre — compartida con Chloé)', 'André Bourgeois (padrastro)', 'Chloé Bourgeois (media hermana)'],
    personalidadCivil: 'Amable, pacífica, agradecida y muy trabajadora. Llegó a París buscando construir una vida propia, ganándose el cariño de todos por sus virtudes.',
    vidaCivil: 'Llegó a la escuela Françoise Dupont en T4. Rápidamente ganó el afecto de todos los compañeros que Chloé había alienado. En T6 lidia con el regreso oscuro de su hermana.'
  },
  {
    id: 'viperion',
    nombre: 'Viperion',
    civil: 'Luka Couffaine',
    poder: 'Segunda Oportunidad · Intuición',
    kwami: 'Sass',
    temporada: 3,
    imagen: 'img/heroes/vipereon.png',
    imagenCivil: 'img/civil/luka.jpg',
    descripcionHeroe: 'Sereno, analítico, compasivo y el estratega definitivo del equipo. Mantiene su esencia civil. Traje cian y azul marino con texturas de escamas. Arma: lira mágica. El único héroe que conoce todas las identidades secretas.',
    poderes: [
      { nombre: 'Segunda Oportunidad (Second Chance)', desc: 'Establece un punto de guardado en el tiempo. Si algo sale mal puede retroceder exactamente hasta ese momento. Solo él recuerda lo que sucedió en las líneas borradas.' }
    ],
    evolucion: [
      'T3: Debut en "Desperada". Elegido por su paciencia inquebrantable.',
      'T4: Descubre accidentalmente las identidades de Ladybug y Cat Noir. Las guarda con madurez extrema.',
      'T5: Monarch lo caza por saber las identidades. Se exilia voluntariamente a Brasil con el Maestro Su-Han. Entrena Mirakung-Fu.',
      'T6: Regresa renovado. Consultor táctico de Ladybug. Detecta las manipulaciones de Chrysalis.'
    ],
    akumatizaciones: [
      { nombre: 'Silenciador (Silencer)', temporada: 3, causa: 'Defendía a Marinette del productor Bob Roth que le robó canciones. Roba voces tocando labios.' },
      { nombre: 'Verdad (Truth)', temporada: 4, causa: 'Frustración por los secretos de Marinette y su padre Jagged Stone. Un ojo gigante que obliga a decir la verdad.' }
    ],
    familia: ['Jagged Stone (padre biológico — distante)', 'Anarka Couffaine (madre)', 'Juleka Couffaine (hermana)'],
    personalidadCivil: 'El más maduro y perceptivo de su generación. Empático, paciente, incapaz de guardar rencor. La guitarra es su canal de expresión. En T6 regresa de Brasil con filosofía y técnicas de meditación.',
    vidaCivil: 'Vive en el barco Liberté. Tuvo una relación breve con Marinette en T4. Rompieron con madurez. Se exilió a Brasil en T5. En T6 actúa como consejero espiritual del grupo y ayuda a Adrien a canalizar el duelo por su padre.'
  },
  {
    id: 'ryuko',
    nombre: 'Ryuko',
    civil: 'Kagami Tsurugi',
    poder: 'Los Tres Elementos (Agua, Viento, Rayo)',
    kwami: 'Longg',
    temporada: 3,
    imagen: 'img/heroes/ryuko.png',
    imagenCivil: 'img/civil/kagami.jpg',
    descripcionHeroe: 'Personificación de la disciplina, honor, ferocidad y precisión militar. Ataque directo y estratégico. Traje rojo con detalles dorados, cuernos de dragón y espada. Una de las guerreras más letales del equipo.',
    poderes: [
      { nombre: 'Dragón de Agua', desc: 'Se transforma en agua líquida: se desliza por espacios estrechos, esquiva ataques volviéndose intangible.' },
      { nombre: 'Dragón de Viento', desc: 'Se convierte en neblina o torbellino: vuela, ciega enemigos, dispersa toxinas.' },
      { nombre: 'Dragón de Rayo', desc: 'Se transforma en electricidad pura: velocidad del rayo, sobrecarga sistemas tecnológicos.' }
    ],
    evolucion: [
      'T3: Debut en "Ikari Gozen". Comete el error de revelar su identidad a la villana.',
      'T4-T5: Restringida por exposición pública. Apoya en misiones críticas.',
      'T6: Fuerza de asalto principal de los Miraculers. Lidia con su madre Tomoe Tsurugi.'
    ],
    akumatizaciones: [
      { nombre: 'Riposte', temporada: 2, causa: 'Perdió un duelo de esgrima por error de Marinette. Brazo en espada gigante.' },
      { nombre: 'Ikari Gozen', temporada: 3, causa: 'Su madre la castiga. Se fusionan en un centauro acorazado tecnológico.' },
      { nombre: 'Mentiras (Lies)', temporada: 4, causa: 'Adrien le mentía por ser Cat Noir. Esfera que paraliza mentirosos.' },
      { nombre: 'Ryukomori', temporada: 5, causa: 'Manipulada por su madre y Gabriel. Giganta de nubes y viento.' }
    ],
    familia: ['Nozomi Tsurugi (abuela materna)', 'Tomoe Tsurugi (madre)', 'Cerise Bianca (hermana — por confirmar)'],
    personalidadCivil: 'Honesta, directa, disciplinada y leal. Fuerte código de honor. A veces parece fría por su crianza sobreprotectora. Le cuesta expresar emociones con suavidad. En T6 aprende a rebelarse contra su madre.',
    vidaCivil: 'Llegó a París desde Japón como parte de la familia Tsurugi. Rival y luego amiga de Marinette. Novia de Adrien en T3, terminaron amistosamente. En T5 se acerca a Félix Fathom. En T6 mantiene relación con Félix y enfrenta la vigilancia de Tomoe.'
  },
  {
    id: 'pegasus',
    nombre: 'Pegasus',
    civil: 'Max Kanté',
    poder: 'Portal (Voyage) · Migración',
    kwami: 'Kaalki',
    temporada: 3,
    imagen: 'img/heroes/pegasuss.png',
    imagenCivil: 'img/civil/max.jpg',
    descripcionHeroe: 'Seguro, calculador, analítico y estratega tecnológico. Traje gris y verde con gafas de interfaz y herradura como búmeran. Su rol principal es la logística y movilidad del equipo.',
    poderes: [
      { nombre: 'Portal (Voyage)', desc: 'Abre un portal dimensional circular verde que conecta su ubicación con cualquier punto del universo. Transporta objetos gigantescos o a todo el equipo de forma instantánea.' }
    ],
    evolucion: [
      'T3: Debut en "Startrain". Salva a su madre y pasajeros de un tren espacial.',
      'T4-T5: Soporte logístico indispensable. Se une a la Resistencia.',
      'T6: Integra su conocimiento tecnológico con la magia. Detecta hackeos de Chrysalis.'
    ],
    akumatizaciones: [],
    familia: ['Claudie Kanté (madre)'],
    personalidadCivil: 'Brillante, generoso, leal. Mente matemática superdesarrollada. Calcula probabilidades en segundos. Creador de Markov (robot con IA y emociones). En T6 referente de neurodivergencia: explica que su forma de calcular en porcentajes es su manera natural de procesar la realidad.',
    vidaCivil: 'Destaca en torneos de videojuegos y programación. Creó a Markov en T2. En T4-T5 hackea sistemas para la Resistencia. En T6 optimiza la infraestructura ecológica de París.'
  }
];


const VILLANOS = [
  {
    id: 'monarca',
    nombre: 'El Monarca / Hawk Moth',
    civil: 'Gabriel Agreste',
    poder: 'Akumatizar civiles · Crear Sentimonstruos · Todos los Miraculous (T5)',
    kwami: 'Nooroo y Duusu (robados)',
    temporada: 1,
    imagen: 'img/heroes/monarca.jpg',
    imagenCivil: 'img/civil/gabi.jpg',
    descripcionVillano: 'El principal antagonista de las primeras cinco temporadas. Evolucionó de Hawk Moth (T1-T3) a Shadow Moth (T4) hasta El Monarca (T5), su encarnación más peligrosa. Murió al final de la T5 sacrificando su propia vida para sanar a Nathalie y asegurar la felicidad de Adrien.',
    objetivo: 'Obtener los Miraculous de la Mariquita y el Gato para invocar a Gimmi y pedir la resurrección de su esposa Emilie, caída en coma mágico por usar el Miraculous dañado del Pavo Real.',
    consecuencias: 'El uso del Miraculous lo corrompió psicológicamente. Cat Noir lo golpeó con el Cataclismo sin saber que era su padre, iniciando su degradación física. Murió al intercambiar su vida por la de Nathalie.',
    mejorPlan: '"Los Anillos Alianza" (T4-T5): Digitalizó los poderes de los Kwamis fundiendo sus joyas y forjando anillos tecnológicos. Casi logra una akumatización masiva mundial.',
    akumatizaciones: [
      { nombre: 'El Coleccionista (The Collector)', temporada: 2, causa: 'Se autoakumatiza voluntariamente para desviar sospechas. Atrapa personas y objetos en las páginas de un libro mágico.' }
    ],
    familia: ['Amelie Graham de Vanily (cuñada)', 'Félix Fathom (sobrino)', 'Emilie Graham de Vanily (esposa — fallecida)', 'Adrien Agreste (hijo — sentimonstruo)'],
    personalidadCivil: 'Nació como "Gabi Grassette" en familia humilde. Cambió su nombre a Gabriel Agreste para conquistar la moda. Culto, pulcro, misterioso, de fachada de alta alcurnia. Con el tiempo perdió la cordura, siendo Nathalie quien lo corregía en sus últimas temporadas.',
    vidaCivil: 'Diseñador de moda más grande de Francia. Conoció a Emilie en una expedición; se casaron y fundaron la marca Gabriel. Viajaron al Tíbet con Nathalie y encontraron los Miraculous. Emilie usó el Pavo Real dañado para crear a Adrien como sentimonstruo, cayendo luego en coma. Gabriel ocultó su cuerpo en el sótano. En T6 su "legado" es usado por Chrysalis para financiar su nueva campaña de terror.'
  },
  {
    id: 'mayura',
    nombre: 'Mayura',
    civil: 'Nathalie Sancoeur',
    poder: 'Amokización · Crear Sentimonstruos',
    kwami: 'Duusu (robado)',
    temporada: 2,
    imagen: 'img/heroes/mayura.png',
    imagenCivil: 'img/civil/nathie.jpg',
    descripcionVillano: 'La asistente personal de Gabriel y su mano derecha absoluta. Portó el Miraculous dañado del Pavo Real por amor a Gabriel, sabiendo que destruía su salud. Evolucionó de cómplice fría a figura materna de Adrien. En T5 se arrepiente completamente y muere brevemente, siendo revivida por el deseo final de Gabriel.',
    objetivo: 'Por amor a Gabriel: ayudarlo a cumplir su meta de resucitar a Emilie y mantener a Adrien a salvo.',
    consecuencias: 'Desarrolló una enfermedad mortal incurable por usar el Miraculous dañado. En T5 necesitó un exoesqueleto para caminar. Murió brevemente antes del clímax.',
    mejorPlan: 'La Batalla de los Miraculous (T3): Logró que Chloé traicionara al equipo y arrebatara la Caja de los Miraculous al Maestro Fu.',
    akumatizaciones: [
      { nombre: 'Catalizadora (Catalyst)', temporada: 2, causa: 'Akumatización estratégica voluntaria. Al tocar a Hawk Moth lo transforma en Scarlet Moth con akumas rojos ilimitados.' },
      { nombre: 'Safari', temporada: 5, causa: 'Monarch la akumatiza al verla postrada y resentida. Cazadora de élite futurista con dardos rastreadores infalibles.' }
    ],
    familia: ['Camilo Pista (padre — misterioso, vinculado a "The Kingdom")'],
    personalidadCivil: 'Seria, lógica, disciplinada y firme. Cabello azul oscuro con icónico mechón rojo. Evolucionó de fría asistente a madre cariñosa y permisiva. En T6 es la tutora legal de Adrien, lo abraza constantemente y le da la libertad que Gabriel le negó.',
    vidaCivil: 'Exploradora y cazadora de tesoros antes de conocer a Gabriel. Descifró los mapas del Tíbet. Ascendió a secretaria ejecutiva. Descubrió por sí sola que Marinette es Ladybug. En T6 gestiona las finanzas y el bienestar de Adrien. Su padre Camilo Pista está vinculado a "The Kingdom", organización secreta de T6.'
  },
  {
    id: 'chrysalis',
    nombre: 'Chrysalis',
    civil: 'Lila Rossi / Iris Verdi / Cerise / Bianca',
    poder: 'Akumatizar civiles (Miraculous de la Mariposa robado)',
    kwami: 'Nooroo (robado a Gabriel)',
    temporada: 6,
    imagen: 'img/heroes/Chrysalis.png',
    imagenCivil: 'img/civil/lila.jpg',
    descripcionVillano: 'La nueva villana principal de la T6. Robó el Miraculous de la Mariposa de Gabriel tras la batalla final. Su traje es futurista, orgánico y amenazante en tonos morados oscuros, simbolizando la metamorfosis. Es la antagonista más inteligente y peligrosa de la serie.',
    objetivo: 'Destruir el nuevo París ecológico, desestabilizar a Ladybug psicológicamente y vengarse del entorno que la marginó. Actualmente en el episodio más reciente ha seguido a la familia de Marinette a China.',
    consecuencias: 'Al ser hija de Tomoe Tsurugi, conoce todos los secretos de los Agreste y los anillos Alianza, lo que la hace más peligrosa que Gabriel.',
    mejorPlan: 'Akumatizó a Marinette como Heartfixer (episodio 20, T6), rompiendo el mito de que la protagonista era inmune. En China sigue a la familia Dupain-Cheng para atacarla desde su núcleo familiar.',
    akumatizaciones: [],
    familia: ['Tomoe Tsurugi (madre biológica)', 'Kagami Tsurugi (media hermana)'],
    personalidadCivil: 'Sociópata patológica. Operó bajo múltiples identidades: Lila Rossi (estudiante italiana), Iris Verdi (nueva escuela T6), Cerise y Bianca (alias clandestinos). Usa la técnica de Camaleón de Voz: altera su voz al akumatizar para que sus víctimas no la reconozcan.',
    vidaCivil: 'Llegó a la escuela Françoise Dupont en T1 mintiendo sobre su vida. Cuando Marinette la desenmascaró juró destruirla. Aprendiz de Gabriel. En T5 robó el Miraculous al caer Gabriel. Usa el sótano de la mansión Agreste y las bases de datos de los anillos Alianza para su guerra digital.'
  },

];

const KWAMIS = [
  {
    id: 'tikki',
    nombre: 'Tikki',
    poder: 'Creación',
    animal: 'Mariquita',
    portador: 'Marinette Dupain-Cheng (Ladybug)',
    antiguosPortadores: ['Mudekudeku (África)', 'Juana de Arco (Francia)', 'La Mariquita (China antigua)'],
    personalidad: 'Sabia, madura, optimista, paciente y muy responsable. Es el pilar del equipo. Actúa como guía y soporte emocional principal de Marinette.',
    come: 'Dulces, galletas con chispas de chocolate y macarons.',
    reglas: 'No puede revelar el nombre de su portadora. En T5 fue prisionera de Monarch brevemente.',
    historia: 'Existe desde antes de la humanidad. Una de las kwamis más antiguas y poderosas del universo. En T6 sigue firme con Marinette incluso durante el viaje a China.',
    categoria: 'Creación',
    imagen: 'img/kwamis/tikki.png' 
  },
  {
    id: 'plagg',
    nombre: 'Plagg',
    poder: 'Destrucción',
    animal: 'Gato negro',
    portador: 'Adrien Agreste (Cat Noir)',
    antiguosPortadores: ['Caballeros medievales europeos'],
    personalidad: 'Perezoso, glotón, sarcástico, rebelde. En el fondo profundamente leal y cariñoso. Mayor apoyo emocional de Adrien en T6.',
    come: 'Queso Camembert exclusivamente (entre más apestoso, mejor).',
    reglas: 'No puede revelar el nombre de su portador. El Cataclismo no puede usarse contra seres vivos sin consecuencias graves.',
    historia: 'Fue el responsable de extinguir a los dinosaurios y hundir la Atlántida por usar su poder sin portador. En T6 es el mayor apoyo emocional de Adrien ahora que vive con Nathalie.',
    categoria: 'Destrucción',
    imagen: 'img/kwamis/plagg.jpeg'
  },
  {
    id: 'nooroo',
    nombre: 'Nooroo',
    poder: 'Transmisión',
    animal: 'Mariposa',
    portador: 'Chrysalis / Lila Rossi (robado — T6)',
    antiguosPortadores: ['Guardianes del orden ancestral'],
    personalidad: 'Dulce, pacífica, sumisa y compasiva. Su tragedía: años siendo esclavizado. Lleva temporadas siendo usado para el mal contra su voluntad.',
    come: 'Dulces y plantas.',
    reglas: 'El Miraculous de la Mariposa solo puede usarse para el bien. Usado para el mal daña al kwami y al tejido moral del universo.',
    historia: 'Esclavizado por Gabriel durante cinco temporadas. Al inicio de T6 sigue siendo el esclavo de Chrysalis, quien lo usa de forma mucho más inteligente y retorcida.',
    categoria: 'Transmisión',
    imagen: 'img/kwamis/nooro.jpeg'
  },
  {
    id: 'duusu',
    nombre: 'Duusu',
    poder: 'Emoción / Empatía',
    animal: 'Pavo real',
    portador: 'Félix Fathom (Argos) — T6',
    antiguosPortadores: ['Emilie Agreste (portadora original)', 'Nathalie Sancoeur (Mayura)'],
    personalidad: 'Antes inestable por el Miraculous roto: oscilaba entre alegría hiperactiva y tristeza profunda. Actualmente recuperado y muy entusiasta. Félix lo trata con inmenso respeto.',
    come: 'Semillas y almendras.',
    reglas: 'El amok debe mantenerse dentro del objeto Sentimonster. El Miraculous dañado transfería la grieta mágica a la salud del portador.',
    historia: 'El Miraculous estuvo roto años. Emilie lo usó para crear a Adrien, cayendo en coma. Nathalie lo portó como Mayura, enfermando gravemente. En T6 su portador oficial es Félix Fathom (Argos), quien lo usa para enmendar los errores del pasado.',
    categoria: 'Empatía',
    imagen: 'img/kwamis/duusu.jpeg'
  },
  {
    id: 'trixx',
    nombre: 'Trixx',
    poder: 'Ilusión',
    animal: 'Zorro naranja',
    portador: 'Alya Césaire (Rena Rouge) — T6 portadora definitiva',
    antiguosPortadores: ['Grandes estrategas de la historia humana'],
    personalidad: 'Astuto, burlón, sumamente inteligente. Le encanta animar a sus portadores a romper las reglas de forma divertida.',
    come: 'Frutas, especialmente uvas.',
    reglas: 'La ilusión Mirage desaparece al contacto físico.',
    historia: 'En T5 fue obligado por Monarch a transferir su poder digitalmente. En T6 ha regresado de forma permanente con Alya.',
    categoria: 'Ilusión',
    imagen: 'img/kwamis/trixx.png'
  },
  {
    id: 'wayzz',
    nombre: 'Wayzz',
    poder: 'Protección',
    animal: 'Tortuga verde',
    portador: 'Nino Lahiffe (Carapace)',
    antiguosPortadores: ['Maestro Fu (casi dos siglos juntos)'],
    personalidad: 'Calmado, protector, sumamente responsable. Actúa como brújula moral del grupo.',
    come: 'Hojas verdes y té.',
    reglas: 'No puede revelar el nombre de su portador.',
    historia: 'Estuvo con el Gran Maestro Fu durante más de 180 años. En T6 trabaja con Nino en la primera línea de batalla.',
    categoria: 'Protección',
    imagen: 'img/kwamis/wayzz.jpeg'
  },
  {
    id: 'pollen',
    nombre: 'Pollen',
    poder: 'Sujeción / Inmovilización',
    animal: 'Abeja reina amarilla y negra',
    portador: 'Zoé Lee (Vesperia) — T6 portadora definitiva',
    antiguosPortadores: ['Chloé Bourgeois (Queen Bee)'],
    personalidad: 'Extremadamente educada, formal, caballerosa. Trata a su portador con títulos de nobleza. Adora a Zoé por su buen corazón.',
    come: 'Miel y dulces.',
    reglas: 'No puede revelar el nombre de su portadora.',
    historia: 'En las primeras temporadas sirvió a Chloé Bourgeois. Pasó por el crisol de Monarch. En T6 felizmente unida a Zoé.',
    categoria: 'Sujeción',
    imagen: 'img/kwamis/pollen.png'
  },
  {
    id: 'sass',
    nombre: 'Sass',
    poder: 'Intuición / Control del tiempo',
    animal: 'Cobra verde',
    portador: 'Luka Couffaine (Viperion)',
    antiguosPortadores: ['Grandes sabios del antiguo Egipto'],
    personalidad: 'Líder natural de los Kwamis secundarios. Sabio, analítico, sereno. Mantiene el orden entre los demás Kwamis cuando entran en pánico.',
    come: 'Alimentos fríos o huevos.',
    reglas: 'La Segunda Oportunidad tiene un límite de cuántas veces puede usarse seguida sin afectar la salud mental del portador.',
    historia: 'En T6 sigue operando con Luka, sirviendo como red de seguridad del equipo ante errores temporales.',
    categoria: 'Intuición',
    imagen: 'img/kwamis/sass.png'
  },
  {
    id: 'kaalki',
    nombre: 'Kaalki',
    poder: 'Migración / Teletransportación',
    animal: 'Caballo marrón con crin blanca',
    portador: 'Max Kanté (Pegasus)',
    antiguosPortadores: ['Tribus de las llanuras americanas'],
    personalidad: 'Refinada, orgullosa y un poco elitista. Exige ser transportada con la máxima elegancia.',
    come: 'Manzanas frescas y cubos de azúcar.',
    reglas: 'Los portales consumen mucha energía mágica.',
    historia: 'En T6 trabaja con Max Kanté, complementando su mente ultra lógica con los portales cósmicos.',
    categoria: 'Migración',
    imagen: 'img/kwamis/kaalki.png'
  },
  {
    id: 'fluff',
    nombre: 'Fluff',
    poder: 'Evolución / Viajes en el tiempo',
    animal: 'Coneja blanca',
    portador: 'Alix Kubdel (Bunnyx)',
    antiguosPortadores: ['Bunnyx del futuro (portadora futura)'],
    personalidad: 'Atolondrada, confusa, excéntrica. Vive experimentando el pasado, presente y futuro simultáneamente, lo que la hace olvidar en qué año está.',
    come: 'Zanahorias.',
    reglas: 'La Madriguera solo puede usarse para viajar en el tiempo, no para cambiar eventos importantes sin consecuencias.',
    historia: 'Ha viajado por todas las épocas desde la prehistoria hasta el futuro lejano. Su portadora definitiva en T6 es Alix Kubdel.',
    categoria: 'Evolución',
    imagen: 'img/kwamis/fluff.jpeg'
  },
  {
    id: 'longg',
    nombre: 'Longg',
    poder: 'Perfección / Los Tres Elementos',
    animal: 'Dragón rojo',
    portador: 'Kagami Tsurugi (Ryuko)',
    antiguosPortadores: ['Legendarios samuráis y guerreros dinásticos de Asia'],
    personalidad: 'Formal, disciplinado, rígido. Muy apegado a los códigos de honor de los guerreros orientales. Comparte la disciplina de Kagami.',
    come: 'Sandía y té rojo.',
    reglas: 'Cada forma elemental consume energía por separado.',
    historia: 'En T6 vinculado a Kagami, con quien comparte su estricta disciplina y código de honor.',
    categoria: 'Perfección',
    imagen: 'img/kwamis/longg.png'
  },
  {
    id: 'mullo',
    nombre: 'Mullo',
    poder: 'Multiplicación',
    animal: 'Ratoncita gris con detalles rosas',
    portador: 'Mylène Haprèle (Polymouse)',
    antiguosPortadores: ['Primeras civilizaciones agrícolas'],
    personalidad: 'Tierna, cooperativa, muy organizada. Trabaja excelente en equipo. Se estresa con el desorden.',
    come: 'Granos y queso fresco.',
    reglas: 'Los clones miniatura tienen autonomía limitada.',
    historia: 'En T6 asignada definitivamente a Mylène Haprèle como Polymouse.',
    categoria: 'Multiplicación',
    imagen: 'img/kwamis/mullo.png'
  },
  {
    id: 'daizzi',
    nombre: 'Daizzi',
    poder: 'Júbilo / Deseos del corazón',
    animal: 'Cerdito rosa con manchas',
    portador: 'Rose Lavillant (Pigella)',
    antiguosPortadores: ['Festivales de primavera de culturas antiguas'],
    personalidad: 'Adorable, optimista al extremo, cariñoso. Ve el lado positivo de todo absolutamente.',
    come: 'Frutas muy dulces.',
    reglas: 'El Regalo muestra los deseos más profundos de una persona, lo que puede ser abrumador.',
    historia: 'En T6 asiste a Rose Lavillant con su ternura infinita.',
    categoria: 'Júbilo',
    imagen: 'img/kwamis/daizzy.png'
  },
  {
    id: 'gimmi',
    nombre: 'Gimmi',
    poder: 'Realidad Absoluta',
    animal: 'Fusión de Tikki y Plagg',
    portador: 'Solo aparece cuando se juntan el Miraculous de la Mariquita y el Gato Negro',
    antiguosPortadores: ['Gabriel Agreste (última invocación — T5)'],
    personalidad: 'Entidad suprema. No tiene portador permanente. Concede cualquier deseo bajo la ley del Intercambio Equivalente.',
    come: 'No aplica — no necesita recarga convencional.',
    reglas: 'Todo deseo requiere un Intercambio Equivalente: para dar vida, otra debe entregarse. Para alterar la realidad, el costo es proporcional.',
    historia: 'Solo aparece al unir los Miraculous de la Mariquita y el Gato. Gabriel lo invocó al final de T5 para pedir la sanación de Nathalie y la felicidad de Adrien, entregando su propia vida como Intercambio Equivalente.',
    categoria: 'Realidad Absoluta',
    imagen: 'img/kwamis/gimmi.png'
  }
];

const TEMPORADAS = [
  {
    id: 't1', numero: 1, titulo: 'Los Orígenes', año: '2015', episodios: 26,
    descripcion: 'Marinette y Adrien reciben sus Miraculous. Hawk Moth lanza su primera campaña de akumatizaciones para robar las joyas de los héroes.',
    destacados: ['Orígenes (Parte 1 y 2)', 'El Tiempo Festivo', 'Lady Wifi', 'Antibug', 'Volpina'], imagen: 'img/temporadas/temp1.jpg'
  },
  {
    id: 't2', numero: 2, titulo: 'Nuevos Aliados', año: '2017', episodios: 26,
    descripcion: 'Aparecen Rena Rouge, Carapace y Queen Bee. Hawk Moth y Nathalie forman el dúo Mayura. Aparece Lila Rossi por primera vez.',
    destacados: ['Anansi', 'Sapotis', 'La Reina de las Abejas', 'El Día de los Héroes (Parte 1 y 2)'], imagen: 'img/temporadas/temp2.png'
  },
  {
    id: 't3', numero: 3, titulo: 'Nuevas Amenazas', año: '2019', episodios: 26,
    descripcion: 'Aparecen Viperion, Ryuko, Pegasus y más portadores. Chloé traiciona al equipo. Marinette se convierte en Gran Guardiana.',
    destacados: ['Ikari Gozen', 'Chat Blanc', 'Desperada', 'Timetagger', 'Miracle Queen (Parte 1 y 2)'], imagen: 'img/temporadas/temp3.png'
  },
  {
    id: 't4', numero: 4, titulo: 'El Guardián', año: '2021', episodios: 26,
    descripcion: 'Marinette asume como Guardiana. Hawk Moth se convierte en Shadow Moth. Aparece Vesperia. Los anillos Alianza comienzan a desplegarse.',
    destacados: ['Guiltrip', 'Kuro Neko', 'Rocketear', 'Dearest Family', 'Risk'], imagen: 'img/temporadas/temp4.png'
  },
  {
    id: 't5', numero: 5, titulo: 'Revolución', año: '2023', episodios: 28,
    descripcion: 'Gabriel se convierte en el Monarca con acceso a todos los Miraculous. Revelación de identidades. Muerte de Gabriel. Nacimiento de Chrysalis.',
    destacados: ['Multiplication', 'Destruction', 'Jubilation', 'Revolution', 'Conformation', 'Recreation (Final Finale)'], imagen: 'img/temporadas/temp5.png'
  },
  {
    id: 't6', numero: 6, titulo: 'Un Nuevo Comienzo', año: '2024-2025', episodios: 'En curso',
    descripcion: 'Nueva animación CGI. Chrysalis (Lila Rossi) como nueva villana. París ecológico. Marinette akumatizada por primera vez. Chrysalis sigue a la familia Dupain-Cheng a China.',
    destacados: ['Heartfixer (Episodio 20)', 'Queen of the Deadzone', 'Nemesis (próximo)', 'Protocolo Secreto (próximo)'], imagen: 'img/temporadas/temp6.jpg'
  }
];

function iniciarPersonajes() {
  const container = document.getElementById('personajes-container');
  if (!container) return;

  function renderCards(tipo) {
    let lista = [];
    if (tipo === 'todos' || tipo === 'heroes')  lista = [...lista, ...HEROES.map(h => ({...h, tipo:'heroe'}))];
    if (tipo === 'todos' || tipo === 'villanos') lista = [...lista, ...VILLANOS.map(v => ({...v, tipo:'villano'}))];
    if (tipo === 'todos' || tipo === 'kwamis')   lista = [...lista, ...KWAMIS.map(k => ({...k, tipo:'kwami'}))];

    container.innerHTML = lista.map(p => `
      <div class="personaje-card" onclick="irAWiki('${p.tipo}','${p.id}')">
        <span class="personaje-card__badge ${p.tipo === 'kwami' ? 'personaje-card__badge--kwami' : ''}">
          ${p.tipo === 'heroe' ? 'Héroe' : p.tipo === 'villano' ? 'Villano' : 'Kwami'}
        </span>
        <img src="${p.imagen}" alt="${p.nombre}" class="personaje-card__img" onerror="this.src='img/placeholder.jpg'">
        <div class="personaje-card__overlay">
          <div class="personaje-card__nombre">${p.nombre}</div>
          <div class="personaje-card__poder">${p.poder}</div>
          <div class="personaje-card__meta">
            ${p.civil ? `Civil: ${p.civil}` : (p.portador ? `Portador: ${p.portador.split('(')[0]}` : '')}
            ${p.temporada ? ` · Desde T${p.temporada}` : ''}
          </div>
        </div>
      </div>`).join('');
  }

  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      renderCards(btn.dataset.filtro);
    });
  });

  renderCards('todos');
}

function iniciarTemporadas() {
  const container = document.getElementById('temporadas-container');
  if (!container) return;
  container.innerHTML = TEMPORADAS.map(t => `
    <div class="temporada-card" onclick="irAWikiTemporada('${t.id}')">
      <img src="${t.imagen}" alt="Temporada ${t.numero}" class="temporada-card__img" onerror="this.src='img/placeholder.jpg'">
      <div class="temporada-card__info">
        <div class="temporada-card__num">Temporada ${t.numero} · ${t.año}</div>
        <div class="temporada-card__titulo">${t.titulo}</div>
        <div class="temporada-card__desc">${t.descripcion.slice(0, 110)}…</div>
      </div>
    </div>`).join('');
}

function irAWiki(tipo, id) {
  const rutas = { heroe: 'wiki/heroe.html', villano: 'wiki/villano.html', kwami: 'wiki/kwami.html' };
  window.location.href = `${rutas[tipo]}?id=${id}`;
}
function irAWikiTemporada(id) { window.location.href = `wiki/temporada.html?id=${id}`; }

function cargarWikiPersonaje(tipo) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (tipo === 'heroe')     return HEROES.find(h => h.id === id);
  if (tipo === 'villano')   return VILLANOS.find(v => v.id === id);
  if (tipo === 'kwami')     return KWAMIS.find(k => k.id === id);
  if (tipo === 'temporada') return TEMPORADAS.find(t => t.id === id);
  return null;
}

const PREGUNTAS_QUIZ = [
  { temporada:1, pregunta:'¿Cuál es el nombre del kwami de Marinette?', opciones:['Plagg','Tikki','Wayzz','Trixx'], correcta:1 },
  { temporada:1, pregunta:'¿Qué objeto porta Ladybug como arma principal?', opciones:['Un paraguas','Un bastón','Un yo-yo','Un escudo'], correcta:2 },
  { temporada:1, pregunta:'¿Cuál es el verdadero objetivo de Hawk Moth?', opciones:['Destruir París','Dominar el mundo','Resucitar a su esposa','Robar el Miraculous de Tikki'], correcta:2 },
  { temporada:2, pregunta:'¿En qué episodio debuta Rena Rouge?', opciones:['Anansi','Sapotis','La Reina de las Abejas','El Día de los Héroes'], correcta:1 },
  { temporada:2, pregunta:'¿Qué kwami usa Nino como Carapace?', opciones:['Sass','Wayzz','Kaalki','Longg'], correcta:1 },
  { temporada:3, pregunta:'¿Cuál es el poder de Viperion?', opciones:['Teletransportación','Ilusiones','Retroceder el tiempo','Controlar el viento'], correcta:2 },
  { temporada:3, pregunta:'¿Quién traiciona al equipo al final de la T3?', opciones:['Lila Rossi','Kagami','Chloé Bourgeois','Nathalie'], correcta:2 },
  { temporada:4, pregunta:'¿Qué rol asume Marinette en la T4?', opciones:['Reina de París','Gran Guardiana del Miraculous','Directora del colegio','Líder de la policía'], correcta:1 },
  { temporada:5, pregunta:'¿Cómo murió Gabriel Agreste al final de la T5?', opciones:['Derrotado por Ladybug','Sacrificó su vida en el Intercambio Equivalente','Lo mató Cat Noir sin querer','Murió por la enfermedad del Cataclismo'], correcta:1 },
  { temporada:5, pregunta:'¿Quién robó el Miraculous de la Mariposa tras la caída de Monarch?', opciones:['Nathalie Sancoeur','Tomoe Tsurugi','Lila Rossi','Félix Fathom'], correcta:2 },
  { temporada:6, pregunta:'¿En qué episodio de la T6 Marinette es akumatizada por primera vez?', opciones:['Episodio 10','Episodio 15','Episodio 20 (Heartfixer)','Episodio 25'], correcta:2 },
  { temporada:6, pregunta:'¿Cuál es el nombre de la nueva heroína portadora del Miraculous de la Abeja en T6?', opciones:['Chloé Bourgeois','Zoé Lee (Vesperia)','Kagami Tsurugi','Alya Césaire'], correcta:1 }
];

function iniciarQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  let indice = 0, puntaje = 0, respondida = false;

  function renderPregunta() {
    if (indice >= PREGUNTAS_QUIZ.length) { mostrarResultado(); return; }
    const p = PREGUNTAS_QUIZ[indice];
    container.innerHTML = `
      <div class="quiz-progreso">${PREGUNTAS_QUIZ.map((_,i) => `<div class="quiz-progreso__dot ${i<indice?'completo':i===indice?'activo':''}"></div>`).join('')}</div>
      <div class="quiz-temporada-badge">Temporada ${p.temporada}</div>
      <div class="quiz-pregunta">${p.pregunta}</div>
      <div class="quiz-opciones">${p.opciones.map((op,i) => `<button class="quiz-opcion" onclick="responder(${i})" id="opcion-${i}">${op}</button>`).join('')}</div>
      <div id="quiz-feedback" style="min-height:36px;font-size:0.85rem;color:var(--gris-medio)"></div>`;
    respondida = false;
  }

  window.responder = function(idx) {
    if (respondida) return;
    respondida = true;
    const p = PREGUNTAS_QUIZ[indice];
    const btns = document.querySelectorAll('.quiz-opcion');
    btns.forEach(b => b.disabled = true);
    btns[p.correcta].classList.add('correcta');
    const feedback = document.getElementById('quiz-feedback');
    if (idx === p.correcta) { puntaje++; feedback.style.color='#00cc66'; feedback.textContent='¡Correcto! 🐞'; }
    else { btns[idx].classList.add('incorrecta'); feedback.style.color='var(--rojo)'; feedback.textContent=`Incorrecto. Era: ${p.opciones[p.correcta]}`; }
    setTimeout(() => { indice++; renderPregunta(); }, 1800);
  };

  function mostrarResultado() {
    const total = PREGUNTAS_QUIZ.length, pct = Math.round((puntaje/total)*100);
    let msg = pct===100 ? '¡Eres un verdadero Guardián del Miraculous! 🏆' : pct>=70 ? '¡Excelente conocimiento de la serie! 🐞' : pct>=40 ? '¡Sigue viendo Miraculous para mejorar! 🐱' : 'Necesitas revisar la saga completa 😅';
    container.innerHTML = `<div class="quiz-resultado"><div class="quiz-resultado__puntaje">${puntaje}/${total}</div><div class="quiz-resultado__texto">${msg}</div><p style="font-size:0.8rem;color:var(--gris-medio);margin-bottom:24px">${pct}% correctas</p><button class="quiz-btn-reiniciar" onclick="reiniciarQuiz()">Intentar de nuevo</button></div>`;
  }

  window.reiniciarQuiz = function() { indice=0; puntaje=0; renderPregunta(); };
  renderPregunta();
}

window.HEROES   = HEROES;
window.VILLANOS = VILLANOS;
window.KWAMIS   = KWAMIS;
window.TEMPORADAS = TEMPORADAS;
window.cargarWikiPersonaje = cargarWikiPersonaje;
