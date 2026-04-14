(() => {
  'use strict';

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
document.addEventListener('DOMContentLoaded', function () {

  const mapElement = document.getElementById('map');

  if (!mapElement) return;

  // ✅ GET LAT & LNG SAFELY
  const lat = parseFloat(mapElement.dataset.lat);
  const lng = parseFloat(mapElement.dataset.lng);

  if (isNaN(lat) || isNaN(lng)) {
    console.error("❌ Coordinates missing or invalid");
    return;
  }

  // ✅ INITIALIZE MAP
  const map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // ✅ MARKER
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${mapElement.dataset.title}</b>`)
    .openPopup();

  // =======================
  //   SHOW MORE DESCRIPTION
  // =======================
  const descriptionElement = document.getElementById('description');
  if (descriptionElement) {
    const fullText = descriptionElement.textContent;
    const shortText = fullText.substring(0, 100);

    if (fullText.length > 100) {
      descriptionElement.innerHTML =
        `${shortText}... <button id="show-more-btn" class="btn btn-link p-0">Show More</button>`;

      document.getElementById('show-more-btn').addEventListener('click', () => {
        descriptionElement.innerHTML =
          `${fullText} <button id="show-less-btn" class="btn btn-link p-0">Show Less</button>`;

        document.getElementById('show-less-btn').addEventListener('click', () => {
          descriptionElement.innerHTML =
            `${shortText}... <button id="show-more-btn" class="btn btn-link p-0">Show More</button>`;
        });
      });
    }
  }
});
