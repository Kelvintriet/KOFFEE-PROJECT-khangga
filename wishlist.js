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

const wishlistContainer = document.getElementById("wishlist-products");
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const favoritedProducts = products.filter((p) => wishlist.includes(p.name));

if (favoritedProducts.length === 0) {
  wishlistContainer.innerHTML = `
      <div style="text-align: center; margin-top: -50px; ">
      <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="">
        <p>You haven’t favorited any products yet.</p>
        <a href="product.html";">Back to Menu</a>
      </div>
    `;
} else {
  favoritedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.margin = "20px auto";
    card.style.maxWidth = "300px";
    card.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("h6");
    price.textContent = product.price;

    const removeBtn = document.createElement("button");
    document.createElement("remove-wl");
    removeBtn.textContent = "Remove from Wishlist";
    removeBtn.style.marginTop = "10px";
    removeBtn.onclick = () => {
      const updated = wishlist.filter((name) => name !== product.name);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      location.reload();
    };

    card.append(img, name, price, removeBtn);
    wishlistContainer.appendChild(card);
  });
}
