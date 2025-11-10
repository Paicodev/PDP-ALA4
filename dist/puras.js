"use strict";
//modulo puras.ts aqui iran las funciones puras
//aqui no deben haber mutaciones como "console.log" o "input"
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarTareaPura = agregarTareaPura;
exports.formatearTareasPura = formatearTareasPura;
exports.generarMenuPuro = generarMenuPuro;
exports.generarMenuFiltrosPuro = generarMenuFiltrosPuro;
exports.filtrarPorEstadoPura = filtrarPorEstadoPura;
//Funcion pura que agrega una tarea, recibe la lista vieja y la tarea nueva.
function agregarTareaPura(lista, tarea) {
    //devuelve un array nuevo con la lista vieja y la tarea nueva
    return [...lista, tarea];
}
/**
 * Función Pura: Formatea una lista de tareas en un string legible.
 * Si la lista está vacía, devuelve un mensaje apropiado.
 */
function formatearTareasPura(lista) {
    if (lista.length === 0) {
        return "\n--- Mis Tareas ---\nNo tienes tareas para mostrar.";
    }
    const cabecera = "\n--- Mis Tareas ---";
    // Usamos .map() (una HOF) para transformar cada objeto Tarea en un string
    const tareasFormateadas = lista.map((tarea, index) => {
        // Usamos .join() y .filter(Boolean) para armar el texto prolijamente
        const detalles = [
            `\nTarea #${index + 1}`,
            "====================",
            `  Título: ${tarea.titulo}`,
            `  Descripción: ${tarea.descripcion}`,
            `  Estado: ${tarea.estado}`,
            // Agregaremos la dificultad formateada después
            `  Dificultad: ${tarea.dificultad}`,
            `  Creada: ${tarea.creacion.toLocaleString()}`,
            `  Última Edición: ${tarea.edicion.toLocaleString()}`,
            // El 'filter(Boolean)' elimina esta línea si 'vencimiento' es null
            tarea.vencimiento ? `  Vencimiento: ${tarea.vencimiento.toLocaleString()}` : null,
            "===================="
        ].filter(Boolean);
        return detalles.join('\n');
    }).join(''); // Unimos todas las tareas en un solo string
    return `${cabecera}${tareasFormateadas}`;
}
/**
 * Función Pura: Genera el texto del menú principal.
 * (Extraemos esto de main.ts para que sea puro)
 */
function generarMenuPuro() {
    return [
        "\n==== MENÚ PRINCIPAL ====",
        "1. Ver mis tareas",
        "2. Buscar una tarea",
        "3. Agregar una tarea",
        "4. Editar una tarea",
        "5. Eliminar una tarea",
        "0. Salir",
        "==========================\n"
    ].join('\n');
}
/**
 * Función Pura: Genera el texto del menú de filtros.
 */
function generarMenuFiltrosPuro() {
    return [
        "\n=== ¿Qué tareas deseas ver? ===",
        "[1] Todas",
        "[2] Pendientes",
        "[3] En Curso",
        "[4] Terminadas",
        "[0] Volver al menú principal",
        "===========================\n"
    ].join('\n');
}
/**
 * Función Pura: Filtra una lista de tareas por estado.
 */
function filtrarPorEstadoPura(lista, estado) {
    if (estado === "TODAS") {
        return [...lista]; // Devuelve una copia (inmutabilidad)
    }
    // .filter es una HOF y es pura por naturaleza
    return lista.filter(tarea => tarea.estado === estado);
}
