const form = document.getElementById("checkout-form");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que se recargue la página

    // Aquí podrías capturar los datos del formulario si quieres enviarlos a un servidor
    const name = document.getElementById("name").value;

    // Mostrar modal de éxito
    Swal.fire({
        title: "¡Compra realizada!",
        text: `Gracias ${name}, tu pedido se ha confirmado.`,
        icon: "success",
        confirmButtonText: "Seguir comprando"
    }).then(() => {
        // Limpiar carrito
        localStorage.removeItem("cart");
        cart = [];

        // Actualizar contador en header si existe
        const cartCount = document.querySelector(".cart-count");
        if(cartCount) cartCount.textContent = 0;

        // Redirigir a página principal
        window.location.href = "/index.html";
    });
});