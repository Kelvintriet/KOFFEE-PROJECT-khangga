let products = [
  {
    name: "Espresso Roast Whole Bean",
    price: "$16.0",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQhzj9WQPpnQYv9XoIBmpC9a2Lae7Ki2djlZub9tXz1wkC5vDx1mOddaHegHEyxHRIWTPfTlFLL11muo4Aw0YsrvP3YgtDBq0Q16maYjMdG&usqp=CAE",
  },
  {
    name: "Pike Place Medium Roast",
    price: "$18.0",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSbXy5mzbfWEQu-O1W1UJPPXWbryN4V_G9iwuxYJdmLayCkMCOp7_JgsTmAJJMSlZWUl_E_diFcAK_FXDeIfAPNHSSV4ggnXstxOQOTKPM&usqp=CAE",
  },
  {
    name: "Varanda Ground Coffee",
    price: "$22.0",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTEBcMk40lcinwKe8QYWxZPKGjMU92cUJBUCX2yLpkoK6Qdd66Ai20cq7gDGzXB4TDzF9BUMT7jK1opRUbzb4i9m5V4rvyIi-mxtaoQOtozEPq9wuDuvpk0Pw&usqp=CAE",
  },
  {
    name: "Mocha Chilled Coffee Drink",
    price: "$6.0",
    image:
      "https://www.allrecipes.com/thmb/fMIOjYoPQ3mer9TT6A9iOdyVWzg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4557977-a0564bd3b3f347549eb579002e81726c.jpg",
  },
  {
    name: "Select Arabica M'JA",
    price: "$15.0",
    image:
      "https://cdn.statically.io/img/salt.tikicdn.com/f=auto,q=100,w=320,h=320/cache/550x550/ts/product/9c/28/07/1e0c75c1f032672c6fe8b7836815e38a.jpg",
  },
  {
    name: "Nescafe Red Cup Instant",
    price: "$16.0",
    image: "https://i.ebayimg.com/images/g/0mwAAOSwjBRlyxWy/s-l400.jpg",
  },
  {
    name: "Organic Coffee Shampoo",
    price: "$20.0",
    image:
      "https://medias.watsons.com.my/publishing/WTCMY-71384-front-thumbnail.jpg?version=1718368810",
  },
  {
    name: "Glace Coffee Espresso",
    price: "$3.0",
    image:
      "https://png.pngtree.com/png-vector/20240130/ourlarge/pngtree-glace-coffee-drinks-espresso-plus-ice-cream-on-top-png-image_11519122.png",
  },
  {
    name: "Caramel Frappuccino",
    price: "$3.5",
    image:
      "https://cdnimg.webstaurantstore.com/images/products/large/498941/1879170.jpg",
  },
  {
    name: "Homemade Caffe Latte",
    price: "$2.5",
    image:
      "https://cdn7.kiwilimonrecipes.com/recetaimagen/36986/640x640/46349.jpg.webp",
  },
  {
    name: "Homemade Macchiato",
    price: "$3.0",
    image:
      "https://cdn7.kiwilimon.com/recetaimagen/36988/640x640/46353.jpg.webp",
  },
  {
    name: "Coffee Ice Cream Frappe",
    price: "$3.0",
    image:
      "https://www.thehungrybites.com/wp-content/uploads/2023/06/coffee-ice-cream-frappe-frappuccino-feat-500x500.jpg",
  },
];

// Lấy div để hiển thị sản phẩm
const divProducts = document.getElementById("products");

function renderProducts(productList) {
  divProducts.innerHTML = "";

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  productList.forEach((product) => {
    const index = products.findIndex((p) => p.name === product.name);

    const div = document.createElement("div");
    div.classList.add("card");

    const div1 = document.createElement("div");
    div1.classList.add("image-container");
    const img = document.createElement("img");
    img.src = product.image;
    div1.appendChild(img);

    const div2 = document.createElement("div");
    div2.classList.add("container");

    const h5 = document.createElement("h5");
    h5.textContent = product.name;

    const h6 = document.createElement("h6");
    h6.textContent = "Price: " + product.price;

    const heartContainer = document.createElement("div");
    heartContainer.classList.add("wishlist-container");

    const heart = document.createElement("i");
    heart.className = "fa fa-heart wishlist-icon";
    if (wishlist.includes(product.name)) {
      heart.classList.add("active");
    }

    heart.onclick = (e) => {
      e.stopPropagation(); // Prevent modal from opening
      toggleWishlist(product.name);
      heart.classList.toggle("active");
    };

    heartContainer.appendChild(heart);

    div.onclick = () => openQuickView(index);

    div2.append(h5, h6, heartContainer);
    div.append(div1, div2);
    divProducts.appendChild(div);
  });
}

function toggleWishlist(productName) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.includes(productName)) {
    wishlist = wishlist.filter((name) => name !== productName);
  } else {
    wishlist.push(productName);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Thêm sản phẩm vào cart
function addToCart(index) {
  let arrCarts = JSON.parse(localStorage.getItem("carts")) || [];
  const selected = products[index];

  const existing = arrCarts.find((item) => item.name === selected.name);
  if (existing) existing.quantity++;
  else
    arrCarts.push({
      name: selected.name,
      price: parseFloat(selected.price.replace("$", "")),
      image: selected.image,
      quantity: 1,
    });

  localStorage.setItem("carts", JSON.stringify(arrCarts));
  alert(`${selected.name} has been added to cart!`);
}

// Tìm kiếm sản phẩm theo tên
document.getElementById("btnSearch").onclick = () => {
  const keyword = document
    .getElementById("infoSearch")
    .value.toLowerCase()
    .trim();
  const result = products.filter((p) => p.name.toLowerCase().includes(keyword));

  if (result.length === 0) {
    divProducts.innerHTML = `
            <div class="not-found-box">
                <p class="not-found-text">No products found for your search.</p>
                <a href="product.html" class="back-btn">← Back to Products</a>
            </div>
        `;
  } else {
    renderProducts(result);
  }
};

// Nhấn Enter cũng tự động tìm kiếm
document.getElementById("infoSearch").onkeypress = (e) => {
  if (e.key === "Enter") document.getElementById("btnSearch").click();
};

// Hiển thị tất cả sản phẩm khi trang load
renderProducts(products);

// Hiện nút "Back to Top" khi roll, ẩn khi trên đầu
window.onscroll = () => {
  const btn = document.getElementById("backToTopBtn");
  btn.style.display = window.scrollY > 300 ? "block" : "none";
};

// Bấm nút "Back to Top" roll lên đầu trang
document.getElementById("backToTopBtn").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Set các thuộc tính name, ảnh, giá qua ID
function openQuickView(index) {
  const product = products[index];
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalPrice").textContent = product.price;

  // ⭐ Desciptions của từng món tự code
  const descriptions = {
    "Espresso Roast Whole Bean": "Dark roast with rich, caramel notes.",
    "Pike Place Medium Roast": "Smooth and balanced medium roast.",
    "Varanda Ground Coffee": "Light and mellow flavor, perfect for mornings.",
    "Mocha Chilled Coffee Drink": "Iced mocha coffee with creamy finish.",
    "Select Arabica M'JA": "Premium Arabica beans from highland farms.",
    "Nescafe Red Cup Instant": "Classic instant coffee for quick mornings.",
    "Organic Coffee Shampoo": "Infused with coffee extract for hair growth.",
    "Glace Coffee Espresso": "Cold espresso topped with ice cream.",
    "Caramel Frappuccino": "Creamy blended coffee with caramel drizzle.",
    "Homemade Caffe Latte": "Rich espresso with steamed milk.",
    "Homemade Macchiato": "Bold espresso with a splash of milk foam.",
    "Coffee Ice Cream Frappe": "Chilled frappe with coffee ice cream.",
  };

  // ⭐ Ratings (thay đổi đc và lấy đc từ database)
  const ratings = {
    "Espresso Roast Whole Bean": { stars: 5, reviews: 798 },
    "Pike Place Medium Roast": { stars: 4, reviews: 563 },
    "Varanda Ground Coffee": { stars: 4, reviews: 640 },
    "Mocha Chilled Coffee Drink": { stars: 5, reviews: 840 },
    "Select Arabica M'JA": { stars: 4, reviews: 488 },
    "Nescafe Red Cup Instant": { stars: 4, reviews: 420 },
    "Organic Coffee Shampoo": { stars: 5, reviews: 320 },
    "Glace Coffee Espresso": { stars: 4, reviews: 542 },
    "Caramel Frappuccino": { stars: 5, reviews: 284 },
    "Homemade Caffe Latte": { stars: 4, reviews: 471 },
    "Homemade Macchiato": { stars: 4, reviews: 515 },
    "Coffee Ice Cream Frappe": { stars: 5, reviews: 743 },
  };

  document.getElementById("modalDescription").textContent =
    descriptions[product.name] || "Delicious coffee product.";

  const rating = ratings[product.name] || { stars: 4, reviews: 50 };
  const starFull = "⭐".repeat(rating.stars);
  const starEmpty = "☆".repeat(5 - rating.stars);
  document.getElementById("modalStars").textContent = starFull + starEmpty;
  document.getElementById(
    "modalReviews"
  ).textContent = `(${rating.reviews} reviews)`;

  document.getElementById("quickViewModal").style.display = "block";

  // Thêm sản phẩm vô giỏ hàng
  document.getElementById("modalAddToCart").onclick = () => {
    addToCart(index);
    document.getElementById("quickViewModal").style.display = "none";
  };
}

document.querySelector(".close-modal").onclick = () => {
  document.getElementById("quickViewModal").style.display = "none";
};

window.onclick = (event) => {
  const modal = document.getElementById("quickViewModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Thêm phần roast và ngày nhập trên phần products
products.forEach((p) => {
  if (!p.roast) p.roast = "medium"; // default
  if (!p.dateAdded) p.dateAdded = new Date(2023, 0, 1); // default date
});

// Filter & Sort
function filterAndSortProducts() {
  const priceFilter = document.getElementById("filterPrice").value;
  const roastFilter = document.getElementById("filterRoast").value;
  const sortBy = document.getElementById("sortProducts").value;

  let filtered = products.filter((product) => {
    // Price filter
    let price = parseFloat(product.price.replace("$", ""));
    if (priceFilter !== "all") {
      const [min, max] = priceFilter.split("-").map(Number);
      if (price < min || price > max) return false;
    }

    // Roast filter
    if (roastFilter !== "all" && product.roast !== roastFilter) return false;

    return true;
  });

  // Sorting
  switch (sortBy) {
    case "newest":
      filtered.sort((a, b) => b.dateAdded - a.dateAdded);
      break;
    case "priceLowHigh":
      filtered.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );
      break;
    case "priceHighLow":
      filtered.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );
      break;
    default:
      break;
  }

  renderProducts(filtered);
}

// Event listeners for filters & sort dropdowns
document
  .getElementById("filterPrice")
  .addEventListener("change", filterAndSortProducts);
document
  .getElementById("filterRoast")
  .addEventListener("change", filterAndSortProducts);
document
  .getElementById("sortProducts")
  .addEventListener("change", filterAndSortProducts);

// Hiển thị đồng hồ đếm ngược
function startCountdown(durationSeconds, displayId) {
  let timer = durationSeconds;
  const display = document.getElementById(displayId);

  const countdownInterval = setInterval(() => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = `🔥 Don’t miss out! Sale ends in: ${minutes}:${seconds}`;

    if (timer <= 0) {
      clearInterval(countdownInterval);
      display.textContent = "Promotion’s over — stay tuned!";
    }
    timer--;
  }, 1000);
}

//  Đếm ngược hiển thị ở phần tử có id 'promoTimer'
startCountdown(10, "promoTimer");

