// selectors
const caracter = document.querySelector('.car');
const wold = document.querySelector('.world');
const computerScreen = document.querySelector('.screen')
const cptr_bg = document.querySelector('.screen_bg')
const winCntt = document.querySelector('.WinContent')
const skills = document.querySelector('.skills');
const Wintitle = document.querySelector('.title')
const proLink = document.querySelector('#proLink');
const sprite = document.querySelector('.sprite');
const carDial = document.querySelector('.carDial')
const contentBlock = document.querySelector('.contactHouse')
const closeScreen = document.querySelector('#CloseBtn');
const Clicker = document.querySelector("#Clicker");
const Goright = document.querySelector('#Goright') 
const Goleft = document.querySelector('#Goleft')

closeScreen.addEventListener('click',function(){
  cptr_bg.style.display = 'none'
});

// I am tiered , so to tommorow me , you better fix this lazzy approche to move the caracter without the keybord touches

Clicker.addEventListener('click', function(){
   window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
})

Goright.addEventListener('click', function(){
   window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
})

Goleft.addEventListener('click', function(){
   window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
})

const projects = [
  {
    name: 'Mega Shop',
    discreption: 'Projet d\'équipe auquel j\'ai contribué. Une marketplace e-commerce multi-vendeurs complète : assistant de chat IA, suivi des commandes, analyses avancées et gestion des clients, des vendeurs et des administrateurs.',
    img: 'assets/img/markers/shop.png',
    link: 'https://github.com/lyes-mersel/megashop',
    techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    type: 'Plateforme e-commerce'
  },
  {
    name: 'Bejaia Tour Guide',
    discreption: 'Projet personnel. Un guide touristique gratuit et accessible pour aider les visiteurs à découvrir la ville de Béjaïa, avec une carte interactive.',
    img: 'assets/img/markers/btg.png',
    link: 'https://github.com/BrahimiRayan/Bejaia-Tour-Guide',
    techs: ['Vue 3', 'JavaScript', 'CSS', 'Firebase', 'Leaflet'],
    type: 'Web app'
  },
  {
    name: 'Shifa',
    discreption: 'Projet personnel. Un système de gestion hospitalière qui permet la prise de rendez-vous des patients et la gestion du personnel de l\'hôpital.',
    img: 'assets/img/markers/shifa.png',
    link: 'https://github.com/BrahimiRayan/Shifa',
    techs: ['Express.js', 'EJS', 'SQL', 'CSS'],
    type: 'Web app'
  },
  {
    name: 'Azzy Store',
    discreption: 'Projet personnel. Une application web gratuite pour les petits commerçants, en ligne ou en boutique : elle permet de suivre les statistiques de leurs produits et de déployer une petite boutique en ligne.',
    img: 'assets/img/markers/azzy.png',
    link: 'https://github.com/BrahimiRayan/Azzy-Store',
    techs: ['Nuxt 3', 'TypeScript', 'Supabase', 'Drizzle ORM', 'BetterAuth', 'Chart.js'],
    type: 'Web app'
  },
  {
    name: 'LTFM',
    discreption: 'Projet personnel. Un gestionnaire de fichiers minimaliste pour Linux, écrit en C pur et sans aucune dépendance. Il permet de naviguer, créer, renommer, supprimer et rechercher des fichiers directement dans le terminal.',
    img: 'assets/img/markers/ltfm.png',
    link: 'https://github.com/BrahimiRayan/ltfm',
    techs: ['C'],
    type: 'Application terminal'
  },
  {
    name: 'Nappoli Pizzas',
    discreption: 'Projet client. Le site d\'une pizzeria. Il s\'agit de la version de mon GitHub : le site en ligne est hébergé et géré par le client.',
    img: 'assets/img/markers/pizza.png',
    link: 'https://github.com/BrahimiRayan/Nappoli-pizzas',
    techs: ['Nuxt', 'Tailwind CSS', 'Supabase'],
    type: 'Site web'
  },
  {
    name: 'Madel',
    discreption: 'Projet client. Le site de Madel, une entreprise d\'Île-de-France spécialisée dans le déménagement et le transport de meubles. Il s\'agit de la version de mon GitHub : le site en ligne est hébergé ailleurs par le client.',
    img: 'assets/img/markers/madel.png',
    link: 'https://github.com/BrahimiRayan/Madel',
    techs: ['Nuxt', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    type: 'Site web'
  },
  {
    name: 'Devis Madel',
    discreption: 'Projet client. Un logiciel indépendant créé pour l\'entreprise Madel, qui permet de générer des factures et des devis pour ses clients.',
    img: 'assets/img/markers/devise.png',
    link: 'https://github.com/BrahimiRayan/Devis-TrMadel',
    techs: ['JavaScript', 'HTML', 'CSS'],
    type: 'Logiciel'
  },

];
const SPEED = 20

let sp = 0;
projects.forEach((p, index) => {
  const container = document.createElement('div');
  container.id = `p${index}`;
  container.classList.add('marker');
  container.style.backgroundImage = `url(${p.img})`;

  sp += 500;
  container.style.left = `${sp}px`;
  wold.appendChild(container);
});

const markers = document.querySelectorAll('.marker');
let content = null;
let contact = false; 
let Screenwidth = window.innerWidth;
window.addEventListener('resize', function () {
  Screenwidth = window.innerWidth;
});

let m = 0;

window.addEventListener('keydown', function (event) {

  if (event.key === 'ArrowLeft') {
    m = Math.max(0, m - SPEED);
    sprite.classList.add('walking');
    sprite.style.transform = 'scaleX(-1)';
  } else if (event.key === 'ArrowRight') {
    // m = Math.min(m + SPEED, wold.offsetWidth - caracter.offsetWidth);
    m = Math.min(m + SPEED, wold.offsetWidth - sprite.offsetWidth); 
    sprite.classList.add('walking');
    sprite.style.transform = 'scaleX(1)';
  }

  caracter.style.left = `${m}px`;                    

  const maxOffset = Math.max(0, wold.offsetWidth - Screenwidth);           
  const offset = Math.min(maxOffset, Math.max(0, m - Screenwidth / 2));      
  wold.style.transform = `translateX(${-offset}px)`;                           

  checkNear(); 

  if (event.key === 'Enter' && content) {
    cptr_bg.style.display = 'flex'

    Wintitle.innerText = `${content.name}.exe  (${content.type})`

    winCntt.innerText = content.discreption

    skills.replaceChildren();
    content.techs.forEach(t => {

      const li = document.createElement('li');
      li.innerText = t;
      skills.appendChild(li)
    });

    proLink.style.display = '';                      
    proLink.href = content.link

  } else if (event.key === 'Enter' && contact) {
    cptr_bg.style.display = 'flex'

    Wintitle.innerText = `Contacts.exe`
// For tommorow me u need to fix this and replace it with an actuelle code , I AM WORNING YOU!
winCntt.innerHTML = `
  Développeur passionné par le <b>web</b> et les <b>systèmes</b>.
  Titulaire d'une double licence : <b>Systèmes d'Information</b> (Université de Béjaïa) et <b>Informatique Générale</b> (ISIMA).
  Actuellement en <b>Master 1 Informatique</b> à l'ISIMA, Clermont Auvergne.
  <br><br>
  Je cherche un <b>stage</b>, puis une <b>alternance à partir de septembre 2027</b>.
  <br><br>
  <b>Prêt à donner vie à votre prochain projet.</b>
  <br><br>
  GitHub : <a href="https://github.com/BrahimiRayan/" target="_blank" rel="noopener">BrahimiRayan</a><br>
  Email : <a href="mailto:brahimirayan06@gmail.com">brahimirayan06@gmail.com</a><br>
  LinkedIn : <a href="https://www.linkedin.com/in/brahimi-rayan-018880317/" target="_blank" rel="noopener">brahimi-rayan</a><br>
  Téléphone : <a href="tel:+33744157219">+33 7 44 15 72 19</a>
`;
    skills.replaceChildren();                        
    proLink.style.display = 'none';                  
  }

  if (!content && !contact) {                        
    cptr_bg.style.display = 'none'
    skills.replaceChildren();
  }
});


window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    sprite.classList.remove('walking');
  }
})


function checkNear() {
  // const charCenter = m + caracter.offsetWidth / 2;
  const charCenter = m + sprite.offsetWidth / 2; 
  content = null;
  markers.forEach((marker, index) => {
    const markerCenter = marker.offsetLeft + marker.offsetWidth / 2;
    const near = Math.abs(markerCenter - charCenter) < 20;

    if (near) {
      content = projects[index];
    }

    marker.classList.toggle('near', near);
  });

  const houseCenter = contentBlock.offsetLeft + contentBlock.offsetWidth / 2;
  contact = Math.abs(houseCenter - charCenter) < 20;

  carDial.style.display = (content || contact) ? 'block' : 'none';
}

checkNear();