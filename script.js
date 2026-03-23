let products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth TWS",
    price: 320000,
    image:
      "https://picsum.photos/seed/mp19-tws/1200/800",
    description: "Chống ồn nhẹ, pin 20h, kết nối ổn định.",
  },
  {
    id: 2,
    name: "Bàn phím cơ 87 phím",
    price: 790000,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=60",
    description: "Switch blue, led trắng, gõ sướng tay.",
  },
  {
    id: 3,
    name: "Chuột không dây công thái học",
    price: 450000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=60",
    description: "Thiết kế ergonomic, sạc USB-C.",
  },
  {
    id: 4,
    name: "USB 64GB",
    price: 120000,
    image:
      "https://picsum.photos/seed/mp19-usb/1200/800",
    description: "Nhỏ gọn, tốc độ đọc/ghi ổn định.",
  },
  {
    id: 5,
    name: "Đế tản nhiệt laptop",
    price: 210000,
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1200&q=60",
    description: "2 quạt gió, đỡ mỏi cổ tay.",
  },
  {
    id: 6,
    name: "Cáp sạc Type-C 1m",
    price: 80000,
    image:
      "https://picsum.photos/seed/mp19-cable/1200/800",
    description: "Bọc dù, hỗ trợ sạc nhanh.",
  },
  {
    id: 7,
    name: "Cáp sạc Type-C 1m",
    price: 80000,
    image:
      "https://picsum.photos/seed/mp19-cable/1200/800",
    description: "Bọc dù, hỗ trợ sạc nhanh.",
  },
];
//


let listProductEl = document.getElementById("products-grid");
let totalProduct = document.getElementById("product-count-badge");
let hidden = document.getElementById("products-empty");
let cartContainer = document.getElementById("cart-tbody");
let hiddenCart = document.getElementById("cart-empty");
let totalLine = document.getElementById("stat-lines");
let totaPrice = document.getElementById("stat-total");
let totalQuantity = document.getElementById("stat-qty");
let clearCart = document.getElementById("clear-cart-btn");
// renderDate
const handleRenderData = () => {
  listProductEl.innerHTML = '';
  products = JSON.parse(localStorage.getItem("listProduct")) || products;
  products.forEach((product) => {
    let div = document.createElement("article");
    div.classList.add("card");
    div.innerHTML = `
                    <div class="card-img">
                <img
                  src="${product.image}"
                  alt="${product.name}"
                  loading="lazy"
                />
              </div>
              <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-desc">${product.description}</p>
                <div class="card-footer">
                  <div class="price">${product.price.toLocaleString("vi-VN")}<br>VND</div>
                  <button class="btn btn-primary" onclick = "handleAddProduct(${product.id},'${product.name}',${product.price})">Thêm vào giỏ</button>
                  <button class="btn-delete" onclick = "handleDeleteProduct(${product.id})">Xóa sản phẩm</button>
                </div>
              </div> 
        `
    listProductEl.appendChild(div);
  });
  localStorage.setItem("listProduct", JSON.stringify(products));

  totalProduct.innerText = `${products.length} sản phẩm`;

}
handleRenderData();
let data = JSON.parse(localStorage.getItem("listProduct")) || [];
if (!data || data.length == 0) {
  hidden.classList.remove("hidden")
} else {
  handleRenderData();
}


const handleDeleteProduct = (idDelete) => {
  let index = products.findIndex((product) => {
    return product.id === idDelete;
  });
  products.splice(index, 1);
  localStorage.setItem("listProduct", JSON.stringify(products));
  handleRenderData();
}
let cart = JSON.parse(localStorage.getItem("cart")) || {};

const getItems = () => {
  return Object.values(cart || {});
}

const renderstartCart = () => {
 
  let  lines= Object.keys(cart).length;
  let items = getItems();
  let  totalQuantytis = items.reduce((acc,cur) => {
    return acc + cur.quantity;
  },0);
  let price = items.reduce((acc,cur) => {
    return acc + cur.price*cur.quantity;
  },0);
  
  totalLine.innerText = `${lines}`;
  totaPrice.innerText = `${price.toLocaleString("vi-VN")} VND`;
  totalQuantity.innerText = `${totalQuantytis} `;
  
};

// 
const renderDataCart = () => {
  let items = getItems();
  if (items.length == 0 || !items) {
    hiddenCart.classList.remove("hidden");
    cartContainer.innerHTML = "";
    return;
  } else {
    hiddenCart.classList.add("hidden");
  }
  cartContainer.innerHTML = "";
  items.forEach((item) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price.toLocaleString("vi-VN")} VNĐ</td>
        <td class="center">
        <div class="qty-controls">
              <button class="btn btn-icon btn-ghost" onclick ="descQuantity(${item.id})" aria-label="Giảm">-</button>
              <span class="qty">${item.quantity}</span>
              <button class="btn btn-icon btn-ghost" onclick ="incQuantity(${item.id})"  aria-label="Tăng">+</button>
            </div>
        </td>
        <td class="right">
          ${(item.price * item.quantity).toLocaleString("vi-VN")} VNĐ
        </td>
        <td class="center">
          <button class="btn btn-ghost" onclick="deleteCart(${item.id})">Xóa</button> 
        </td>
      `;
    cartContainer.appendChild(tr);

    
  });
  renderstartCart();
}
renderDataCart();
//
const handleAddProduct = (id, name, price) => {
  if (cart[id]) {
    cart[id].quantity++;
  } else {
    cart[id] = {
      id,
      name,
      price,
      quantity: 1,
    };
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderDataCart();
};
//
const deleteCart = (idDelete) => {
  let ok = confirm("BẠN CÓ MUỐN XÓA SẢN PHẨM NÀY KHÔNG ?");
  if(!ok){
    return;
  }else{
      delete cart[idDelete];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderDataCart();
  renderstartCart();
  }

  
};
//
const incQuantity = (idInc) => {
  cart[idInc].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderDataCart();
}
//
const descQuantity = (idDesc) => {
  cart[idDesc].quantity--;
 
  if(cart[idDesc].quantity < 0){
    alert("Số lượng không được âm");
    return;
  }
  if(cart[idDesc].quantity == 0){
    delete cart[idDesc]
  }
  localStorage.setItem("cart", JSON.stringify(cart));
   renderDataCart();
   renderstartCart();
};

clearCart.addEventListener("click", () => {
        let ok = confirm("Bạn có muốn xóa giỏ hàng ?");
        if(!ok){
          return;
        }else{
          cart = {};
          localStorage.setItem("cart", JSON.stringify(cart));
          renderDataCart();
          renderstartCart();
        }
        
});

