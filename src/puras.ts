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

/**
 * Función Pura: Elimina una tarea basándose en su título.
 * Usa .filter() para devolver una lista nueva sin la tarea.
 */
export function eliminarTareaPura(lista: Tarea[], titulo: string): Tarea[] {
    // .filter() es puro y devuelve un nuevo array
    return lista.filter(tarea => tarea.titulo.toLowerCase() !== titulo.toLowerCase());
}

/**
 * Función Pura: Genera el mensaje de confirmación para eliminar.
 */
export function generarMensajeConfirmacionEliminarPuro(tarea: Tarea): string {
    return `¿Estás seguro de que deseas eliminar la tarea "${tarea.titulo}"? (s/n): `;
}

/**
 * Función Pura: Valida y transforma la entrada del usuario para el estado.
 * @returns El estado ("Pendiente", etc.) o 'null' si es inválido.
 */
export function validarYTransformarEstadoPura(est: string): string | null {
    const estadoNormalizado = est.trim().toUpperCase();
    // Usamos un 'mapa' de objetos para la conversión
    const mapaEstados: { [key: string]: string } = {
        "P": "Pendiente",
        "E": "En Curso",
        "T": "Terminada",
        "C": "Cancelada"
    };
    return mapaEstados[estadoNormalizado] || null;
}

/**
 * Función Pura: Valida y transforma la entrada de dificultad.
 * @returns El número (1, 2, 3) o 'null' si es inválido.
 */
export function validarDificultadPura(dif: string): number | null {
    const dificultadNum = parseInt(dif);
    return [1, 2, 3].includes(dificultadNum) ? dificultadNum : null;
}

/**
 * Función Pura: Valida y transforma la entrada de fecha.
 * @returns Un objeto Date o 'null' si está vacía o es inválida.
 */
export function validarVencimientoPuro(fecha: string): Date | null {
    if (fecha.trim() === "") return null; // Válido que esté vacío
    const fechaDate = new Date(fecha);
    // isNaN(fechaDate.getTime()) es la forma de saber si una fecha es inválida
    return isNaN(fechaDate.getTime()) ? null : fechaDate;
}

/**
 * Función Pura: Genera el prompt para editar la descripción.
 */
export function generarPromptDescripcionPura(descripcionActual: string): string {
    return `Nueva descripción (actual: ${descripcionActual}): `;
}

/**
 * Función Pura: Genera el prompt para editar el estado.
 */
export function generarPromptEstadoPura(estadoActual: string): string {
    return `Nuevo estado ([P]/[E]/[T]/[C]) (actual: ${estadoActual}): `;
}

/**
 * Función Pura: Genera el prompt para editar la dificultad.
 */
export function generarPromptDificultadPura(dificultadActual: number): string {
    return `Nueva dificultad ([1]/[2]/[3]) (actual: ${dificultadActual}): `;
}

/**
 * Función Pura: Devuelve un *nuevo* objeto de tarea actualizado.
 * Esta función es la que realmente "aplica" los cambios a UNA tarea.
 * @param tarea La tarea original.
 * @param nuevosDatos Un objeto con las propiedades a cambiar.
 * @returns Un nuevo objeto Tarea, congelado.
 */
export function actualizarTareaPura(tarea: Tarea, nuevosDatos: Partial<DatosTarea>): Tarea {
    const tareaActualizada: Tarea = {
        ...tarea,       // 1. Copia todo lo viejo
        ...nuevosDatos,   // 2. Sobrescribe los campos nuevos
        edicion: new Date(), // 3. Actualiza la fecha de edición
    };
    return Object.freeze(tareaActualizada);
}

/**
 * Función Pura: Devuelve una *nueva lista* con la tarea actualizada.
 * Esta es la que usa .map() para encontrar la tarea en la lista.
 * @param lista La lista original.
 * @param titulo El título de la tarea a cambiar.
 * @param nuevosDatos Los cambios a aplicar.
 * @returns Una nueva lista de Tareas.
 */
export function editarTareaPura(lista: Tarea[], titulo: string, nuevosDatos: Partial<DatosTarea>): Tarea[] {
    return lista.map(tarea => 
        // Si no es la tarea, devuélvela tal cual
        tarea.titulo === titulo ? actualizarTareaPura(tarea, nuevosDatos) : tarea
    );
}
