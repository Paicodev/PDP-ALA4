// Importamos módulos
import { tareas, Tarea } from "./data";
import { input, close } from "./entradas";

// La función es async porque usamos await
async function agregarTarea(): Promise<void> {
  console.log("\n=== Creando una nueva tarea ===");

  // 1. Título
  let titulo: string = await input("1. Ingresa el título: ");
  if (!titulo || titulo.trim() === "") {
    console.log("El título no puede estar vacío.");
    return;
  }

  // 2. Descripción
  let descripcion: string = await input("2. Ingresa la descripción: ");
  if (!descripcion || descripcion.trim() === "") {
    descripcion = "Sin descripción";
  }

  // 3. Estado (opciones acotadas)

  //va a empezar vacia pero eventualmente tendra un valor tipo string//
  let estado: string | null = null;
  
  while (true) {
    //toma el input del usuario para el estado
    let est: string = await input("3. Estado ([P]endiente / [E]n curso / [T]erminada / [C]ancelada): ");

    //eliminamos espacios en blanco al inicio y final, ademas, convertimos las letras que sean minusculas en mayuscula
    est = est.trim().toUpperCase();

    if (est === "P") { estado = "Pendiente"; break; }
    if (est === "E") { estado = "En Curso"; break; }
    if (est === "T") { estado = "Terminada"; break; }
    if (est === "C") { estado = "Cancelada"; break; }

    console.log("Opción inválida. Usa P, E, T o C.");
  }

  // 4. Dificultad (1, 2, 3)
  //va a empezar vacia pero eventualmente tendra un valor tipo number//
  let dificultad: number | null = null;
  while (true) {
    //Dificultad de tipo string ingresada por usuario 
    let difUser: string = await input("4. Dificultad ([1] / [2] / [3]): ");
    //Dificultad convertida en number
    let dif: number = parseInt(difUser);

    if (dif >= 1 && dif <= 3) {
      dificultad = dif;
      break;
    }
    console.log("Opción inválida. Ingresa 1, 2 o 3.");
  }

  // 5. Vencimiento (opcional)
  //Vencimiento de tipo string ingresado por usuario 
  let vencimientoUser: string = await input("5. Vencimiento (YYYY-MM-DD) o deja en blanco: ");
  //Vencimiento convertido en Date
  let vencimiento: Date | null = null;

  if (!vencimientoUser || vencimientoUser.trim() === "") {
    vencimiento = null; // si no se ingresa nada
  } else {
    vencimiento = new Date(vencimientoUser);
    if (isNaN(vencimiento.getTime())) {
      console.log("Fecha inválida, se asigna 'null'.");
      vencimiento = null;
    }
  }

  // 6. Crear tarea (respetando la interfaz Tarea)
  const tarea: Tarea = {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: estado!, // usamos ! porque el bucle garantiza que no sea null
    dificultad: dificultad!,
    vencimiento: vencimiento,
    creacion: new Date(),
    edicion: new Date()
  };

  // Agregar al arreglo global
  tareas.push(tarea);

  console.log("\n¡Datos guardados con éxito!\n");
}

// Exportamos la funcion
export { agregarTarea };
