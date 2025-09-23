
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".shop-item-button");
    for (let button of addToCartButtons) {
        button.addEventListener("click", addTocartClickesd);
         }
        });
function addTocartClickesd(event) {
    const button = event.target;
    const shopItem = button.closest(".shop-item");
    const title = shopItem.querySelector(".shop-item-title").textContent;
    const price = shopItem.querySelector(".shop-item-price").textContent;
    const imageSrc = shopItem.querySelector(".shop-item-image").src;
    
    const cartItem = {
        title: title,
        price: price,
        imageSrc: imageSrc
        
    };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("cart updated:", cart);
    const existingItem = cart.find(item => item.title === cartItem.title);
    if (existingItem) {
        alert("This item is already added to the cart");
        return;
    }
    cart.push(cartItem);
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${title} added to cart`);
}  
