//main.ts 
/*Es el encargado de gestionar la lista de tareas
maneja el bucle principal y coordina las funciones puras e impuras*/

import { input} from "./entradas";
import { agregarTareaImpura} from "./impuras";
import { Tarea, crearTarea } from "./data";
import { agregarTareaPura} from "./puras";

let listaDeTareas: Tarea[] = [];

function main(): void {
  while (true) {
    console.log("\n==== MENÚ PRINCIPAL ====");
    console.log("1. Ver mis tareas");
    console.log("2. Buscar una tarea");
    console.log("3. Agregar una tarea");
    console.log("0. Salir");
    console.log("==========================\n");
    let op: string = input("Elija una opción: ");

    switch (op) {
        case "1": {
            
            
            break;
        }
        case "2": {
            break;
        }
      case "3": {
        const datosCrudos = agregarTareaImpura();
        if (datosCrudos) {
          // Llama a la funcion pura para crear la tarea de data.ts
          //se meten los datos crudos que nos devuelve agregarTareaImpura
          const nuevaTarea = crearTarea(datosCrudos);

          // Llama a la funcion pura que agrega tareas con spreadoperator en puras.ts
          //se añade la lista mas la nueva tarea
          const nuevaLista = agregarTareaPura(listaDeTareas, nuevaTarea);

          // Re-asigna el estado de la lista original gracias a la copia auxiliar "nuevaLista"
          listaDeTareas = nuevaLista;

          console.log("¡Tarea agregada con éxito!");
        }
        input("Presiona cualquier tecla para continuar...\n");
        break;
      }
      case "0": {
            break;
        }
    }
}
}

main();