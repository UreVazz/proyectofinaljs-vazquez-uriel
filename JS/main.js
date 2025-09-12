let productos = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
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


cargarProductos();


