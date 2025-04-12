const track = document.querySelector('.carousel-track');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

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
  },
  {
    id: 4,
    image: 'images/3B4A2284-copy-scaled.jpg',
    name: 'Kid Fade',
    price: 'R150'
  },
];

// Clone first and last cards
const firstClone = { ...products[0], id: 'first-clone' };
const lastClone = { ...products[products.length - 1], id: 'last-clone' };

// Final list with clones added
const carouselItems = [lastClone, ...products, firstClone];

// Insert into DOM
track.innerHTML = carouselItems.map(product => `
  <div class="card">
    <img src="${product.image}" alt="${product.name}" />
    <div class="card-content">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </div>
  </div>
`).join('');

// Scroll logic
let index = 1; // Start on first real product (after the last-clone)
const cardWidth = 300 + 24; // card width + margin
const totalItems = carouselItems.length;

// Initial positioning
track.style.transform = `translateX(-${index * cardWidth}px)`;

// Handle transition end to loop seamlessly
track.addEventListener('transitionend', () => {
  const cards = document.querySelectorAll('.card');
  
  if (carouselItems[index].id === 'first-clone') {
    track.style.transition = 'none';
    index = 1;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  if (carouselItems[index].id === 'last-clone') {
    track.style.transition = 'none';
    index = products.length;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

function updateScroll() {
  track.style.transition = 'transform 0.4s ease-in-out';
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

btnNext.addEventListener('click', () => {
  if (index < totalItems - 1) {
    index++;
    updateScroll();
  }
});

btnPrev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateScroll();
  }
});
