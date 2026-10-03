// selectors
const caracter = document.querySelector('.car');
const wold = document.querySelector('.world');
const computerScreen = document.querySelector('.screen')
const cptr_bg = document.querySelector('.screen_bg')

const projects = [
  {
    name: 'Shifa',
    discreption: 'A health app that helps patients book appointments with doctors and keep track of their medical records.',
    img: 'img/shifa.png',
    link: 'https://github.com/your-username/shifa',
    techs: ['React', 'Node.js', 'MongoDB'],
    type: 'Web app'
  },
  {
    name: 'Bejaia Tour Guide',
    discreption: 'An interactive guide to the city of Bejaia: landmarks, beaches, restaurants and a map with suggested routes.',
    img: 'img/bejaia.png',
    link: 'https://github.com/your-username/bejaia-tour-guide',
    techs: ['JavaScript', 'Leaflet', 'CSS'],
    type: 'Website'
  },
  {
    name: 'LTFM',
    discreption: 'A management tool for a local football league: teams, fixtures, results and a live standings table.',
    img: 'img/ltfm.png',
    link: 'https://github.com/your-username/ltfm',
    techs: ['Python', 'Django', 'PostgreSQL'],
    type: 'Full-stack'
  }
];

// create the markers
let sp = 0;
projects.forEach((p, index) => {
  const container = document.createElement('div');
  container.id = `p${index}`;
  container.innerText = p.name;
  container.classList.add('marker');
  sp += 500;
  container.style.left = `${sp}px`;
  wold.appendChild(container);
});

const markers = document.querySelectorAll('.marker');   // CHANGED: moved up, after the markers exist
let content = null;                                     // CHANGED: replaces isNear + old content

let Screenwidth = window.innerWidth;
window.addEventListener('resize', function () {
  Screenwidth = window.innerWidth;
});

let m = 0;

window.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    m = Math.max(0, m - 10);
  } else if (event.key === 'ArrowRight') {
    m = Math.min(m + 10, wold.offsetWidth - caracter.offsetWidth);   // CHANGED: one line, same effect
  }else if (event.key === 'Enter' && content) {
    cptr_bg.style.display = 'flex'
    computerScreen.innerText = content.discreption
  }

  if(content === null ){
    cptr_bg.style.display = 'none'
  }

  caracter.style.left = `${m}px`;

  const maxOffset = Math.max(0, wold.offsetWidth - Screenwidth);
  const offset = Math.min(maxOffset, Math.max(0, m - Screenwidth / 2));
  wold.style.transform = `translateX(${-offset}px)`;

  checkNear();   
});

function checkNear() {
  const charCenter = m + caracter.offsetWidth / 2;
  content = null;                                        
  markers.forEach((marker, index) => {
    const markerCenter = marker.offsetLeft + marker.offsetWidth / 2;
    const near = Math.abs(markerCenter - charCenter) < 20;
    
    if (near) {
        content = projects[index];
    }
    marker.classList.toggle('near', near);
    marker.innerText = near ? projects[index].name : '';

  });

}

checkNear();