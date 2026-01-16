(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();


// =======================
//   LEAFLET MAP INITIALIZATION
// =======================
document.addEventListener('DOMContentLoaded', function() {

  const mapElement = document.getElementById('map');
  
  if (mapElement) {

    // GET COORDINATES SAFELY
    const coordinates = JSON.parse(mapElement.dataset.coordinates || "[]");
    
    if (!coordinates.length) {
      console.log("❌ No coordinates found!");
      return;
    }

    const lat = coordinates[1];
    const lng = coordinates[0];

    // INITIALIZE MAP
    const map = L.map('map').setView([lat, lng], 12);

    // OPENSTREETMAP TILE LAYER (FREE)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // MARKER
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${mapElement.dataset.title}</b>`).openPopup();
  }

  // =======================
  //   SHOW MORE DESCRIPTION
  // =======================
  const descriptionElement = document.getElementById('description');
  if (descriptionElement) {
    const fullText = descriptionElement.textContent;
    const shortText = fullText.substring(0, 100);

    if (fullText.length > 100) {
      descriptionElement.innerHTML = `${shortText}... <button id="show-more-btn" class="btn btn-link p-0">Show More</button>`;

      const showMoreBtn = document.getElementById('show-more-btn');
      showMoreBtn.addEventListener('click', () => {
        descriptionElement.innerHTML = `${fullText} <button id="show-less-btn" class="btn btn-link p-0">Show Less</button>`;
        
        const showLessBtn = document.getElementById('show-less-btn');
        showLessBtn.addEventListener('click', () => {
            descriptionElement.innerHTML = `${shortText}... <button id="show-more-btn" class="btn btn-link p-0">Show More</button>`;
        });
      });
    }
  }
});