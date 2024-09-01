const products = {
    1: { name: "Huevos", price: 30, img: "imagenes/img1.jpg" },
    2: { name: "Leche", price: 15, img: "imagenes/img2.jpg" },
    3: { name: "Pan", price: 5, img: "imagenes/img3.jpg" },
    4: { name: "Cereal", price: 25, img: "imagenes/img4.jpg" },
    5: { name: "Pollo", price: 13, img: "imagenes/img5.jpg" }
};

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.dataset.id);
}

function drop(event) {
    event.preventDefault();
    const productId = event.dataTransfer.getData("text");
    addToCart(productId);
}

function addToCart(productId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

    if (!carrito[productId]) {
        carrito[productId] = { quantity: 1, ...products[productId] };
    } else {
        carrito[productId].quantity += 1;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    updateCartDisplay();
    document.getElementById('continuar-compra').style.display = 'block';
}

function updateCartDisplay() {
    const carritoContent = document.getElementById('carrito-content');
    carritoContent.innerHTML = '';
    let total = 0;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || {};

    for (const id in carrito) {
        const item = carrito[id];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width: 100px;">
            <p>${item.name}</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Subtotal: Q${itemTotal.toFixed(2)}</p>
        `;
        carritoContent.appendChild(itemElement);
    }

    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<h3>Total: Q${total.toFixed(2)}</h3>`;
    carritoContent.appendChild(totalElement);
}

function finalizarCompra() {
    localStorage.removeItem('carrito');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.id === 'carrito' || document.body.id === 'confirmacion') {
        updateCartDisplay();
    }
});