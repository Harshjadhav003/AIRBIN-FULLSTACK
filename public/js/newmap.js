document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#new-listing-form");
  const locationInput = document.querySelector("#location");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const location = locationInput.value;
    if (!location) {
      alert("Please enter a location");
      return;
    }

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
      const data = await res.json();

      if (!data[0]) {
        alert("Location not found!");
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      console.log("Listing Coordinates:", lat, lon); // ✅ print in console

      // Hidden inputs for server
      let latInput = document.createElement("input");
      latInput.type = "hidden";
      latInput.name = "listing[lat]";
      latInput.value = lat;

      let lngInput = document.createElement("input");
      lngInput.type = "hidden";
      lngInput.name = "listing[lng]";
      lngInput.value = lon;

      form.appendChild(latInput);
      form.appendChild(lngInput);

      form.submit(); // now submit normally

    } catch (err) {
      console.error(err);
      alert("Error fetching coordinates");
    }
  });
});
