document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.dashboard-hero, .section-title, .card');
    elementsToAnimate.forEach(el => {
        el.classList.add('hidden-reveal'); // Initial state
        observer.observe(el);
    });

    const grid = document.getElementById('pets-grid');
    const modal = document.getElementById('pet-modal');
    const closeBtn = document.querySelector('.close');

    // Modal Elements
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalStory = document.getElementById('modal-story');
    const modalGallery = document.getElementById('modal-gallery');

    // Render Grid
    petsData.forEach(pet => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${pet.mainImage}" alt="${pet.name}" class="card-img">
            <div class="card-body">
                <h3 class="card-title">${pet.name}</h3>
                <button class="btn btn-outline" onclick="openModal('${pet.name}')">
                    <span class="heart-icon">♥</span> Виж ${pet.name}
                </button>
            </div>
        `;
        // Make entire card clickable or use specific button logic. 
        // Here we use the button, but let's bind the data lookup easily.
        card.querySelector('button').onclick = (e) => {
            e.preventDefault();
            openModal(pet);
        };
        grid.appendChild(card);
    });

    // Open Modal Function
    window.openModal = (pet) => {
        modal.style.display = 'block';
        modalImg.src = pet.mainImage;
        modalTitle.textContent = pet.name;
        modalStory.textContent = pet.story;

        // Clear and Populate Gallery
        modalGallery.innerHTML = '';
        pet.gallery.forEach(imgSrc => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = 'gallery-thumb';
            thumb.onclick = () => {
                modalImg.src = imgSrc;
            };
            modalGallery.appendChild(thumb);
        });
    };

    // Close Modal Logic
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
