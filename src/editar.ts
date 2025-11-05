// editar.ts
import { tareas, Tarea } from "./data";
import { input } from "./entradas";

async function editarTarea(indice: number): Promise<void> {
  const tarea = tareas[indice];

  console.log(`\nEstas editando la tarea "${tarea.titulo}".`);
  console.log(`
- Si deseas mantener los valores de un atributo, simplemente déjalo en blanco.
- Si deseas dejar en blanco un atributo, escribe un espacio.
  `);

  // 1. Descripción
  let nuevaDesc = await input(`1. Ingresa la descripción [${tarea.descripcion || "sin descripción"}]: `);
  if (nuevaDesc === " ") tarea.descripcion = "";
  else if (nuevaDesc !== "") tarea.descripcion = nuevaDesc;

  // 2. Estado
  let nuevoEstado = await input(
    `2. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada) [${tarea.estado}]: `
  );
  if (nuevoEstado.trim() !== ""){
    const est = nuevoEstado.trim().toUpperCase();
    if (est === "P") tarea.estado = "Pendiente";
    else if (est === "E") tarea.estado = "En Curso";
    else if (est === "T") tarea.estado = "Terminada";
    else if (est === "C") tarea.estado = "Cancelada";
    else console.log("Valor inválido, se mantiene el estado anterior.");
  }

  // 3. Dificultad
  let nuevaDif = await input(`3. Dificultad ([1] / [2] / [3]) [${tarea.dificultad}]: `);
  if (nuevaDif.trim() !== ""){
    const difNum = parseInt(nuevaDif);
    if ([1, 2, 3].includes(difNum)) tarea.dificultad = difNum;
    else console.log("Valor inválido, se mantiene la dificultad anterior.");
  }

  // 4. Vencimiento
  let nuevoVenc = await input(`4. Vencimiento [${tarea.vencimiento}]: `);

  if (nuevoVenc === " ") tarea.vencimiento = null;
  else if (nuevoVenc.trim() !== ""){
    const fecha = new Date(nuevoVenc);
    if (!isNaN(fecha.getTime())) tarea.vencimiento =fecha;
    else console.log("Fecha inválida, se mantiene la fecha anterior.");
  }

  // BONUS: actualizar "última edición"
  tarea.edicion = new Date();

  console.log("\n¡Datos guardados!");
  await input("Presiona cualquier tecla para continuar…");
}

export { editarTarea };
