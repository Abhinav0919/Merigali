    // ============================================
    // CITY DATA
    // This is dummy data standing in for what will
    // later come from your Flask + SQLite backend.
    // Each key (moradabad, lucknow, jaipur) is one
    // city's full set of info, fares, and shops.
    // ============================================
    const cityData = {
      Meerut: {
        displayName: "Meerut",
        info: [
          { title: "Known For", text: "1857 revolt — called the \"Sport city\" of India." },
          { title: "Best Time to Visit", text: "October to March, cool and pleasant weather." },
          { title: "Local Landmark", text: "Hastinapur — one of the oldest place in the region." },
          { title: "Getting Around", text: "Auto-rickshaws and e-rickshaws are the main local transport." }
        ],
        fares: [
          { route: "Railway Station → Bus Stand", distance: "3 km", fare: "₹40 – ₹50" },
          { route: "begumpul → tejgarhi", distance: "5 km", fare: "₹60 – ₹70" },
          { route: "Shastrinagar → tejgarhi", distance: " km", fare: "₹5 – ₹10" }
        ],
        shops: [
          { name: "Jay bakers", category: "bakery", address: "Shastrinagr" },
          { name: "bengal sweets", category: "Bakery", address: "tejgarhi" }
        ]
      },
      lucknow: {
        displayName: "Lucknow",
        info: [
          { title: "Known For", text: "Chikankari embroidery and Awadhi cuisine." },
          { title: "Best Time to Visit", text: "November to February for pleasant weather." },
          { title: "Local Landmark", text: "Bara Imambara and Rumi Darwaza." },
          { title: "Getting Around", text: "Auto-rickshaws, cycle-rickshaws, and the Lucknow Metro." }
        ],
        fares: [
          { route: "Charbagh → Hazratganj", distance: "4 km", fare: "₹50 – ₹60" },
          { route: "Gomti Nagar → Alambagh", distance: "9 km", fare: "₹100 – ₹120" },
          { route: "Aminabad → Chowk", distance: "3 km", fare: "₹40 – ₹50" }
        ],
        shops: [
          { name: "Tunday Kababi", category: "Food", address: "Aminabad Market" },
          { name: "Lucknow Chikan House", category: "Clothing", address: "Hazratganj" }
        ]
      },
      jaipur: {
        displayName: "Jaipur",
        info: [
          { title: "Known For", text: "The Pink City — forts, palaces, and blue pottery." },
          { title: "Best Time to Visit", text: "October to March, before the heat sets in." },
          { title: "Local Landmark", text: "Hawa Mahal and Amber Fort." },
          { title: "Getting Around", text: "Auto-rickshaws, buses, and the Jaipur Metro." }
        ],
        fares: [
          { route: "Railway Station → Hawa Mahal", distance: "5 km", fare: "₹60 – ₹70" },
          { route: "Malviya Nagar → C-Scheme", distance: "8 km", fare: "₹90 – ₹100" },
          { route: "Amber Fort → City Centre", distance: "11 km", fare: "₹120 – ₹140" }
        ],
        shops: [
          { name: "Johari Bazaar Jewellers", category: "Jewellery", address: "Johari Bazaar" },
          { name: "Rawat Kachori", category: "Food", address: "Station Road" }
        ]
      }
    };

    // Keep track of which city is currently selected
    let currentCity = "Meerut";

    // Grab references to the page elements we'll update
    const heroCityName = document.getElementById('heroCityName');
    const infoGrid      = document.getElementById('infoGrid');
    const fareTable     = document.getElementById('fareTable');
    const shopList      = document.getElementById('shopList');
    const citySelect    = document.getElementById('citySelect');
    const shopForm      = document.getElementById('shopForm');

    // ============================================
    // RENDER FUNCTION
    // Takes a city key (e.g. "jaipur"), looks up its
    // data, and rebuilds the info/fares/shops sections.
    // This is the function that runs every time the
    // user picks a new city from the dropdown.
    // ============================================
    function renderCity(cityKey) {
      const city = cityData[cityKey];

      // Update hero heading
      heroCityName.textContent = city.displayName;

      // Rebuild the info cards
      infoGrid.innerHTML = city.info.map(item => `
        <div class="info-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      `).join('');

      // Rebuild the fare table rows
      fareTable.innerHTML = city.fares.map(f => `
        <tr><td>${f.route}</td><td>${f.distance}</td><td>${f.fare}</td></tr>
      `).join('');

      // Rebuild the shop cards
      shopList.innerHTML = city.shops.map(s => `
        <div class="shop-card">
          <span class="tag">${s.category}</span>
          <h3>${s.name}</h3>
          <p>${s.address}</p>
        </div>
      `).join('');
    }

    // Run once on page load, showing the default city
    renderCity(currentCity);

    // ============================================
    // Listen for the dropdown changing
    // ============================================
    citySelect.addEventListener('change', function() {
      currentCity = citySelect.value;   // e.g. "lucknow"
      renderCity(currentCity);          // re-render everything for that city
    });

    // ============================================
    // Listen for the "Add Shop" form being submitted
    // Now it adds the new shop into the CURRENTLY
    // SELECTED city's data, not just the page.
    // ============================================
    shopForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('shopName').value;
      const category = document.getElementById('shopCategory').value;
      const address = document.getElementById('shopAddress').value;

      // Add the new shop into this city's data array
      cityData[currentCity].shops.unshift({ name, category, address });

      // Re-render so the new shop shows up immediately
      renderCity(currentCity);

      shopForm.reset();

      // NOTE: In the real version, instead of editing cityData here,
      // you'd send this to your Flask backend with fetch(), tagged
      // with the current city, and save it in SQLite. Example:
      //
      // fetch('/add-shop', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({ city: currentCity, name, category, address })
      // });
    });
