document.addEventListener("DOMContentLoaded", function() {
    loadCartItems();
    setupPurchaseButton();
});

function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";

    cartItems.forEach(item => {
        // Use item.quantity or default to 1
        const quantity = item.quantity || 1;

        const cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        cartRow.innerHTML = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="${quantity}" min="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartRow);

        // Listen for remove button
        cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);

        // Listen for quantity changes
        cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
    });

    updateCartTotal();
}

function updateCartTotal() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartRows = cartItemsContainer.querySelectorAll(".cart-row");
    let total = 0;

    cartRows.forEach(row => {
        const priceElement = row.querySelector(".cart-price");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(row.querySelector(".cart-quantity-input").value);

        total += price * quantity;
    });

    total = Math.round(total * 100) / 100;
    document.querySelector(".cart-total-price").textContent = "$" + total;

    // Update localStorage quantities too
    updateCartStorageQuantities();
}

function removeCartItem(event) {
    const buttonClicked = event.target;
    const cartRow = buttonClicked.closest(".cart-row");
    const title = cartRow.querySelector(".cart-item-title").textContent;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.title !== title);

    localStorage.setItem("cart", JSON.stringify(cart));

    cartRow.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    let quantity = parseInt(input.value);

    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        input.value = 1;
    }

    updateCartTotal();
}

function updateCartStorageQuantities() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartRows = document.querySelectorAll(".cart-row");

    cartRows.forEach(row => {
        const title = row.querySelector(".cart-item-title").textContent;
        const quantity = parseInt(row.querySelector(".cart-quantity-input").value);

        const item = cart.find(i => i.title === title);
        if (item) {
            item.quantity = quantity;
        }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
}

function setupPurchaseButton() {
    const purchaseBtn = document.querySelector(".btn-purchase");
    purchaseBtn.addEventListener("click", () => {
        if ((JSON.parse(localStorage.getItem("cart")) || []).length === 0) {
            alert("Your cart is empty.");
            return;
        }
        alert("Thanks for shopping with us!");
        localStorage.removeItem("cart");
        document.querySelector(".cart-items").innerHTML = "";
        updateCartTotal();
    });
}