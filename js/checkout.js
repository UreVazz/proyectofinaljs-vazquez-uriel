let cart = JSON.parse(localStorage.getItem("cart")) || [];
const resumenLista = document.querySelector(".checkout-summary ul");
const resumenTotal = document.querySelector(".checkout-summary p strong");
const formularioCheckout = document.querySelector(".checkout-form form");
formularioCheckout.addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const direccion = document.querySelector("#address").value;
    const ciudad = document.querySelector("#city").value;
    const zip = document.querySelector("#zip").value;
    const pago = document.querySelector("#payment").value;

    if(!nombre || !email || !direccion || !ciudad || !zip || !pago) {
        Toastify({
            text: "Por favor completa todos los campos",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
        }).showToast();
        return;
    }

    Toastify({
        text: `¡Gracias ${nombre}! Tu pedido ha sido recibido.`,
        duration: 4000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
    }).showToast();

    localStorage.removeItem("cart"); 
    cart = [];
    mostrarResumenCheckout(); 
    document.querySelector(".cart-count").textContent = 0; 
    formularioCheckout.reset(); 
});

function mostrarResumenCheckout() {
    resumenLista.innerHTML = ""; 
    let total = 0;

    cart.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const li = document.createElement("li");
        li.textContent = `${producto.nombre} x${producto.cantidad} - $${subtotal}`;
        resumenLista.appendChild(li);
    });

    resumenTotal.textContent = `Total: $${total}`;
}

let productos = [];
const cartCount = document.querySelector(".cart-count")
if (cartCount) {
    cartCount.textContent = cart.reduce((total, p) => total + p.cantidad, 0);
}
const listaProductos = document.querySelector("#lista-productos");
const cartItems = document.querySelector(".cart-items");
const clearCartBtn = document.querySelector(".clear-cart");

function cargarProductos() {
    fetch("productos.json")
    .then(response => response.json())
    .then(datos => {productos = datos;  mostrarProductos();

    })
    .catch(error => {console.error("Error al cargar los productos:", error);

    });
}

    function mostrarProductos() {
         listaProductos.innerHTML = "";

         productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("card-de-producto");

            tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button class="btn-agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            `;

             listaProductos.appendChild(tarjeta); 

             const boton = tarjeta.querySelector(".btn-agregar-carrito");
            boton.addEventListener("click", () => {
            const productoSeleccionado = productos.find(p => p.id === producto.id);
            const productoExistente = cart.find(p => p.id === producto.id);
             if (productoExistente) {
            productoExistente.cantidad++;
            } else {
            const productoNuevo = {...producto, cantidad: 1};
            cart.push(productoNuevo);
            Toastify({
            text: `Se agregó "${producto.nombre}" al carrito`,
            duration: 3000,        
            gravity: "top",        
            position: "right",     
            backgroundColor: "#0f0e12ff", 
            offset: {
            y: 60 }
            }).showToast();
  }
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log("carrito ahora", cart);
            cartCount.textContent = cart.reduce((total, p) => total + p.cantidad, 0);
            
   });
  });
}

const form = document.getElementById("checkout-form");


form.addEventListener("submit", function(e) {
    e.preventDefault(); 
    const name = document.getElementById("name").value;

    Swal.fire({
      title: "¡Compra realizada!",
      text: `Gracias ${name}, tu pedido se ha confirmado.`,
      icon: "success",
      confirmButtonText: "Seguir comprando"
    }).then(() => {
      localStorage.removeItem("cart"); 
      cart = [];
      if(cartCount) cartCount.textContent = 0; 
      window.location.href = "/index.html"; 
    });
});

cargarProductos();

mostrarResumenCheckout();