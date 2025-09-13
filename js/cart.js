let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cuerpoTablaProductos = document.querySelector(".cart-tabla tbody")
const cartCount = document.querySelector(".cart-count");
cartCount.textContent = cart.reduce((total, p) => total + p.cantidad, 0);


function mostrarProductosDelCarrito() {
    cuerpoTablaProductos.innerHTML = ""; 
    cart.forEach(producto => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><button class="btn-restar" data-id="${producto.id}">-</button>
            ${producto.cantidad}
            <button class="btn-sumar" data-id="${producto.id}">+</button></td>
            <td>$${producto.precio * producto.cantidad}</td>
            <td><button class="btn-eliminar">❌</button></td>
        `;
        cuerpoTablaProductos.appendChild(fila);

        const botonEliminar = fila.querySelector(".btn-eliminar");
        botonEliminar.addEventListener("click", () => {
            cart = cart.filter(p => p.id !== producto.id); 
            localStorage.setItem("cart", JSON.stringify(cart)); 
            mostrarProductosDelCarrito(); 
            cartCount.textContent = cart.reduce((total, p) => total + p.cantidad, 0); 
        });


        fila.querySelector(".btn-sumar").addEventListener("click", () => {
            if(producto.cantidad < producto.stock){ 
                producto.cantidad++;
                localStorage.setItem("cart", JSON.stringify(cart));
                mostrarProductosDelCarrito(); 
                cartCount.textContent = cart.reduce((total, p) => total + p.cantidad, 0);
            } else {
                Toastify({
                    text: "¡Lo sentimos! No hay más unidades disponibles.",
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #f12e3eff, #5569ebff)",
                    stopOnFocus: true
                }).showToast();
            }
        });


        fila.querySelector(".btn-restar").addEventListener("click", () => {
            producto.cantidad--;
            if(producto.cantidad === 0){
                cart = cart.filter(p => p.id !== producto.id); 
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            mostrarProductosDelCarrito(); 
            cartCount.textContent = cart.reduce((total, p) => total + p.cantidad, 0);
        });
    });

    const total = cart.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
    const divTotal = document.querySelector(".cart-total p");
    divTotal.innerHTML = `<strong>Total: $${total}</strong>`;
}

const btnVaciar = document.querySelector(".btn-vaciar");

btnVaciar.addEventListener("click", () => {
    cart = []; 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    mostrarProductosDelCarrito(); 
    cartCount.textContent = 0; 
});

mostrarProductosDelCarrito();
