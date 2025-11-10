//modulo puras.ts aqui iran las funciones puras
//aqui no deben haber mutaciones como "console.log" o "input"

//importamos la interfaz de tareas
import { Tarea, DatosTarea } from "./data";

//Funcion pura que agrega una tarea, recibe la lista vieja y la tarea nueva.
export function agregarTareaPura(lista: Tarea[], tarea: Tarea): Tarea[] {
    //devuelve un array nuevo con la lista vieja y la tarea nueva
 return [...lista, tarea];
}

/**
 * Función Pura: Formatea una lista de tareas en un string legible.
 * Si la lista está vacía, devuelve un mensaje apropiado.
 */
export function formatearTareasPura(lista: Tarea[]): string {
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
export function generarMenuPuro(): string {
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
export function generarMenuFiltrosPuro(): string {
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
export function filtrarPorEstadoPura(lista: Tarea[], estado: string): Tarea[] {
    if (estado === "TODAS") {
        return [...lista]; // Devuelve una copia (inmutabilidad)
    }
    // .filter es una HOF y es pura por naturaleza
    return lista.filter(tarea => tarea.estado === estado);
}

/**
 * Función Pura: Busca una tarea por su título (ignorando mayúsculas/minúsculas).
 * Usa .find() (una HOF) y es pura.
 * @returns La Tarea encontrada o 'undefined' si no se encuentra.
 */
export function buscarTareaPorTituloPura(lista: Tarea[], titulo: string): Tarea | undefined {
    // Comparamos todo en minúsculas para que la búsqueda no sea sensible
    return lista.find(tarea => tarea.titulo.toLowerCase() === titulo.toLowerCase());
}

/**
 * Función Pura: Genera un mensaje de resultado para la búsqueda.
 * Reutiliza formatearTareasPura para mostrar la tarea si se encuentra.
 */
export function generarMensajeBusquedaPura(tareaEncontrada: Tarea | undefined, tituloBuscado: string): string {
    if (tareaEncontrada) {
        // Si la encontramos, usamos la función de formateo que ya teníamos
        return "\n¡Tarea encontrada!" + formatearTareasPura([tareaEncontrada]);
    } else {
        return `\nNo se encontró ninguna tarea con el título "${tituloBuscado}".`;
    }
}
