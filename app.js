const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Close mobile menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// Testimonial slider code
const testimonials = document.querySelectorAll('.testimonial');
const testimonialWrapper = document.querySelector('.testimonial-wrapper');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Calculate the number of testimonials to show based on the screen size
const getTestimonialsToShow = () => (window.innerWidth <= 768 ? 1 : 4);

let testimonialsToShow = getTestimonialsToShow();

// Update the slider's position
function updateSliderPosition() {
  const offset = -currentIndex * (100 / testimonialsToShow);
  testimonialWrapper.style.transform = `translateX(${offset}%)`;
}

// Slide testimonials forward
function slideTestimonials() {
  currentIndex++;
  if (currentIndex >= testimonials.length - testimonialsToShow + 1) {
    currentIndex = 0;
  }
  updateSliderPosition();
}

// Auto-slide every 5 seconds
let interval = setInterval(slideTestimonials, 5000);

// Slide to the previous testimonial
prevBtn.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = testimonials.length - testimonialsToShow;
  }
  updateSliderPosition();
});

// Slide to the next testimonial
nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= testimonials.length - testimonialsToShow + 1) {
    currentIndex = 0;
  }
  updateSliderPosition();
});

// Adjust slider on window resize
window.addEventListener('resize', () => {
  testimonialsToShow = getTestimonialsToShow();
  currentIndex = 0;
  updateSliderPosition();
  clearInterval(interval);
  interval = setInterval(slideTestimonials, 5000);
});

// Add this code to handle nested dropdowns with double-click behavior
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach((toggle) => {
  let clickCount = 0; // Track the number of clicks

  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 960) { // Only apply this behavior in mobile view
      e.preventDefault(); // Prevent the link from navigating on the first click

      const dropdown = toggle.closest('.dropdown');
      dropdown.classList.toggle('active'); // Toggle the dropdown menu

      clickCount++;

      // If the user clicks "Our Pups" twice within 500ms, navigate to the link
      if (clickCount === 2) {
        window.location.href = toggle.getAttribute('href');
      }

      // Reset the click count after a short delay
      setTimeout(() => {
        clickCount = 0;
      }, 500); // Adjust the delay as needed
    }
  });
});

// Close the dropdown when clicking outside of it
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    const activeDropdowns = document.querySelectorAll('.dropdown.active');
    activeDropdowns.forEach((dropdown) => {
      dropdown.classList.remove('active');
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const dogId = urlParams.get('id');

  fetch('dogs.json')
    .then((response) => response.json())
    .then((dogs) => {
      const dog = dogs.find((d) => d.id === dogId);

      if (dog) {
        // Populate the template with the dog's data
        document.getElementById('dog-name').textContent = dog.name;
        document.getElementById('main-image').src = dog.mainImage;
        document.getElementById('pricing').textContent = dog.pricing;
        document.getElementById('pickup').textContent = dog.pickup;
        document.getElementById('about-title').textContent = `About ${dog.name}`;
        document.getElementById('dog-age').textContent = `Pomsky &bull; ${dog.age}`;
        document.getElementById('dog-description').textContent = dog.description;

        // Populate thumbnails
        const thumbnailContainer = document.getElementById('thumbnail-images');
        dog.thumbnails.forEach((thumbnail) => {
          const img = document.createElement('img');
          img.src = thumbnail;
          img.alt = `${dog.name} Thumbnail`;
          thumbnailContainer.appendChild(img);
        });

        // Populate included items
        const includedItemsContainer = document.getElementById('included-items');
        dog.includedItems.forEach((item) => {
          const div = document.createElement('div');
          div.className = 'included-item';
          div.innerHTML = `<span>🐾</span> ${item}`;
          includedItemsContainer.appendChild(div);
        });
      } else {
        // Handle the case where the dog is not found
        document.getElementById('dog-name').textContent = 'Dog Not Found';
        document.getElementById('dog-description').textContent = 'The dog you are looking for does not exist.';
      }
    })
    .catch((error) => {
      console.error('Error fetching dog data:', error);
    });
});
document.addEventListener("DOMContentLoaded", function () {
  const puppyCardsContainer = document.getElementById('puppy-cards');

  fetch('dogs.json')
    .then((response) => response.json())
    .then((dogs) => {
      dogs.forEach((dog) => {
        // Create the puppy card element
        const puppyCard = document.createElement('a');
        puppyCard.href = `dog-template.html?id=${dog.id}`; // Dynamic link
        puppyCard.className = `puppy-card ${dog.status.toLowerCase()}`; // Add status class

        // Create the image element
        const img = document.createElement('img');
        img.src = dog.image;
        img.alt = dog.name;
        puppyCard.appendChild(img);

        // Create the puppy info element
        const puppyInfo = document.createElement('div');
        puppyInfo.className = 'puppy-info';

        // Add the dog's name
        const name = document.createElement('h3');
        name.textContent = dog.name;
        puppyInfo.appendChild(name);

        // Add the dog's gender and birthdate
        const details = document.createElement('p');
        details.textContent = `${dog.gender} &bull; ${dog.birthdate}`;
        puppyInfo.appendChild(details);

        // Add the dog's status
        const status = document.createElement('span');
        status.className = 'status';
        status.textContent = dog.status;
        puppyInfo.appendChild(status);

        // Append the puppy info to the card
        puppyCard.appendChild(puppyInfo);

        // Append the card to the container
        puppyCardsContainer.appendChild(puppyCard);
      });
    })
    .catch((error) => {
      console.error('Error fetching dog data:', error);
    });
});