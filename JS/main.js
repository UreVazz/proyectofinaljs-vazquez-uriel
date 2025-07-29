let tareas = [];

const formularioTareas = document.getElementById("formulario-tareas");
const inputNuevaTarea = document.getElementById("input-nueva-tarea");
const listaDeTareas = document.getElementById("lista-de-tareas");
const listaDeTareasCompletadas = document.getElementById("lista-de-tareas-completadas");
const contenedorTareasCompletadas = document.getElementById("contenedor-tareas-completadas"); 

const mensajesUsuarioDiv = document.getElementById("mensaje-usuario");

const btnLimpiarCompletadas = document.getElementById("btn-limpiar-completadas");

function mostrarMensaje (mensaje, tipo){
    mensajesUsuarioDiv.textContent = "";
    mensajesUsuarioDiv.className = "mensaje";

    mensajesUsuarioDiv.textContent = mensaje;
    mensajesUsuarioDiv.classList.add(tipo);
    mensajesUsuarioDiv.style.display = "block";

    setTimeout(function(){
        mensajesUsuarioDiv.style.display = "none";
        mensajesUsuarioDiv.textContent = "";
        mensajesUsuarioDiv.className = "mensaje";
    }, 3000); 
}

function guardarTareasEnLocalStorage (tareasParaGuardar) {
    localStorage.setItem ("tareasApp", JSON.stringify(tareasParaGuardar));
}

function cargarTareasDesdeLocalStorage (){
    const tareasGuardadas = localStorage.getItem("tareasApp");
    if (tareasGuardadas) {
        return JSON.parse (tareasGuardadas);
    }
    else {
        return [];
    }
}

function generarIDUnico() {
    return Date.now();
}

function anadirTarea(descripcion, tareasActuales){
    if (descripcion.trim() === ""){
        mostrarMensaje("La descripción no puede ir vacía", "error");
        return tareasActuales;
    }

    const nuevaTarea = {
        id: generarIDUnico(),
        descripcion: descripcion.trim(),
        completada: false
    };

    tareasActuales.push(nuevaTarea);
    mostrarMensaje("Tarea '" + nuevaTarea.descripcion + "' fue agregada correctamente", "exito");
    return tareasActuales;
}

function alternarEstadoTarea(idTareaRecibida, tareasActuales){
    const tareasActualizadas = tareasActuales.map(function (tarea){
        if (tarea.id === idTareaRecibida){
            return {...tarea, completada: !tarea.completada}
        }
        return tarea;
    });
    return tareasActualizadas;
}

function eliminarTarea (idTareaRecibida, tareasActuales){
    const tareasFiltradas = tareasActuales.filter(function (tarea){
        return tarea.id !== idTareaRecibida;
    });
    mostrarMensaje ("Tarea eliminada", "exito");
    return tareasFiltradas;
}

function limpiarTareasCompletadas (tareasActuales){
    const tareasIncompletas = tareasActuales.filter(function (tarea){ return tarea.completada === false;});
    mostrarMensaje ("Tareas completadas eliminadas", "exito");
    return tareasIncompletas;
}

function renderizarTareas(tareasParaMostrar) {
    listaDeTareas.innerHTML = '';
    listaDeTareasCompletadas.innerHTML = '';

    const tareasPendientes = tareasParaMostrar.filter(tarea => !tarea.completada);
    const tareasCompletadas = tareasParaMostrar.filter(tarea => tarea.completada);

    // Renderizar tareas pendientes
    if (tareasPendientes.length === 0) {
        const mensajeVacio = document.createElement('li');
        mensajeVacio.textContent = '¡No tienes tareas pendientes!';
        mensajeVacio.style.textAlign = 'center';
        mensajeVacio.style.color = '#888';
        listaDeTareas.appendChild(mensajeVacio);
    } else {
        tareasPendientes.forEach(function(tarea) {
            const listItem = crearElementoTarea(tarea);
            listaDeTareas.appendChild(listItem);
        });
    }

    // Renderizar tareas completadas
    if (tareasCompletadas.length === 0) {
        contenedorTareasCompletadas.style.display = 'none'; 
        btnLimpiarCompletadas.style.display = 'none'; 
    } else {
        contenedorTareasCompletadas.style.display = 'block'; 
        tareasCompletadas.forEach(function(tarea) {
            const listItem = crearElementoTarea(tarea);
            listaDeTareasCompletadas.appendChild(listItem);
        });
        btnLimpiarCompletadas.style.display = 'block'; 
    }
}


function crearElementoTarea(tarea) {
    const listItem = document.createElement('li');
    listItem.classList.add('tarea-item');
    listItem.dataset.id = tarea.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('tarea-checkbox');
    checkbox.checked = tarea.completada;

    checkbox.addEventListener('change', function() {
        tareas = alternarEstadoTarea(tarea.id, tareas);
        guardarTareasEnLocalStorage(tareas);
        renderizarTareas(tareas);
    });

    const tareaTexto = document.createElement('p');
    tareaTexto.classList.add('tarea-texto');
    tareaTexto.textContent = tarea.descripcion;

    if (tarea.completada) {
        listItem.classList.add('tarea-completada');
    }

    const accionesDiv = document.createElement('div');
    accionesDiv.classList.add('tarea-acciones');

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn-eliminar');

    btnEliminar.addEventListener('click', function() {
        tareas = eliminarTarea(tarea.id, tareas);
        guardarTareasEnLocalStorage(tareas);
        renderizarTareas(tareas);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(tareaTexto);
    accionesDiv.appendChild(btnEliminar);
    listItem.appendChild(accionesDiv);

    return listItem;
}


formularioTareas.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const descripcion = inputNuevaTarea.value;

    tareas = anadirTarea(descripcion, tareas);

    guardarTareasEnLocalStorage(tareas);
    renderizarTareas(tareas);
    inputNuevaTarea.value = '';
});

btnLimpiarCompletadas.addEventListener('click', function() {
    tareas = limpiarTareasCompletadas(tareas);
    
    guardarTareasEnLocalStorage(tareas);
    renderizarTareas(tareas);
});

function inicializarApp() {
    tareas = cargarTareasDesdeLocalStorage();
    renderizarTareas(tareas);
    
    if (tareas.length === 0) {
        mostrarMensaje('¡Bienvenido! Empieza añadiendo tu primera tarea.', 'exito');
    }
}

inicializarApp();