document.addEventListener("DOMContentLoaded", function() {
    loadCartItems();
    
document.querySelector(".btn-purchase").addEventListener("click", function() {
    alert("Thanks for shopping with us!");
    localStorage.removeItem("cart");
    document.querySelector(".cart-items").innerHTML = "";
    updateCartTotal();
});
});
  function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    cartItems.forEach(item => {
        const cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        cartRow.innerHTML = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;
        cartItemsContainer.appendChild(cartRow);
        cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
        cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
    });
    updateCartTotal();
}   
function removeCartItem(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.title !== event.target.closest(".cart-row").querySelector(".cart-item-title").textContent);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartItems();
}
function updateCartTotal(event) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.map(item => {
        if (item.title === title) {
            const quantity = parseInt(event.target.closest(".cart-row").querySelector(".cart-quantity-input").value);
            return { ...item, quantity:  Math.max(1 , quantity)};
        }
        return item;
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartTotal();
}
function unpdateCartTotal() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartRows = cartItemsContainer.querySelectorAll(".cart-row");
    let total = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace("$", ""));
        const quantity = item.quantity || 1;
        total += price * quantity;
    });
    total = Math.round(total * 100) / 100;
    document.querySelector(".cart-total-price").textContent = "$" + total;
}