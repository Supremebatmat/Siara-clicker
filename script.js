// Variables
let cookies = 0;
let cookiesPerClick = 1;

// DOM Elements
const cookie = document.getElementById("cookie");
const cookieCountEl = document.getElementById("cookieCount");
const cookiesPerClickEl = document.getElementById("cookiesPerClick");
const upgrades = document.querySelectorAll(".upgrade");

// Update the displayed stats
function updateStats() {
  cookieCountEl.textContent = cookies;
  cookiesPerClickEl.textContent = cookiesPerClick;

  // Update upgrade availability
  for (const upgrade of upgrades) {
    const cost = Number.parseInt(upgrade.getAttribute("data-cost"));
    if (cookies >= cost) {
      upgrade.classList.remove("disabled");
    } else {
      upgrade.classList.add("disabled");
    }
  }
}

// Handle cookie clicks
cookie.addEventListener("click", () => {
  cookies += cookiesPerClick;
  updateStats();
});

// Handle upgrade clicks
for (const upgrade of upgrades) {
  upgrade.addEventListener("click", () => {
    const cost = Number.parseInt(upgrade.getAttribute("data-cost"));
    const increment = Number.parseInt(upgrade.getAttribute("data-increment"));

    if (cookies >= cost) {
      cookies -= cost;
      cookiesPerClick += increment;

      // Increase the cost of the upgrade for the next purchase
      const newCost = Math.floor(cost * 1.5);
      upgrade.setAttribute("data-cost", newCost);
      upgrade.querySelector("span").textContent = newCost;

      updateStats();
    }
  });
}

// Initial setup
updateStats();
