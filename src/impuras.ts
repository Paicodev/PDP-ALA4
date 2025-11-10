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
         generarMensajeConfirmacionEliminarPuro,
         validarYTransformarEstadoPura,
         validarDificultadPura,
         validarVencimientoPuro,
         generarPromptDescripcionPura,
         generarPromptEstadoPura,
         generarPromptDificultadPura
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
    //llamamos a la lógica pura
    estado = validarYTransformarEstadoPura(est);
    if(estado){
      break; //Si no es null, el estado es válido
    }
    console.log("Opción inválida. Usa P, E, T o C.");
  }

  // 4. Dificultad
  let dificultad: number = 0; // Default
  while (true) {
    let difUser: string = input("4. Dificultad ([1] / [2] / [3]): ");
    //Llamamos a la lógica pura
    const difValidada = validarDificultadPura(difUser);
    if (difValidada !== null) {
      dificultad = difValidada;
      break;
    }
    console.log("Opción inválida. Ingresa 1, 2 o 3.");
  }

  // 5. Vencimiento
  let vencimientoUser: string = input(
    "5. Vencimiento (YYYY-MM-DD) o deja en blanco: "
  );
  //Llamamos a la lógica pura
  let vencimiento: Date | null = validarVencimientoPuro(vencimientoUser);
  if (vencimientoUser.trim() !== "" && vencimiento === null) {
    console.log("Fecha inválida, se asigna 'null'.");
    }

  console.log("\n¡Datos recolectados!\n");

  const datosIncompletos: DatosTarea = {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: estado!, // Usamos '!' porque el bucle while asegura que no es null
    dificultad: dificultad,
    vencimiento: vencimiento,
  };
  return datosIncompletos;
}

/**
 * Función Impura: Gestiona el proceso de edición de una tarea.
 * Pide título, busca, pide nuevos datos y devuelve los cambios.
 * @returns Un objeto con el 'titulo' y los 'nuevosDatos' o 'null' si se cancela.
 */
export function editarTareaImpura(lista: Tarea[]): { titulo: string; nuevosDatos: Partial<DatosTarea> } | null {
  console.log("\n=== Editar una tarea ===");
  if (lista.length === 0) {
    console.log("No hay tareas para editar.");
    return null;
  }

  // 1. Pedir y buscar la tarea (Impuro + Puro)
  const titulo = input("Ingresa el título de la tarea a editar: ");
  const tareaExistente = buscarTareaPorTituloPura(lista, titulo);

  if (!tareaExistente) {
    console.log(`No se encontró ninguna tarea con el título "${titulo}".`);
    return null;
  }

  console.log("Tarea encontrada. Ingresa los nuevos valores (deja en blanco para no cambiar).");
  
  // Este objeto guardará SÓLO los campos que el usuario quiera cambiar
  const nuevosDatos: Partial<DatosTarea> = {};


  // --- Descripción ---
  // Usamos la función pura para generar el prompt
  const promptDesc = generarPromptDescripcionPura(tareaExistente.descripcion);
  const nuevaDescripcion = input(promptDesc);
  if (nuevaDescripcion.trim() !== "") {
    nuevosDatos.descripcion = nuevaDescripcion;
  }

  // --- Estado ---
  while (true) {
    // Usamos la función pura para generar el prompt
    const promptEst = generarPromptEstadoPura(tareaExistente.estado);
    let est: string = input(promptEst);
    
    if (est.trim() === '') break; // Si da Enter, no quiere cambiar, salimos

    // Usamos la función pura de validación
    const estadoValidado = validarYTransformarEstadoPura(est);
    if (estadoValidado) {
      nuevosDatos.estado = estadoValidado;
      break; // Válido y cambiado, salimos
    }
    console.log("Opción inválida. Usa P, E, T o C.");
  }

  // --- Dificultad ---
  while (true) {
    // Usamos la función pura para generar el prompt
    const promptDif = generarPromptDificultadPura(tareaExistente.dificultad);
    let difUser: string = input(promptDif);
    
    if (difUser.trim() === '') break; // No quiere cambiar

    // Usamos la función pura de validación
    const difValidada = validarDificultadPura(difUser);
    if (difValidada !== null) {
      nuevosDatos.dificultad = difValidada;
      break;
    }
    console.log("Opción inválida. Ingresa 1, 2 o 3.");
  }
  
  // (Omitimos 'vencimiento' por simplicidad, pero se añadiría igual que estos)

  // 3. Devolver resultado
  if (Object.keys(nuevosDatos).length === 0) {
    console.log("No se ingresaron datos nuevos. Operación cancelada.");
    return null;
  }

  // Devolvemos el título original y el objeto SÓLO con los cambios
  return { titulo: tareaExistente.titulo, nuevosDatos };
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
