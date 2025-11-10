//modulo impuras.ts
//Este archivo tiene las funciones impuras

import { Tarea, DatosTarea } from "./data";
import { input } from "./entradas";
import { formatearTareasPura,
         generarMenuFiltrosPuro,
         filtrarPorEstadoPura,
         buscarTareaPorTituloPura,
         generarMensajeBusquedaPura,
         eliminarTareaPura,
         generarMensajeConfirmacionEliminarPuro
} from "./puras";

export function agregarTareaImpura(): DatosTarea | null{
  console.log("\n=== Creando una nueva tarea ===");

  // 1. Título
  let titulo: string = input("1. Ingresa el título: ");
  if (!titulo || titulo.trim() === "") {
    console.log("El título no puede estar vacío. Operación cancelada.");
    return null;
  }

  // 2. Descripción
  let descripcion: string = input("2. Ingresa la descripción: ");
  if (!descripcion || descripcion.trim() === "") {
    descripcion = "Sin descripción";
  }

  // 3. Estado
  let estado: string | null = null;
  while (true) {
    let est: string = input(
      "3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): "
    );
    est = est.trim().toUpperCase();
    if (["P", "E", "T", "C"].includes(est)) {
      if (est === "P") estado = "Pendiente";
      if (est === "E") estado = "En Curso";
      if (est === "T") estado = "Terminada";
      if (est === "C") estado = "Cancelada";
      break;
    }
    console.log("Opción inválida. Usa P, E, T o C.");
  }

  // 4. Dificultad
  let dificultad: number = 0; // Default
  while (true) {
    let difUser: string = input("4. Dificultad ([1] / [2] / [3]): ");
    let dif: number = parseInt(difUser);
    if ([1, 2, 3].includes(dif)) {
      dificultad = dif;
      break;
    }
    console.log("Opción inválida. Ingresa 1, 2 o 3.");
  }

  // 5. Vencimiento
  let vencimientoUser: string = input(
    "5. Vencimiento (YYYY-MM-DD) o deja en blanco: "
  );
  let vencimiento: Date | null = null;
  if (vencimientoUser.trim() !== "") {
    vencimiento = new Date(vencimientoUser);
    if (isNaN(vencimiento.getTime())) {
      console.log("Fecha inválida, se asigna 'null'.");
      vencimiento = null;
    }
  }

  console.log("\n¡Datos recolectados!\n");

  return {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: estado!,
    dificultad: dificultad,
    vencimiento: vencimiento,
  };
  
}


/**
 * Función Impura: Muestra una lista de tareas en consola.
 * Su única responsabilidad es llamar a la lógica pura y hacer console.log
 */
export function visualizarTareasImpura(lista: Tarea[]): void {
  // 1. Llama a la función pura para obtener el texto formateado.
  const textoFormateado = formatearTareasPura(lista);
  // 2. Realiza la única acción impura: imprimir en consola.
  console.log(textoFormateado);
}

/**
 * Función Impura: Gestiona el submenú de filtros.
 * (Muestra menú, pide input, llama a la lógica pura, y llama a la vista)
 */
export function gestionarVisualizacionImpura(lista: Tarea[]): void {
  // 1. Llama a la función pura para generar el menú de filtros
  console.log(generarMenuFiltrosPuro());
  
  // 2. Pide la opción (Impuro)
  const op = input("Elija una opción: ");

  let filtro: string | null = null;
  
  // 3. Decide el filtro basado en la entrada
  switch(op) {
    case "1": filtro = "TODAS"; break;
    case "2": filtro = "Pendiente"; break;
    case "3": filtro = "En Curso"; break;
    case "4": filtro = "Terminada"; break;
    case "0": return; // Volver
    default:
      console.log("Opción inválida.");
      return;
  }

  // 4. Llama a la lógica pura de filtro
  const tareasFiltradas = filtrarPorEstadoPura(lista, filtro);

  // 5. Llama a la otra función impura para mostrar el resultado
  visualizarTareasImpura(tareasFiltradas);
}

/**
 * Función Impura: Pide un título, busca la tarea y muestra el resultado.
 * Actúa como el "gestor" de la funcionalidad de búsqueda.
 */
export function buscarYMostrarTareaImpura(lista: Tarea[]): void {
  console.log("\n=== Buscar una tarea ===");
  // 1. Pide el título (Impuro)
  const titulo = input("Ingresa el título de la tarea a buscar: ");

  // 2. Llama a la función pura para la lógica de búsqueda
  const tareaEncontrada = buscarTareaPorTituloPura(lista, titulo);

  // 3. Llama a la función pura para generar el mensaje de resultado
  const mensaje = generarMensajeBusquedaPura(tareaEncontrada, titulo);

  // 4. Realiza la acción impura de mostrar el mensaje
  console.log(mensaje);
}

/**
 * Función Impura: Gestiona el proceso de eliminación de una tarea.
 * Pide título, busca, pide confirmación y devuelve el título a eliminar.
 * @returns El título de la tarea a eliminar, o 'null' si se cancela.
 */
export function eliminarTareaImpura(lista: Tarea[]): string | null {
  console.log("\n=== Eliminar una tarea ===");
  if (lista.length === 0) {
    console.log("No hay tareas para eliminar.");
    return null;
  }

  // 1. Pide el título (Impuro)
  const titulo = input("Ingresa el título de la tarea a eliminar: ");

  // 2. Llama a la lógica pura de búsqueda (que ya teníamos)
  const tareaExistente = buscarTareaPorTituloPura(lista, titulo);

  if (!tareaExistente) {
    console.log(`No se encontró ninguna tarea con el título "${titulo}".`);
    return null;
  }

  // 3. Llama a la lógica pura para generar el prompt de confirmación
  const mensajeConfirmacion = generarMensajeConfirmacionEliminarPuro(tareaExistente);
  
  // 4. Pide la confirmación (Impuro)
  const confirmacion = input(mensajeConfirmacion);

  // 5. Devuelve el título solo si el usuario confirma con 's'
  return confirmacion.toLowerCase() === 's' ? tareaExistente.titulo : null;
}
