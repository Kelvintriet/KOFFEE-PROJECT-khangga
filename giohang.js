// Lấy thẻ div có id "products" để hiển thị giỏ hàng
var divProducts = document.getElementById("products");

// Hàm để hiển thị giỏ hàng lên trang
function renderCart() {
  divProducts.innerHTML = ""; // Xóa hết nội dung cũ bên trong div trước khi thêm mới

  // Lấy giỏ hàng từ localStorage, nếu chưa có thì lấy mảng rỗng
  var arrCarts = JSON.parse(localStorage.getItem("carts")) || [];

  // Nếu giỏ hàng trống, hiển thị thông báo và link quay lại trang sản phẩm
  if (arrCarts.length === 0) {
    var divnotfound = document.createElement("div");
    divnotfound.classList.add("img");
    var img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
    );

    divnotfound.appendChild(img);

    var divtext = document.createElement("div");
    divtext.classList.add("text");
    var p = document.createElement("p");
    p.innerHTML = `Looks like you haven't made any choice yet...`;
    var a = document.createElement("a");
    a.innerHTML = `Back to Menu`;
    a.setAttribute("href", "product.html");

    divtext.appendChild(p);
    divtext.appendChild(a);

    divProducts.appendChild(divnotfound);
    divProducts.appendChild(divtext);
  } else {
    // Nếu có sản phẩm trong giỏ, duyệt từng sản phẩm để hiển thị
    arrCarts.forEach((item, index) => {
      var divbox = document.createElement("div");
      divbox.classList.add("box"); // Tạo box chứa từng sản phẩm

      // Tạo thẻ ảnh cho sản phẩm
      var img = document.createElement("img");
      img.setAttribute("src", item.image);

      // Tạo thẻ chứa thông tin sản phẩm
      var divcontent = document.createElement("div");
      divcontent.classList.add("content");

      // Tên sản phẩm
      var h3 = document.createElement("h3");
      h3.textContent = item.name;

      // Giá tổng (giá sản phẩm * số lượng), định dạng 2 số thập phân
      var h4 = document.createElement("h4");
      h4.classList.add("price");
      h4.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;

      // Thẻ chứa số lượng và ô input cho phép thay đổi số lượng
      var pQuantity = document.createElement("p");
      pQuantity.classList.add("unit");
      pQuantity.innerHTML = `Quantity: <input type="number" min="1" value="${item.quantity}" style="width: 50px;">`;

      // Bắt sự kiện khi số lượng thay đổi
      pQuantity.querySelector("input").addEventListener("change", (e) => {
        let newQty = parseInt(e.target.value);

        // Nếu nhập không hợp lệ hoặc nhỏ hơn 1, đặt lại là 1
        if (isNaN(newQty) || newQty < 1) {
          newQty = 1;
          e.target.value = 1;
        }

        // Cập nhật số lượng mới vào mảng giỏ hàng
        arrCarts[index].quantity = newQty;

        // Lưu giỏ hàng cập nhật vào localStorage
        localStorage.setItem("carts", JSON.stringify(arrCarts));

        // Cập nhật lại giá hiển thị theo số lượng mới
        h4.textContent = `Price: $${(item.price * newQty).toFixed(2)}`;
        updateReceipt();
      });

      // Tạo nút xóa sản phẩm khỏi giỏ
      var pRemove = document.createElement("p");
      pRemove.classList.add("btn-area");
      pRemove.innerHTML = `<i class="fa-solid fa-trash"></i> <span class="btn2">Remove</span>`;
      pRemove.style.cursor = "pointer"; // con trỏ chuột khi hover

      // Bắt sự kiện khi bấm nút xóa thì gọi hàm xóa sản phẩm
      pRemove.addEventListener("click", () => {
        deleteFromCart(index);
        updateReceipt();
      });

      // Ghép tất cả phần tử vào box sản phẩm
      divbox.appendChild(img);
      divbox.appendChild(divcontent);
      divcontent.appendChild(h3);
      divcontent.appendChild(h4);
      divcontent.appendChild(pQuantity);
      divcontent.appendChild(pRemove);

      // Thêm box sản phẩm vào div chính
      divProducts.appendChild(divbox);
    });
  }
}

// Hàm xóa sản phẩm khỏi giỏ hàng theo vị trí index
function deleteFromCart(index) {
  let arrCarts = JSON.parse(localStorage.getItem("carts")) || [];

  // Xóa 1 sản phẩm tại vị trí index
  arrCarts.splice(index, 1);

  // Lưu giỏ hàng mới vào localStorage
  localStorage.setItem("carts", JSON.stringify(arrCarts));

  // Hiển thị lại giỏ hàng mới
  renderCart();
}

// Gọi hàm renderCart ngay khi trang tải để hiện giỏ hàng lên
renderCart();
updateReceipt();

function updateReceipt() {
  const arrCarts = JSON.parse(localStorage.getItem("carts")) || [];

  let subtotal = arrCarts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let tax = subtotal * 0.1; // 10% tax
  let shipping = arrCarts.length > 0 ? 10 : 0; // $10 shipping if cart isn't empty
  let overall = subtotal + tax + shipping;

  // Update the receipt section
  document.querySelector(
    ".mid p:nth-child(3) b"
  ).textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(".mid p:nth-child(5) b").textContent = `$${tax.toFixed(
    2
  )}`;
  document.querySelector(
    ".mid p:nth-child(7) b"
  ).textContent = `$${shipping.toFixed(2)}`;
  document.querySelector(".mid p.total b").textContent = `$${overall.toFixed(
    2
  )}`;
}
