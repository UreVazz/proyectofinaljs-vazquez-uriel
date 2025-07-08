// --- Variables y Constantes ---

// Variables para llevar el puntaje del juego
let puntajeUsuario = 0;
let puntajeComputadora = 0;
let rondasJugadas = 0;
let rondasEmpatadas = 0;

// Bandera para controlar el bucle principal del juego
let jugando = false;

// Array con las opciones válidas del juego
const OPCIONES_JUEGO = ['piedra', 'papel', 'tijera'];

// Objeto con los mensajes de resultado
const MENSAJES_RESULTADO = {
   ganaste: "¡GANASTE esta ronda! :)",
   perdiste: "¡PERDISTE esta ronda! :(",
   empate: "¡Es un EMPATE! =)",
}


// Referencias a elementos HTML para actualizar la interfaz
const btnIniciarJuego = document.getElementById('iniciarJuegoBtn');
const resumenJuegoDiv = document.getElementById('resumen-juego');
const victoriasUsuarioSpan = document.getElementById('victorias-usuario');
const victoriasComputadoraSpan = document.getElementById('victorias-computadora');
const rondasJugadasSpan = document.getElementById('rondas-jugadas');
const rondasEmpatadasSpan = document.getElementById('rondas-empatadas');
const resumenMensajeP = document.getElementById('resumen-mensaje');


// --- Funciones del juego ---

function iniciarJuego() {
    console.log('--- JUEGO DE PIEDRA, PAPEL O TIJERA INICIADO ---');
    alert('Bienvenido al juego de Piedra, Papel o Tijera!\nPreprate para desafiar a la computadora.');

    // Restablecer el texto del boton
    btnIniciarJuego.textContent = '¡Jugar Ahora!';

    // Reiniciar puntajes
    puntajeUsuario = 0;
    puntajeComputadora = 0;
    rondasJugadas = 0;
    rondasEmpatadas = 0;
    jugando = true;

    // Mostrar el div de resumen y actualizar
    resumenJuegoDiv.style.display = 'block';
    actualizarResumenJuegoHTML();

    while (jugando) {
        console.log('--- RONDA #' + (rondasJugadas + 1) + ' ---');
        
        let rondaCompleta = jugarRonda();
        
        actualizarPuntajes(rondaCompleta.resultado);
        
        mostrarResultado(rondaCompleta.resultado, rondaCompleta.usuario, rondaCompleta.computadora);

        actualizarResumenJuegoHTML();

        let jugarDeNuevo = confirm('Quieres jugar otra ronda?');
        if (jugarDeNuevo == false) {
            jugando = false;
        }
    }

    alert('Juego Terminado. Gracias por jugar! Revisa el resumen en la pagina.');
    console.log('--- JUEGO FINALIZADO ---');
    console.log('Puntaje Final: Usuario ' + puntajeUsuario + ' - Computadora ' + puntajeComputadora + ' - Empates ' + rondasEmpatadas);

    btnIniciarJuego.textContent = 'Jugar Nuevamente';
}


function jugarRonda() {
    rondasJugadas = rondasJugadas + 1;
    
    let jugadaUsuario = obtenerJugadaUsuario();
    console.log('Tu jugada: ' + jugadaUsuario.toUpperCase());

    let jugadaComputadora = obtenerJugadaComputadora();
    console.log('Jugada de la Computadora: ' + jugadaComputadora.toUpperCase());

    let resultado = determinarGanador(jugadaUsuario, jugadaComputadora);
    
    // Devolver un objeto con toda la informacion relevante de la ronda
    let datosRonda = {
    resultado: resultado,
    usuario: jugadaUsuario,
    computadora: jugadaComputadora
    };
    return datosRonda; 
}


function obtenerJugadaUsuario() {
    let jugadaValida = false;
    let eleccionUsuario = '';

    while (jugadaValida == false) {
        eleccionUsuario = prompt('Elige tu jugada:\n(Piedra, Papel o Tijera)');
        eleccionUsuario = eleccionUsuario.toLowerCase();

        let encontrado = false;
        for (let i = 0; i < OPCIONES_JUEGO.length; i = i + 1) {
            if (OPCIONES_JUEGO[i] == eleccionUsuario) {
                encontrado = true;
                break;
            }
        }
        
        if (encontrado == true) {
            jugadaValida = true;
        } else {
            alert('Opcion invalida! Por favor, elige "Piedra", "Papel" o "Tijera".');
            console.warn('El usuario ingreso una jugada invalida: "' + eleccionUsuario + '"');
        }
    }
    return eleccionUsuario;
}



function obtenerJugadaComputadora() {
    let indiceAleatorio = Math.floor(Math.random() * OPCIONES_JUEGO.length);
    return OPCIONES_JUEGO[indiceAleatorio];
}


function determinarGanador(jugadaUsuario, jugadaComputadora) {
    if (jugadaUsuario == jugadaComputadora) {
        rondasEmpatadas = rondasEmpatadas + 1;
        return 'empate';
    } else if (
        (jugadaUsuario == 'piedra' && jugadaComputadora == 'tijera') ||
        (jugadaUsuario == 'papel' && jugadaComputadora == 'piedra') ||
        (jugadaUsuario == 'tijera' && jugadaComputadora == 'papel')
    ) {
        return 'ganaste';
    } else {
        return 'perdiste';
    }
}


function actualizarPuntajes(resultadoRonda) {
    if (resultadoRonda == 'ganaste') {
        puntajeUsuario = puntajeUsuario + 1;
    } else if (resultadoRonda == 'perdiste') {
        puntajeComputadora = puntajeComputadora + 1;
    }
    console.log('Puntaje actual: Usuario ' + puntajeUsuario + ' - Computadora ' + puntajeComputadora);
}


function mostrarResultado(resultadoRonda, jugadaUsuarioActual, jugadaComputadoraActual) {
    let mensaje = 'Tu jugada: ' + jugadaUsuarioActual.toUpperCase() + '\n';
    mensaje = mensaje + 'Jugada de la Computadora: ' + jugadaComputadoraActual.toUpperCase() + '\n\n';
    
    mensaje = mensaje + MENSAJES_RESULTADO[resultadoRonda] + '\n\n';
    
    mensaje = mensaje + 'Tu Puntaje: ' + puntajeUsuario + '\n';
    mensaje = mensaje + 'Puntaje de la Computadora: ' + puntajeComputadora + '\n\n';
    mensaje = mensaje + 'Mira la Consola (F12) para mas detalles.';

    alert(mensaje);
}


function actualizarResumenJuegoHTML() {
    victoriasUsuarioSpan.textContent = puntajeUsuario;
    victoriasComputadoraSpan.textContent = puntajeComputadora;
    rondasJugadasSpan.textContent = rondasJugadas;
    rondasEmpatadasSpan.textContent = rondasEmpatadas;

    let mensajeResumen = '';
    if (rondasJugadas == 0) {
        mensajeResumen = '¡Aun no hay rondas jugadas!';
    } else if (puntajeUsuario > puntajeComputadora) {
        mensajeResumen = '¡Felicidades! Vas ganando';
    } else if (puntajeComputadora > puntajeUsuario) {
        mensajeResumen = '¡Sigue intentandolo! La computadora va ganando.';
    } else {
        mensajeResumen = '¡El juego esta empatado! Lucha por la victoria.';
    }
    resumenMensajeP.textContent = mensajeResumen;

    console.log('HTML de resumen actualizado: Usuario ' + puntajeUsuario + ', Computadora ' + puntajeComputadora + ', Rondas ' + rondasJugadas + ', Empates ' + rondasEmpatadas);
}


// --- Iniciar juego---

btnIniciarJuego.addEventListener('click', iniciarJuego);