// ===== Carousel =====
const track = document.querySelector('.carousel-track');
const btnPrevList = document.querySelectorAll('.btn-prev');
const btnNextList = document.querySelectorAll('.btn-next');

const products = [
  {
    id: 1,
    image: 'images/Showcase your individuality with a refined….jpeg',
    name: 'Adult Haircut Fade',
    price: 'R300'
  },
  {
    id: 2,
    image: 'images/3B4A2063-copy-scaled.jpg',
    name: 'Beard Shave Clipper',
    price: 'R40'
  },
  {
    id: 3,
    image: 'images/3B4A2284-copy-scaled.jpg',
    name: 'Kid Fade',
    price: 'R150'
  }
];

// Add clones for infinite scroll
const firstClone = { ...products[0], id: 'first-clone' };
const lastClone = { ...products[products.length - 1], id: 'last-clone' };

const carouselItems = [lastClone, ...products, firstClone];

// Inject products into the carousel
track.innerHTML = carouselItems.map(product => `
  <div class="card" data-id="${product.id}">
    <img src="${product.image}" alt="${product.name}" />
    <div class="card-content">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </div>
  </div>
`).join('');

let index = 1;

function getCardWidth() {
  const card = document.querySelector('.card');
  return card ? card.offsetWidth : 0;
}

function updateScroll() {
  const cardWidth = getCardWidth();
  track.style.transition = 'transform 0.4s ease-in-out';
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function jumpToIndex(i) {
  const cardWidth = getCardWidth();
  track.style.transition = 'none';
  track.style.transform = `translateX(-${i * cardWidth}px)`;
}

track.addEventListener('transitionend', () => {
  if (carouselItems[index].id === 'first-clone') {
    index = 1;
    jumpToIndex(index);
  }

  if (carouselItems[index].id === 'last-clone') {
    index = products.length;
    jumpToIndex(index);
  }
});

btnNextList.forEach(btn => {
  btn.addEventListener('click', () => {
    if (index >= carouselItems.length - 1) return;
    index++;
    updateScroll();
  });
});

btnPrevList.forEach(btn => {
  btn.addEventListener('click', () => {
    if (index <= 0) return;
    index--;
    updateScroll();
  });
});

window.addEventListener('resize', () => {
  jumpToIndex(index);
});

window.addEventListener('load', () => {
  jumpToIndex(index);
});


// ===== Mobile Nav Toggle + Scroll Lock =====
const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const navLinkItems = document.querySelectorAll('#nav-links a');

toggleBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('active');

  // Lock or unlock scroll
  if (navLinks.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});

// Close nav and enable scroll when a link is clicked
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});
