// --- DECLARACIÓN DE VARIABLES Y CONSTANTES ---

// Variables para llevar el puntaje del juego
let puntajeUsuario = 0;
let puntajeComputadora = 0;
let rondasJugadas = 0;

// Booleano para controlar el bucle principal del juego
let jugando = false;

// Array con las opciones válidas del juego (constante porque no cambia)
const OPCIONES_JUEGO = ['piedra', 'papel', 'tijera'];

// Objeto con los mensajes de resultado para mayor claridad
const MENSAJES_RESULTADO = {
    ganaste: "¡GANASTE esta ronda! 🎉",
    perdiste: "¡PERDISTE esta ronda! 😭",
    empate: "¡Es un EMPATE! 🤝"
};

// Referencias a elementos HTML para actualizar la interfaz del resumen
const btnIniciarJuego = document.getElementById('iniciarJuegoBtn');
const resumenJuegoDiv = document.getElementById('resumen-juego');
const victoriasUsuarioSpan = document.getElementById('victorias-usuario');
const victoriasComputadoraSpan = document.getElementById('victorias-computadora');
const resumenMensajeP = document.getElementById('resumen-mensaje');


// --- FUNCIONES JS QUE GENERAN INTERACCIÓN ---

/**
 * Función principal para iniciar y gestionar el bucle del juego.
 * Integra prompt, confirm, alert y el bucle while.
 */
function iniciarJuego() {
    console.log('--- JUEGO DE PIEDRA, PAPEL O TIJERA INICIADO ---');
    alert('¡Bienvenido al juego de Piedra, Papel o Tijera!\nPrepárate para desafiar a la computadora.');

    // Reiniciar puntajes al iniciar un nuevo juego
    puntajeUsuario = 0;
    puntajeComputadora = 0;
    rondasJugadas = 0;
    jugando = true; // Establecer 'jugando' a true para entrar en el bucle

    // Mostrar el div de resumen y limpiar/actualizar al inicio
    resumenJuegoDiv.style.display = 'block';
    actualizarResumenJuegoHTML(); // Limpia y muestra 0-0 al inicio

    // Bucle principal del juego: continúa mientras el usuario quiera jugar
    while (jugando) {
        rondasJugadas++;
        console.log(`\n--- RONDA #${rondasJugadas} ---`);
        
        // Ejecutar una ronda del juego y capturar el objeto con resultado y jugadas
        const rondaCompleta = jugarRonda(); 
        
        // Actualizar los puntajes según el resultado
        actualizarPuntajes(rondaCompleta.resultado);
        
        // Mostrar el resultado de la ronda y el puntaje actual en el alert
        mostrarResultado(rondaCompleta.resultado, rondaCompleta.usuario, rondaCompleta.computadora);

        // ¡NUEVO! Actualizar el resumen en el HTML después de cada ronda
        actualizarResumenJuegoHTML();

        // Preguntar al usuario si quiere jugar otra ronda
        let jugarDeNuevo = confirm('¿Quieres jugar otra ronda?');
        if (!jugarDeNuevo) {
            jugando = false; // Si el usuario cancela, salir del bucle
        }
    }

    // Mensaje final del juego (más conciso ya que el resumen está en el HTML)
    alert(`Juego Terminado. Gracias por jugar! Revisa el resumen en la página.`);
    console.log('--- JUEGO FINALIZADO ---');
    console.log(`Puntaje Final: Usuario ${puntajeUsuario} - Computadora ${puntajeComputadora}`);
}


/**
 * Orquesta una única ronda del juego.
 * Sigue el algoritmo: Entrada -> Procesamiento -> Salida.
 * @returns {object} Un objeto con el resultado de la ronda y las jugadas de usuario y computadora.
 */
function jugarRonda() {
    // 1. ENTRADA DE DATOS: Obtener jugada del usuario
    const jugadaUsuario = obtenerJugadaUsuario();
    console.log(`Tu jugada: ${jugadaUsuario.toUpperCase()}`);

    // 2. PROCESAMIENTO DE DATOS: Obtener jugada de la computadora
    const jugadaComputadora = obtenerJugadaComputadora();
    console.log(`Jugada de la Computadora: ${jugadaComputadora.toUpperCase()}`);

    // 3. PROCESAMIENTO DE DATOS: Determinar el ganador
    const resultado = determinarGanador(jugadaUsuario, jugadaComputadora);
    
    // Devolver un objeto con toda la información relevante de la ronda
    return { resultado: resultado, usuario: jugadaUsuario, computadora: jugadaComputadora };
}


/**
 * Solicita la jugada al usuario y la valida.
 * Utiliza prompt y un bucle while para la validación.
 * @returns {string} La jugada válida del usuario ('piedra', 'papel' o 'tijera').
 */
function obtenerJugadaUsuario() {
    let jugadaValida = false;
    let eleccionUsuario = '';

    // Bucle while para asegurar que la entrada del usuario sea válida
    while (!jugadaValida) {
        eleccionUsuario = prompt('Elige tu jugada:\n(Piedra, Papel o Tijera)').toLowerCase(); // Convertir a minúsculas para facilitar la comparación

        // Condicional para verificar si la opción elegida está en nuestro array de OPCIONES_JUEGO
        if (OPCIONES_JUEGO.includes(eleccionUsuario)) {
            jugadaValida = true; // La jugada es válida, salir del bucle
        } else {
            alert('¡Opción inválida! Por favor, elige "Piedra", "Papel" o "Tijera".');
            console.warn(`El usuario ingresó una jugada inválida: "${eleccionUsuario}"`);
        }
    }
    return eleccionUsuario;
}


/**
 * Genera una jugada aleatoria para la computadora.
 * @returns {string} La jugada de la computadora.
 */
function obtenerJugadaComputadora() {
    // Genera un número aleatorio entre 0 (inclusive) y el tamaño del array (exclusivo)
    const indiceAleatorio = Math.floor(Math.random() * OPCIONES_JUEGO.length);
    return OPCIONES_JUEGO[indiceAleatorio];
}


/**
 * Determina el ganador de la ronda basándose en las jugadas.
 * Utiliza condicionales if/else if/else.
 * @param {string} jugadaUsuario - La elección del usuario.
 * @param {string} jugadaComputadora - La elección de la computadora.
 * @returns {string} 'ganaste', 'perdiste' o 'empate'.
 */
function determinarGanador(jugadaUsuario, jugadaComputadora) {
    if (jugadaUsuario === jugadaComputadora) {
        return 'empate';
    } else if (
        (jugadaUsuario === 'piedra' && jugadaComputadora === 'tijera') ||
        (jugadaUsuario === 'papel' && jugadaComputadora === 'piedra') ||
        (jugadaUsuario === 'tijera' && jugadaComputadora === 'papel')
    ) {
        return 'ganaste';
    } else {
        return 'perdiste';
    }
}


/**
 * Actualiza los puntajes globales del juego.
 * @param {string} resultadoRonda - El resultado de la ronda ('ganaste', 'perdiste' o 'empate').
 */
function actualizarPuntajes(resultadoRonda) {
    if (resultadoRonda === 'ganaste') {
        puntajeUsuario++;
    } else if (resultadoRonda === 'perdiste') {
        puntajeComputadora++;
    }
    console.log(`Puntaje actual: Usuario ${puntajeUsuario} - Computadora ${puntajeComputadora}`);
}


/**
 * Muestra el resultado de la ronda actual y el puntaje acumulado al usuario en un alert.
 * @param {string} resultadoRonda - El resultado de la ronda.
 * @param {string} jugadaUsuarioActual - La jugada real del usuario en esta ronda.
 * @param {string} jugadaComputadoraActual - La jugada real de la computadora en esta ronda.
 */
function mostrarResultado(resultadoRonda, jugadaUsuarioActual, jugadaComputadoraActual) {
    let mensaje = `Tu jugada: ${jugadaUsuarioActual.toUpperCase()}\n`;
    mensaje += `Jugada de la Computadora: ${jugadaComputadoraActual.toUpperCase()}\n\n`;
    mensaje += `${MENSAJES_RESULTADO[resultadoRonda]}\n\n`;
    mensaje += `Tu Puntaje: ${puntajeUsuario}\nPuntaje de la Computadora: ${puntajeComputadora}\n\n`;
    mensaje += "Mira la Consola (F12) para más detalles.";

    alert(mensaje);
}

/**
 * ¡NUEVA FUNCIÓN!
 * Actualiza el resumen de puntajes y el mensaje en el HTML.
 * Se llama al inicio del juego y después de cada ronda.
 */
function actualizarResumenJuegoHTML() {
    victoriasUsuarioSpan.textContent = puntajeUsuario;
    victoriasComputadoraSpan.textContent = puntajeComputadora;

    let mensajeResumen = "";
    if (rondasJugadas === 0) {
        mensajeResumen = "¡Aún no hay rondas jugadas!";
    } else if (puntajeUsuario > puntajeComputadora) {
        mensajeResumen = "¡Felicidades! Vas ganando esta vez.";
    } else if (puntajeComputadora > puntajeUsuario) {
        mensajeResumen = "¡Sigue intentándolo! La computadora va ganando.";
    } else {
        mensajeResumen = "¡El juego está empatado!";
    }
    resumenMensajeP.textContent = mensajeResumen;

    console.log(`HTML de resumen actualizado: Usuario ${puntajeUsuario}, Computadora ${puntajeComputadora}`);
}


// --- LLAMADA INICIAL / EVENT LISTENERS ---

// Añadir un EventListener al botón para iniciar el juego cuando se haga clic
btnIniciarJuego.addEventListener('click', iniciarJuego);