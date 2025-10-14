import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, isSupported as analyticsSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Firebase configuration for Marxia Cafe
const firebaseConfig = {
  apiKey: "AIzaSyAm-4m6b3BUBZgOjq7VwFbn540kP2Hvztk",
  authDomain: "marxia-cafe-2c8ec.firebaseapp.com",
  projectId: "marxia-cafe-2c8ec",
  storageBucket: "marxia-cafe-2c8ec.firebasestorage.app",
  messagingSenderId: "45413389031",
  appId: "1:45413389031:web:e9fc54ecf1d2302d27c842",
  measurementId: "G-XFWG4K1W0G",
};

const app = initializeApp(firebaseConfig);

(async () => {
  try {
    if (await analyticsSupported()) {
      getAnalytics(app);
      console.info("Firebase Analytics initialized for Marxia Cafe.");
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  } catch (error) {
    console.error("Unable to initialize Firebase Analytics", error);
  }
})();

const formatCurrency = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);

const inventoryData = [
  { item: "Roastery Blend", onHand: 78, unitCost: 6.4, menuPrice: 10.5 },
  { item: "Vegan Croissant", onHand: 42, unitCost: 2.1, menuPrice: 4.95 },
  { item: "Matcha Cloud", onHand: 36, unitCost: 3.25, menuPrice: 7.2 },
  { item: "Cold Brew Growler", onHand: 18, unitCost: 5.9, menuPrice: 12.0 },
];

const invoiceData = {
  items: [
    { name: "Espresso Flight", quantity: 2, price: 4.5 },
    { name: "Oat Cappuccino", quantity: 1, price: 5.25 },
    { name: "Guava Tart", quantity: 1, price: 4.1 },
  ],
  vatRate: 0.16,
  delivery: 3.5,
};

const analyticsData = [
  { label: "Coffee Beans", sold: 68 },
  { label: "Tea Leaves", sold: 45 },
  { label: "Cold Brew", sold: 82 },
  { label: "Pastries", sold: 52 },
];

const productCatalog = [
  {
    name: "Nitro Cascade Latte",
    description: "Velvety nitrogen-infused espresso with panela syrup.",
    price: 6.75,
    tags: ["Popular", "Nitro"],
  },
  {
    name: "Yuzu Espresso Tonic",
    description: "Citrus-forward tonic with single-origin espresso and rosemary.",
    price: 5.8,
    tags: ["Seasonal", "Citrus"],
  },
  {
    name: "Chia Overnight Parfait",
    description: "Oat milk chia pudding layered with cacao nib granola.",
    price: 4.9,
    tags: ["Plant-based"],
  },
  {
    name: "Golden Hour Batch Brew",
    description: "Honey-processed beans, slow-brewed for ultimate sweetness.",
    price: 3.95,
    tags: ["House"],
  },
];

const orderItems = [
  { name: "Nitro Cascade Latte", quantity: 2, price: 6.75 },
  { name: "Chia Overnight Parfait", quantity: 1, price: 4.9 },
];

const renderInventory = () => {
  const tableBody = document.getElementById("inventory-rows");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  inventoryData.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${entry.item}</th>
      <td>${entry.onHand}</td>
      <td>${formatCurrency(entry.unitCost)}</td>
      <td>${formatCurrency(entry.menuPrice)}</td>
    `;
    tableBody.appendChild(row);
  });
};

const renderInvoice = () => {
  const itemsContainer = document.getElementById("invoice-items");
  const totalsContainer = document.getElementById("invoice-totals");
  if (!itemsContainer || !totalsContainer) return;

  itemsContainer.innerHTML = "";
  let subtotal = 0;

  invoiceData.items.forEach((item) => {
    subtotal += item.quantity * item.price;
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${item.quantity} × ${item.name}</span>
      <span>${formatCurrency(item.quantity * item.price)}</span>
    `;
    itemsContainer.appendChild(listItem);
  });

  const vatAmount = subtotal * invoiceData.vatRate;
  const total = subtotal + vatAmount + invoiceData.delivery;

  totalsContainer.innerHTML = `
    <div><dt>Subtotal</dt><dd>${formatCurrency(subtotal)}</dd></div>
    <div><dt>VAT/IVA (${(invoiceData.vatRate * 100).toFixed(0)}%)</dt><dd>${formatCurrency(vatAmount)}</dd></div>
    <div><dt>Delivery</dt><dd>${formatCurrency(invoiceData.delivery)}</dd></div>
    <div class="total"><dt>Total</dt><dd>${formatCurrency(total)}</dd></div>
  `;
};

const renderAnalytics = () => {
  const bars = document.getElementById("analytics-bars");
  const legend = document.getElementById("analytics-legend");
  if (!bars || !legend) return;

  bars.innerHTML = "";
  legend.innerHTML = "";

  const maxSold = Math.max(...analyticsData.map((item) => item.sold));

  analyticsData.forEach((item) => {
    const heightPercent = Math.round((item.sold / maxSold) * 100);
    const bar = document.createElement("span");
    bar.style.height = `${heightPercent}%`;
    bar.setAttribute("aria-label", `${item.label} ${heightPercent} percent of max sales`);
    bars.appendChild(bar);

    const legendItem = document.createElement("div");
    legendItem.textContent = `${item.label}: ${item.sold}`;
    legend.appendChild(legendItem);
  });
};

const renderProducts = () => {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";
  productCatalog.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("role", "listitem");
    card.innerHTML = `
      <header>
        <h4>${product.name}</h4>
      </header>
      <p>${product.description}</p>
      <p class="price">${formatCurrency(product.price)}</p>
      <ul class="tags">
        ${product.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
    `;
    grid.appendChild(card);
  });
};

const renderOrderSummary = (options = { showDelivery: true, window: 45 }) => {
  const summary = document.getElementById("order-summary");
  if (!summary) return;

  let subtotal = 0;
  const itemsMarkup = orderItems
    .map((item) => {
      const lineTotal = item.quantity * item.price;
      subtotal += lineTotal;
      return `<li><span>${item.quantity} × ${item.name}</span><span>${formatCurrency(lineTotal)}</span></li>`;
    })
    .join("");

  const vatRate = invoiceData.vatRate;
  const vatAmount = subtotal * vatRate;
  const deliveryFee = options.showDelivery ? invoiceData.delivery : 0;
  const total = subtotal + vatAmount + deliveryFee;

  summary.innerHTML = `
    <ul class="order-items">${itemsMarkup}</ul>
    <dl class="order-totals">
      <div><dt>Subtotal</dt><dd>${formatCurrency(subtotal)}</dd></div>
      <div><dt>VAT/IVA (${(vatRate * 100).toFixed(0)}%)</dt><dd>${formatCurrency(vatAmount)}</dd></div>
      ${options.showDelivery ? `<div><dt>Delivery</dt><dd>${formatCurrency(deliveryFee)}</dd></div>` : ""}
      <div class="total"><dt>Total</dt><dd>${formatCurrency(total)}</dd></div>
    </dl>
    <p class="delivery-window">Estimated delivery: ${options.window} minutes.</p>
  `;
};

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navLinks.setAttribute("aria-expanded", "false");
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.setAttribute("aria-expanded", String(!expanded));
    navToggle.textContent = expanded ? "Menu" : "Close";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.setAttribute("aria-expanded", "false");
      navToggle.textContent = "Menu";
    });
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const waitlistForm = document.querySelector(".waitlist");
if (waitlistForm) {
  waitlistForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailField = waitlistForm.querySelector("input[type='email']");
    const companyField = waitlistForm.querySelector("input[name='company']");

    if (emailField?.value && companyField?.value) {
      console.log(
        `Waitlist request captured for ${companyField.value} (${emailField.value})`
      );
      emailField.value = "";
      companyField.value = "";
      const confirmation = document.createElement("p");
      confirmation.className = "form-confirmation";
      confirmation.textContent = "Thanks! Onboarding resources are en route.";
      waitlistForm.appendChild(confirmation);
      setTimeout(() => confirmation.remove(), 5000);
    }
  });
}

const experienceTabs = document.querySelectorAll(".experience-tabs .tab-button");
const panels = {
  "smb-tab": document.getElementById("smb-panel"),
  "consumer-tab": document.getElementById("consumer-panel"),
};

experienceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    experienceTabs.forEach((btn) => {
      const isSelected = btn === tab;
      btn.setAttribute("aria-selected", String(isSelected));
      const panel = panels[btn.id];
      if (panel) {
        panel.hidden = !isSelected;
      }
    });
  });
});

const orderForm = document.getElementById("order-form");
if (orderForm) {
  const deliveryWindow = orderForm.querySelector("#delivery-window");
  const deliveryVisibility = orderForm.querySelectorAll(
    "input[name='delivery-visibility']"
  );

  const updateSummary = () => {
    const windowValue = Number(deliveryWindow?.value ?? 45);
    const showDelivery = orderForm.querySelector(
      "input[name='delivery-visibility']:checked"
    )?.value !== "hide";
    renderOrderSummary({ showDelivery, window: windowValue });
  };

  deliveryWindow?.addEventListener("change", updateSummary);
  deliveryVisibility.forEach((input) =>
    input.addEventListener("change", updateSummary)
  );

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const windowValue = Number(deliveryWindow?.value ?? 45);
    console.log(
      `Order confirmed with ${windowValue} minute window. Delivery shown: ${
        orderForm.querySelector("input[name='delivery-visibility']:checked")?.value !==
        "hide"
      }`
    );
    const confirmation = document.createElement("p");
    confirmation.className = "form-confirmation";
    confirmation.textContent = "Paid order confirmed. Invoice sent to consumer inbox.";
    orderForm.appendChild(confirmation);
    setTimeout(() => confirmation.remove(), 5000);
  });
}

renderInventory();
renderInvoice();
renderAnalytics();
renderProducts();
renderOrderSummary();
