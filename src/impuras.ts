//modulo impuras.ts
//Este archivo tiene las funciones impuras

import { Tarea, DatosTarea } from "./data";
import { input } from "./entradas";

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
