
const foods = [
  {
    id: 1,
    name: "Paneer Tikka",
    category: "Starters",
    price: 180,
    description: "Smoky, marinated paneer with Indian spices.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Chicken Tikka",
    category: "Starters",
    price: 220,
    description: "Juicy chicken grilled with aromatic spices.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Veg Biryani",
    category: "Biryani",
    price: 160,
    description: "Fragrant basmati rice with fresh vegetables.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 240,
    description: "Classic dum-style biryani with rich flavours.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Masala Dosa",
    category: "Main Course",
    price: 100,
    description: "Crispy dosa served with potato masala and chutneys.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 210,
    description: "Soft paneer in a creamy tomato-based gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Butter Naan",
    category: "Main Course",
    price: 45,
    description: "Soft Indian flatbread finished with butter.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 80,
    description: "Soft, sweet dumplings soaked in sugar syrup.",
    image: "https://images.unsplash.com/photo-1666190092159-1e9c9c7e7a5e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 9,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 120,
    description: "A rich chocolate treat for dessert lovers.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 10,
    name: "Fresh Lime Juice",
    category: "Drinks",
    price: 60,
    description: "A refreshing citrus drink for any meal.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 11,
    name: "Mango Lassi",
    category: "Drinks",
    price: 90,
    description: "A creamy yoghurt drink with mango flavour.",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 12,
    name: "French Fries",
    category: "Starters",
    price: 100,
    description: "Golden, crispy fries served hot.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"
  }
];

const foodGrid = document.getElementById("foodGrid");
const foodSearch = document.getElementById("foodSearch");
const filters = document.getElementById("filters");
const emptyMessage = document.getElementById("emptyMessage");

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");
const toast = document.getElementById("toast");

let selectedCategory = "All";
let cart = [];
let toastTimer;

// Format prices in Indian rupees.
function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

// Display food cards.
function displayFoods() {
  const searchTerm = foodSearch.value.trim().toLowerCase();

  const filteredFoods = foods.filter(food => {
    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm) ||
      food.category.toLowerCase().includes(searchTerm) ||
      food.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  foodGrid.innerHTML = filteredFoods.map(food => `
    <article class="food-card">
      <img
        class="food-image"
        src="${food.image}"
        alt="${food.name}"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/600x400/f5ebde/c65a25?text=Guruji+Restaurant'"
      >
      <div class="food-details">
        <span class="food-category">${food.category}</span>
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="food-bottom">
          <span class="food-price">${formatPrice(food.price)}</span>
          <button class="add-button" data-add="${food.id}">
            + Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join("");

  emptyMessage.hidden = filteredFoods.length !== 0;
}

// Category filter buttons.
filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  filters.querySelectorAll(".filter").forEach(filter => {
    filter.classList.toggle("active", filter === button);
  });

  displayFoods();
});

// Search dishes.
foodSearch.addEventListener("input", displayFoods);

// Add items to cart.
foodGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (!button) return;

  const foodId = Number(button.dataset.add);
  const food = foods.find(item => item.id === foodId);

  if (!food) return;

  const existingItem = cart.find(item => item.id === foodId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...food, quantity: 1 });
  }

  updateCart();
  showToast(`${food.name} added to your cart!`);
});

// Change item quantity or remove it.
cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const item = cart.find(food => food.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity++;
  } else if (action === "decrease") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(food => food.id !== id);
    }
  }

  updateCart();
});

// Refresh cart items, quantity and total.
function updateCart() {
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <p style="font-size:42px">🛒</p>
        <h3>Your cart is empty</h3>
        <p>Add something delicious from our menu!</p>
      </div>
    `;
    checkoutButton.disabled = true;
    checkoutButton.style.opacity = "0.5";
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <small>${formatPrice(item.price * item.quantity)}</small>
        </div>
        <div class="quantity-controls">
          <button data-action="decrease" data-id="${item.id}"
            aria-label="Decrease ${item.name} quantity">−</button>
          <span>${item.quantity}</span>
          <button data-action="increase" data-id="${item.id}"
            aria-label="Increase ${item.name} quantity">+</button>
        </div>
      </div>
    `).join("");

    checkoutButton.disabled = false;
    checkoutButton.style.opacity = "1";
  }
}

// Open and close cart.
function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
  cartPanel.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeCart.focus();
}

function hideCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
  cartPanel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
overlay.addEventListener("click", hideCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") hideCart();
});

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Simple notification.
function showToast(message) {
  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Demo checkout; no actual payment or order is submitted.
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;

  const orderSummary = cart.map(item =>
    `${item.name} x ${item.quantity}`
  ).join(", ");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  alert(
    "Guruji Restaurant - Demo Checkout\n\n" +
    orderSummary + "\n\n" +
    "Total: " + formatPrice(total) +
    "\n\nThis is a demo. No order or payment was processed."
  );
});

// Contact form demo.
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();

  contactFeedback.textContent =
    `Thank you, ${name}! This demo form is working, but messages are not sent to a server.`;

  contactForm.reset();
});

// Current year in footer.
document.getElementById("year").textContent =
  new Date().getFullYear();

// Initial display.
displayFoods();
updateCart();
