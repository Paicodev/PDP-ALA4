// Modulo detalles.js
import { tareas } from "./data";
import { input } from "./entradas";
import { editarTarea } from "./editar";

//Funcion para el bonus de las estrellas
function formatDificultad(nivel: number): string {
  //switch que retorna la cantidad de estrellas segun el entero
  //esto funciona gracias al parseInt
  switch (nivel) {
    case 1: return "★☆☆ (Fácil)";
    case 2: return "★★☆ (Medio)";
    case 3: return "★★★ (Difícil)";
    default: return "Sin Datos";
  }
}

//funcion principal del modulo para mostrar los detalles de la tarea
//recibe el indice que viene del index.js
async function menuDetalles(indice: number): Promise<void> {
//recibe los datos de la tarea con el indice seleccionado
  let tarea = tareas[indice];

  if (!tarea) {
    console.log("La tarea seleccionada no existe.\n");
    return;
  }

  //en este while utilizamos literales de plantilla para mostrar los datos de la tarea
  while (true) {
    console.log("\n=== DETALLES DE LA TAREA ===\n");
    console.log(`Título:       ${tarea.titulo || "Sin Datos"}`);
    console.log(`Descripción:  ${tarea.descripcion || "Sin Datos"}`);
    console.log(`Estado:       ${tarea.estado || "Sin Datos"}`);
    console.log(`Dificultad:   ${formatDificultad(tarea.dificultad)}`);
    console.log(`Vencimiento:  ${tarea.vencimiento || "Sin Datos"}`);
    console.log(`Creación:     ${tarea.creacion || "Sin Datos"}`);
    console.log(`Última edición:${tarea.edicion || "Sin Datos"}`);
    console.log("\n============================\n");

    let op = await input('Presiona "E" para editar, "0" para volver: ');

    if (op.toLowerCase() === "e") {
      await editarTarea(indice);
    } else if (op === "0") {
      return; // volvemos al menú anterior
    } else {
      console.log("Opción inválida, intenta nuevamente.\n");
    }
  }
}

export { menuDetalles };
